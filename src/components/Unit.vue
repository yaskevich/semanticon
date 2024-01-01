<template>
  <div class="unit">
    <div class="flex">
      <div class="mr-2">
        <div class="article-title app-title-basic mb-2">
          <span> {{ store.translit(title) }} </span><span v-if="num"><sup>{{ num }}</sup></span>
          <PrimeButton v-if="sound" icon="pi pi-volume-up" class="p-button-text ml-3 audiobutton"
            @click="playClicked()" />
        </div>

        <transition name="fade">
          <div class="article-body" v-if="display">
            <div class="article-tags mb-2">
              <span v-if="data.features[unit['semfunc']] && data.features[unit['semfunc']][store.lang]">
                <router-link :to="{ name: 'List', params: { prop: 'semfunc', id: unit['semfunc'] } }"
                  class="interactive back-3">
                  {{ data.features[unit['semfunc']][store.lang] }}
                </router-link>
              </span>
              <span v-for="item in unit['semtone']" :key="item">
                <!-- <Chip :label="data.features[a]" /> -->
                <!-- <Tag class="mr-2" severity="warning" :value="data.features[item][store.lang]" rounded></Tag> -->
                <!-- {{item}} -->
                <router-link :to="{ name: 'List', params: { prop: 'semtone', id: item } }" class="interactive back-2">
                  {{ data.features[item][store.lang] }}
                </router-link>
              </span>
              <span v-if="data.features[unit['style']] && data.features[unit['style']][store.lang]">
                ({{ data.features[unit['style']][store.lang] }})
              </span>
            </div>

            <div v-if="selectedLang.length" class="article-langs mb-4">
              <Dropdown :disabled="langValues.length === 1" optionValue="value" v-model="selectedLang"
                :options="langValues" optionLabel="name" :placeholder="$primevue.config.locale.chooselang"
                class="lang-combo" />
              <span v-for="item in langValues.filter(x => x.value == selectedLang)[0]['data']" :key="item">
                ‹<span v-html="store.italic(item.txt)"></span>›&nbsp;
                <Inplace
                  v-if="unit.hasOwnProperty('examples') && unit.examples.filter(x => x.lang === selectedLang).length"
                  class="article-trans-ex">
                  <template #display>
                    <span class="pi pi-bookmark valign"></span>
                  </template>
                  <template #content>
                    <Example v-for="(v, index) in unit.examples.filter(x => x.lang === selectedLang)" :key="index"
                      :datum="v" />
                  </template>
                </Inplace>
              </span>
            </div>


            <div class="pb-2" v-if="unit?.tags && unit?.tags !== 'N/A'">
              <!-- <span class="article-field">{{ $primevue.config.locale.phrase.tags }}:</span> -->
              <Tag class="mr-2" severity="info" :value="data.features?.[item]?.[store.lang]" rounded
                v-tooltip="$primevue.config.locale.phrase.tags" v-for="item in unit.tags" />
            </div>

            <div class="pb-2" v-if="data.features?.[unit?.struct]">
              <!-- <span class="article-field">{{ $primevue.config.locale.phrase.struct }}:</span> -->
              <Tag v-tooltip="$primevue.config.locale.phrase.struct" class="mr-2" severity="warning"
                :value="data.features[unit?.struct][store.lang]" rounded></Tag>
            </div>

            <div v-if="unit?.challenge || unit?.action || unit?.pragma || unit?.effect" class="set">
              <div class="pb-2" v-if="unit?.challenge && unit?.challenge !== 'N/A'">
                <!-- <Tag class="mr-2" severity="danger" :value="unit?.challenge" rounded></Tag> -->
                <span class="article-field">{{ $primevue.config.locale.phrase.challenge }}:</span>
                <!-- <span class="pr-2" v-html="unit?.challenge.replace(/\[(.+?)\:(.+?)\]/g, `<a title='$2' href='/mark/$1'>$1</a>`)"></span> -->
                <span class="pr-2" v-if="isNaN(unit.challenge)" v-html="highlightKey(unit.challenge)"></span>
                <span v-else class="pr-2">
                  <router-link :to="'/exp/'+unit.challenge"><span class="font-bold text-white">LINK</span></router-link></span>
              </div>

              <div class="pb-2" v-if="unit?.action && unit?.action !== 'N/A'">
                <span class="article-field">{{ $primevue.config.locale.phrase.action }}:</span>
                <Tag v-tooltip="$primevue.config.locale.phrase.action" class="mr-2" severity="success"
                  :value="unit?.action" rounded>
                </Tag>
              </div>

              <div class="pb-2" v-if="unit?.pragma && unit?.pragma !== 'N/A'">
                <span class="article-field">{{ $primevue.config.locale.phrase.pragma }}:</span>
                <Tag class="mr-2" severity="success" :value="data.features?.[item]?.[store.lang]" rounded
                  v-for="item in unit.pragma" />
              </div>

              <div class="pb-2" v-if="unit?.effect && unit?.effect !== 'N/A'">
                <span class="article-field">{{ $primevue.config.locale.phrase.effect }}:</span>
                <span class="pr-2" v-html="highlightKey(unit.effect)"></span>
              </div>

            </div>

            <div class="pb-2" v-if="data.features?.[unit?.area]?.[store.lang]?.length">
              <span class="article-field">{{ $primevue.config.locale.phrase.area }}:</span>
              <Tag v-tooltip="$primevue.config.locale.phrase.area" class="mr-2" severity="danger"
                :value="data.features[unit?.area][store.lang]" rounded></Tag>
            </div>

            <div v-if="unit?.conditions && unit?.conditions !== 'N/A'">
              <span class="article-field">{{ $primevue.config.locale.phrase.conditions }}:</span>
              <span class="pr-2" v-html="makeList(unit.conditions)"></span>
            </div>

            <div v-if="unit?.description && unit?.description !== 'N/A'">
              <span class="article-field">{{ $primevue.config.locale.phrase.description }}:</span>
              <span class="pr-2" v-html="makeList(unit.description)"></span>
            </div>

            <div class="article-parts mb-2" v-if="unit?.semfunc">
              <span class="article-field">{{ $primevue.config.locale.phrase.parts }}</span>
              <template v-if="unit.hasOwnProperty('parts') && unit['parts']">
                [{{ $primevue.config.locale.parts3 }}]
                <div class="mt-2"></div>
                <div class="pb-2">
                  <span class="article-field">{{ $primevue.config.locale.p1 }}:</span>
                  <span class="pr-2">{{ unit.remarks[1] }}</span>
                  <span v-for="item in unit['act1']" :key="item">
                    <Tag class="mr-2" severity="warning" :value="data.features[item][store.lang]" rounded></Tag>
                  </span>
                </div>
              </template>
              <template v-else>
                [{{ $primevue.config.locale.parts2 }}]
                <div class="mt-2"></div>
              </template>

              <div class="pb-2">
                <span class="article-field">{{ $primevue.config.locale.p2 }}:</span>
                <span class="pr-2">{{ unit?.remarks?.[0] }}</span>
                <span v-for="item in unit['actclass']" :key="item">
                  <Tag class="mr-2" severity="warning" :value="data.features[item][store.lang]" rounded></Tag>
                </span>
              </div>

              <div class="pb-2">
                <span class="article-field">{{ $primevue.config.locale.p1 }}:</span>
                <span class="last-remark pr-2">{{ title }}</span>
                <span v-if="data.features[unit['semfunc']] && data.features[unit['semfunc']][store.lang]">
                  <router-link :to="{ name: 'List', params: { prop: 'semfunc', id: unit['semfunc'] } }"
                    class="interactive back-3">
                    {{ data.features[unit['semfunc']][store.lang] }}
                  </router-link>
                </span>

                <span v-for="item in unit['semtone']" :key="item">
                  <!-- <Chip :label="data.features[a]" /> -->
                  <!-- <Tag class="mr-2" severity="warning" :value="data.features[item][store.lang]" rounded></Tag> -->
                  <!-- {{item}} -->
                  <router-link :to="{ name: 'List', params: { prop: 'semtone', id: item } }" class="interactive back-2">
                    {{ data.features[item][store.lang] }}
                  </router-link>
                </span>
              </div>
            </div>

            <div v-if="unit['examples']">
              <Inplace :closable="false">
                <template #display>
                  <div>
                    <span class="article-field">{{ $primevue.config.locale.phrase.example
                    }}{{ getEnding(unit['examples'].filter(x => x.lang === 'rus')) }}</span>
                    <span className="pi pi-bookmark valign"></span>
                  </div>
                </template>
                <template #content>
                  <div class="example-holder">
                    <Example v-for="(v, index) in unit['examples'].filter(x => x.lang === 'rus')" :key="index"
                      :datum="v" />
                  </div>
                </template>
              </Inplace>
            </div>

            <div v-if="unit['intonation']">
              <span>
                <span v-if="data.features[unit['intonation']] && data.features[unit['intonation']][store.lang]">
                  <span class="article-field">{{ $primevue.config.locale.phrase['intonation'] }}: </span>
                  {{ data.features[unit['intonation']][store.lang] }}
                </span>
              </span>
            </div>

            <div v-if="unit['situation']">
              <span>
                <span class="article-field">{{ $primevue.config.locale.phrase['situation'] }}: </span>
                <span v-html="unit['situation'].split('А').join(a).split('Б').join(b)"></span>
              </span>
            </div>

            <div v-if="unit['construction'] && unit['construction'].length">
              <span class="article-field">{{ $primevue.config.locale.phrase['construction'] }}: </span>
              <div v-for="(v, k) in unit['construction']" :key="k" class="construction">
                <!-- <span v-if="v.hasOwnProperty('link') && v['link']">
                    <a href="v.link">{{v.syn}}</a>
                  </span>
                  <span v-else>{{v.syn}}
                  </span> -->

                {{ v.syn }}&nbsp;<span v-if="v.hasOwnProperty('link') && v['link']">
                  <a :href="v.link" target="_blank"><i class="pi pi-external-link"></i></a>
                </span>
              </div>
            </div>

            <div v-if="unit['video'] && unit['video'].length" class="video">
              <span v-for="(v, k) in unit['video']" :key="k" class="pr-4">
                <video :src="getResource('video', v)" width="200" controls>
                  {{ $primevue.config.locale.videowarning }}
                  <code>video</code>.
                </video>
              </span>
            </div>

            <span v-if="unit['gest']">
              <span class="article-field">{{ $primevue.config.locale.phrase['gest'] }}: </span>
              <span class="article-tags mb-2">
                <span v-for="item in unit['gest']" :key="item" class="interactive back-1">
                  {{ data.features[item][store.lang] }}</span>
              </span>
            </span>

            <!-- <span v-else-if="['mods', 'comment'].includes(name)">
                <span class="article-field">{{value}}: </span>
                <span>
                  {{unit[name]}}
                </span>
              </span> -->
          </div>
        </transition>
      </div>
      <div class="ml-auto">
        <div>
          <PrimeButton v-if="num" :icon="'pi pi-' + (display ? 'minus' : 'plus')" class="p-button-rounded mb-2"
            @click="display = !display" />
        </div>
        <div v-if="display">
          <PrimeButton icon="pi pi-question" class="p-button-rounded p-button-secondary mb-2"
            @click="doGoToHelp($event)" />
        </div>
        <div v-if="display">
          <router-link :to="{ name: 'SimilarList', params: { id: unit.id } }" class="nounderline">
            <PrimeButton icon="pi pi-sitemap" class="p-button-rounded p-button-secondary mb-2" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="article-notes mt-4" v-if="(unit.hasOwnProperty('extrequired') && unit['extrequired']) ||
      unit.hasOwnProperty('extension') ||
      unit.hasOwnProperty('comment') ||
      unit.hasOwnProperty('mods')
      ">
      <Panel :header="$primevue.config.locale.phrase.comment" :toggleable="true" :collapsed="true" v-if="display"
        class="comment">
        <div v-if="unit['comment']">
          <!-- <span class="article-field">{{$primevue.config.locale.phrase.comment}}:</span> -->
          <span class="font-bold">{{ unit['comment'] }}</span>
        </div>
        <div v-if="unit['mods']">
          <span class="article-field">{{ $primevue.config.locale.phrase.mods }}:</span>
          <span class="font-italic">{{ unit['mods'] }}</span>
        </div>
        <div v-if="unit['extrequired']">
          <span class="article-field">{{ $primevue.config.locale.phrase.extrequired }}</span>
        </div>
        <div v-if="unit['extension']">
          <span class="article-field">{{ $primevue.config.locale.phrase.extension }}:</span>
          <span v-for="item in unit['extension']" :key="item" class="pr-4">
            <!-- <Chip :label="data.features[a]" /> -->
            <!-- <Tag class="mr-2" severity="warning" :value="data.features[item][store.lang]" rounded></Tag> -->
            {{ data.features[item][store.lang] }}
          </span>
        </div>
      </Panel>
    </div>
    <Divider v-if="!last" type="dashed" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import store from '../store';
import router from '../router';
import { useRoute } from 'vue-router';
import Example from './Example.vue';

const props = defineProps(['uid', 'num', 'data', 'auth', 'unit', 'last'])
const selectedLang = ref({});
const primevue = usePrimeVue();
const vuerouter = useRoute();
const id = vuerouter.params.id;

const title = props.data.exprs[id]
  .map(x => props.data.tokens.values[props.data.tokens.keys.indexOf(x)])
  .join(' ').replace(' -', '-');

const highlightKey = (str) => str.replace(/\[(.+?)\:(.+?)\]/g, `<span class='metatag' title='$2'>$1</span>`);

const makeList = (str) => '<ul>' + str.split('\n').map(x => '<li>' + x + '</li>').join('') + '</ul>';

let sound;
if (Object.prototype.hasOwnProperty.call(props.unit, 'audio') && props.unit.audio.length) {
  sound = new Audio(store.media + '/audio/' + props.data.media[props.unit.audio[0]]);
}

const playClicked = () => {
  sound.play();
};

const doGoToHelp = () => {
  store.state.about.active = 3;
  router.push('/about');
};

let langValues = [];
if (props.unit['translations']) {
  const lang2Translations = props.unit['translations']
    .map(x => props.data.trans[x])
    .reduce((all, data) => {
      (all[data.lang] = all[data.lang] || {
        value: data.lang,
        name: primevue.config.locale.lang[data.lang],
        data: [],
      })['data'].push(data);
      return all;
    }, {});

  const langs = Object.keys(lang2Translations);
  let sel = langs.indexOf('eng');
  if (sel === -1) {
    sel = 0;
  }
  langValues = Object.values(lang2Translations);
  selectedLang.value = langs[sel];
}

let display = ref(true);

const getResource = (type, x) => new URL(`${store.media}/${type}/${props.data.media[x]}`, import.meta.url);

const getEnding = x => (x?.length > 1 ? primevue.config.locale.plural : '');
// a: 'А',
// b: 'Б',
// a: "<img class='emoji' title='Первый участник ситуации' alt='Первый участник ситуации' src='/api/icon/1' height='20' width='20' align='absmiddle'>",
/// "🐱👨👱<i class='pi pi-user-plus' style='color: red;'></i>",
// b:  "<img class='emoji' title='Второй участник ситуации' alt='Второй участник ситуации' src='/api/icon/2' height='20' width='20' align='absmiddle'>"
// "🐭👩👯💃<i class='pi pi-user-minus' style='color: magenta;'></i>"
</script>

<style>
.video {
  /* float:left; */
  padding: 1rem;
  /* align: left;
    right: 0;
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
  line-height: 2;
}

.article-title {
  font-size: 1.5rem;
}

/* .pi-volume-up {
  margin-bottom: -0.1rem;
} */

.pi-volume-up:before {
  font-size: 2.2rem;
}

.last-remark {
  display: inline-block;
}

.last-remark:first-letter {
  text-transform: uppercase;
}

.lang-combo {
  min-width: 12rem;
}

.article-trans-ex {
  display: inline-block;
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

.valign {
  vertical-align: middle;
}

.audiobutton {
  padding: 0 !important;
}

.comment>.p-panel-header>.p-panel-title {
  font-weight: normal;
}

.example-holder {
  font-family: Courier;
  border: 1px dashed lightgray;
  border-radius: 5px;
}

.set {
  background-color: lightgray;
  padding: .5rem 0rem 0rem .5rem;
  border-radius: 3px;
  margin-bottom: .5rem;
}

.metatag {
  /* border: 1px solid red; */
  padding: 5px;
  border-radius: 10px;
  background-color: lightpink;
  font-size: 0.75rem;
  font-weight: 700;
  color: navy;
  /* line-height: 1.5; */
  vertical-align: middle;
}
</style>
