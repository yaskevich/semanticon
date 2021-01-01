import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue'
import store from "./modules/store";
import router from './router'

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import AutoComplete from 'primevue/autocomplete';
import Inplace from 'primevue/inplace';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
// import Chip from 'primevue/chip';
import Panel from 'primevue/panel';

const app = createApp(App);
const pvLocale = {
    home: 'Главная',
    filtering: 'Расширенный поиск',
    about: "О проекте",
    title: "Дискурсивные формулы",
    logout: "Выйти",
    loading: "загрузка...",
    yes: "да",
    parts2: "двухчастная",
    parts3: "трёхчастная",
    phrase: {
      extrequired : "требуется продолжение",
      semantics: "семантика",
      act1: "речевой акт 1",
      actclass:  "тип речевого акта",
      situation: "о ситуации",
      parts: "структура",
      intonation: "интонация",
      translations: "переводные аналоги",
      extension: "продолжение",
      mods: "модификации",
      gest: "жестикуляция",
      organ: "активный орган",
      examples: "примеры",
      audio: "аудио",
      video: "видео",
      style: "пометы",
      comment: "комментарий",
      construction: "конструкция",
    }
}
app.provide("store", store);
app.use(PrimeVue, {
    locale: pvLocale
});
app.use(ToastService);
app.use(Panel);
app.use(router);
document.title = pvLocale.title;



app.component('MultiSelect', MultiSelect);
app.component('Inplace', Inplace);
app.component('InputText', InputText);
app.component('AutoComplete', AutoComplete);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('Tag', Tag);
// app.component('Chip', Chip);
app.mount('#app')
