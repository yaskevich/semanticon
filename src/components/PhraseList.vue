<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <MultiSelect v-model="semantics"  filterPlaceholder="Наберите название" :filter="true" :options="semanticsResult" optionLabel="name" placeholder="Выберите семантический класс" display="chip" />
  <!-- {{semantics}} -->
  <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed, watchEffect } from "vue";

export default {
  name: "PhraseList",
  setup() {
		let semantics = ref(null);
    let semanticsResult = ref({});
    let eids = ref([]);
    eids.value = Object.keys(store.state.config.toc);
		const data  = store.state.config;
    semanticsResult.value  = Object.keys(data.features).filter(x => data.features[x][1]==="semantics").map(x => ({"value": x, "name": data.features[x][0]}));

    watchEffect(() => {
      if(!(semantics.value===null)){
        setTimeout((x) => {
          if ((!x && !semantics.value) || (x && semantics.value && (semantics.value.sort().toString() == x.sort().toString()))) {
              console.log("update", semantics.value, x);
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
          } else {
            console.log("wait");
          }
        }, 1000, semantics.value);
      } else {
        console.log("is null");
      }
    });
  return { data, eids, semantics, semanticsResult };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PhraseListItem
  }
};
</script>

<style>
</style>
