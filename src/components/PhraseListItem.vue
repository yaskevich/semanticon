<template>
    <router-link :to="{ name: 'Phrase', params: { id: item.pid } }" tag="li" class="nounderline">
      <Button v-bind:label="item.phrase" class="p-button-link" />
    </router-link>
</template>

<script>
export default {
  name: "PhraseListItem",
  props: {
    item: Object
  },
};
</script>

<style>
.nounderline {
  text-decoration: none;
}
</style>
