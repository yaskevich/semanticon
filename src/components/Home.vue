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
		<div v-for="(value, key) in wow" :key="key">
			<!-- {{key}} -->
		<SearchResults :result="value" :num="key"/>

	</div>
	</div>
</div>
</template>

<script>
import store from "@/modules/store";
import SearchResults from "./SearchResults.vue";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
export default {
	name: "Search",
	setup(){
		const datum = store.state.config;
		let searchVariants = ref(null);
		let token =  ref(null);
		let wow = ref({});

		const getSelection = (e) => {
			// console.log(e.value.indx, datum.tokens.keys[e.value.indx]);
			const indx = e.value.indx;
			const id = datum.tokens.keys[indx];
			// console.log("index", indx);
			// console.log("id", id);
			const ph = datum.phrases;
			console.log(JSON.stringify(ph));
			const matches = {};
			for(let i=0; i<ph.length; i++){
				const pArr = ph[i].phrase;
				// console.log(ph[i].pid);
				for(let ii=0; ii<pArr.length; ii++){
					// console.log(JSON.stringify(pArr[ii]));
					if (pArr[ii].includes(id)){
							console.log(ph[i].pid, id, "in", pArr[ii]);
							matches[ph[i].pid] = pArr[ii];
							break;
					}
				}
			}
			console.log(matches);
			// console.log("=============================");
			// for (let m in matches) {
			// 		const expr = matches[m].map(x => datum.tokens.values[datum.tokens.keys.indexOf(x)]);
			// 		console.log("pid", m, matches[m], expr);
			// }
			wow.value = matches;
		};
		const search = (e) => {
				console.log("query", e.query);
				const str = e.query.trim();
				token.value = str;

				const re = new RegExp(`(?=${str})|(?<=${str})`, 'gi');
				const result = datum.tokens.values.filter(x => x.includes(str));
				// console.log(result);
				const filtered  =  result.map(x=> ({"name": x, "indx": datum.tokens.values.indexOf(x), "arr": x.split(re)}));
				// console.log(filtered);
				searchVariants.value = filtered;
		};

		return { getSelection, search, datum, searchVariants, token, wow };
	},
	components: {
		SearchResults
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
</style>
