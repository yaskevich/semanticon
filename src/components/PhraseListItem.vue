<template>
  <div class="">
    <Button v-bind:label="item.phrase" class="p-button-link" @click="say(item.pid)" />
   </div>
</template>

<script>
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
</style>
