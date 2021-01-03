<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <MultiSelect v-model="semantics"  filterPlaceholder="Наберите название" :filter="true" @change="updateRoute()" :options="semanticsResult" optionLabel="name" placeholder="Выберите семантический класс" display="chip" />
  <!-- {{semantics}} -->
  <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed, watchEffect } from "vue";
import { useRoute } from 'vue-router';
import router from "../router";

export default {
  name: "PhraseList",
  setup() {
    const routerInfo = useRoute();
    // const id = router.params.id;
    console.log(routerInfo.params);

    const data  = store.state.config;
		let semantics = ref(null);
    if (routerInfo.params.id) {
      semantics.value = [{"value": routerInfo.params.id, "name": data.features[routerInfo.params.id][0]}];
    }
    let semanticsResult = ref({});
    let eids = ref([]);
    eids.value = Object.keys(store.state.config.toc);

    semanticsResult.value  = Object.keys(data.features).filter(x => data.features[x][1]==="semantics").map(x => ({"value": x, "name": data.features[x][0]}));

    const updateRoute = () => {
      router.push("/home");
    };

    const rebuildList = () => {
      const selected = [];
      if (semantics.value) {
          const vals = semantics.value.map(y=>Number(y.value));
          for (let [k, v] of Object.entries(store.state.config.toc)) {
            let sems = Object.values(v).flatMap(x=>x).flatMap(x=> data.units[x].semantics);
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
        if(semantics.value !== null && !routerInfo.params.id){
          setTimeout((x) => {
            if ((!x && !semantics.value) || (x && semantics.value && (semantics.value.sort().toString() == x.sort().toString()))) {
                console.log("update", semantics.value, x);
                rebuildList();
            } else {
              console.log("wait");
            }
          }, 1000, semantics.value);
        } else {
          console.log("is null");
        }
      // }
    });
  return { data, eids, semantics, semanticsResult, updateRoute };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PhraseListItem
  }
};
</script>

<style>
</style>
