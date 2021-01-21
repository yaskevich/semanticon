<template>
  <div class="unit">
    <!-- <div style='float:right;'>
      <Button v-bind:icon="auth ? 'pi pi-pencil': 'pi pi-heart'" v-bind:class="auth ? 'p-button-rounded p-button-danger': 'p-button-rounded p-button-help'" />
  </div> -->
  <div style='float:right;'>
    <Button :icon="'pi pi-' + (display ? 'minus' : 'plus')" class="p-button-rounded" @click="clicked($event)"/>
  </div>

  <h3 class="article-title">
    <span>
      {{data.exprs[$route.params.id].map(x => data.tokens.values[data.tokens.keys.indexOf(x)]).join('&#8239;')}}
    </span><span v-if="num"><sup>{{num}}</sup></span>
  </h3>

    <!-- <h4>Значение
      <span v-if="num">{{num}}</span>
    </h4> -->
    <div :class="'article-body' + ' ' + display">
    <div class="p-mb-2">
      <span v-if="data.features[unit['semfunc']] && data.features[unit['semfunc']][0]">
        <router-link :to="{ name: 'List', params: { prop: 'semfunc', id: unit['semfunc'] } }" tag="li" class="interactive back-3">
          {{data.features[unit['semfunc']][0]}}
        </router-link>
      </span>


      <span v-for="item in unit['semtone']" :key="item">
        <!-- <Chip :label="data.features[a]" /> -->
        <!-- <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag> -->
        <!-- {{item}} -->
        <router-link :to="{ name: 'List', params: { prop: 'semtone', id: item } }" tag="li" class="interactive back-2">
          {{data.features[item][0]}}
        </router-link>
      </span>
      <span v-if="data.features[unit['style']] && data.features[unit['style']][0]">
          ({{data.features[unit['style']][0]}})
      </span>
    </div>
    <div class="parts3" v-if="unit.hasOwnProperty('parts') && unit['parts']">
      [{{ $primevue.config.locale.parts3}}]
    </div>
    <div v-else class="parts2">
      <div class="p-pb-2">
      <span class="article-field">{{ $primevue.config.locale.phrase.parts}}</span>
      [{{ $primevue.config.locale.parts2}}]
    </div>
    <div class="p-pb-2">
      <span class="article-field">Б: </span>
      <span v-for="item in unit['actclass']" :key="item">
          <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag>
      </span>
    </div>
    <div class="p-pb-2">
      <span class="article-field">А: </span>
        {{data.exprs[$route.params.id].map(x => data.tokens.values[data.tokens.keys.indexOf(x)]).join('&#8239;')}}
        <span v-if="data.features[unit['semfunc']] && data.features[unit['semfunc']][0]">
          <router-link :to="{ name: 'List', params: { prop: 'semfunc', id: unit['semfunc'] } }" tag="li" class="interactive back-3">
            {{data.features[unit['semfunc']][0]}}
          </router-link>
        </span>


        <span v-for="item in unit['semtone']" :key="item">
          <!-- <Chip :label="data.features[a]" /> -->
          <!-- <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag> -->
          <!-- {{item}} -->
          <router-link :to="{ name: 'List', params: { prop: 'semtone', id: item } }" tag="li" class="interactive back-2">
            {{data.features[item][0]}}
          </router-link>
        </span>
    </div>
    </div>
    <div>
      <template v-for="(value, name, index) in $primevue.config.locale.phrase">

        <!-- <div v-if="name === 'parts'"  class="item" :key="index">
          <span class="article-field">{{$primevue.config.locale.phrase[name]}}: </span>
          <span>
            {{ unit.hasOwnProperty(name) && unit[name] ? $primevue.config.locale.parts3: $primevue.config.locale.parts2 }}
          </span>
        </div> -->


        <div v-if="unit.hasOwnProperty(name) && unit[name]" class="item" :key="index">

          <span v-if="name === 'extrequired'">
            <span class="article-field">{{value}} </span>
          </span>

          <!-- drop semtone actclass -->
          <span v-else-if="['act1', 'extension', 'gest', 'organ'].includes(name)">
            <span class="article-field">{{value}}: </span>
              <span v-for="item in unit[name]" :key="item">
                <!-- <Chip :label="data.features[a]" /> -->
                <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag>
              </span>
          </span>

          <!-- <span v-else-if="name  === 'semfunc'">
            <span v-if="data.features[unit[name]] && data.features[unit[name]][0]">
              <span class="article-field">{{value}}: </span>
              <router-link :to="{ name: 'List', params: { prop: name, id: unit[name] } }" tag="li" class="interactive back-3">
                {{data.features[unit[name]][0]}}
              </router-link>
            </span>
          </span> -->

          <!-- <span v-else-if="name === 'semtone'">
            <span class="article-field">{{value}}: </span>
            <span v-for="item in unit[name]" :key="item">
                {{data.features[item][0]}}
            </span>
          </span> -->

          <!-- drop style -->
          <span v-else-if="['intonation'].includes(name)">
            <span v-if="data.features[unit[name]] && data.features[unit[name]][0]">
              <span class="article-field">{{value}}: </span>
                {{data.features[unit[name]][0]}}
            </span>
          </span>

          <span v-else-if="['mods', 'comment'].includes(name)">
            <span class="article-field">{{value}}: </span>
            <span>
              {{unit[name]}}
            </span>
          </span>

          <span v-else-if="name === 'situation'">
            <span class="article-field">{{value}}: </span>
            <span v-html='unit[name].split("А").join(a).split("Б").join(b)'></span>
          </span>

          <div v-else-if="name === 'examples'">
            <Inplace :closable="false">
              <template #display>
                <span class="article-field" style="vertical-align: middle">Пример{{unit[name].length>1?"ы":''}}</span>
                <span className="pi pi-bookmark" style="vertical-align: middle"></span>
              </template>
              <template #content>
                <div class="example">
                  <div v-for="(v, k) in unit[name]" :key="k">
                    <span class="example-text">{{v.text}}</span> <span class="example-author">{{v.author}}</span>  <span class="example-pub">{{v.pub}}</span>  <span v-if="v.journal" class="example-journal" title="публикация в журнале">(«{{v.journal}}»)</span> <span class="example-pubdate">{{v.pubdate}}
                    </span> <span class="">‹{{$primevue.config.locale.lang[v.lang]}}›</span>
                  </div>
                </div>
              </template>
            </Inplace>
          </div>

          <div v-else-if="name === 'construction' && unit[name].length">
            <span class="article-field">{{value}}: </span>
            <div v-for="(v, k) in unit[name]" :key="k" class="construction">
              <!-- <span v-if="v.hasOwnProperty('link') && v['link']">
                <a href="v.link">{{v.syn}}</a>
              </span>
              <span v-else>{{v.syn}}
              </span> -->

                {{v.syn}}&nbsp;<span v-if="v.hasOwnProperty('link') && v['link']">
                  <a :href="v.link" target="_blank"><i class='pi pi-external-link' style='color: blue;'></i></a>
                </span>
            </div>
          </div>

          <div v-else-if="name === 'translations' && unit[name].length">
            <span class="article-field">{{value}}: </span>
            <span v-for="(v, k) in unit[name]" :key="k">
              <span class="example-text">{{data.trans[v]['txt']}}</span> ({{$primevue.config.locale.lang.hasOwnProperty(data.trans[v]['lang'])?$primevue.config.locale.lang[data.trans[v]['lang']]:data.trans[v]['lang']}})
            </span>
          </div>

          <div v-else-if="name === 'audio' && unit[name].length">
            <div v-for="(v, k) in unit[name]" :key="k" class="audio">
              <audio
                src="/api/media/horse.ogg"
                controls>
                Ваш браузер не поддерживает элемент <code>audio</code>.
              </audio>
              <!-- https://stackoverflow.com/questions/4126708/is-it-possible-to-style-html5-audio-tag -->
              <!-- {{data.media[v]}} -->
            </div>
          </div>

          <div v-else-if="name === 'video' && unit[name].length" class="video">
            <span v-for="(v, k) in unit[name]" :key="k" class="p-pr-4">
              <video
                :src="'/api/media/' + ['crazy.mp4', 'amused-cat.mp4'][k]"
                width ="200"
                controls>
                Ваш браузер не поддерживает элемент <code>video</code>.
              </video>
            </span>
          </div>

        </div>

      </template>
      <Divider v-if="!last" type="dashed"/>
    </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
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
    const display = ref('');
    const clicked = (e) => {
      display.value = display.value? '' : 'p-d-none';
      console.log("switch display", display.value, e);
    }
    return {
      display,
      clicked,
      a: 'А', b: 'Б'
      // a: "<img class='emoji' title='Первый участник ситуации' alt='Первый участник ситуации' src='/api/icon/1' height='20' width='20' align='absmiddle'>", // 🐱👨👱<i class='pi pi-user-plus' style='color: red;'></i>
      // b: "<img class='emoji' title='Второй участник ситуации' alt='Второй участник ситуации' src='/api/icon/2' height='20' width='20' align='absmiddle'>" //🐭👩👯💃<i class='pi pi-user-minus' style='color: magenta;'></i>
      ,
    }
  }
};
</script>

<style>
.video {
  /* float:left; */
  padding:1rem;
  align:left;
    /* right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    background-size: cover;
    overflow: hidden; */
}
.unit {
  /* border: 1px solid red;*/
  margin-top: 2rem;
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

a.interactive {
  text-decoration: none;
  /* background:yellow; */
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: .3rem;
  /* margin-left:.3rem; */
  color: black;
  border: 1px solid white;
}

a.interactive:hover {
    background: black; /* Цвет фона под ссылкой */
    color: #ffe; /* Цвет ссылки */
    border: 1px solid brown;
   }

</style>
