<template>
  <div class="unit">
    <div style='float:right;'>
      <Button v-bind:icon="auth ? 'pi pi-pencil': 'pi pi-heart'" v-bind:class="auth ? 'p-button-rounded p-button-danger': 'p-button-rounded p-button-help'" />
  </div>
    <h4>Значение
      <span v-if="index">{{index}}</span>
    </h4>
    <div>
        <template v-for="(value, name) in item" >
        <div v-if="value && value.length && name!=='id'" :key="name" class="item">
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
      <Divider/>
    </div>
  </div>
</template>
<script>

export default {
  name: "Unit",
  props: {
    item: Object,
    index: String,
    data: Object,
    auth: Boolean
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
