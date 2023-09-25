<template>
  <div class="p-component p-3 text-center">
    <div class="mb-4">
      <div class="mb-2">
        <span v-if="eids?.length" class="upper">{{ $primevue.config.locale.similar }}</span>
        <span v-else class="upper"> {{ $primevue.config.locale.nosimilar }} </span>
        <span class="ml-1 app-title-basic">
          {{
              data.exprs[data.units[datum.uid]['eid1']]
                .map(x => data.tokens.values[data.tokens.keys.indexOf(x)])
                .join('&#8239;')
          }}
        </span>
      </div>
      <div class="mb-2">
        <span v-if="data.features[datum[major]] && data.features[datum[major]][0]">
          <router-link :to="{ name: 'List', params: { prop: major, id: datum[major] } }"
            class="interactive back-3 mr-1">
            {{ data.features[datum[major]][0] }}
          </router-link>
        </span>
        <span v-for="item in datum[minor]" :key="item">
          <router-link :to="{ name: 'List', params: { prop: minor, id: item } }" class="interactive back-2">
            {{ data.features[item][0] }}
          </router-link>
        </span>
      </div>
    </div>
    <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import store from '../store';
import PhraseListItem from './PhraseListItem.vue';

const vuerouter = useRoute();
const id = vuerouter.params.id;
const data = store.state.config;
const eids = [];
const datum = {};
const [major, minor] = store?.similarity[store?.state?.config?.settings?.mode || 'f'];

if (id) {
  datum['uid'] = Number(id);
  datum['eid'] = data.units[datum.uid]['eid1'];
  datum[major] = data.units[datum.uid][major];
  datum[minor] = data.units[datum.uid][minor];

  for (let unit of Object.values(data.units)) {
    if (unit['id'] === datum.uid || unit['eid1'] === datum.eid) {
      continue;
    }
    if (unit[major] === datum[major]) {
      if (
        (datum?.[minor] && unit[minor] && unit[minor].some(r => datum?.[minor].includes(r))) ||
        (!datum?.[minor] && !unit[minor])
      ) {
        if (!eids.includes(unit.eid1)) {
          eids.push(unit.eid1);
        }
      }
    }
  }
}

</script>

<style>
.phrase {
  color: red;
}

.variant {
  color: gray;
}

.variants {
  margin-top: -1rem;
}

.upper {
  text-transform: uppercase;
}
</style>
