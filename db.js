require('dotenv').config()

const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool()
pool.query("select units.id, units.pid from units left join phrases on units.pid=phrases.pid limit 5", (err, res) => {
	if (!err){
		const data  = res.rows;
		console.log(JSON.stringify(data));
		
		pool.query("select * from tokens", (err, res) => {
			if (!err){
				const dict = res.rows.reduce((obj, item) => (obj[item.id.toString()] = item.token, obj) ,{});
				// console.log(dict);
				pool.query("select pid, phrase->0 as phrase from phrases", (err, res) => {
				if (!err){
						// console.log(res.rows);
						const phrases = res.rows;
						const index = res.rows.reduce((obj, item) => (obj[item.pid.toString()] = item.phrase, obj) ,{});
						// console.log(index);
						// .join(" ").replace(/ (?=-)/, '')
				const kek  = phrases.map(x => ({ "pid": x["pid"], "phrase": x["phrase"].map(y=> dict[y]).join(" ").replace(/ (?=-)/, '')}));
							console.log(kek);
						for(let i=0; i<phrases .length; i++){
							// const entry = phrases[i];
							// console.log(entry["id"]);
							// const phrase = index[entry["pid"]];
							// for (let x=0; x<phrase.length; x++){
								// console.log("!", phrase[x]);
								
							// }
							// console.log("!",entry);
							// const kek  = phrase.map(x => dict[x]).join(" ").replace(/ (?=-)/, '');
							// console.log(entry["pid"], kek);
						}
					}
				  pool.end()
				})
			}
		  // pool.end()
		})
	}
  // pool.end()
})

// select * from tokens where id in (4,1,6,2,3);
// you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()
// // clients will also use environment variables
// // for connection information
// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT NOW()')
// await client.end()