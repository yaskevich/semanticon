<template>
  <!-- <div v-if="errors.phrases">{{ errors.phrases }}</div> -->
  <!-- <AsyncItemData v-else v-for="item in data.phrases" :key="item.pid" :item="item" /> -->
  <PhraseListItem v-for="item in phrases" :key="item.pid" :tokens="tokens" :item="item" />
</template>
<script>
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";

export default {
  name: "PhraseList",
  setup() {
    return { phrases: store.state.config.phrases, tokens: store.state.config.tokens,};
  },
  components: {
    PhraseListItem
  }
};
</script>

<style>
</style>
