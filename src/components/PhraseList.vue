<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <div class="p-grid">
    <div class="p-col" style="text-align:center;">
      <Dropdown v-model="selectedSemfunc" :options="semfuncArray" optionLabel="name" placeholder="Выберите функцию" scrollHeight="300" :showClear="true" class="semfunc"/>
    </div>
    <div class="p-col">
      <MultiSelect v-model="semtone"  filterPlaceholder="Наберите название" :filter="true" @change="updateRoute()" :options="semtoneResult" optionLabel="name" placeholder="Выберите оттенок" display="chip" class="semtone" />
    </div>
  </div>
<div class="p-grid">
  <div class="p-col" style="text-align:center;">
    <Button label="Выберите речевой акт" icon="pi pi-check" iconPos="right" class="semtone" />
  </div>
  <div class="p-col" style="text-align:center;">
    <SelectButton v-model="parts" :options="partsOptions"  class="semtone" optionLabel="name" optionValue="code" style="float:left;" />
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
import router from "../router";
import Dropdown from 'primevue/dropdown';

export default {
  name: "PhraseList",
  setup() {
    const routerInfo = useRoute();
    // const id = router.params.id;
    console.log(routerInfo.params);

    const partsOptions = [{"name": '2-хчастная', "code": 2}, {"name":'3-хчастная', "code": 3}];
    const data  = store.state.config;
		let parts = ref(2);
		let semtone = ref(null);
    let selectedSemfunc = ref(null);
    if (routerInfo.params.id) {
      semtone.value = [{"value": routerInfo.params.id, "name": data.features[routerInfo.params.id][0]}];
    }
    let semtoneResult = ref({});
    let eids = ref([]);
    eids.value = Object.keys(store.state.config.toc);

    const semfuncArray = Object.keys(data.features).filter(x => data.features[x][1]==="semfunc").map(x => ({"value": x, "name": data.features[x][0]}));

    semtoneResult.value  = Object.keys(data.features).filter(x => data.features[x][1]==="semtone").map(x => ({"value": x, "name": data.features[x][0]}));

    const updateRoute = () => {
      router.push("/home");
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
    watchEffect(() => {
      // if (){
        if(semtone.value !== null && !routerInfo.params.id){
          setTimeout((x) => {
            if ((!x && !semtone.value) || (x && semtone.value && (semtone.value.sort().toString() == x.sort().toString()))) {
                console.log("update", semtone.value, x);
                rebuildList();
            } else {
              console.log("wait");
            }
          }, 1000, semtone.value);
        } else {
          console.log("is null");
        }
      // }
    });
  return { data, eids, semtone, semtoneResult, updateRoute, selectedSemfunc,
semfuncArray, parts, partsOptions };
},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PhraseListItem,
    Dropdown
  }
};
</script>

<style scoped>
.semfunc {
  width: 15rem;
  margin: .3rem;
}
.semtone {
  width: 15rem;
  margin: .3rem;
}

</style>
