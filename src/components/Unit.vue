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
            <span v-for="item in value" :key="item">
              <!-- <Chip :label="data.features[a]" /> -->
              <Tag class="p-mr-2" severity="warning" :value="data.features[item]" rounded></Tag>
            </span>
          </span>
          <span v-else>
              <span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>
              <span v-if="name=='situation'">
                <span v-html='value.replace("А", a).replace("Б", b)'></span>
              </span>
              <span v-else>{{value}}</span>
          </span>
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
  },
  setup (){
    return {
      a: "<img class='emoji' title='Первый участник ситуации' alt='Первый участник ситуации' src='/api/icon/1' height='20' width='20' align='absmiddle'>", // 🐱👨👱<i class='pi pi-user-plus' style='color: red;'></i>
      b: "<img class='emoji' title='Второй участник ситуации' alt='Второй участник ситуации' src='/api/icon/2' height='20' width='20' align='absmiddle'>" //🐭👩👯💃<i class='pi pi-user-minus' style='color: magenta;'></i>
      ,
    }
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
