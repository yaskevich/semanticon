<template>
  <div class="p-component">
    <div class="div-container text-center">
      <AutoComplete v-model="token" :suggestions="searchVariants" :minLength="Number(2)"
        :placeholder="$primevue.config.locale.inputplease" field="name" scrollHeight="200" @complete="search($event)"
        @item-select="getSelection($event)">
        <template #option="slotProps">
          <span v-for="(v, i) in slotProps.option.arr" :key="i">
            <span v-if="v === token" class="font-bold">{{ v }}</span>
            <span v-else>{{ v }}</span>
          </span>
        </template>
      </AutoComplete>
      <div v-for="(value, key) in matches" :key="key">
        <SearchResults :datum="value" :num="Number(key)" :data="data" />
      </div>
    </div>
  </div>
</template>

<script setup>
import store from '../store';
import SearchResults from './SearchResults.vue';
import { ref } from 'vue';

const data = store.state.config;
let searchVariants = ref(null);
let token = ref(null);
let matches = ref({});

const getSelection = e => {
  // console.log(e.value.indx, data.tokens.keys[e.value.indx]);
  const indx = e.value.indx;
  const id = data.tokens.keys[indx];
  const exprs = data.exprs;
  const results = [];

  for (let [key, value] of Object.entries(exprs)) {
    if (value.includes(id)) {
      const titlesIndexes = data.titles.exprs.flatMap((x, i) => (x == key ? i : []));
      const titles = titlesIndexes.map(x => data.titles.eid1[x]);
      // console.log("index", titles, "for", key, value);
      // console.log(data.exprs[titles[0]], id);
      const variant = {
        eid1: titles[0],
        eid: key,
        main: !data.exprs[titles[0]].includes(id) ? 'eid' : 'eid1',
      };
      if (!results.some(x => x['eid1'] === variant.eid1 && x['main'] === variant.main)) {
        results.push(variant);
      }
    }
  }
  // console.log('results', results);
  matches.value = results;
  // router.push("/results")
};
const search = e => {
  // console.log("query", `|${e.query}|`);
  const queries = e.query.split(' ').map(x => x.replace(/[.*+?^${}()|[\]\\]/g, ''))
    .filter(x => x);

  const str = e.query.replace(/[.*+?^${}()|[\]\\]/g, '');
  token.value = queries.join(' ');

  const re = new RegExp(`(?=${str})|(?<=${str})`, 'gi');
  const result = data.tokens.values.filter(x => x.includes(str));
  const filtered2 = new Array(queries.length).fill(null).map(() => []);
  // const res  = queries.map(x => new RegExp(`(?=${x})|(?<=${x})`, 'gi'))
  for (let i = 0; i < data.tokens.values.length; i++) {
    for (let ii = 0; ii < queries.length; ii++) {
      if (data.tokens.values[i].includes(queries[ii])) {
        filtered2[ii].push(data.tokens.keys[i]);
      }
    }
    // data.tokens.values[i]
  }
  // console.log(result);
  // console.log(filtered2);

  const filtered = result.map(x => ({ name: x, indx: data.tokens.values.indexOf(x), arr: x.split(re) }));
  console.log(JSON.stringify(filtered));
  searchVariants.value = filtered;
};
</script>
