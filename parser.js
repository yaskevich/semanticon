'use strict';

const fs = require('fs');
const path = require('path');
// const {google} = require('googleapis');
// const config = require('config');
// const cfg = config.get('app');
// const cli = require('commander');
const csv = require('async-csv');
require('dotenv').config()
const { Pool, Client } = require('pg')
const pool = new Pool()

const fileName = "df_annotation_sample_fin1.csv";

const mappingRuEn = {
  'ДФ': "unit",
  'требуется продолжение': "isNeedExt",
  'основная семантика': "semantics1",
  'дополнительная семантика': "semantics2",
  'речевой акт 1 (для трехчастных)': "act1",
  'тип речевого акта (собеседник)': "actType",
  'о ситуации': "situation",
  'структура': "parts",
  'интонация' : "intonation",
  'продолжение' : "extension",
  'модификации' : "mods",
  'жестикуляция' :"gest",
  'активный орган': "organ",
  'переводные аналоги': "translations",
  'Примеры': "examples",
  'Аудио' : "audio",
  'Видео': "video",
  'уст.|груб.|нейтр.': "styletags",
  'Комментарий': "comment",
  'конструкция': "construction",
  'ссылка на конструктикон' : "link"
};

const sql = `CREATE TABLE phrases (
	id SERIAL PRIMARY KEY,
	unit jsonb, 
	isNeedExt boolean not null default false,
	semantics1 integer not null,
	semantics2 jsonb,
	act1 integer[], 
	actType integer[] not null,
	situation text,
	parts boolean not null default false,
	intonation integer,
	extension integer[],
	mods text,
	gest integer[],
	organ integer[],
	translations text,
	examples text,
	audio text,
	video text,
	styletags integer,
	comment text,
	construction text,
	link text
)
`;

const sqlTokens = `CREATE TABLE tokens (
	id SERIAL PRIMARY KEY,
	token text UNIQUE
)`;

const sqlFeatures = `CREATE TABLE features (
	id SERIAL PRIMARY KEY,
	groupid text,
	ru text not null,
	UNIQUE (groupid, ru)
)`;


(async () => {
const csvString = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');

let csvArr  = [];

try {
	csvArr = await csv.parse(csvString, {delimiter: ";"});
}
catch(e) {
	console.log(e.message);
}
// console.log(csvArr[0]);

const fieldRow = csvArr.shift();
const dict = fieldRow.map(x => mappingRuEn[x]);
// console.log(dict);

const dump = {};
const mappingEnRu = Object.assign({}, ...Object.entries(mappingRuEn).map(([a,b]) => ({ [b]: a })))

const wordsArr = [];
const semantics1 = [];




await pool.query('DROP table IF EXISTS features');
await pool.query('DROP table IF EXISTS phrases');
await pool.query('DROP table IF EXISTS tokens');

await pool.query(sql);
await pool.query(sqlTokens);
await pool.query(sqlFeatures);
// console.log(result);

// function vectorize(strPhrase) {
	// return strPhrase.split(/\s|(?=\-)/g)
		// .map(function(d) {
			// let indx  = wordsArr.indexOf(d);
			// if (indx === -1) {
				// indx = wordsArr.length;
				// wordsArr.push(d)		
			// }
			// return indx;
	// });
// }

// const sqlTokenId = `WITH v AS (SELECT $1::text AS token), s AS (SELECT id FROM tokens JOIN v USING (token)) ,i AS ( INSERT INTO tokens (token) SELECT token FROM v WHERE NOT EXISTS (SELECT * FROM s) RETURNING id ) SELECT id, 'save'::text AS src FROM i UNION ALL SELECT id, 'exist' FROM s;`
const sqlTokenId = `INSERT INTO tokens (token) VALUES($1) RETURNING id`;
const sqlFeatureId = `INSERT INTO features (groupid, ru) VALUES($1, $2) RETURNING id`;
const pgIds = {};
async function vectorize(strPhrase) {
	return await Promise.all(strPhrase.split(/\s|(?=\-)/g).map(async (d) => {
			console.log(d);
			let id;
			if (pgIds.hasOwnProperty(d)) {
				id  = pgIds[d];
			} else {
				try {
				result  = await pool.query(sqlTokenId, [d]);
				console.log("!", d, result.rows);
				id = result.rows[0].id;
				pgIds[d] = id;
				} catch (e){
					console.error(e.detail);
				}
			}
			return id;
	}));
}

const featureIds = {};

async function checkFeature(fld, content){
	 // select semantics1, semantics2->0 from phrases;
	if (["semantics1", "semantics2"].includes(fld)){
		fld = "semantics";
	}
	let id  = 0;
	const uuid = fld+content;
	if (featureIds.hasOwnProperty(uuid)) {
		id  = featureIds[uuid];
	} else {
		try {
			const result  = await pool.query(sqlFeatureId, [fld, content]);
			id = result.rows[0].id;
			featureIds[uuid] = id;
		} catch (e){
			console.error(e.detail);
		}
	}
	return id;
}


for (const row of csvArr) {	
	let values = [];
	for (let i=0; i < row.length; i++) {
		const data  = row[i];
		const fieldEn = dict[i];
		const fieldRu = fieldRow[i];
		// console.log(fieldEn);
		if(fieldEn  === "unit") {
			// console.time();
			// those chains of loops to force code to run PG queries sequentially
			const unitsArr = data.split("|");
			const unitsArrVector = [];
			for (let i2=0; i2 < unitsArr.length; i2++) {
				const tokensArr = unitsArr[i2].split(/\s|(?=\-)/g);
				const tokensArrVector = []
				for (let t=0; t < tokensArr.length; t++) {
					const tkn = tokensArr[t];
					let id  = 0;
					if (pgIds.hasOwnProperty(tkn)) {
						id  = pgIds[tkn];
					} else {
						try {
							const result  = await pool.query(sqlTokenId, [tkn]);
							// console.log("!", tkn, result.rows);
							id = result.rows[0].id;
							pgIds[tkn] = id;
						} catch (e){
							console.error(e.detail);
						}
					}
					tokensArrVector.push(id);
				}
				unitsArrVector.push(tokensArrVector);
			}
			// console.timeEnd();
			values.push(JSON.stringify(unitsArrVector));
			// console.log(unitsArrVector);
			// process.exit();
		} else if(fieldEn  === "isNeedExt") {
			values.push(data?1:0);
		} else if(fieldEn  === "semantics1") {
			const result = await checkFeature(fieldEn, data);
			values.push(result);
		} else if(fieldEn === "semantics2") {
			// console.log(data);
			const semArr = data.split("|");
			const semArrIds = [];
			for (let s=0; s < semArr.length; s++) {
				// console.log("|"+semArr[s]+">>("+data+")");
				if (semArr[s]) {
					semArrIds.push(await checkFeature(fieldEn, semArr[s]));
				}
			}
			values.push(JSON.stringify(semArrIds));
		} else {
			// console.log(data);
		}
		
		
		
		if (dump.hasOwnProperty(fieldEn)) {
			const place  = dump[fieldEn]["values"].indexOf(data);
			if (place === -1){
				dump[fieldEn]["values"].push(data);
				dump[fieldEn]["counts"].push(1);
			} else {
				dump[fieldEn]["counts"][place] +=1;
			}
		} else {
			dump[fieldEn] = { "counts" : [1], "values": [data] };				
		}
	}
  
// '{{0,1,2},{3,0,1,2},{3,4,1,2},{0,5,1,2},{4,5,1,2},{3,4,5,1,2},{3,0,5,1,2}}',
  
// console.log(values);	

// CREATE INDEX phrases_unit_gin_idx ON phrases USING gin (unit);
//  select * from phrases where unit  @> '[[3]]';


// let vals = [values[0]];
try {
  const ex  = await pool.query(`INSERT INTO phrases(unit, isNeedExt, semantics1, semantics2, actType) VALUES($1::jsonb, $2, $3, $4, '{1}') RETURNING *`, values);
  // console.log("111", ex);
} catch (err) {
  console.log(err.stack)
}
// process.exit();



}
await pool.end()
// console.log(dump);

let out = "";
dict.forEach(function(item, i, arr) {
	out+="=============================\n";
	out+="=============================\n";
	out+= item +  "||" + mappingEnRu[item] + "\n";
	out+="=============================\n";
	dump[item]["counts"].forEach(function(data, i2, arr2) {
		const unit = dump[item]["values"][i2] || '■';
		out+= `${unit}\t${data}\n`;
	});
	
});

fs.writeFileSync( "agg.log", out, "utf8");

	
})();
