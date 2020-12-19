<template>
  <div class="p-component">
    <!-- <Button label="ok" class="p-button" @click="say()" /> -->
    <!-- <pre>
      {{data[id]}}
    </pre> -->
    <h3>
      <span v-for="(item, index) in data[id].phrase[0]" :key="index">
        {{ data.tokens[item] }}&#8239;
      </span>
    </h3>
    <!-- (№{{$route.params.id}}) -->
    <!-- <pre>{{data[id]}}</pre> -->
    <div class="variants">
      <span v-for="(variant, index) in data[id].phrase.slice(1)" :key="index">
        <span v-for="(value, key) in variant" :key="key" class="variant">
            &#8239;{{ data.tokens[value] }}
        </span>
        <span v-if="index+2 < data[id].phrase.length"> •</span>
      </span>
    </div>


    <Divider/>
    <!-- <pre>{{data[id]}}</pre> -->
    <div v-if="errors[id]">{{ errors[id] }}</div>
    <AsyncUnit v-else v-for="(item, index) in data[id].units" :key="item.id" :item="item" :index="data[id].length>1?String(index+1):''" :data="data" :auth="isAuth()"/>
   </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
import { useRoute } from 'vue-router'
import queryLibrary from "../modules/queries";
import store from "@/modules/store";
import { defineAsyncComponent } from "vue";
import Loading from "./Loading.vue";
const AsyncUnit = defineAsyncComponent({
  loader: () => import("./Unit.vue" /* webpackChunkName: "unitdata" */),
  loadingComponent: Loading,
  delay: 200,
  suspensible: false
});

export default {
  name: "UnitList",
  async setup() {
    const router = useRoute();
    // const phraseId = computed(() => router.params.id);
    // const id = unref(phraseId);
    const id = router.params.id;
    console.log(id);
    const { data, errors, loadData } = queryLibrary();
    await loadData(id, "/api/data/"+id);
    return { data, errors, id, isAuth: store.actions.isAuth };
  },
  components: {
    AsyncUnit
  }
};
</script>

<style>
.phrase {
  color: red;
}
.variant{
  color: gray;
}
.variants{
  margin-top:-1rem;
}
</style>
