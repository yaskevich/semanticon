<template>
  <div class="p-component phrase-list-item text-center">
    <router-link :to="{ name: 'Phrase', params: { id: eid } }" class="li nounderline">
      <PrimeButton :label="
        store.translit(data.exprs[eid]
          .map(x => data.tokens.values[data.tokens.keys.indexOf(x)])
          .join(' ')
          .replace(' -', '-'))
      " :badge="String(Object.values(data.toc[eid]).flat().length).replace('1', '')" class="p-button-link black" />
    </router-link>
  </div>
</template>

<script setup>
import store from '../store';
const props = defineProps(['eid', 'data'])
</script>

<style>
.nounderline {
  text-decoration: none;
}

.black {
  color: black !important;
}
</style>
