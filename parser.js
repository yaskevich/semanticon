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

const mapping = {
  'ДФ': "phrase",
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
const dict = fieldRow.map(x => mapping[x]);
// console.log(dict);

const dump = {};


csvArr.forEach(function(item, i, arr) {
  // alert( i + ": " + item + " (массив:" + arr + ")" );
  // console.log(item[0]);
  // console.log("=============================");
  item.forEach(function(item2, i2, arr2) {
	const field = dict[i2];
	// console.log(`${field}■${item2}`);
	if(item2) {
		dump.hasOwnProperty(field)? dump[field].push(item2): dump[field] = [item2];		
	}
});



});

console.log(dump);

	
})();
