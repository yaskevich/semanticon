<template>
  <div class="p-shadow-12 p-component result-item">
    <router-link :to="{ name: 'Phrase', params: { id: num } }" tag="li" class="nounderline">
      <Button class="p-button-link">
        <span v-for="(v, k) in result" :key="k">
          {{data.tokens.values[data.tokens.keys.indexOf(v)].charAt(0)==='-'?'':'&nbsp;'}}{{ data.tokens.values[data.tokens.keys.indexOf(v)] }}
        </span>
    </Button>
    </router-link>
  </div>
</template>

<script>
import store from "@/modules/store";
export default {
  name: "SearchResults",
  props: {
    result: Array,
    num: Number
  },
  setup(){
    return { data: store.state.config};
  }
}
</script>

<style scoped>
.result-item {
  /* text-align:center; */
  padding: 1rem;
  margin: 2rem;
}
</style>
