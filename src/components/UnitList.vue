<template>
  <div class="p-component">
    <!-- <Button label="ok" class="p-button" @click="say()" /> -->
    <h3>{{$route.params.phrase}}
       <!-- (№{{$route.params.id}}) -->
    </h3>
    <Divider/>
    <div v-if="errors[id]">{{ errors[id] }}</div>
    <AsyncUnit v-else v-for="(item, index) in data[id]" :key="item.id" :item="item" :index="data[id].length>1?String(index+1):''" :data="data" :auth="isLoggedIn"/>
   </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
import { useRoute } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import queryLibrary from "../modules/queries";
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
// eslint-disable-next-line no-unused-vars
  async setup(props) {
    // console.log("props", props.post );
    const router = useRoute();
    // const phraseId = computed(() => router.params.id);
    // const id = unref(phraseId);
    const id = router.params.id;
    console.log("id", id);
    const { data, errors, loadData, isLoaded } = queryLibrary();
    await loadData(id, "/api/data/"+id);
    let isLoggedIn  = Boolean(Reflect.getOwnPropertyDescriptor(isLoaded.value, "user"));
    // {value: true, writable: true, enumerable: true, configurable: true}
    // console.log("isloaded", isLoaded.value.user);
    console.log("isLoggedIn", isLoggedIn);
    return { data, errors, id, isLoggedIn };
  },
  methods: {
    // say() {
    //   this.$primevue.config.locale.hi = 'Всякое';
    // }
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
