<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <MultiSelect v-model="sel"  filterPlaceholder="Наберите название" :filter="true" :options="result" optionLabel="name" placeholder="Выберите семантический класс" display="chip" />

  <PhraseListItem v-for="eid in toc" :key="eid" :data="data" :eid="Number(eid)" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";

export default {
  name: "PhraseList",
  setup() {
		let sel = ref(null);
    let result = ref({})
		const data  = store.state.config;
		result.value  = Object.keys(data.features).filter(x => data.features[x][1]==="semantics").map(x => ({"value": x, "name": data.features[x][0]}));
		// console.log(result.length);
    // sel.value = result;
    return { toc: Object.keys(store.state.config.toc), data: data,
		sel, result };
  },
  components: {
    PhraseListItem
  }
};
</script>

<style>
</style>
