<template>
  <div class="home p-component">
    <div class="div-container form-container" style="text-align:left;padding-left:1rem;">
      <div v-for="(value, name, index) in $primevue.config.locale.phrase"  :key="index" class="feature-item">
          {{value}}
          <Inplace :closable="true">
          <template #display>
              <span class="pi pi-pencil"></span>
          </template>
          <template #content>
              <InputText :id="name" v-on:change="dos(name)" type="text" v-model="$primevue.config.locale.phrase[name]" />
          </template>
</Inplace>

      </div>


    </div>
  </div>
</template>

<script>
import { usePrimeVue } from "primevue/config";

export default {
  name: 'Admin',
  setup(){
    const primevue = usePrimeVue();
    const dos = (x) => {
      console.log("kek", x, primevue.config.locale.phrase[x]);
    };
    return {dos};
  },
  components: {
  }
}
</script>

<style scoped>
.feature-item{
  margin-bottom:1rem;
}
.p-inplace {
  display:inline;

}
</style>
