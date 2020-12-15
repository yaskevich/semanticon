<template>
    <router-link :to="{ name: 'Phrase', params: { id: item.pid, phrase: item.phrase } }" tag="li" class="nounderline">
      <Button v-bind:label="item.phrase" class="p-button-link" />
    </router-link>
</template>

<script>
export default {
  name: "PhraseListItem",
  props: {
    item: Object
  },
  methods: {
    // async say(x) {
    //   console.log(x);
    // }
  }
};
</script>

<style>
.nounderline {
  text-decoration: none;
}
</style>
