<template>
  <div class="p-component p-p-3">
    <div v-for="(value) in data.toc[$route.params.id]" :key="value">
      <span v-if="data.units[value[0]]['phrase'].length != 1">Варианты:
          <span v-for="(variant, index) in data.units[value[0]]['phrase'].slice(1)" :key="index">
            <span v-if="index"> •</span>
            <span v-for="(value, key) in data.exprs[variant]" :key="key" class="variant">{{data.tokens.values[data.tokens.keys.indexOf(value)].charAt(0)==='-'?'':' '}}{{ data.tokens.values[data.tokens.keys.indexOf(value)] }}</span>
          </span>
      </span>
      <Unit
        v-for="(uid, index) in value"
        :key="index"
        :uid="uid"
        :num="value.length>1?String(index+1):''"
        :data="data"
        :last="value.length-1==index"
        :unit="data.units[uid]"
        :auth="isAuth()" />
      <Divider align="center"><span class="p-tag">■</span></Divider>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { unref, ref, computed } from "vue";
// import { useRoute } from 'vue-router';
import store from "@/modules/store";
import Unit from "./Unit.vue";

export default {
  name: "UnitList",
  setup() {
    // const router = useRoute();
    // const phraseId = computed(() => router.params.id);
    // const id = unref(phraseId);
    // const id = router.params.id;
    // console.log(id);
    return { isAuth: store.actions.isAuth, data: store.state.config };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Unit
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
