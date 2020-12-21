<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <PhraseListItem v-for="eid in toc" :key="eid" :data="data" :eid="Number(eid)" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";

export default {
  name: "PhraseList",
  setup() {
    return { toc: Object.keys(store.state.config.toc), data: store.state.config };
  },
  components: {
    PhraseListItem
  }
};
</script>

<style>
</style>
