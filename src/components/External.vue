<template>
  <div class="phraselist p-d-flex p-flex-column p-jc-center">
    <div v-if="error">Parent: {{ error }}</div>
    <Suspense>
      <template #default>
        <PhraseList />
      </template>
      <template #fallback>
        <div>Загрузка...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import PhraseList from "./PhraseList.vue";
// eslint-disable-next-line no-unused-vars
import { ref, onErrorCaptured } from "vue";
export default {
  name: "Phraselist",
  setup() {
    const error = ref(null);
    onErrorCaptured(e => {
      error.value = e;
    });
    return { error };
  },
  components: {
    PhraseList
  }
};
</script>

<style>
.phraselist {

}
</style>
