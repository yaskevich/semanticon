<template>
  <div class="p-component">
		<div class="div-container" style="margin-top:2rem;">
		<AutoComplete v-model="token"
			:suggestions="searchVariants"
			:minLength="Number(2)"
			placeholder="Впишите слово"
			field="name"
			scrollHeight="200"
			@complete="autocomplete($event)"
			@item-select="renderSelected($event)">
				<template #item="slotProps">
						<span>{{slotProps.item.name}}</span>
							<!-- <span v-for="(v, i) in slotProps.item.arr" :key="i">
								<span v-if="v === token" class="match">{{v}}</span>
								<span v-else>{{v}}</span>
							</span> -->
				</template>
		</AutoComplete>
		<SelectButton v-model="switchState" :options="switchStateOptions"  class="switcher" optionLabel="name" optionValue="code"/>

		<div v-for="(value, key) in matches" :key="key">
			<SearchResults :datum="value" :num="Number(key)" :data="data"/>
		</div>
	</div>
</div>
</template>

<script>
import store from "@/modules/store";
import SearchResults from "./SearchResults.vue";
// import router from "../router"
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
export default {
	name: "Search",
	setup(){
		const data = store.state.config;
		const switchStateOptions = [{"name": 'Русский', "code": 'ru'}, {"name":'Перевод', "code": "none"}];
		let searchVariants = ref(null);
		let token =  ref(null);
		let matches = ref({});
		let switchState = ref('ru');

		const renderSelected = (e) => {
			const indx = e.value.key;
			const results = [];

			for (let key of Object.keys(data.exprs)) {
				if (indx === key){
					const titlesIndexes = data.titles.exprs.flatMap((x, i) => x == key ? i : []);
					const titles = titlesIndexes.map(x=>data.titles.eid1[x]);
					// console.log("index", titles, "for", key, value);
					// console.log(data.exprs[titles[0]], id);
					const variant = {
						"eid1": titles[0],
						"eid": key,
						"main" : !data.exprs[titles[0]].includes(key)? "eid" : "eid1"
					};
					if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
							results.push(variant);
						}
				}
			}
			matches.value = results;
      // router.push("/results")
		};
		const autocomplete = (e) => {
			console.log("mode", switchState.value);
			const results = [];
			const queryChunks = e.query
				.split(/\s|(?=-)/g)
				.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, ''));

			token.value = queryChunks.join(' ').replace(' -', '-');
			const queries = queryChunks.filter(x => x);
			const phraseVariants = new Array(queries.length).fill(null).map(()=>[]);

			const queriesLength = queries.length;
			const last = queriesLength-1;

			for(let i=0; i<data.tokens.values.length; i++){
				for(let ii=0; ii<queriesLength; ii++){
					if (ii === last ? data.tokens.values[i].startsWith(queries[ii]) : data.tokens.values[i] === queries[ii]){
							phraseVariants[ii].push(data.tokens.keys[i]);
					}
				}
			}

			const phraseVariantsLength = phraseVariants.length;
			if (phraseVariantsLength){
				const phraseVariantsLast = phraseVariantsLength-1;
				const [head] = phraseVariants.slice(0, phraseVariantsLast);
				for (let [key, value] of Object.entries(data.exprs)) {
						let needToLookHead = false;
						// if there are more than 1 token in query
						// must check all that before last
						// whether all they are in value
						if (phraseVariantsLast){
							if (head.every(v => value.includes(v))) {
								needToLookHead = true;
							}
						} else {
							needToLookHead = true;
						}
						if (needToLookHead) {
							if(phraseVariants[phraseVariantsLast].some(v => value.includes(v))) {
								const phrase = value.map(x => data.tokens.values[data.tokens.keys.findIndex(y=>y==x)]);
								// const re = new RegExp(`(?=${str})|(?<=${str})`, 'gi');
								// const res  = queries.map(x => new RegExp(`(?=${x})|(?<=${x})`, 'gi'))
								results.push({ "txt": phrase, "key": key, "name": phrase.join(' ').replace(' -', '-') });
								// if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
								// 		results.push(variant);
								// 	}
							}
						}
				}
			}
			console.log("results", results.length);
			searchVariants.value = results;
		};

		return { autocomplete, renderSelected, data, searchVariants, token, matches, 	switchState, switchStateOptions };
	},
	components: {
		SearchResults
	}
}
</script>

<style scoped>
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
