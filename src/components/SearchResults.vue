<template>
  <div class="shadow-4 p-component result-item text-center">
    <router-link :to="{ name: 'Phrase', params: { id: datum?.eid1 } }" class="li nounderline">
      <PrimeButton class="p-button-link">
        <span v-for="(v, k) in data.exprs[datum[datum.main]]" :key="k">
          {{ data.tokens.values[data.tokens.keys.indexOf(v)].charAt(0) === '-' ? '' : '&nbsp;'
          }}{{ data.tokens.values[data.tokens.keys.indexOf(v)] }}
        </span>
      </PrimeButton>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps(['datum', 'num', 'data'])
</script>

<style scoped>
.result-item {
  padding: 1rem;
  margin: 2rem;
}
</style>
