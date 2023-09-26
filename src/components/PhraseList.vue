<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <!-- Searchable:  {{Object.keys(data.tree) }} -->

  <div class="text-center mt-2" v-if="mode === 'r'">
    <Dropdown v-model="searchState['struct']" :options="data.tree['struct']" :optionLabel="localeCode" optionValue="id"
      :placeholder="$primevue.config.locale.search.struct" scrollHeight="300" :showClear="true" class="combo"
      @change="updateRoute($event)" />
  </div>

  <div class="text-center mt-2" v-if="mode === 'r'">
    <Dropdown v-model="searchState['area']" :options="data.tree['area']" :optionLabel="localeCode"
      :placeholder="$primevue.config.locale.search.area" scrollHeight="300" :showClear="true" optionValue="id"
      class="combo" @change="updateRoute($event)" />
  </div>

  <div class="text-center mt-2" v-if="mode === 'f'">
    <Dropdown v-model="searchState['semfunc']" :options="data.tree['semfunc']" :optionLabel="localeCode"
      :placeholder="$primevue.config.locale.search.mainfunc" scrollHeight="300" optionValue="id" :showClear="true"
      class="combo" @change="updateRoute($event)" />
  </div>

  <div class="p-fluid mt-2" v-if="mode === 'r'">
    <MultiSelect v-model="searchState['tags']" :filterPlaceholder="$primevue.config.locale.search.inputtitle"
      :filter="true" :options="data.tree['tags']" :optionLabel="localeCode"
      :placeholder="$primevue.config.locale.search.tags" optionValue="id" display="chip" class=""
      @change="updateRoute($event)" />
  </div>

  <div class="p-fluid mt-2" v-if="mode === 'r'">
    <MultiSelect v-model="searchState['pragma']" :filterPlaceholder="$primevue.config.locale.search.inputtitle"
      :filter="true" :options="data.tree['pragma']" :optionLabel="localeCode"
      :placeholder="$primevue.config.locale.search.pragma" optionValue="id" display="chip" class=""
      @change="updateRoute($event)" />
  </div>

  <div class="p-fluid mt-2" v-if="mode === 'f'">
    <MultiSelect v-model="searchState['semtone']" :filterPlaceholder="$primevue.config.locale.search.inputtitle"
      optionValue="id" :filter="true" :options="data.tree['semtone']" :optionLabel="localeCode"
      :placeholder="$primevue.config.locale.search.addsem" display="chip" class="" @change="updateRoute($event)" />
  </div>
  <div class="p-fluid mt-2" v-if="mode === 'f'">
    <MultiSelect v-model="searchState['actclass']" :filterPlaceholder="$primevue.config.locale.search.inputtitle"
      optionValue="id" :filter="true" :options="data.tree['actclass']" :optionLabel="localeCode"
      :placeholder="$primevue.config.locale.search.challengephrase" display="comma" @change="updateRoute($event)" />
  </div>
  <div class="p-fluid mt-2">
    <div class="p-field grid" v-if="mode === 'f'">
      <label for="partsbutton" class="col-12 mb-2 md-2 mb-md-0 p-component">{{ $primevue.config.locale.search.struct
      }}</label>
      <div class="col-12 md-10">
        <SelectButton v-model="searchState['parts']" :options="partsOptions" class="" optionLabel="name"
          optionValue="code" id="partsbutton" :multiple="true" @click="updateRoute($event)" />
      </div>
    </div>
  </div>

  <Panel :header="$primevue.config.locale.search.morefilters" :toggleable="true" :collapsed="true" v-if="mode === 'f'">
    <div class="flex flex-column col" v-if="mode === 'f'">
      <MultiSelect v-model="searchState['organ']" :filterPlaceholder="$primevue.config.locale.search.inputtitle"
        :filter="true" :options="data.tree['organ']" :optionLabel="localeCode" optionValue="id"
        :placeholder="$primevue.config.locale.search.gests" display="chip" class="" @change="updateRoute($event)" />
    </div>
    <div class="grid">
      <div class="col text-center" v-if="mode === 'f'">
        <Dropdown v-model="searchState['intonation']" :options="data.tree['intonation']" :optionLabel="localeCode"
          optionValue="id" :placeholder="$primevue.config.locale.search.intonation" scrollHeight="300" :showClear="true"
          class="combo" @change="updateRoute($event)" />
      </div>
      <div class="col text-center" v-if="mode === 'f'">
        <Dropdown v-model="searchState['translations']" :options="aggregatedLangs" optionLabel="name"
          optionValue="value" :placeholder="$primevue.config.locale.search.langs" scrollHeight="300" :showClear="true"
          class="combo" @change="updateRoute($event)" />
      </div>
    </div>
  </Panel>

  <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Dropdown from 'primevue/dropdown';
import { usePrimeVue } from 'primevue/config';
import router from '../router';
import store from '../store';
import PhraseListItem from './PhraseListItem.vue';

const routerInfo = useRoute();
const primevue = usePrimeVue();
const localeCode = store.lang;

const partsOptions = [
  { name: primevue.config.locale.parts2, code: false },
  { name: primevue.config.locale.parts3, code: true },
];

const data = store.state.config;
const searchState = store.state.search;

const mode = data.settings.mode;

let eids = ref([]);
eids.value = Object.keys(store.state.config.toc);

if (routerInfo.params.id) {
  // console.log(searchState);
  for (let param in searchState) {
    searchState[param] = Array.isArray(searchState[param]) ? [] : null;
  }

  const routedProp = data.features[routerInfo.params.id][1];
  // const routedName = data.features[routerInfo.params.id][0];
  // const paramValue = { value: Number(routerInfo.params.id), name: routedName, prop: routedProp };
  const paramValue = Number(routerInfo.params.id);

  console.log("route IN", paramValue);
  if (['semfunc', 'intonation', 'style', 'struct', 'area'].includes(routedProp)) {
    searchState[routedProp] = paramValue;
  } else if (['semtone', 'pragma', 'tags'].includes(routedProp)) {
    searchState[routedProp] = [paramValue];
  }
  if (!store.state.accessed.includes('search')) {
    store.state.accessed.push('search');
  }
}

// const data.tree = Object.keys(data.features)
//   .map(key => ({ value: Number(key), name: data.features[key][0], prop: data.features[key][1] }))
//   .reduce((obj, x) => ({ ...obj, [x['prop']]: [...(obj[x['prop']] || []), x] }), {});

const lang2ids = Object.values(data.trans).reduce(
  (obj, x) => ({ ...obj, [x['lang']]: [...(obj[x['lang']] || []), x.id] }),
  {}
);
const aggregatedLangs = Object.keys(lang2ids).map(x => ({
  value: x,
  name: primevue.config.locale.lang[x],
  prop: 'translations',
}));

const updateRoute = () => {
  // router.replace('/filters');
  if (!store.state.accessed.includes('search')) {
    store.state.accessed.push('search');
  }

  // console.log("update", e.value);
  // console.log("search state", searchState);
  const selected = [];
  const facet = {};

  // console.log(searchState);

  for (const [key, value] of Object.entries(searchState)) {
    // console.log(`${key}: ${value} || ${typeof value} ${Array.isArray(value)}`);
    if (Array.isArray(value) && value.length && key !== 'parts') {
      facet[key] = value;
    } else if (value && typeof value === 'string') {
      facet[key] = key === 'translations' ? lang2ids[value] : value;
    } else if (value && typeof value === 'number') {
      facet[key] = value;
    }
    else if (key === 'parts') {
      facet[key] = value && value.length === 1 ? value[0] : null;
    }
  }

  // console.log("facet", facet);

  const facetArray = Object.entries(facet);
  if (facetArray.length) {
    // check whether facet is not empty
    for (let unit of Object.values(data.units)) {
      let isOkay = true;
      for (const [key, value] of facetArray) {
        if (!Object.prototype.hasOwnProperty.call(unit, key)) {
          isOkay = false;
          break;
        }

        if (['tags', 'pragma', 'semtone', 'actclass', 'organ'].includes(key)) {
          // array
          if (!value.every(y => unit[key].includes(y))) {
            isOkay = false;
          }
        } else if (['struct', 'area', 'semfunc', 'intonation'].includes(key)) {
          // console.log('yes');
          if (unit[key] !== value) {
            isOkay = false;
          }
        } else if (key === 'translations') {
          if (!value.some(r => unit[key].includes(r))) {
            isOkay = false;
          }
        } else if (key === 'parts' && value !== null) {
          if (unit[key] !== value) {
            isOkay = false;
          }
        }
      }

      if (isOkay) {
        if (!selected.includes(unit.eid1)) {
          selected.push(unit.eid1);
        }
      }
    }
  }

  eids.value = selected;
};

if (store.state.accessed.includes('search')) {
  updateRoute({ value: 'back' });
}
// if (routerInfo.params.id){
//   console.log("router", routerInfo.params.id);
// }


</script>

<style scoped>
.combo {
  min-width: 15rem;
}
</style>
