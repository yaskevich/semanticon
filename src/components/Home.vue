<template>
  <div class="grid justify-content-center mt-2 mb-3">
    <div class="p-component">
      <div class="p-inputgroup text-center col">
        <AutoComplete v-model="autoState['text']" :suggestions="searchVariants" ref="searchInstance"
          :minLength="Number(2)" :placeholder="placeholder[autoState['mode']]" field="txt" scrollHeight="300px"
          @clear="clearInput()" @keyup.enter="renderMatches($event)" @complete="autocomplete($event)"
          @item-select="renderSelected[autoState['mode']]($event)">
          <template #option="slotProps">
            <div class="flex align-options-center">
              <span v-if="slotProps.option.hasOwnProperty('lang')">
                <img :alt="$primevue.config.locale.lang[slotProps.option.lang]" :src="flags[slotProps.option.lang]"
                  class="mini-flag" />
              </span>
              <span>{{ slotProps.option.txt }}</span>
            </div>
          </template>
        </AutoComplete>
        <PrimeButton icon="pi pi-search" class="enter" @click="renderMatches()" />
        <PrimeButton :disabled="!autoState?.['text']" icon="pi pi-trash" class="enter" @click="clearInput()"
          severity="secondary" />
      </div>

      <div class="grid justify-content-center col" v-if="store.state.config.settings.mode === 'f'">
        <span class="pr-3 label-switch">{{ $primevue.config.locale.searchsim }}</span>
        <!-- <InputSwitch v-model="checked" @click="handleSwitchState($event)" /> -->
        <Checkbox v-model="autoState['checked']" @click="handleSwitchState($event)" :binary="true" />
      </div>
      <!-- <div class="grid justify-content-center col">
        <SelectButton v-model="autoState['mode']" :options="switchStateOptions" class="switcher" optionLabel="name"
          optionValue="code" @click="handleSwitchState($event)" />
      </div> -->
    </div>
  </div>
  <div class="p-component">
    <SearchResults v-for="(value, key) in autoState['matches']" :datum="value" :num="Number(key)" :data="data"
      :key="key" />
  </div>
  <Intro />
</template>

<script setup>
import { ref } from 'vue';
import Checkbox from 'primevue/checkbox';
// import InputSwitch from 'primevue/inputswitch';
import store from '../store';
import SearchResults from './SearchResults.vue';
import Intro from './Intro.vue';

import eng from '../assets/flags/eng.svg';
import bua from '../assets/flags/bua.svg';
import fin from '../assets/flags/fin.svg';
import heb from '../assets/flags/heb.svg';
import ita from '../assets/flags/ita.svg';
import rus from '../assets/flags/rus.svg';
import slv from '../assets/flags/slv.svg';
import tgk from '../assets/flags/tgk.svg';


const flags = { eng, bua, fin, heb, ita, rus, slv, tgk };
const data = store.state.config;
let searchInstance = ref();
let searchVariants = ref(null);

const getRandomExpIndex = () => String(Math.floor(Math.random() * (Object.keys(store.state.config.exprs).length - 1)) || 0);

const randomExpression = store.state.config.exprs[getRandomExpIndex()].map(x =>
  store.state.config.tokens.values[store.state.config.tokens.keys.indexOf(x)]).join(' ');

// const placeholder = { native: 'да ладно', trans: 'whatever' };
const placeholder = { native: randomExpression, trans: 'whatever' };
const autoState = store.state.autocomplete;

const handleSwitchState = () => {
  autoState['mode'] = autoState['checked'] ? 'native' : 'trans';
  autoState['text'] = '';
  autoState['matches'] = [];
};

const getBasicExpr = eid => {
  // console.log("in eid", eid);
  const titlesIndexes = data.titles.exprs.flatMap((x, i) => (x == eid ? i : []));
  // console.log("TI", titlesIndexes);

  if (titlesIndexes.length) {
    const titles = titlesIndexes.map(x => data.titles.eid1[x]);
    // console.log("tt", titles);
    return {
      eid1: titles[0],
      eid: eid,
      main: !data.exprs[titles[0]].includes(eid) ? 'eid' : 'eid1',
    };
  }
};

const getVariants = {
  native: objs => {
    // console.log('objs', objs);
    const eids = objs.map(x => x.eid);
    const results = [];
    for (let eid of eids) {
      const variant = getBasicExpr(eid);
      // const tt = data.phrases.filter(x => x.phrase.includes(Number(eid))).map(x => x.phrase[0]);
      // const reducer = (b, x) => { x.phrase.includes(Number(eid))?b.push(x.pid):null; return b;  }
      // const tt = data.phrases.reduce(reducer, []);
      // console.log("filtered", eid, tt, variant);

      if (variant && !results.some(x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
        results.push(variant);
      }
    }
    return results;
  },
  trans: objs => {
    const ids = objs.map(x => x.id);
    const results = [];
    for (let unit of Object.values(data.units)) {
      const pd = Reflect.getOwnPropertyDescriptor(unit, 'translations');
      if (pd) {
        for (let id of ids) {
          if (pd.value.includes(id)) {
            const variant = { eid1: unit.eid1, main: 'eid1' };
            if (!results.some(x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
              results.push(variant);
            }
          }
        }
      }
    }
    return results;
  },
};

const renderMatches = () => {
  searchInstance.value.hide();
  if (typeof autoState['text'] === 'object') {
    // console.log("do nothing: object", autoState["text"]);
  } else {
    const tokenMatches = getMatches(autoState['text']);
    // console.log("getMatches: result", tokenMatches);
    const variants = getVariants[autoState['mode']](tokenMatches);
    // console.log("variants", variants);
    autoState['matches'] = variants;
  }
};

const getUnitByTrans = id => {
  const results = [];
  for (let unit of Object.values(data.units)) {
    const pd = Reflect.getOwnPropertyDescriptor(unit, 'translations');
    if (pd && pd.value.includes(id) && !results.find(x => x['eid1'] === unit.eid1)) {
      results.push({
        eid1: unit.eid1,
        main: 'eid1',
      });
    }
  }
  return results;
};

const renderSelected = {
  //  get clicked autocomplete item and render it in search resuts block
  native: e => {
    autoState['matches'] = [getBasicExpr(e.value.eid)];
  },
  trans: e => {
    const uns = getUnitByTrans(e.value.id);
    // console.log("units", uns);
    autoState['matches'] = uns;
  },
};

const processInput = {
  native: str => {
    const results = [];
    const queryChunks = str
      .toLowerCase()
      .split(/\s|(?=-)/g)
      .map(x => x.replace(/[.*+?^${}()|[\]\\]/g, ''));

    autoState['text'] = queryChunks.join(' ').replace(' -', '-');
    const queries = queryChunks.filter(x => x);
    const phraseVariants = new Array(queries.length).fill(null).map(() => []);

    const queriesLength = queries.length;
    const last = queriesLength - 1;

    for (let i = 0; i < data.tokens.values.length; i++) {
      for (let ii = 0; ii < queriesLength; ii++) {
        // bad for performance, though not for that amount of data
        const item = data.tokens.values[i].toLowerCase();
        if (ii === last ? item.startsWith(queries[ii]) : item === queries[ii]) {
          phraseVariants[ii].push(data.tokens.keys[i]);
        }
      }
    }

    const phraseVariantsLength = phraseVariants.length;
    if (phraseVariantsLength) {
      const phraseVariantsLast = phraseVariantsLength - 1;
      const [head] = phraseVariants.slice(0, phraseVariantsLast);
      for (let [key, value] of Object.entries(data.exprs)) {
        let needToLookHead = false;
        // if there are more than 1 token in query
        // must check all that before last
        // whether all they are in value
        if (phraseVariantsLast) {
          if (head.every(v => value.includes(v))) {
            needToLookHead = true;
          }
        } else {
          needToLookHead = true;
        }
        if (needToLookHead) {
          if (phraseVariants[phraseVariantsLast].some(v => value.includes(v))) {
            const phrase = value.map(x => data.tokens.values[data.tokens.keys.findIndex(y => y == x)]);
            // const re = new RegExp(`(?=${str})|(?<=${str})`, 'gi');
            // const res  = queries.map(x => new RegExp(`(?=${x})|(?<=${x})`, 'gi'))
            results.push({ arr: phrase, eid: key, txt: phrase.join(' ').replace(' -', '-') });
            // if (!results.some(x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
            //   results.push(variant);
            // }
          }
        }
      }
    }
    // console.log("results qty", results.length);
    return results;
  },
  trans: str => {
    const results = [];
    const query = str.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '');
    autoState['text'] = query;
    for (let value of Object.values(data.trans)) {
      if (value.txt.includes(query)) {
        results.push(value);
      }
    }
    return results;
  },
};

const getMatches = queryString => {
  // console.log("input", queryString);
  return autoState['text'] ? processInput[autoState['mode']](queryString) : [];
};

const clearInput = () => {
  autoState['matches'] = [];
  autoState['text'] = '';
};

const autocomplete = e => {
  searchVariants.value = getMatches(e.query);
};
</script>

<style scoped>
.switcher {
  line-height: 0.3rem;
}

.mini-flag {
  height: 1rem;
  border: 1px solid gray;
  margin-right: 0.3rem;
  vertical-align: middle;
}

.label-switch {
  font-size: 0.75rem;
}
</style>
