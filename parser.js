'use strict';

import fs from 'fs';
import path from 'path';
import csv from 'async-csv';

import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;
const pool = new Pool();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// global objects
const tokenIds = {};
const exprIds = {};
const transIds = {};
const featureIds = {};
const phraseIds = {};
const mediaIds = {};
let rowNumber = 0;
//
// https://www.loc.gov/standards/iso639-2/php/code_list.php
const langCodes = {
	"тадж": "tgk",
	"англ": "eng",
	"фин": "fin",
	"бур": "bua",
	"ивр": "heb",
	"ит": "ita",
	"слвн": "slv",
	"таджикский": "tgk",
	"английский": "eng",
	"финский": "fin",
	"бурятский": "bua",
	"иврит": "heb",
	"итальянский": "ita",
	"словенский": "slv",
	"русский": "rus"
}; // nno | nob


const mappingRuEn = {
  'ДФ': "unit",
  'требуется продолжение': "extrequired",
  'основная семантика': "semfunc",
  'дополнительная семантика': "semtone",
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
  'уст.|груб.|нейтр.': "style", // drop
  'устар.|груб.|нейтр.': "style",
  'Комментарий': "comment",
  'конструкция': "construction",
  'реплика 1': "remark1",
  'реплика 2': "remark2",
  'приоритет': "priority",
};

const schemes = {
 "phrases": `CREATE TABLE phrases (pid SERIAL PRIMARY KEY, phrase jsonb)`,
 "exprs": `CREATE TABLE exprs (eid SERIAL PRIMARY KEY, expr jsonb UNIQUE)`,
 "tokens": `CREATE TABLE tokens (id SERIAL PRIMARY KEY, token text UNIQUE)`,
 "units": `CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    pid integer not null,
    extrequired boolean not null default false,
    semfunc integer,
    semtone jsonb,
    act1 jsonb, 
    actclass jsonb,
    situation text,
    parts boolean not null default false,
    intonation integer,
    extension jsonb,
    mods text,
    gest jsonb,
    organ jsonb,
    translations jsonb,
    examples jsonb,
    audio jsonb,
    video jsonb,
    style integer,
    comment text,
    construction jsonb,
	remarks jsonb,
	CONSTRAINT fk_phrases
      FOREIGN KEY(pid) 
	  REFERENCES phrases(pid)
	)`,	
	"features":
	`CREATE TABLE features (
		id SERIAL PRIMARY KEY,
		groupid text,
		ru text not null,
		en text,
		UNIQUE (groupid, ru)
	)`,
	"translations":
	`CREATE TABLE translations (
		id SERIAL PRIMARY KEY,
		txt text not null,
		lang text not null,
		UNIQUE (txt, lang)
	)`,
	"media":
	`CREATE TABLE media (
		id SERIAL PRIMARY KEY,
		filename text not null,
		filehash text not null UNIQUE,
		fileext text not null		
	)`
};

const mediaInsert = `INSERT INTO media (filename, filehash, fileext) VALUES($1, $2, $3) RETURNING id`;
const exprsInsert = `INSERT INTO exprs (expr) VALUES($1) RETURNING eid`;
const phrasesInsert = `INSERT INTO phrases (phrase) VALUES($1) RETURNING pid`;
const tokensInsert = `INSERT INTO tokens (token) VALUES($1) RETURNING id`;
const transInsert = `INSERT INTO translations (txt, lang) VALUES($1, $2) RETURNING id`;
const featuresInsert = `INSERT INTO features (groupid, ru) VALUES($1, $2) RETURNING id`;
const unitsInsert = `INSERT INTO units (pid, extrequired, semfunc, semtone, act1, 
					actclass, 
					remarks,
					situation, parts, intonation, extension, mods, gest, organ, translations, examples, audio, video, style, comment, construction)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
                    RETURNING *`;

async function checkMedia(fld, content){
	const thisIdsArr = [];
	if (content) {
		const filenamesArr = content.split("|");
		// const thisArrIds = [];
		for (let i=0; i < filenamesArr.length; i++) {
			if (filenamesArr[i]) {
				// const type  = fld === "audio"; // false - video, true - audio
				const filename  = filenamesArr[i];
				const fileext = path.extname(filename);
				const hash  = filename; // CHANGE WHEN I HAVE REAL FILES!!!
				
				// var buffer = Buffer.alloc(100);
				// fs.read(fd, buffer, 0, 100, 0, function(err, num) {
					// console.log(buffer.toString('utf8', 0, num));
				// });
				// for wav from byte 44
				// https://audiocoding.ru/articles/2008-05-22-wav-file-structure/
				// for other give up and read let's say from 128-th
				
				// let crypto = require('crypto');
				// let md5CheckSum = crypto.createHash('md5').update(dataToConvert).digest("hex");
				
				const pd = Reflect.getOwnPropertyDescriptor(mediaIds, hash);
				if (!pd) {
					const result  = await pool.query(mediaInsert, [filename.substring(0, filename.length - fileext.length), hash, fileext]);
					mediaIds[hash] = result.rows[0].id;
				}
				thisIdsArr.push(mediaIds[hash]);				
			}
		}
	}
	return JSON.stringify(thisIdsArr);
}

async function checkFeature(fld, content){
     // select semantics1, semantics2->0 from units;
    // if (["semantics1", "semantics2"].includes(fld)){
        // fld = "semantics";
    // }
    const uuid = fld+content;
    if (!Reflect.getOwnPropertyDescriptor(featureIds, uuid)) {
        try {
            const result  = await pool.query(featuresInsert, [fld, content]);
            featureIds[uuid] = result.rows[0].id;
        } catch (e){
            console.error(rowNumber, e.detail);
        }
    }
    return featureIds[uuid];
}

async function checkFeatureArray(fld, content) {
    const thisArr = content.split("|");
    const thisArrIds = [];
    for (let s=0; s < thisArr.length; s++) {
        if (thisArr[s]) {
            thisArrIds.push(await checkFeature(fld, thisArr[s].trim()));
        }
    }
    return JSON.stringify(thisArrIds);
}

async function vectorizeTokens(content){
    // console.time();
    // those chains of loops are to force code to run PG queries sequentially
    const unitsArr = content.split("|");
    const unitsArrVector = [];
	const exprsArr = [];
	
    for (let i=0; i < unitsArr.length; i++) {
        const tokensArr = unitsArr[i].trim().split(/\s|(?=-)/g);
        const tokensArrVector = [];
        for (let t=0; t < tokensArr.length; t++) {
            const tkn = tokensArr[t].trim();
            if (!Reflect.getOwnPropertyDescriptor(tokenIds, tkn)) {
                try {
                    const result  = await pool.query(tokensInsert, [tkn]);
                    tokenIds[tkn] = result.rows[0].id;
                } catch (e){
                    console.error(rowNumber, e.detail);
                }
            }
            tokensArrVector.push(tokenIds[tkn]);
        }
		
		const exprSerialized = JSON.stringify(tokensArrVector);
		if (!Reflect.getOwnPropertyDescriptor(exprIds, exprSerialized)) {
			try {
				const result  = await pool.query(exprsInsert, [exprSerialized]);
				exprIds[exprSerialized] = result.rows[0].eid;
			} catch (e){
				console.error(rowNumber, e.detail);
			}					
		}
		// console.error(unitsArr[i], exprIds[exprSerialized]);
		exprsArr.push(exprIds[exprSerialized]);
        unitsArrVector.push(tokensArrVector);
    }
    // console.timeEnd();
    return [JSON.stringify(unitsArrVector), exprsArr[0], JSON.stringify(exprsArr)];
}

async function processTranslations(fld, content){
	const cleaned = content.replace(/\|/g, '');
	let arr  = cleaned.split(/(?<=]])\s*/g);
	const thisArrTransIds = [];
	if (cleaned.length) {
		for (let ii=0; ii<arr.length; ii++){
			const transPlusLang  = arr[ii].split("[[");
				if (transPlusLang.length!==2) {
					console.error(rowNumber, `${fld} <DOES NOT MATCH> ${content}`);
				} else {
					// console.log(transPlusLang[0], transPlusLang[1].slice(0, -3) );
					let [trans, langRussian] = transPlusLang;
					langRussian = langRussian.replace(/\.?\]\]$/, '');
					trans = trans.trim();
					
					const pdLang  = Reflect.getOwnPropertyDescriptor(langCodes, langRussian);
					if (pdLang){
						if (pdLang.value === "rus") {
							console.error(rowNumber, `${fld} <RUSSIAN> ${content}`);
						}
						const pdTrans = Reflect.getOwnPropertyDescriptor(transIds, trans);
						if (!pdTrans) {
							try {
								const result  = await pool.query(transInsert, [trans, pdLang.value]);
								transIds[trans] = result.rows[0].id;
							} catch (e) {
								console.error(rowNumber, e);
							}
						} 
						thisArrTransIds.push(transIds[trans]);
					} else {
						console.error(rowNumber, `${fld} <NOT IN LANG LIST>`, langRussian, "■",content);
					}
				}
		}						
	}
	return JSON.stringify(thisArrTransIds);
}

async function processExamples(fld, content){
	const cleaned = content.replace(/\|/g, '').trim();
	let arr  = cleaned.split(/(?<=]])\s*/g);
	const examplesArray = [];
	if (cleaned.length) {
		for (let ii=0; ii<arr.length; ii++){
			const info = {};
			let error = "";
			const example  = arr[ii].trim().replace(/--|-/g, '–');
			const exPlusLang  = example.split("[[");
			if (exPlusLang.length!==2) {
				console.error(`${rowNumber}:${fld} len=${exPlusLang.length} <DOES NOT MATCH> |${exPlusLang}|:\n${example}\n►${content}◄`);
			} else {
				const [exBody, langRu] = exPlusLang;
				const langRussian = langRu.replace(/\.?\]\]$/, '');
				const textPlusSource  = exBody.split("[");
				// console.log("--------------------------------");
				// console.log("[text]", textPlusSource);
				
				const pdLang  = Reflect.getOwnPropertyDescriptor(langCodes, langRussian);
				
				if (pdLang){
					info["lang"] = pdLang.value;
				} else {
					console.error(rowNumber, "LANG", langRussian);
				}
				
				if (textPlusSource.length>1) {
					const srcAndDate = textPlusSource[1].trim();
					let matches = srcAndDate.match(/^(.*?)\(([\d–\.]+)\)\]$/);
					
					if (!matches){
						const matches  = srcAndDate.match(/^(.*?)\s*\/\/\s*«(.*?)»\,\s+([\d–\.]+)\]$/);
						if (matches) {
							const [author, book, rest] = matches[1].split('.');
							if (rest) {
								error = `DOT SPLITTER (JOURNAL) ¦${rest}¦`;
							} else {
								info["author"] = author.trim();
								info["pub"] = book.trim();
								info["journal"] = matches[2].trim();
								info["pubdate"] = matches[3].trim();
							}
						} else {
							error = "AUTHOR/DATE FORMAT";
						}
					} else {
						// const dotSplitter = matches[1].lastIndexOf();
						const [author, book, rest] = matches[1].split('.');
						if (rest) {
							error = `DOT SPLITTER (BOOK) ¦${rest}¦`;
						} else {
							
							if(author && book) {
								info["author"] = author.trim();
								info["pub"] = book.trim();
								info["pubdate"] = matches[2].trim();
							} else {
								// console.error(matches[1]);
								error = `DOT SPLITTER (BOOK|AUTHOR)`;
							}
						}
					}
					if (Object.keys(info).length < 4){
						console.error(rowNumber, "examples <"+error+">", srcAndDate);
					} else {
						info["text"] = textPlusSource[0].trim();
						examplesArray.push(info);
						console.log(info);
					}		
				} 
				else {
					// no author info !!
					// console.error ("LEN", textPlusSource.length, textPlusSource);
					examplesArray.push({"text": exBody.trim(), "lang": pdLang.value});
				}
			}
		}						
	}
	return JSON.stringify(examplesArray);
}

async function processConstruction(fld, content) {
	let arr  = content.split(/\]\]/g).filter(Boolean).map(x => { 
		const y = x.split('[[');
		if (y.length % 2 !== 0) {
			console.error(rowNumber, "<CONSTRUCTION ANNOTATION ERROR>", arr);
		}
		const obj = {"syn": y[0].trim()};
		if (y[1]) {
			obj["link"] = y[1];
		}
		return obj;
	});
	return JSON.stringify(arr);
}

async function processFile(fileName) {

    if(fs.existsSync(fileName)){
        const csvString = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');
        let csvArr  = [];

        try {
            csvArr = await csv.parse(csvString, {delimiter: ";"});
        }
        catch(e) {
            console.log(e.message);
        }

        const fieldRow = csvArr.shift();
        const dict = fieldRow.map(x => mappingRuEn[x.trim()]); // trim because of BOM
		
		
        const dump = {};
        const mappingEnRu = Object.assign({}, ...Object.entries(mappingRuEn).map(([a,b]) => ({ [b]: a })));
		
		for (let table in schemes){
			// jshint: The body of a for in should be wrapped in an if statement...
			if (Reflect.getOwnPropertyDescriptor(schemes, table)) {
				await pool.query('DROP table IF EXISTS ' + table + ' CASCADE');
				await pool.query(schemes[table]);
			}
		}

        // for (const row of csvArr) {
		for (let n = 0; n < csvArr.length; n++) {
			// rowNumber = `${n + 2}(${n})`;
			rowNumber = n+2;
			const row = csvArr[n];
            const values = [];
			let remark = '';
			let skip = false;
            
            for (let i=0; i < row.length; i++) {
                const data  = row[i];
                const fieldEn = dict[i];
                // const fieldRu = fieldRow[i];
                if(fieldEn  === "unit") {
                    const vectorResults = await vectorizeTokens(data);
					// console.error(vectorResults[1]);
					const vector = vectorResults[2];
					if (!Reflect.getOwnPropertyDescriptor(phraseIds, vector)) {
						try {
							const result  = await pool.query(phrasesInsert, [vector]);
							phraseIds[vector] = result.rows[0].pid;
						} catch (e){
							console.error(e.detail);
						}
					}
                    values.push(phraseIds[vector]);
                } else if(fieldEn  === "extrequired") {
                    values.push(data?1:0);
                } else if(fieldEn === "semtone") {
                    const result = await checkFeatureArray(fieldEn, data);
                    values.push(result);
                } else if(["act1", "extension", "gest", "organ"].includes(fieldEn)) {
						let datum = data;
					if (fieldEn === "extension") {
						// (+ аргументация) | (+ переформулировка)
						datum = data.replace(/[+)(]/g, '');
					}
                    const result = await checkFeatureArray(fieldEn, datum);
                    values.push(result);
                } else if(fieldEn === "actclass") {
                    // empty = error!!!
                    if(!data) {
                        console.error(rowNumber, fieldEn, "<EMPTY>");
						skip = true
                    }
                    const result = await checkFeatureArray(fieldEn, data);
                    values.push(result);
                } else if(["situation", "comment"].includes(fieldEn)) {
                    values.push(data);
                } else if(fieldEn === "parts") {
                    // !!! empty I treat as two-parts !!!
                    // parts boolean not null default false,
                    values.push(data==="трехчастная"?1:0);
                } else if(["semfunc", "intonation", "style"].includes(fieldEn)) {
					if(fieldEn=== 'semfunc' && !data) {
                        console.error(rowNumber, fieldEn, "<EMPTY>");
						skip = true;
                    } else {
						const result = await checkFeature(fieldEn, data);
						values.push(result);
					}
                } else if(fieldEn === "mods") {
                    values.push(data);
                } else if(fieldEn === "translations") {
					const result  = await processTranslations(fieldEn, data);
                    values.push(result);
                } else if(fieldEn === "examples") {
					const result  = await processExamples(fieldEn, data);
                    values.push(result);					
                } else if(["audio", "video"].includes(fieldEn)) {
					const result  = await checkMedia(fieldEn, data);
                    values.push(result);					
                } else if(fieldEn === "construction") {
					const result  = await processConstruction(fieldEn, data);
					// if (data) {
						// console.error("=>",result);
					// }
                    values.push(result);					
                } else if(fieldEn  === "remark1") {
					remark = data.trim();
                } else if(fieldEn  === "remark2") {
					const remarks = [data.trim()];
					if (remark){
						remarks.push(remark);
					}
                    values.push(JSON.stringify(remarks));
                } else if(fieldEn  === "priority") {
					// remarks.push(data);
					// console.error("pty", data);
                } 
				else {
					console.error(fieldEn, `|${fieldRow[i]}|`, i);
					// process.exit();
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
        
			if(!skip){
				try {
				  await pool.query(unitsInsert, values);
				} catch (err) {
				  console.log(err.stack);
				}
			} else {
				console.log("!!!!!!!!!!!", row[0]);
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
        
    } else {
        console.log("Path to the file with data is incorrect!");
    }

}
// entry point
(async () => { 
    if (process.argv[2]) {
        await processFile(process.argv[2]); 
    } else {
        console.log("Put path to the file containing data as a command-line argument!");
    }
    
})();