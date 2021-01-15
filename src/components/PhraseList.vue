<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->

  <div class="p-grid p-m-2">
    <div class="p-col p-text-center">
      <Dropdown v-model="semfunc" :options="semfuncArray" optionLabel="name" placeholder="Основная функция" scrollHeight="300" :showClear="true" class="semfunc" @change="updateRoute($event, 'semfunc')"/>
    </div>
  </div>

  <div class="p-d-flex p-flex-column p-col">
    <MultiSelect v-model="semtone"  filterPlaceholder="Наберите название" :filter="true"  :options="semtoneResult" optionLabel="name" placeholder="Дополнительная семантика" display="chip" class="" @change="updateRoute($event, 'semtone')" />
  </div>

  <div class="p-d-flex p-flex-column p-col">
    <MultiSelect v-model="actclass"  filterPlaceholder="Наберите название" :filter="true" :options="actclassResult" optionLabel="name" placeholder="Реплика-стимул" display="comma" @change="updateRoute($event, 'actclass')" />
  </div>

  <div class="p-fluid p-col" >
    <div class="p-field p-grid" >
      <label for="partsbutton" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0 p-component">Структура</label>
      <div class="p-col-12 p-md-10">
        <SelectButton v-model="parts" :options="partsOptions"  class="" optionLabel="name" optionValue="code" id="partsbutton" @click="updateRoute($event, 'parts')" />
      </div>
    </div>
  </div>

  <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed, watchEffect } from "vue";
import { useRoute } from 'vue-router';
// import router from "../router";
import Dropdown from 'primevue/dropdown';

export default {
  name: "PhraseList",
  setup() {
    const routerInfo = useRoute();
    // const id = router.params.id;
    console.log(routerInfo.params);

    const partsOptions = [{"name": 'двухчастная', "code": false}, {"name":'трёхчастная', "code": true}];
    const data  = store.state.config;
		let parts = ref(false);
		let semtone = ref(null);
		let actclass = ref(null);
    let semfunc = ref(null);
    if (routerInfo.params.id) {
      // semtone.value = [{"value": routerInfo.params.id, "name": data.features[routerInfo.params.id][0]}];
      semfunc.value = {"value": routerInfo.params.id, "name": data.features[routerInfo.params.id][0]};
    }
    let semtoneResult = ref([]);
    let actclassResult = ref([]);
    let eids = ref([]);
    eids.value = Object.keys(store.state.config.toc);

    const semfuncArray = Object.keys(data.features).filter(x => data.features[x][1]==="semfunc").map(x => ({"value": x, "name": data.features[x][0]}));


    actclassResult.value = Object.keys(data.features).filter(x => data.features[x][1]==="actclass").map(x => ({"value": x, "name": data.features[x][0]}));

    semtoneResult.value  = Object.keys(data.features).filter(x => data.features[x][1]==="semtone").map(x => ({"value": x, "name": data.features[x][0]}));

    const updateRoute = (e, title) => {
      // let curTarget = e.currentTarget;
      // let curTargetData = curTarget.dataset;
      console.log("update on change", `|${title}|`, e.value);
      // router.push("/home");
      // const actclassValues  =
      const semtoneValues = semtone.value ? semtone.value.map(y=>Number(y.value)) : null;
      const actclassValues = actclass.value ? actclass.value.map(y=>Number(y.value)) : null;
      const semfuncValue  = semfunc.value ? Number(semfunc.value.value) : null;
      const partsValue = parts.value ? parts.value : false;

      const selected = [];

      for (let [k, v] of Object.entries(store.state.config.toc)) {
        // partsValue
        let funcs  = Object.values(v).flatMap(x=>x).flatMap(x=> data.units[x].semfunc);
        let parts2  = Object.values(v).flatMap(x=>x).flatMap(x=> data.units[x].parts);
        let sems = Object.values(v).flatMap(x=>x).flatMap(x=> data.units[x].semtone);
        let acts = Object.values(v).flatMap(x=>x).flatMap(x=> data.units[x].actclass);
        let isOkay  = true;
        if (semtoneValues) {
            if (!semtoneValues.every(y => sems.includes(y))) {
              isOkay = false;
            }
        }
        if (actclassValues) {
            if (!actclassValues.every(y => acts.includes(y))) {
              isOkay = false;
            }
        }
        if (semfuncValue) {
            if (!funcs.includes(semfuncValue)) {
              isOkay = false;
            }
        }

        if (!parts2.includes(partsValue)) {
          isOkay = false;
        }

        if (isOkay) {
          selected.push(k);
        }
      }

      eids.value = selected;
    };

    const rebuildList = () => {
      const selected = [];
      if (semtone.value) {
          const vals = semtone.value.map(y=>Number(y.value));
          for (let [k, v] of Object.entries(store.state.config.toc)) {
            let sems = Object.values(v).flatMap(x=>x).flatMap(x=> data.units[x].semtone);
            if (vals.every(y => sems.includes(y))) {
              selected.push(k);
            }
          }
        }
      eids.value = selected;
    };

    if (routerInfo.params.id){
      rebuildList();
    }
    // watchEffect(() => {
    //   // if (){
    //     console.log("watch");
    //     if(semtone.value !== null && !routerInfo.params.id){
    //       setTimeout((x) => {
    //         if ((!x && !semtone.value) || (x && semtone.value && (semtone.value.sort().toString() == x.sort().toString()))) {
    //             console.log("update", semtone.value, x);
    //             rebuildList();
    //         } else {
    //           console.log("wait");
    //         }
    //       }, 1000, semtone.value);
    //     } else {
    //       console.log("is null");
    //     }
    //   // }
    // });
  return { data, eids, semtone, semtoneResult, updateRoute, semfunc,
semfuncArray, parts, partsOptions, actclass, actclassResult };
},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PhraseListItem,
    Dropdown
  }
};
</script>

<style>
</style>
