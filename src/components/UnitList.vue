<template>
  <div class="p-component">
    <!-- <pre>{{data}}</pre> -->
    <h3>
      <span v-for="(token, key) in data.exprs[$route.params.id]" :key="key">
        {{data.tokens.values[data.tokens.keys.indexOf(token)]}}&#8239;
      </span>
    </h3>
    <div v-for="(value) in data.toc[$route.params.id]" :key="value" class="p-component">
    <!-- <div v-for="(value, name, ind) in data.toc[$route.params.id]" :key="value" class="p-component"> <span :title="'Фраза ' + name">Группа {{ind+1}}</span> -->
    <div v-if="data[$route.params.id][value[0]]['phrase'].length != 1">Варианты:
        <span v-for="(variant, index) in data[$route.params.id][value[0]]['phrase'].slice(1)" :key="index">
           <span v-for="(value, key) in data.exprs[variant]" :key="key" class="variant">{{data.tokens.values[data.tokens.keys.indexOf(value)].charAt(0)==='-'?'':' '}}{{ data.tokens.values[data.tokens.keys.indexOf(value)] }}
          </span>
          <span v-if="index+2 < data.exprs[variant].length"> •</span>
        </span>
    </div>
        <!-- {{value}} -->
        <AsyncUnit v-for="(uid, index) in value" :key="index" :uid="uid" :num="value.length>1?String(index+1):''" :data="data"
        :last="value.length-1==index" :unit="data[$route.params.id][uid]" :auth="isAuth()"/>
        <Divider align="center">
            <span class="p-tag">■</span>
        </Divider>
      </div>

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
    const { errors, loadData } = queryLibrary();
    await loadData(id, "/api/data/"+id);
    return { errors, id, isAuth: store.actions.isAuth, data: store.state.config };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
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
