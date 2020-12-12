<template>
  <div v-if="error">{{ error }}</div>

  <AsyncItemData v-else v-for="item in phraseslist" :key="item.pid" :item="item" />

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
    const { phraseslist, error, load } = queryLibrary();

    await load();

    return { phraseslist, error };
  },
  components: {
    AsyncItemData
  }
};
</script>

<style>
</style>
