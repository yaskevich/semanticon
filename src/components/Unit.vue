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
        <template v-for="(value, name) in unit">
          <div v-if="value && !['id', 'phrase', 'translations', 'examples', 'video', 'audio', 'pid', 'eid1'].includes(name)" :key="name" class="item">
            <span v-if="Array.isArray(value)">
              <span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>
              <span v-for="item in value" :key="item">
                <!-- <Chip :label="data.features[a]" /> -->
                <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag>
              </span>
            </span>
            <span v-else>
              <span v-if="typeof value === 'string'">
                <span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>
                <span v-if="name=='situation'">
                  <span v-html='value.split("А").join(a).split("Б").join(b)'></span>
                </span>
                <span v-else>
                  {{value}}
                </span>
              </span>
              <span v-else>
                <span v-if="data.features[value]">
                  <span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>
                    {{data.features[value][0]}}
                </span>
              </span>
            </span>
          </div>
          <div v-if="value && value.length && name == 'examples'" :key="name">
            <Inplace :closable="false">
              <template #display>
                <span className="pi pi-bookmark" style="vertical-align: middle"></span>
                <span style="margin-left:.5rem; vertical-align: middle">Пример{{value.length>1?"ы":''}}</span>
              </template>
              <template #content>
                <div class="example">
                  <div v-for="(v, k) in value" :key="k">
                    <span class="example-text">{{v.text}}</span> <span class="example-author">{{v.author}}</span>  <span class="example-pub">{{v.pub}}</span>  <span v-if="v.journal" class="example-journal" title="публикация в журнале">(«{{v.journal}}»)</span> <span class="example-pubdate">{{v.pubdate}}</span>
                  </div>
                </div>
              </template>
            </Inplace>
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
.example {
  border: 1px solid orange;
}
.example-text {
  /* font-stretch: condensed; */
  letter-spacing: -1px;
  font-style: italic;
}
.example-author {
  color: purple;
}
.example-pub {
  color: green;
}
.example-pubdate {
  color: blue;
}
</style>
