<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <div class="p-text-center p-mt-4">
    <Dropdown v-model="searchState['semfunc']" :options="aggregatedFeatures['semfunc']" optionLabel="name" placeholder="Основная функция" scrollHeight="300" :showClear="true" class="combo" @change="updateRoute($event)"/>
  </div>
  <div class="p-fluid p-mt-2">
    <MultiSelect v-model="searchState['semtone']"  filterPlaceholder="Наберите название" :filter="true"  :options="aggregatedFeatures['semtone']" optionLabel="name" placeholder="Дополнительная семантика" display="chip" class="" @change="updateRoute($event)" />
  </div>
  <div class="p-fluid p-mt-2">
    <MultiSelect v-model="searchState['actclass']"  filterPlaceholder="Наберите название" :filter="true" :options="aggregatedFeatures['actclass']" optionLabel="name" placeholder="Реплика-стимул" display="comma" @change="updateRoute($event)" />
  </div>
  <div class="p-fluid p-mt-2">
    <div class="p-field p-grid" >
      <label for="partsbutton" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0 p-component">Структура</label>
      <div class="p-col-12 p-md-10">
        <SelectButton v-model="searchState['parts']" :options="partsOptions"  class="" optionLabel="name" optionValue="code" id="partsbutton" :multiple="true" @click="updateRoute($event)" />
      </div>
    </div>
  </div>
  <Panel header="Ещё фильтры" :toggleable="true" :collapsed="true">
    <div class="p-d-flex p-flex-column p-col">
      <MultiSelect v-model="searchState['organ']"  filterPlaceholder="Наберите название" :filter="true"  :options="aggregatedFeatures['organ']" optionLabel="name" placeholder="Жесты" display="chip" class="" @change="updateRoute($event)" />
    </div>
    <div class="p-grid">
    <div class="p-col p-text-center">
      <Dropdown v-model="searchState['intonation']" :options="aggregatedFeatures['intonation']" optionLabel="name" placeholder="Интонация" scrollHeight="300" :showClear="true" class="combo" @change="updateRoute($event)"/>
    </div>
    <div class="p-col p-text-center">
      <Dropdown v-model="searchState['translations']" :options="aggregatedLangs" optionLabel="name" placeholder="Языки" scrollHeight="300" :showClear="true" class="combo" @change="updateRoute($event)"/>
    </div>
    </div>
    <!-- <Dropdown v-model="semfunc" :options="semfuncOptions" optionLabel="name" placeholder="Жесты" scrollHeight="300" :showClear="true" class="semfunc p-mr-4" @change="updateRoute($event, 'semfunc')"/>
    <Dropdown v-model="semfunc" :options="semfuncOptions" optionLabel="name" placeholder="Интонация" scrollHeight="300" :showClear="true" class="semfunc" @change="updateRoute($event, 'semfunc')"/>
    <Dropdown v-model="semfunc" :options="semfuncOptions" optionLabel="name" placeholder="Язык" scrollHeight="300" :showClear="true" class="semfunc" @change="updateRoute($event, 'semfunc')"/> -->
  </Panel>


  <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed, watchEffect, reactive } from "vue";
import { useRoute } from 'vue-router';
import router from "../router";
import Dropdown from 'primevue/dropdown';
import { usePrimeVue } from "primevue/config";


export default {
  name: "PhraseList",
  setup() {
    const routerInfo = useRoute();
    // const id = router.params.id;
    console.log(routerInfo.params);

    const partsOptions = [{"name": 'двухчастная', "code": false}, {"name":'трёхчастная', "code": true}];
    const data  = store.state.config;
    const searchState = store.state.search;

    let eids = ref([]);
    eids.value = Object.keys(store.state.config.toc);

    if (routerInfo.params.id) {
      // semtone.value = [{"value": routerInfo.params.id, "name": data.features[routerInfo.params.id][0]}];
      const routedProp = data.features[routerInfo.params.id][1];
      const routedName  = data.features[routerInfo.params.id][0];
      const a = {"value": Number(routerInfo.params.id), "name": routedName, "prop": routedProp};
      console.log("route IN", a);
      if (['semfunc'].includes(routedProp)){
          searchState[routedProp] = a;
      } else if (['semtone'].includes(routedProp)){
        searchState[routedProp] = [a];
      }
      if (!store.state.accessed.includes('search')){
          store.state.accessed.push('search');
      }
      // console.log("search state", searchState);
    }

    const aggregatedFeatures = Object.keys(data.features)
    .map((key) => ({ "value": Number(key), "name": data.features[key][0], "prop": data.features[key][1]}))
    .reduce((obj, x) => ({ ...obj, [x["prop"]]: [...(obj[x["prop"]] || []), x, ],}),{},);

    const primevue = usePrimeVue();
    const lang2ids = Object.values(data.trans).reduce((obj, x) => ({ ...obj, [x["lang"]]: [...(obj[x["lang"]] || []), x.id, ],}),{},);
    // console.log(lang2ids);
    const aggregatedLangs = Object.keys(lang2ids).map(x=>({"value": x, name: primevue.config.locale.lang[x], "prop": "translations"}));
    // console.log(aggregatedLangs);
    // console.log(aggregatedFeatures);

    const updateRoute = (e) => {
      router.replace("/filters");
      if (!store.state.accessed.includes('search')){
          store.state.accessed.push('search');
      }

      console.log("update", e.value);
      console.log("search state", searchState);
      const selected = [];
      const facet = {};

      for (const [key, value] of Object.entries(searchState)) {
        // console.log(`${key}: ${value} || ${typeof value} ${Array.isArray(value)}`);
        if (Array.isArray(value) && value.length && key !== 'parts') {
          facet[key] = value.map(x=>x.value);
        } else if (value && value.constructor === Object && Object.keys(value).length) {
          // console.log("!", key, Object.keys(value).length, Object.keys(value));
          facet[key] = key === 'translations'? lang2ids[value.value]: value.value;
        } else if(key === 'parts') {
          facet[key] = value && value.length === 1 ? value[0] : null;
        }
      }
      console.log("facet", facet);
      const facetArray = Object.entries(facet);
      if (facetArray.length){ //check whether facet is not empty
        for (let [k, v] of Object.entries(store.state.config.toc)) {
          const flatObj  = Object.values(v).flatMap(x=>x);
          let isOkay  = true;
          for (const [key, value] of facetArray) {
            const vals  = flatObj.flatMap(x=> data.units[x][key]);
            if(['semtone', 'actclass', 'organ'].includes(key)) { // array
              if (!value.every(y => vals.includes(y))) {
                isOkay = false;
              }
            } else if (['semfunc', 'intonation'].includes(key)) {
              if (!vals.includes(value)) {
                isOkay = false;
              }
            } else if (key === 'translations') {
                if (!value.some(r=> vals.includes(r))) {
                  isOkay = false;
                }
            } else if (key === 'parts' && value !== null) {
                if (!vals.includes(value)) {
                  isOkay = false;
                }
            }
          }

          if (isOkay) {
            selected.push(k);
          }
        }
      }

      eids.value = selected;
    };

    if (store.state.accessed.includes('search')){
      updateRoute({"value": "back"});
    }
    if (routerInfo.params.id){
      console.log("router", routerInfo.params.id);
    }

  return { updateRoute, data, eids, partsOptions, aggregatedFeatures, aggregatedLangs,  searchState };
},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PhraseListItem,
    Dropdown
  }
};
</script>

<style scoped>
.combo{
  min-width: 15rem;
}
</style>
