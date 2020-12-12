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

        // for (let i = 0; i < phrases.length; i++) {
            // const entry = phrases[i];
            // console.log(entry["id"]);
            // const phrase = index[entry["pid"]];
            // for (let x=0; x<phrase.length; x++){
            // console.log("!", phrase[x]);

            // }
            // console.log("!",entry);
            // const phraseMap  = phrase.map(x => dict[x]).join(" ").replace(/ (?=-)/, '');
            // console.log(entry["pid"], phraseMap);
        // }

        // pool.end();
        return phraseMap;
    },
	async getUnits (pid){
		const res = await pool.query('select * FROM units where pid=$1', [pid]);
        return res.rows;
	}
};