<template>
    <div class="p-component phrase-list-item">
    <router-link :to="{ name: 'Phrase', params: { id: item.pid } }" tag="li" class="nounderline">
      <Button class="p-button-link" >
      <span v-for="(value, key) in item.phrase[0]" :key="key">
        {{tokens.values[tokens.keys.indexOf(value)].charAt(0)==='-'?'':'&nbsp;'}}{{ tokens.values[tokens.keys.indexOf(value)] }}
      </span>
    </Button>


    </router-link>
  </div>
</template>

<script>
export default {
  name: "PhraseListItem",
  props: {
    item: Object,
    tokens: Object
  },
};
</script>

<style>
.nounderline {
  text-decoration: none;
}
.phrase-list-item {
  text-align:center;
}
</style>
