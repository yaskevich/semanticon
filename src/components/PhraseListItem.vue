<template>
    <div class="p-component phrase-list-item p-text-center">
    <router-link :to="{ name: 'Phrase', params: { id: eid } }" tag="li" class="nounderline">
      <Button class="p-button-link" >
      <span v-for="(value, key) in data.exprs[eid]" :key="key">
        {{data.tokens.values[data.tokens.keys.indexOf(value)].charAt(0)==='-'?'':'&nbsp;'}}{{ data.tokens.values[data.tokens.keys.indexOf(value)] }}
      </span>
    </Button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PhraseListItem",
  props: {
    eid: Number,
    data: Object,
  },
};
</script>

<style>
.nounderline {
  text-decoration: none;
}
</style>
