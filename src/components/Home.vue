<template>
	<!-- <div class="p-component p-mt-4">
		<div class="p-col p-text-center">
		<div>База данных дискурсивных формул русского языка</div>
		<div>[Для студентов и преподавателей РКИ]</div>
		</div>
	</div> -->
	<div class="p-grid p-jc-center p-mt-2">
		<div class="p-component">
			<div class="p-inputgroup p-text-center p-col">
				<AutoComplete v-model="autoState['text']"
					:suggestions="searchVariants"
					ref="searchInstance"
					:minLength="Number(2)"
					:placeholder="placeholder[autoState['mode']]"
					field="txt"
					scrollHeight="300px"
					@keyup.enter="renderMatches($event)"
					@complete="autocomplete($event)"
					@item-select="renderSelected[autoState['mode']]($event)">
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
				<span class="p-pr-3 label-switch">поиск по переводному аналогу</span>
				<!-- <InputSwitch v-model="checked" @click="handleSwitchState($event)" /> -->
				<Checkbox v-model="autoState['checked']" @click="handleSwitchState($event)" :binary="true" />
			</div>
			<!-- <div class="p-grid p-jc-center p-col">
				<SelectButton v-model="autoState['mode']" :options="switchStateOptions"  class="switcher" optionLabel="name" optionValue="code"  @click="handleSwitchState($event)"/>
			</div> -->
		</div>
	</div>
	<div class="p-component">
		<SearchResults v-for="(value, key) in autoState['matches']" :datum="value" :num="Number(key)" :data="data" :key="key"/>
	</div>
	<div class="p-component back-1 p-p-4 info">
		<div class="explain-header">Что такое дискурсивные формулы?</div>
		<div class="p-ml-4">Короткие устойчивые ответы, которые мы используем в разговорной речи.
			<div>Например — <span class="cite">Не говори!</span> <span class="cite">Как скажешь!</span> или <span class="cite">Да ладно!</span></div>
			<div>В основном формулы выражают положительные или отрицательные реакции на слова собеседника. Можно сказать, что в большинстве они — синонимы Да и Нет, но с дополнительными оттенками значения.</div>
		</div>
	</div>
	<div class="p-component p-p-4 info">
		<div class="p-text-center">
			<img src="/api/media/logo_pragmaticon.png" style="max-height:10rem;"/>
		</div>
	</div>
	<div class="p-component back-2 p-p-4 info">
		<div class="explain-header">В чем задача Прагматикона?</div>
		<div class="p-ml-4">
			<div>Формулы редко попадают в словари, а угадать их значение бывает непросто.</div>
			<div>Мы собрали список дискурсивных формул для русского языка и разработали  формат описания, который помогает узнать не только что значит каждая  формула, но и как и когда её употреблять.</div>
		</div>
	</div>
	<div class="p-component p-p-4 info p-text-center">
			<img src="/api/media/logo_constructicon.png" style="max-height:10rem;"/>
	</div>
	<div class="p-component back-3 p-p-4 info">
		<div class="explain-header">Как строится описание?</div>
		<div class="p-ml-4">
			<div>Наша база данных — результат исследовательского проекта Школы Лингвистики НИУ ВШЭ <a href="https://ling.hse.ru/" target="_blank"><i class='pi pi-external-link'></i></a>. Содержательно она является частью Russian Constructicon <a href="https://spraakbanken.gu.se/karp/#?mode=konstruktikon-rus&lang=eng" target="_blank"><i class='pi pi-external-link'></i></a>.</div>
			<div>Мы используем теоретические рамки Грамматики конструкций и Московской семантической школы и анализируем употребление формул, используя корпусные данные, прежде всего — Национальный корпус русского языка (НКРЯ) <a href="https://ruscorpora.ru/" target="_blank"><i class='pi pi-external-link'></i></a>.</div>
		</div>
	</div>
	<div class="p-component p-p-4 info p-text-center">
			<img src="/api/media/logo_hse.png" style="max-height:10rem;"/>
	</div>
</template>

<script>
import store from "@/modules/store";
import InputSwitch from 'primevue/inputswitch';
import SearchResults from "./SearchResults.vue";
import Checkbox from 'primevue/checkbox';
import { ref } from "vue";
export default {
	name: "Search",
	setup(){
		const data = store.state.config;
		let searchInstance = ref();
		let searchVariants = ref(null);

		const placeholder = {'ru': 'да ладно', 'none': 'whatever'};
		const autoState = store.state.autocomplete;

		const handleSwitchState = () => {
			autoState["mode"] = autoState['checked'] ? 'ru': 'none';
			autoState["text"]= '';
			autoState["matches"] = [];
		};

		const getBasicExpr = (eid) => {
			console.log("in eid", eid);
			const titlesIndexes = data.titles.exprs.flatMap((x, i) => x == eid ? i : []);
			console.log("TI", titlesIndexes);

			if (titlesIndexes.length){
				const titles = titlesIndexes.map(x=>data.titles.eid1[x]);
				console.log("tt", titles);
				return {
					"eid1": titles[0],
					"eid": eid,
					"main" : !data.exprs[titles[0]].includes(eid)? "eid" : "eid1"
				};
			}
		};

		const getVariants = {
			"ru": (objs) => {
				console.log("objs", objs);
			const eids  = objs.map(x => x.eid);
			const results = [];
			for (let eid of eids) {
				const variant  = getBasicExpr(eid);
				// const tt = data.phrases.filter(x => x.phrase.includes(Number(eid))).map(x => x.phrase[0]);
				const reducer = (b, x) => { x.phrase.includes(Number(eid))?b.push(x.pid):null; return b;  }
				const tt = data.phrases.reduce(reducer, []);
				console.log("filtered", eid, tt, variant);

				if (variant && !results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
						results.push(variant);
				}
			}
			return results;
		},
		"none": (objs) =>  {
				const ids  = objs.map(x => x.id)
				const results  = [];
				for (let unit of Object.values(data.units)) {
					const pd  = Reflect.getOwnPropertyDescriptor(unit, "translations");
					if (pd) {
						for (let id of ids) {
							if(pd.value.includes(id)) {
								const variant  = { "eid1": unit.eid1, "main" : 'eid1' };
								if (!results.some( x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
										results.push(variant);
								}
							}
						}
					}
				}
				return results;
			}
		};

		const renderMatches = () => {
			searchInstance.value.hideOverlay();
			if (typeof autoState["text"] === 'object'){
				console.log("do nothing: object", autoState["text"]);
			} else {
				const tokenMatches  = getMatches(autoState["text"]);
				// console.log("getMatches: result", tokenMatches);
				const variants  = getVariants[autoState["mode"]](tokenMatches);
				// console.log("variants", variants);
				autoState["matches"] = variants;
			}
		};

		const getUnitByTrans = (id) => {
			const results  = [];
			for (let unit of Object.values(data.units)) {
				const pd  = Reflect.getOwnPropertyDescriptor(unit, "translations");
				if (pd && pd.value.includes(id)){
					results.push({
						"eid1": unit.eid1,
						"main" : 'eid1'
					});
				}
			}
			return results;
		};

		const renderSelected = {
			//  get clicked autocomplete item and render it in search resuts block
			"ru": (e) => {
				autoState["matches"] = [getBasicExpr(e.value.eid)];
		}, "none": (e) => {
				autoState["matches"] = getUnitByTrans(e.value.id);
		}};

		const processInput = {
			"ru": (str) => {
				const results = [];
				const queryChunks = str
					.split(/\s|(?=-)/g)
					.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, ''));

				autoState["text"] = queryChunks.join(' ').replace(' -', '-');
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
				return results;
			},
			"none": (str) => {
				const results = [];
				const query = str.replace(/[.*+?^${}()|[\]\\]/g, '');
				autoState["text"] = query;
				for (let value of Object.values(data.trans)) {
					if (value.txt.includes(query)) {
						results.push(value);
					}
				}
				return results;
			}
		};

		const getMatches = (queryString) => {
			console.log("input", queryString);
			return autoState["text"] ? processInput[autoState["mode"]](queryString) : [];
		};

		const autocomplete = (e) => {
			searchVariants.value = getMatches(e.query);
		};

		return { placeholder, autocomplete, renderSelected, data, searchVariants, autoState, handleSwitchState, renderMatches, searchInstance, InputSwitch,  };
	},
	components: {
		SearchResults,
		Checkbox
	}
}
</script>

<style scoped>
.match{
	font-weight: bold;
}
.switcher{
	line-height: 0.3rem;
}
.mini-flag{
	height: 1rem;
	border: 1px solid gray;
	margin-right: .3rem;
}
.label-switch {
	font-size: 0.75rem;
}
</style>
