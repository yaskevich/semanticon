<template>
  <div v-if="errors.phrases">{{ errors.phrases }}</div>
  <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import Loading from "./Loading.vue";
import queryLibrary from "../modules/queries";

const AsyncItemData = defineAsyncComponent({
  loader: () => import("./PhraseListItem.vue" /* webpackChunkName: "phrasedata" */),
  loadingComponent: Loading,
  delay: 200,
  suspensible: false
});

export default {
  name: "PhraseList",
  async setup() {
    const { data, errors, loadData } = queryLibrary();
    await loadData("phrases", "/api/data");
    return { data, errors };
  },
  components: {
    AsyncItemData
  }
};
</script>

<style>
</style>
