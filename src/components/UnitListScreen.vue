<template>
  <div class="unitlist">
    <div v-if="error">Parent: {{ error }}</div>
    <Suspense>
      <template #default>
        <unitList />
      </template>
      <template #fallback>
        <div>Загрузка...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import UnitList from "./UnitList.vue";
import { ref, onErrorCaptured } from "vue";
export default {
  name: "UnitListScreen",
  setup() {
    const error = ref(null);
    onErrorCaptured(e => {
      error.value = e;
    });
    return { error };
  },
  components: {
    UnitList
  }
};
</script>

<style>
.unitlist {
background-color:lightyellow;
padding: 2rem;
}
</style>
