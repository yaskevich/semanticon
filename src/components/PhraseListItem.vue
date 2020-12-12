<template>

    <router-link :to="{ name: 'Phrase', params: { id: item.pid } }" tag="li" class="nounderline">
      <Button v-bind:label="item.phrase" class="p-button-link" />
    </router-link>

</template>

<script>
// { name: 'phrase', params: { id: 123 }}
// <Button v-bind:label="item.phrase" class="p-button-link" @click="say(item.pid)" />
export default {
  name: "PhraseListItem",
  props: {
    item: Object
  },
  methods: {
    async say(x) {
      // console.log(x);
      const load = async () => {
      try {
            const getData = await fetch(
              "/api/data/" + x
            );
            const resp = await getData.json();
            // return resp;
            console.log(resp.length);
          } catch (e) {
            console.log(e);
          }
      };
      await load();
    }
  }

};
</script>

<style>
.nounderline {
  text-decoration: none;
}
</style>
