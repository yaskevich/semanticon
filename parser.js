'use strict';

const fs = require('fs');
const path = require('path');
// const {google} = require('googleapis');
// const config = require('config');
// const cfg = config.get('app');
// const cli = require('commander');
const csv = require('async-csv');
// const SQLite = require('better-sqlite3');

const fileName = "df_annotation_sample_fin1.csv";

const mappingRuEn = {
  'ДФ': "unit",
  'требуется продолжение': "isNeedExt",
  'основная семантика': "semantics1",
  'дополнительная семантика': "semantics2",
  'речевой акт 1 (для трехчастных)': "act1",
  'тип речевого акта (собеседник)': "actType",
  'о ситуации': "situation",
  'структура': "struct",
  'интонация' : "intonation",
  'продолжение' : "extension",
  'модификации' : "mods",
  'жестикуляция' :"gest",
  'активный орган': "organ",
  'переводные аналоги': "translations",
  'Примеры': "examples",
  'Аудио' : "audio",
  'Видео': "video",
  'уст.|груб.|нейтр.': "tags",
  'Комментарий': "comment",
  'конструкция': "construction",
  'ссылка на конструктикон' : "link"
};


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

// CREATE TABLE test1 (a boolean, b text);
// INSERT INTO test1 VALUES (TRUE, 'sic est');
// INSERT INTO test1 VALUES (FALSE, 'non est');

function vectorize(strPhrase) {
	return strPhrase.split(/\s|(?=\-)/g)
		.map(function(d) {
			let indx  = wordsArr.indexOf(d);
			if (indx === -1) {
				indx = wordsArr.length;
				wordsArr.push(d)		
			}
			return indx;
	});
}

csvArr.forEach(function(item, i, arr) {
  // alert( i + ": " + item + " (массив:" + arr + ")" );
  // console.log(item[0]);
  // console.log("=============================");
  item.forEach(function(item2, i2, arr2) {
	const fieldEn = dict[i2];
	const fieldRu = fieldRow[i2];
	
	console.log(fieldEn);
	if(fieldEn  === "unit") {
		const arrPhrases =  item2.split("|");
		// console.log(arrPhrases);
		arrPhrases.map (x => vectorize(x));
	} else if(fieldEn  === "isNeedExt") {
		console.log(item2?1:0);
	}
	else {
		console.log(item2);
	}
		
		
		// console.log(`${fieldEn}■${item2}`);
		// if(item2) {
			// dump.hasOwnProperty(fieldEn)? dump[fieldEn].push(item2): dump[fieldEn] = [item2];		
			if (dump.hasOwnProperty(fieldEn)) {
				const place  = dump[fieldEn]["values"].indexOf(item2);
				if (place === -1){
					dump[fieldEn]["values"].push(item2);
					dump[fieldEn]["counts"].push(1);
				} else {
					// if (fieldEn  == "phrase") {
						// // console.log(dump);
						// console.log("●"+item2);
						// console.log(dump[fieldEn]);
						// console.log(item2, place, dump[fieldEn]["counts"][place]);
					// }			
					dump[fieldEn]["counts"][place] +=1;
					// if (fieldEn  == "phrase") {
						// console.log(item2, place, dump[fieldEn]["counts"][place]);
					// }
				}
			} else {
				dump[fieldEn] = { "counts" : [1], "values": [item2] };				
			}
		// }
	});
fsf()

});

// console.log(dump);

let out = "";
dict.forEach(function(item, i, arr) {
	out+="=============================\n";
	out+="=============================\n";
	out+= item +  "||" + mappingEnRu[item] + "\n";
	out+="=============================\n";
	dump[item]["counts"].forEach(function(item2, i2, arr2) {
		const unit = dump[item]["values"][i2] || '■';
		out+= `${unit}\t${item2}\n`;
	});
	
});

fs.writeFileSync( "agg.log", out, "utf8");

	
})();
