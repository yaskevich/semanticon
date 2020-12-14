import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
const app = createApp(App);
const pvLocale = {
    hi: 'Разное',
    title: "Дискурсивные формулы"
}
app.use(PrimeVue, {
    locale: pvLocale
});
app.use(ToastService);
app.use(router);
document.title = pvLocale.title;

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);

app.mount('#app')
