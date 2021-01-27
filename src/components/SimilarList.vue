<template>
  <div class="p-component p-p-3 p-text-center">
    <div class="p-mb-4">
      <span class="p-text-italic">Похожи на </span>
      <span class="app-title-basic">
        {{data.exprs[data.units[datum.uid]["eid1"]].map(x => data.tokens.values[data.tokens.keys.indexOf(x)]).join('&#8239;')}}
    </span>

    <div class="article-tags p-mb-2">

      <span v-if="data.features[datum.semfunc] && data.features[datum.semfunc][0]">
        <router-link :to="{ name: 'List', params: { prop: 'semfunc', id: datum.semfunc } }" tag="li" class="interactive back-3">
          {{data.features[datum.semfunc][0]}}
        </router-link>
      </span>

      <span v-for="item in datum.semtone" :key="item">
        <router-link :to="{ name: 'List', params: { prop: 'semtone', id: item } }" tag="li" class="interactive back-2">
          {{data.features[item][0]}}
        </router-link>
      </span>

    </div>

    </div>
    <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
import { useRoute } from 'vue-router';
// import router from "../router";
import store from "@/modules/store";
import PhraseListItem from "./PhraseListItem.vue";

export default {
  name: "SimilarList",
  setup() {
    const vuerouter = useRoute();
    const id = vuerouter.params.id;
    const data = store.state.config;
    const eids = [];
    const datum = {};
    if (id) {
      datum["uid"] = Number(id);
      datum["eid"]  = data.units[datum.uid]["eid1"];
      datum["semfunc"]  = data.units[datum.uid]["semfunc"];
      datum["semtone"] = data.units[datum.uid]["semtone"];
      // console.log(datum.uid, "semfunc", datum.semfunc, "semtone", datum.semtones);

      for(let v of Object.values(data.units)) {
        if (v["id"]=== datum.uid ||  v["eid1"] === datum.eid){
          continue;
        }
        if (v["semfunc"] === datum.semfunc) {
            if (
              (datum.semtone && v["semtone"] && v["semtone"].some(r=> datum.semtone.includes(r)))
              ||
              (!datum.semtone && !v["semtone"])
            ){
              if(!eids.includes(v.eid1)){
                  eids.push(v.eid1);
                  // console.log(v["id"], datum.uid, "||",  v["eid1"], datum.eid);
              }
            }
        }
      }
    }
    return { datum, eids, data };
  },
  components: {
    PhraseListItem
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
