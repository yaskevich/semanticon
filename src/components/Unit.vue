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
      <template v-for="(value, name, index) in $primevue.config.locale.phrase">

        <div v-if="name === 'parts'"  class="item" :key="index">
          <span class="desc">{{$primevue.config.locale.phrase[name]}}: </span>
          <span>
            {{unit.hasOwnProperty(name)?$primevue.config.locale.parts3: $primevue.config.locale.parts2}}
          </span>
        </div>


        <div v-else-if="unit.hasOwnProperty(name) && unit[name]" class="item" :key="name">

          <span v-if="name === 'extrequired'">
            <span class="desc">{{value}} </span>
          </span>

          <span v-else-if="['semantics', 'act1', 'actclass', 'extension', 'gest', 'organ'].includes(name)">
            <span class="desc">{{value}}: </span>
            <span v-for="item in unit[name]" :key="item">
              <!-- <Chip :label="data.features[a]" /> -->
              <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag>
            </span>
          </span>

          <span v-else-if="['intonation', 'style'].includes(name)">
            <span v-if="data.features[unit[name]] && data.features[unit[name]][0]">
              <span class="desc">{{value}}: </span>
                {{data.features[unit[name]][0]}}
            </span>
          </span>

          <span v-else-if="['mods', 'comment'].includes(name)">
            <span class="desc">{{value}}: </span>
            <span>
              {{unit[name]}}
            </span>
          </span>

          <span v-else-if="name === 'situation'">
            <span class="desc">{{value}}: </span>
            <span v-html='unit[name].split("А").join(a).split("Б").join(b)'></span>
          </span>

          <div v-else-if="name === 'examples'">
            <Inplace :closable="false">
              <template #display>
                <span className="pi pi-bookmark" style="vertical-align: middle"></span>
                <span style="margin-left:.5rem; vertical-align: middle">Пример{{unit[name].length>1?"ы":''}}</span>
              </template>
              <template #content>
                <div class="example">
                  <div v-for="(v, k) in unit[name]" :key="k">
                    <span class="example-text">{{v.text}}</span> <span class="example-author">{{v.author}}</span>  <span class="example-pub">{{v.pub}}</span>  <span v-if="v.journal" class="example-journal" title="публикация в журнале">(«{{v.journal}}»)</span> <span class="example-pubdate">{{v.pubdate}}
                    </span>
                  </div>
                </div>
              </template>
            </Inplace>
          </div>
          <div v-else-if="name === 'construction' && unit[name].length">
            <span class="desc">{{value}}: </span>
            <div v-for="(v, k) in unit[name]" :key="k" class="construction">
              <!-- <span v-if="v.hasOwnProperty('link') && v['link']">
                <a href="v.link">{{v.syn}}</a>
              </span>
              <span v-else>{{v.syn}}
              </span> -->
                {{v.syn}}
                <span v-if="v.hasOwnProperty('link') && v['link']">
                  <a :href="v.link" target="_blank"><i class='pi pi-external-link' style='color: blue;'></i></a>
                </span>

            </div>
          </div>

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
.construction {
  padding-left: 1rem;
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
