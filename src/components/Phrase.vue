<template>
  <div class="">
    <div>Фраза №{{$route.params.id}}</div>
    <Button label="ok" class="p-button-link" @click="say()" />
   </div>
</template>

<script>
export default {
  name: "Phrase",
  props: {
    unit: Object
  },
  methods: {
    async say() {
      const x = this.$route.params.id||1;
      console.log(x);
      const load = async () => {
      try {
            const getData = await fetch(
              "/api/data/" + x
            );
            const resp = await getData.json();
            // return resp;
            console.log(resp);
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
