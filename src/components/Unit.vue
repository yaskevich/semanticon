<template>
  <div class="unit">
  <div class="p-d-flex ">
    <div class="p-mr-2">
      <div class="article-title app-title-basic p-mb-2">
        <span>
          {{title}}
        </span><span v-if="num"><sup>{{num}}</sup></span>
        <Button v-if="sound" icon="pi pi-volume-up" class="p-button-text p-ml-3" style="padding:0 !important;" @click="playClicked()"/>
      </div>
        <transition name="fade">
          <div class="article-body" v-if="display">

          <div class="article-tags p-mb-2">
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

          <div v-if="selectedLang.length" class="article-langs p-mb-4">
            <Dropdown :disabled="langValues.length === 1" optionValue="value" v-model="selectedLang" :options="langValues" optionLabel="name" placeholder="Выберите язык" class="lang-combo"/>
            <span v-for="item in langValues.filter(x => x.value == selectedLang)[0]['data']" :key="item">
              ‹{{item.txt}}›&nbsp;
              <Inplace v-if="unit.hasOwnProperty('examples') && unit.examples.filter(x => x.lang===selectedLang).length" class="article-trans-ex">
                  <template #display>
                      <span class="pi pi-bookmark" style="vertical-align: middle"></span>
                  </template>
                  <template #content>
                    <Example v-for="(v, index) in unit.examples.filter(x=>x.lang===selectedLang)" :key="index" :datum="v"/>
                  </template>
              </Inplace>
            </span>
          </div>

          <div class="article-parts p-mb-6">
            <span class="article-field">{{ $primevue.config.locale.phrase.parts}}</span>
            <template v-if="unit.hasOwnProperty('parts') && unit['parts']">
              [{{ $primevue.config.locale.parts3}}]
              <div class="p-mt-2"></div>
              <div class="p-pb-2">
                <span class="article-field">{{$primevue.config.locale.p1}}:</span>
                <span class="p-pr-2">{{unit.remarks[1]}}</span>
                <span v-for="item in unit['act1']" :key="item">
                  <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag>
                </span>
              </div>
            </template>
            <template v-else>
              [{{ $primevue.config.locale.parts2}}]
              <div class="p-mt-2"></div>
            </template>


            <div class="p-pb-2">
              <span class="article-field">{{$primevue.config.locale.p2}}:</span>
              <span class="p-pr-2">{{unit.remarks[0]}}</span>
              <span v-for="item in unit['actclass']" :key="item">
                  <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag>
              </span>
            </div>
            <div class="p-pb-2">
              <span class="article-field">{{$primevue.config.locale.p1}}:</span>
                <span class="last-remark p-pr-2">{{title}}</span>
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


          <template v-for="(value, name, index) in $primevue.config.locale.phrase">


            <div v-if="unit.hasOwnProperty(name) && unit[name]" class="item" :key="index">
              <span v-if="['gest'].includes(name)">
                <span class="article-field">{{value}}: </span>
                  <span v-for="item in unit[name]" :key="item" class="p-pr-4">
                    ·{{data.features[item][0]}}·
                  </span>
              </span>
              <!-- drop style -->
              <span v-else-if="['intonation'].includes(name)">
                <span v-if="data.features[unit[name]] && data.features[unit[name]][0]">
                  <span class="article-field">{{value}}: </span>
                    {{data.features[unit[name]][0]}}
                </span>
              </span>
              <!-- <span v-else-if="['mods', 'comment'].includes(name)">
                <span class="article-field">{{value}}: </span>
                <span>
                  {{unit[name]}}
                </span>
              </span> -->
              <span v-else-if="name === 'situation'">
                <span class="article-field">{{value}}: </span>
                <span v-html='unit[name].split("А").join(a).split("Б").join(b)'></span>
              </span>

              <div v-else-if="name === 'examples'">
                <Inplace :closable="false">
                  <template #display>
                    <span class="article-field" style="vertical-align: middle">Пример{{unit[name].filter(x => x.lang==='rus').length>1?"ы":''}}</span>
                    <span className="pi pi-bookmark" style="vertical-align: middle"></span>
                  </template>
                  <template #content>
                    <div class="example">
                      <Example v-for="(v, index) in unit[name].filter(x=>x.lang==='rus')" :key="index" :datum="v"/>
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
                      <a :href="v.link" target="_blank"><i class='pi pi-external-link'></i></a>
                    </span>
                </div>
              </div>

              <!-- <div v-else-if="name === 'translations' && unit[name].length">
                <span class="article-field">{{value}}: </span>
                <span v-for="(v, k) in unit[name]" :key="k">
                  <span class="example-text">{{data.trans[v]['txt']}}</span> ({{$primevue.config.locale.lang.hasOwnProperty(data.trans[v]['lang'])?$primevue.config.locale.lang[data.trans[v]['lang']]:data.trans[v]['lang']}})
                </span>
              </div> -->

              <!-- <div v-else-if="name === 'audio' && unit[name].length">
                <div v-for="(v, k) in unit[name]" :key="k" class="audio">
                  <audio
                    src="/api/media/horse.ogg"
                    controls>
                    Ваш браузер не поддерживает элемент <code>audio</code>.
                  </audio>
                </div>
              </div> -->

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


        </div>
        </transition>
    </div>
    <div class="p-ml-auto ">
      <div>
        <Button v-if="num" :icon="'pi pi-' + (display ? 'minus' : 'plus')" class="p-button-rounded p-mb-2"  @click="display = !display"/>
      </div>
      <div v-if="display">
        <Button icon="pi pi-question" class="p-button-rounded p-button-secondary p-mb-2"  @click="doGoToHelp($event)"/>
      </div>
      <div v-if="display">
        <router-link :to="{ name: 'SimilarList', params: { id: unit.id } }" tag="li" class="nounderline">
          <Button icon="pi pi-sitemap" class="p-button-rounded p-button-secondary p-mb-2" />
        </router-link>
      </div>
      <!-- <Button v-bind:icon="auth ? 'pi pi-pencil': 'pi pi-heart'" v-bind:class="auth ? 'p-button-rounded p-button-danger': 'p-button-rounded p-button-help'" /> -->
    </div>

  </div>
  <div class="article-notes p-mt-4" v-if="(unit.hasOwnProperty('extrequired') && unit['extrequired']) || unit.hasOwnProperty('extension') || unit.hasOwnProperty('comment') || unit.hasOwnProperty  ('mods')">
    <Panel header="Комментарий" :toggleable="true" :collapsed="true" v-if="display">
      <div v-if="unit['comment']">
        <!-- <span class="article-field">{{$primevue.config.locale.phrase.comment}}:</span> -->
        <span class="p-text-bold">{{unit['comment']}}</span>
      </div>
      <div v-if="unit['mods']">
        <span class="article-field">{{$primevue.config.locale.phrase.mods}}:</span>
        <span class="p-text-italic">{{unit['mods']}}</span>
      </div>
      <div v-if="unit['extrequired']">
        <span class="article-field">{{$primevue.config.locale.phrase.extrequired}}</span>
      </div>
      <div v-if="unit['extension']">
        <span class="article-field">{{$primevue.config.locale.phrase.extension}}:</span>
          <span v-for="item in unit['extension']" :key="item" class="p-pr-4">
            <!-- <Chip :label="data.features[a]" /> -->
            <!-- <Tag class="p-mr-2" severity="warning" :value="data.features[item][0]" rounded></Tag> -->
            {{data.features[item][0]}}
          </span>
      </div>
    </Panel>
  </div>
  <Divider v-if="!last" type="dashed"/>
  </div>
</template>
<script>
import { ref } from "vue";
import { usePrimeVue } from "primevue/config";
import store from "@/modules/store";
import router from "../router";
import { useRoute } from 'vue-router';
import Example from "./Example.vue";
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
  setup (props){

    const selectedLang = ref({});
    const primevue = usePrimeVue();

    const vuerouter = useRoute();
    const id = vuerouter.params.id;

    const title = props.data.exprs[id]
      .map(x => props.data.tokens.values[props.data.tokens.keys.indexOf(x)])
      .join(' ');


    let sound;
    if (Object.prototype.hasOwnProperty.call(props.unit, 'audio') && props.unit.audio.length){
      sound  = new Audio(document.location.origin + "/api/media/horse.ogg");
      console.log(props.data.media[props.unit.audio[0]]);
      // sound.value.play();
    }

    const playClicked = () => {
      sound.play();
    };

    const doGoToHelp = () => {
      store.state.about.active = 3;
      router.push("/about")
    };

    let langValues = [];
    if (props.unit['translations']){
        const lang2Translations  = props.unit['translations']
          .map(x => props.data.trans[x])
          .reduce((all, data) => {
            (all[data.lang] = all[data.lang] || {"value": data.lang, "name": primevue.config.locale.lang[data.lang], "data":[]})["data"]
            .push(data);
            return all;
          }, {});
        // console.log("res", results);
        const langs = Object.keys(lang2Translations);
        let sel = langs.indexOf('eng');
        if (sel === -1) { sel = 0; }
        langValues  = Object.values(lang2Translations);
        selectedLang.value = langs[sel];
        // console.log("sel", selectedLang);
    }

    let display = ref(true);
    return {
      title,
      Example,
      doGoToHelp,
      playClicked,
      sound,
      langValues,
      selectedLang,
      display,
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

.item {
  /* margin-bottom: .5rem; */
  line-height:2;
}
.article-title{
  font-size: 1.5rem;
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
.pi-volume-up{
  /* margin-bottom: -0.1rem; */
}
.pi-volume-up:before {
    font-size: 2.2rem;
}
.last-remark{
  display: inline-block;
}
.last-remark:first-letter {
    text-transform: uppercase;
}
.lang-combo{
  min-width: 12rem;
}
.article-trans-ex{
  display:inline-block;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
.fade-enter-active,
.fade-leave-active {
  max-height: 500px;
   transition: max-height 0.25s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0px;
  transition: max-height 0.15s ease-out;
}
</style>
