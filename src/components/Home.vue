<template>
  <div class="p-component">
		<div class="div-container" style="margin-top:2rem;">
      <!-- <h3>Поиск</h3> -->
  <AutoComplete v-model="token"
		:suggestions="searchVariants"
		:minLength="Number(2)"
		placeholder="Впишите слово"
		field="name"
		scrollHeight="200"
		@complete="search($event)"
		@item-select="getSelection($event)">
			<template #item="slotProps">
						<span v-for="(v, i) in slotProps.item.arr" :key="i">
							<span v-if="v === token" class="match">{{v}}</span>
							<span v-else>{{v}}</span>
						</span>
			</template>
	</AutoComplete>
	<SelectButton v-model="value1" :options="options"  class="switcher"/>

		<div v-for="(value, key) in matches" :key="key">
		<SearchResults :datum="value" :num="Number(key)" :data="data"/>
	</div>
	</div>
</div>
</template>

<script>
import store from "@/modules/store";
import SearchResults from "./SearchResults.vue";
import SelectButton from 'primevue/selectbutton';
// import router from "../router"
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
export default {
	name: "Search",
	setup(){
		const data = store.state.config;
		let searchVariants = ref(null);

		let token =  ref(null);
		let matches = ref({});

		const getSelection = (e) => {
			// console.log(e.value.indx, data.tokens.keys[e.value.indx]);
			const indx = e.value.indx;
			const id = data.tokens.keys[indx];
			const exprs = data.exprs;
			const results = [];

			for (let [key, value] of Object.entries(exprs)) {
				if (value.includes(id)){
					const titlesIndexes = data.titles.exprs.flatMap((x, i) => x == key ? i : []);
					const titles = titlesIndexes.map(x=>data.titles.eid1[x]);
					// console.log("index", titles, "for", key, value);
					// console.log(data.exprs[titles[0]], id);
					const variant = {
						"eid1": titles[0],
						"eid": key,
						"main" : !data.exprs[titles[0]].includes(id)? "eid" : "eid1"
					};
					if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
							results.push(variant);
						}
				}
			}
			// console.log("results", JSON.stringify(results));
			// console.log("=>", JSON.stringify(results));
			matches.value = results;
      // router.push("/results")
		};
		const search = (e) => {
			console.log("query", `|${e.query}|`);
			const queries = e.query
				.split(' ') // что-то!
				.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, ''))
				.filter(x => x);

			console.log("split", "|"+queries+"|");
			// const str = e.query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const str = e.query.replace(/[.*+?^${}()|[\]\\]/g, '');
			token.value = queries.join(' ');

			const re = new RegExp(`(?=${str})|(?<=${str})`, 'gi');
			// queries.some(sub => x.includes(sub))
			// const result = data.tokens.values.filter(x => queries.some(sub => x.includes(sub)));
			const result = data.tokens.values.filter(x => x.includes(str));

			const phraseVariants = new Array(queries.length).fill(null).map(()=>[]);
			// const res  = queries.map(x => new RegExp(`(?=${x})|(?<=${x})`, 'gi'))
			const queriesLength = queries.length;
			const last = queriesLength-1;

			for(let i=0; i<data.tokens.values.length; i++){
				for(let ii=0; ii<queriesLength; ii++){
					// console.log(queries[ii], last === i, last, i);
					if (ii === last ? data.tokens.values[i].includes(queries[ii]) : data.tokens.values[i] === queries[ii]){
							// console.log(i, data.tokens.values[i], ii, queries[ii]);
							// const tkn  = data.tokens.values[i];
							phraseVariants[ii].push(
								// {
								// 	"name": tkn,
								// 	"indx": i,
								// 	"id": data.tokens.keys[i],
								// 	"arr": tkn.split(res[ii])
								// }
								data.tokens.keys[i]
							);
					}
				}
				// data.tokens.values[i]
			}
			// console.log(result);
			console.log("phraseVariants", phraseVariants);
			// console.log(e.value.indx, data.tokens.keys[e.value.indx]);
			// const indx = e.value.indx;
			// const id = data.tokens.keys[indx];
			const exprs = data.exprs;
			const results = [];
			let checker = (inWhat, What) => What.every(v => inWhat.includes(v));
			const phraseVariantsLast = phraseVariants.length-1;
			if (phraseVariants.length){
				for (let [key, value] of Object.entries(exprs)) {
						// console.log(key, value);
						// console.log(phraseVariants[phraseVariantsLast], value);
						let ok = false;
						// if there are more than 1 token in query
						// must check all that before last
						// whether all they are in value
						if (phraseVariantsLast){
							if (checker(value,phraseVariants.slice(0, phraseVariantsLast))) {
								ok = true;
								console.log("yep", key);
							}
						} else {
							ok = true;
						}
						if (ok) {
							if(phraseVariants[phraseVariantsLast].some(v => value.includes(v))) {
								console.log("kek", key);
							}
						}

					// if (value.includes(id)){
					// 	const titlesIndexes = data.titles.exprs.flatMap((x, i) => x == key ? i : []);
					// 	const titles = titlesIndexes.map(x=>data.titles.eid1[x]);
						// const variant = {
						// 	"eid1": titles[0],
						// 	"eid": key,
						// 	"main" : !data.exprs[titles[0]].includes(id)? "eid" : "eid1"
						// };
						// if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
						// 		results.push(variant);
						// 	}
					// }
				}
			}
			console.log("results", results);





			// const ph = data.phrases;
			// // console.log(JSON.stringify(ph));
			// const results = {};
			// for(let i=0; i<ph.length; i++){
			// 	const pArr = ph[i].phrase;
			// 	// console.log(ph[i].pid);
			// 	for(let ii=0; ii<pArr.length; ii++){ // every expression for a phrase
			// 		// console.log(JSON.stringify(pArr[ii]));
			// 		// target.every(v => arr.includes(v))
			// 		let ll = 0;
			// 		for (let iii=0; iii<phraseVariants.length; iii++){
			// 			let rr = pArr[ii].filter(x => phraseVariants[iii].some(y => x === y));
			// 			if (rr.length) {
			// 				ll++;
			// 			}
			// 		}
			// 		if(ll === phraseVariants.length) {
			// 			results[ph[i].pid] = pArr[ii];
			// 			break;
			// 		}
			//
			// 	}
			// }
			// console.log("results", results);
			// console.log(JSON.stringify(results));
			// let text  = '';
			// for (let a in results){
			// 	text += results[a].map(x=> data.tokens.values[data.tokens.keys.indexOf(x)]).join(' ') + "\n";
			// }
			// console.log(text);

			//

			const filtered  =  result.map(x=> ({"name": x, "indx": data.tokens.values.indexOf(x), "arr": x.split(re)}));
			console.log(JSON.stringify(filtered));
			searchVariants.value = filtered;
		};

		return { getSelection, search, data, searchVariants, token, matches, checked:false, value1: 'Русский', options: ['Русский', 'Перевод'], };
	},
	components: {
		SearchResults, SelectButton
	}
}
</script>

<style>
.match{
	font-weight: bold;
}
.div-container {
  text-align: center;
}
.p-autocomplete-item{
	text-align: left;
	color: red;
}
.switcher{
	line-height: .2rem;
	margin-top: .4rem;
}
</style>
