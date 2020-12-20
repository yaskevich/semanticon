<template>
  <div class="p-shadow-12 result">
    <span v-for="(v, k) in result" :key="k" class="variant">
      {{data.tokens.values[data.tokens.keys.indexOf(v)].charAt(0)==='-'?'':' '}}{{ data.tokens.values[data.tokens.keys.indexOf(v)] }}
    </span>
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
.result {
  padding: .5rem;
  margin: 1.5rem;
}
</style>
