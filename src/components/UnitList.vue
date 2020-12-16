<template>
  <div class="p-component">
    <!-- <Button label="ok" class="p-button" @click="say()" /> -->
    <h3>{{$route.params.phrase}}
       <!-- (№{{$route.params.id}}) -->
    </h3>
    <Divider/>
    <div v-if="errors[id]">{{ errors[id] }}</div>
    <AsyncUnit v-else v-for="(item, index) in data[id]" :key="item.id" :item="item" :index="data[id].length>1?String(index+1):''" :data="data" :auth="isAuth"/>
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
    const { data, errors, loadData } = queryLibrary();
    await loadData(id, "/api/data/"+id);
    return { data, errors, id, isAuth: store.isAuth };
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
</style>
