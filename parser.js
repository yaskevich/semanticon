'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('async-csv');
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool();

const mappingRuEn = {
  'ДФ': "unit",
  'требуется продолжение': "extrequired",
  'основная семантика': "semantics1",
  'дополнительная семантика': "semantics",
  'речевой акт 1 (для трехчастных)': "act1",
  'тип речевого акта (собеседник)': "actclass",
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

const phrasesSheme = `CREATE TABLE phrases (
    id SERIAL PRIMARY KEY,
    unit jsonb, 
    extrequired boolean not null default false,
    semantics jsonb,
    act1 jsonb, 
    actclass jsonb,
    situation text,
    parts boolean not null default false,
    intonation integer,
    extension jsonb,
    mods text,
    gest jsonb,
    organ jsonb,
    translations text,
    examples text,
    audio text,
    video text,
    style integer,
    comment text,
    construction text,
    link text
)
`;

const tokensSheme = `CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token text UNIQUE
)`;

const featuresSheme = `CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    groupid text,
    ru text not null,
    en text,
    UNIQUE (groupid, ru)
)`;

const tokensInsert = `INSERT INTO tokens (token) VALUES($1) RETURNING id`;
const featuresInsert = `INSERT INTO features (groupid, ru) VALUES($1, $2) RETURNING id`;

const phrasesInsert = `INSERT INTO phrases
                    (
                    unit, extrequired, semantics, act1, actclass, 
                    situation, parts, intonation, extension, mods, gest, organ
                    ) 
                    VALUES($1::jsonb, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                    RETURNING *`;
//
const pgIds = {};
const featureIds = {};
//

async function checkFeature(fld, content){
     // select semantics1, semantics2->0 from phrases;
    // if (["semantics1", "semantics2"].includes(fld)){
        // fld = "semantics";
    // }
    let id  = 0;
    const uuid = fld+content;
    if (Reflect.getOwnPropertyDescriptor(featureIds, uuid)) {
        id  = featureIds[uuid];
    } else {
        try {
            const result  = await pool.query(featuresInsert, [fld, content]);
            id = result.rows[0].id;
            featureIds[uuid] = id;
        } catch (e){
            console.error(e.detail);
        }
    }
    return id;
}

async function checkFeatureArray(fld, content) {
    const thisArr = content.split("|");
    const thisArrIds = [];
    for (let s=0; s < thisArr.length; s++) {
        if (thisArr[s]) {
            thisArrIds.push(await checkFeature(fld, thisArr[s]));
        }
    }
    return JSON.stringify(thisArrIds);
}

async function processFile(fileName) {

    if(!fs.existsSync(fileName)){
        process.exit();
    }

    const csvString = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');

    let csvArr  = [];

    try {
        csvArr = await csv.parse(csvString, {delimiter: ";"});
    }
    catch(e) {
        console.log(e.message);
    }

    const fieldRow = csvArr.shift();
    const dict = fieldRow.map(x => mappingRuEn[x]);

    const dump = {};
    const mappingEnRu = Object.assign({}, ...Object.entries(mappingRuEn).map(([a,b]) => ({ [b]: a })));

    await pool.query('DROP table IF EXISTS features');
    await pool.query('DROP table IF EXISTS phrases');
    await pool.query('DROP table IF EXISTS tokens');

    await pool.query(phrasesSheme);
    await pool.query(tokensSheme);
    await pool.query(featuresSheme);

    for (const row of csvArr) {
        let values = [];
        let semantics1 = "";
        for (let i=0; i < row.length; i++) {
            const data  = row[i];
            const fieldEn = dict[i];
            // const fieldRu = fieldRow[i];
            if(fieldEn  === "unit") {
                // console.time();
                // those chains of loops are to force code to run PG queries sequentially
                const unitsArr = data.split("|");
                const unitsArrVector = [];
                for (let i2=0; i2 < unitsArr.length; i2++) {
                    const tokensArr = unitsArr[i2].split(/\s|(?=-)/g);
                    const tokensArrVector = [];
                    for (let t=0; t < tokensArr.length; t++) {
                        const tkn = tokensArr[t];
                        let id  = 0;
                        if (Reflect.getOwnPropertyDescriptor(pgIds, tkn)) {
                            id  = pgIds[tkn];
                        } else {
                            try {
                                const result  = await pool.query(tokensInsert, [tkn]);
                                pgIds[tkn] = id = result.rows[0].id;
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
            } else if(fieldEn  === "extrequired") {
                values.push(data?1:0);
            } else if(fieldEn  === "semantics1") {
                semantics1 = data;
            } else if(fieldEn === "semantics") {
                const result = await checkFeatureArray(fieldEn, semantics1 + "|" + data);
                values.push(result);
            } else if(["act1", "extension", "gest", "organ"].includes(fieldEn)) {
                const result = await checkFeatureArray(fieldEn, data);
                values.push(result);
            } else if(fieldEn === "actclass") {
                // empty = error!!!
                if(!data) {
                    console.log(fieldEn, "is empty!");
                }
                const result = await checkFeatureArray(fieldEn, data);
                values.push(result);
            } else if(fieldEn === "situation") {
                values.push(data);
            } else if(fieldEn === "parts") {
                // !!! empty I treat as two-parts !!!
                // parts boolean not null default false,
                values.push(data==="трехчастная"?1:0);
            } else if(fieldEn === "intonation") {
                const result = await checkFeature(fieldEn, data);
                values.push(result);
            } else if(fieldEn === "mods") {
                values.push(data);
            } else {
                // console.log(data);
            }
            
            
            // aggregate data for debugging
            if (Reflect.getOwnPropertyDescriptor(dump, fieldEn)) {
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
            // aggregate data for debugging
        }
    
        try {
          await pool.query(phrasesInsert, values);
        } catch (err) {
          console.log(err.stack);
        }
    }
    
    await pool.end();

    let out = "";
    dict.forEach(function(item) {
        out+="=============================\n";
        out+="=============================\n";
        out+= item +  "||" + mappingEnRu[item] + "\n";
        out+="=============================\n";
        dump[item]["counts"].forEach(function(a, b) {
            const unit = dump[item]["values"][b] || '■';
            out+= `${unit}\t${a}\n`;
        });
        
    });

    fs.writeFileSync( "agg.log", out, "utf8");
}
// entry point
(async () => { await processFile(process.env.CSV); })();