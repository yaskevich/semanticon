<template>
  <div class="">
    <div>Фраза №{{$route.params.id}}</div>
    <Button label="ok" class="p-button-link" @click="say()" />
    <div v-if="error">{{ error }}</div>
    <Unit v-else v-for="item in unit" :key="item.id" :item="item" />
   </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { unref } from "vue";
import queryLibrary from "../modules/queries";
import Unit from "./Unit.vue";


function beforeEnter (to, from, next) {
  // do things
  console.log("route", to.params);
  next()
}


export default {
  name: "Phrase",
  // props: {
  //   unit: Object
  // },
  beforeRouteEnter (to, from, next) {
    beforeEnter(to, from, next)
   },

  beforeRouteUpdate (to, from, next) {
    beforeEnter(to, from, next)
  },
  setup(props) {
    console.log("props", props.query );
  },
  methods: {
    async say() {
      const x = this.$route.params.id||1;
      console.log("id", x);

      const { data, loadData } = queryLibrary();
      const id  = String("uuid"+x);
      await loadData(id, "/api/data/" + x);
      // console.log(unref(featuresList));
      return data;
    }
  },
  components: {
    Unit
  }

};
</script>

<style>
</style>
