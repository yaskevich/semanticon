'use strict';

import pg from 'pg';
const { Pool } = pg;
const pool = new Pool();

export default {
    async getDataFromDB() {
        // select * from tokens where id in (4,1,6,2,3);	
        let res = await pool.query('select units.id, units.pid from units left join phrases on units.pid=phrases.pid limit 5');
        const data = res.rows;
        // console.log(JSON.stringify(data));
        res = await pool.query("select * from tokens");
        const dict = res.rows.reduce((obj, item) => (obj[item.id.toString()] = item.token, obj), {});
        res = await pool.query("select pid, phrase->0 as phrase from phrases");
        const phrases = res.rows;
        const index = res.rows.reduce((obj, item) => (obj[item.pid.toString()] = item.phrase, obj), {});
        // console.log(index);
        // .join(" ").replace(/ (?=-)/, '')
        const phraseMap = phrases.map(x => ({
            "pid": x["pid"],
            "phrase": x["phrase"].map(y => dict[y]).join(" ").replace(/ (?=-)/, '')
        }));

        // pool.end();
        return phraseMap;
    },
	async getPhrases(){
		const res = await pool.query('select * from phrases');
        return res.rows;
	}, 
	async getTranslations(){
		const res = await pool.query('select * from translations');
        return res.rows.reduce((obj, item) => (obj[item.id.toString()] = item, obj), {});
	}, 
	async getMedia(){
		const res = await pool.query(' select * from media');
        return res.rows.reduce((obj, item) => (obj[item.id.toString()] = item.filename+item.fileext, obj), {});
	}, 
	async getIndex(){
		const res = await pool.query('select units.id, units.pid, phrase->0 as eid1 from units inner join phrases on units.pid=phrases.pid');
		const data = {};
		  for (let i=0; i<res.rows.length; i++){
			  const it = res.rows[i];  
			  const eid = it.eid1.toString();
			  const pid = it.pid.toString();
			  const id  = it.id.toString();
			  
			  if (Reflect.getOwnPropertyDescriptor(data, eid)) {
				if (Reflect.getOwnPropertyDescriptor(data[eid], pid)) {
					data[eid][pid].push(id);
				} else {
					data[eid][pid] = [id];
				}
			  } else {
				  data[eid] = {[pid]: [id]};
			  }
		  }
		  return data;
	}, 
	async getTitles(){
		const res = await pool.query('select phrase->0 as eid1, phrase from units inner join phrases on units.pid=phrases.pid;');
		const eid1 = [], eids = [];
		
		for (let i=0; i<res.rows.length; i++){
			const item = res.rows[i];
			for (let ii=0; ii<item["phrase"].length; ii++){
				eids.push(item.phrase[ii]);
				eid1.push(item["eid1"]);
			}
		}		
        return {"eid1": eid1, "exprs": eids};
	},
	async getFeatures(){
		const res = await pool.query('select id, ru, groupid as class FROM features');
        return Object.fromEntries(res.rows.map(item => [item.id, [item.ru, item.class]]));
	}, 
	async getUnits1(id){
		// const units = await pool.query('select * FROM units where pid=$1', [pid]);
		// const phrases = await pool.query('select * FROM phrases where pid=$1', [pid]);
        // return { "units": units.rows, "phrase": phrases.rows[0]["phrase"]};
		const res = await pool.query('select units.*, phrase, phrase->0 as eid1 from units inner join phrases on units.pid=phrases.pid where phrase->0=$1', [id]);
		const data = res.rows; // remove empty features?
		data.map(x => Object.keys(x).forEach((key) => (x[key] == null || Array.isArray(x[key]) && !x[key].length) && delete x[key]));
		
		// const results  = data.reduce(function(results, data) {
			// (results[data.pid] = results[data.pid] || []).push(data);
			// return results;
		// }, {});
		
		// return results;
		return Object.fromEntries(data.map(item => [item.id, item]));
	},

	async getUnits(){
		// const units = await pool.query('select * FROM units where pid=$1', [pid]);
		// const phrases = await pool.query('select * FROM phrases where pid=$1', [pid]);
        // return { "units": units.rows, "phrase": phrases.rows[0]["phrase"]};
		const res = await pool.query('select units.*, phrase, phrase->0 as eid1 from units inner join phrases on units.pid=phrases.pid', []);
		 // remove empty features?
		let data = res.rows;
		
		
		data = data.map(x => (Object.keys(x).forEach((key) => (x[key] == null || (Array.isArray(x[key])|| typeof x[key] === 'string') && !x[key].length) && delete x[key]), x));
		
		// console.log(data);
		
		// const results  = data.reduce(function(results, data) {
			// (results[data.pid] = results[data.pid] || []).push(data);
			// return results;
		// }, {});
		
		// return results;
		return Object.fromEntries(data.map(item => [item.id, item]));
		// return data;
	},
	async getExprs(){
		const res = await pool.query('select * from exprs');
		const data = res.rows;
        // return data;
		
		
		const dict = data.reduce((obj, item) => (obj[item.eid.toString()] = item.expr, obj), {});
		return dict;
		
		// const dict = {"keys":[],"values":[]};
		// for (let i=0; i<data.length; i++){
			// dict.keys.push(data[i].eid);
			// dict.values.push(data[i].expr);
		// }
		// return dict;
	},
	async getTokens() {		
		const res = await pool.query("select * from tokens");
		
		const data = res.rows;
		const dict = {"keys":[],"values":[]};
		for (let i=0; i<data.length; i++){
			dict.keys.push(data[i].id);
			dict.values.push(data[i].token);
		}
		// console.log(dict);
		return dict;
	}
};