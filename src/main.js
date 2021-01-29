import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue'
import store from "./modules/store";
import router from './router'

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-orange/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "@fontsource/montserrat" // Defaults to weight 400 with normal variant.
import "@fontsource/montserrat/400-italic.css" // Italic variant.
import "@fontsource/montserrat/700.css" // Bold variant.
import "@fontsource/montserrat/700-italic.css" // Bold italic variant.
import "@fontsource/montserrat/900.css" // Bдфсл variant.

import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
// import ToastService from 'primevue/toastservice';
import AutoComplete from 'primevue/autocomplete';
import Inplace from 'primevue/inplace';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
// import Chip from 'primevue/chip';
// import Panel from 'primevue/panel';
import InputSwitch from 'primevue/inputswitch';
import Panel from 'primevue/panel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Badge from 'primevue/badge';
import ScrollTop from 'primevue/scrolltop';


const app = createApp(App);
const pvLocale = {
    // locale: 'rus',
    // switch: 'RUS/ENG',
    p1: 'А',
    p2: 'Б',
    sub: "База данных дискурсивных формул русского языка",
    home: 'Главная',
    // filtering: 'Расширенный поиск',
    filtering: 'Поиск+',
    about: "О проекте",
    title: "Дискурсивные формулы",
    logout: "Выйти",
    loading: "загрузка...",
    yes: "да",
    parts2: "двухчастная",
    parts3: "трёхчастная",
    lang: {
        tgk: "таджикский",
        eng: "английский",
        fin: "финский",
        bua: "бурятский",
        heb: "иврит",
        ita: "итальянский",
        slv: "словенский",
        rus: "русский"
    },
    phrase: {
      extrequired : "требуется продолжение",
      semfunc: "функция",
      semtone: "оттенок",
      translations: "переводные аналоги",
      parts: "структура",
      situation: "фон",
      examples: "примеры",
      act1: "речевой акт 1",
      actclass:  "тип речевого акта",
      intonation: "интонация",
      mods: "модификации",
      gest: "жесты",
      organ: "активный орган",
      style: "пометы",
      audio: "аудио",
      video: "видео",
      construction: "См. в Russian Constructicon",
      comment: "комментарий",
      extension: "продолжение",
    }
}
app.provide("store", store);
app.use(PrimeVue, {
    locale: pvLocale
});

app.component('ScrollTop', ScrollTop);
app.component('Badge', Badge);
app.component('Dropdown', Dropdown);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Panel', Panel);
app.component('SelectButton', SelectButton);
app.component('InputSwitch', InputSwitch);
app.component('MultiSelect', MultiSelect);
app.component('Inplace', Inplace);
app.component('InputText', InputText);
app.component('AutoComplete', AutoComplete);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('Tag', Tag);
// app.component('Chip', Chip);
// app.use(ToastService);
// app.use(Panel);
app.use(router);
// document.title = pvLocale.title;

app.mount('#app')
