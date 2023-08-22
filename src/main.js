import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import store from './store';
import router from './router';
import VueGtag from 'vue-gtag';

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-orange/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '@fontsource/montserrat'; // Defaults to weight 400 with normal variant.
import '@fontsource/montserrat/400-italic.css'; // Italic variant.
import '@fontsource/montserrat/700.css'; // Bold variant.
import '@fontsource/montserrat/700-italic.css'; // Bold italic variant.
import '@fontsource/montserrat/900.css'; // Black variant.

import ru from '../texts/ru.json'; // Russian locale

import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import PrimeButton from 'primevue/button';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import AutoComplete from 'primevue/autocomplete';
import Inplace from 'primevue/inplace';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import InputSwitch from 'primevue/inputswitch';
import Panel from 'primevue/panel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Badge from 'primevue/badge';
import ScrollTop from 'primevue/scrolltop';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
app.provide('store', store);
app.use(PrimeVue, { locale: ru, });

if (import.meta.env.MODE === 'production' && import.meta.env.VITE_GTAG) {
  app.use(VueGtag, {
    config: { id: import.meta.env.VITE_GTAG },
  });
}

app.directive('tooltip', Tooltip);
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
app.component('PrimeButton', PrimeButton);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('Tag', Tag);
app.use(router);
app.mount('#app');
