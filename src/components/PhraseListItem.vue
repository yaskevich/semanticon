<template>
    <div class="p-component phrase-list-item p-text-center">
    <router-link :to="{ name: 'Phrase', params: { id: eid } }" tag="li" class="nounderline">
      <Button
        :label="data.exprs[eid].map(x => data.tokens.values[data.tokens.keys.indexOf(x)]).join(' ').replace(' -', '-')"
        :badge="String(Object.values(data.toc[eid]).flat().length).replace('1', '')"
        class="p-button-link black"
        />
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
.black {
  color: black !important;
}
</style>
