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
import Tag from 'primevue/tag';
// import Chip from 'primevue/chip';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
const app = createApp(App);
const pvLocale = {
    hi: 'Разное',
    title: "Дискурсивные формулы",
    phrase: {
      extrequired : "требуется продолжение",
      semantics: "семантика",
      act1: "речевой акт 1",
      actclass:  "тип речевого акта",
      situation: "о ситуации",
      parts: "структура",
      intonation: "интонация",
      extension: "продолжение",
      mods: "модификации",
      gest: "жестикуляция",
      organ: "активный орган"
    }
}
app.provide("store", store);
app.use(PrimeVue, {
    locale: pvLocale
});
app.use(ToastService);
app.use(router);
document.title = pvLocale.title;

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('Tag', Tag);
// app.component('Chip', Chip);
app.mount('#app')
