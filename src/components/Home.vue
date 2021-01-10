<template>
	<div class="p-grid p-jc-center">
	<div class="p-component">
		<div class="p-inputgroup autocomplete-container p-col">
			<AutoComplete v-model="token"
				:suggestions="searchVariants"
				ref="searchInstance"
				:minLength="Number(2)"
				placeholder="Впишите слово"
				field="txt"
				scrollHeight="200"
				@keyup.enter="renderMatches($event)"
				@complete="autocomplete($event)"
				@item-select="renderSelected($event)">
					<template #item="slotProps">
						<span v-if="slotProps.item.hasOwnProperty('lang')">
							<!-- <img :alt="slotProps.item.lang" :src="'demo/images/car/' + slotProps.value.brand + '.png'" /> -->
							<img :alt="$primevue.config.locale.lang[slotProps.item.lang]" :src="'/api/media/flags/'+slotProps.item.lang+ '.svg'" class="mini-flag"/>
						</span>
						<span>{{slotProps.item.txt}}</span>
					</template>
			</AutoComplete>
			<Button icon="pi pi-search" class="enter" @click="renderMatches()"/>
		</div>
		<div class="p-grid p-jc-center p-col">
			<SelectButton v-model="switchState" :options="switchStateOptions"  class="switcher" optionLabel="name" optionValue="code"  @click="handleSwitchState($event)"/>
		</div>

		<SearchResults v-for="(value, key) in matches" :datum="value" :num="Number(key)" :data="data" :key="key"/>
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
		let searchInstance = ref();


		const handleSwitchState = () => {
			token.value= '';
			matches.value = [];
		};

		const renderMatches = () => {
			searchInstance.value.hideOverlay();
			if (typeof token.value === 'object'){
				console.log("object", token.value);
			} else {
				console.log("getMatches: result", getMatches(token.value));
			}
		};

		const renderSelected = (e) => {
			const eid = e.value.eid;
			const results = [];
			if (switchState.value === 'ru') {
				const titlesIndexes = data.titles.exprs.flatMap((x, i) => x == eid ? i : []);
				const titles = titlesIndexes.map(x=>data.titles.eid1[x]);
				const variant = {
					"eid1": titles[0],
					"eid": eid,
					"main" : !data.exprs[titles[0]].includes(eid)? "eid" : "eid1"
				};
				if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
						results.push(variant);
				}
			} else {
				// console.log(e.value);
				for (let unit of Object.values(data.units)) {
					const pd  = Reflect.getOwnPropertyDescriptor(unit, "translations");
					// console.log("pd", JSON.stringify(pd));
					if (pd && pd.value.includes(e.value.id)){
						console.log(unit.eid1);
						results.push({
							"eid1": unit.eid1,
							"main" : 'eid1',
							"txt": e.value.txt
						});
					}
				}
			}
			matches.value = results;
			console.log("results", results);
      // router.push("/results")
		};

		const getMatches = (queryString) => {
			console.log("input", queryString);
			const results = [];
			if (token.value) {
				if (switchState.value === 'ru') {
					const queryChunks = queryString
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
										results.push({ "arr": phrase, "eid": key, "txt": phrase.join(' ').replace(' -', '-') });
										// if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
										// 		results.push(variant);
										// 	}
									}
								}
						}
					}
					console.log("results qty", results.length);
				} else {
					const query = queryString.replace(/[.*+?^${}()|[\]\\]/g, '');
					// console.log("in trans", query);
					token.value = query;
					for (let value of Object.values(data.trans)) {
						if (value.txt.includes(query)) {
							results.push(value);
						}
					}
				}
			}
			return results;
		};

		const autocomplete = (e) => {
			searchVariants.value = getMatches(e.query);
		};

		return { autocomplete, renderSelected, data, searchVariants, token, matches, 	switchState, switchStateOptions, handleSwitchState, renderMatches, searchInstance };
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
.autocomplete-container {
	margin-top:2rem;
  text-align: center;
}
.p-autocomplete-item{
	text-align: left;
	color: red;
}
.switcher{
	line-height: .3rem;
}
.mini-flag{
	height: 1rem;
	border: 1px solid gray;
	margin-right: .3rem;
}
.p-autocomplete {
	text-align:left;
}
</style>
