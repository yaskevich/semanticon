<template>
  <div class="unit">
    <div style='float:right;'>
      <Button v-bind:icon="auth ? 'pi pi-pencil': 'pi pi-heart'" v-bind:class="auth ? 'p-button-rounded p-button-danger': 'p-button-rounded p-button-help'" />
  </div>
    <h4>Значение
      <!-- {{$route.params.id}} -->
      <span v-if="num">{{num}}</span>
    </h4>
    <div>
        <template v-for="(value, name) in unit" >
        <div v-if="value && value.length && !['id', 'phrase', 'translations'].includes(name)" :key="name" class="item">
          <span v-if="Array.isArray(value)">
            <span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>
            <span v-for="a in value" :key="a">
              <!-- <Chip :label="data.features[a]" /> -->
              <Tag class="p-mr-2" severity="warning" :value="data.features[a]" rounded></Tag>
            </span>
          </span>
          <span v-else><span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>{{ value }}</span>
        </div>
      </template>
      <Divider v-if="!last" type="dashed"/>
    </div>
  </div>
</template>
<script>

export default {
  name: "Unit",
  props: {
    uid: String,
    num: String,
    data: Object,
    auth: Boolean,
    unit: Object,
    last: Boolean
  }
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
.item {
  /* margin-bottom: .5rem; */
  line-height:2;
}
</style>
