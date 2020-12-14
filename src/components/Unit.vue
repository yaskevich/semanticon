<template>
  <div class="unit">
    <h4>Значение
      <span v-if="index">{{index}}</span>
    </h4>
    <div>
        <template v-for="(value, name) in item" >
        <div v-if="value && value.length && name!=='id'" :key="name">
          <span v-if="Array.isArray(value)">
            <span class="desc">{{name}}: </span>
            <span v-for="a in value" :key="a">
              {{ data.features[a] }}&nbsp;
            </span>
          </span>
          <span v-else><span class="desc">{{name}}: </span>{{ value }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "Unit",
  props: {
    item: Object,
    index: String,
    data: Object
  },
};
</script>

<style>
.unit {
  /* border: 1px solid red;*/
  margin-top: 2rem;
}
.desc {
  font-weight:bold;
}
</style>
