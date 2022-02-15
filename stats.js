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

const resultCountTokens		= await pool.query("SELECT COUNT(*) FROM tokens");
const resultCountPhrases	= await pool.query("SELECT COUNT(*) FROM phrases");
const resultCountExprs		= await pool.query("SELECT COUNT(*) FROM exprs");

const resultTokens = await pool.query("SELECT * FROM tokens");
const resultPhrases = await pool.query("SELECT * FROM phrases");
const resultExprs = await pool.query("SELECT * FROM exprs");


const countTokens = resultCountTokens.rows[0].count;
const countPhrases = resultCountPhrases.rows[0].count;
const countExprs = resultCountExprs.rows[0].count;
console.log("tokens / phrases / exprs", countTokens, countPhrases, countExprs);



const tokensObject = Object.assign({}, ...(resultTokens.rows.map(x => ({ [x.id]: x.token }) )));

const exprsObject = Object.assign({}, ...(resultExprs.rows.map(x => ({ [x.eid]: x.expr }) )));
// console.log("",  tokensObject);

// console.log(resultPhrases.rows);
const lenObj = {};
for (let x of resultPhrases.rows) {
	let len = String(x.phrase.length);
	if (lenObj?.[len]) {
		lenObj[len] += 1;
	} else {
		lenObj[len] = 1;
	}
	// if (len > 15) {
		// console.log("LEN", len, x.phrase);
		// for (let eid of x.phrase) {
			// console.log(exprsObject[eid].map(x => tokensObject[x]));
		// }
	// }
}
// console.log(lenObj);


const occObj = {};
// console.log(exprsObject);
for (let x in exprsObject) {
	// console.log(exprsObject[x]);
	for (let tid of exprsObject[x]) {
		if (occObj?.[tid]) {
			occObj[tid] += 1;
		} else {
			occObj[tid] = 1;
		}
	}
}


const countOcc = Object.values(occObj).reduce((a, b) => a + b, 0); 
console.log("count occ", countOcc);


let sortedOcc = Object.entries(occObj).sort((a, b) => b[1] - a[1]);
let globalPercent = 0;

let top = 0;

for (let x of sortedOcc) {
	const per = Math.round((x[1]/countOcc + Number.EPSILON) * 100);
	const qty = x[1];
	globalPercent +=per;
	if (per > 0	) {
		top += qty;
		console.log(`${tokensObject[x[0]].padStart(15)} ${String(qty).padStart(10)} \t ${per}%`);
		 // console.log(tokensObject[x[0]]);
		 // console.log(qty);
	}
	
}

console.log("top", top, Math.round((top/countOcc + Number.EPSILON) * 10000));

await pool.end();
