import { reactive } from 'vue';
import project from '../package.json';
import { data } from 'vite:data';

const media = import.meta.env.VITE_MEDIA
  ? location.protocol + '//' + import.meta.env.VITE_MEDIA
  : document.location.origin + '/api/media';

const state = reactive({
  accessed: [],
  about: {
    active: 3,
  },
  autocomplete: {
    checked: false,
    mode: 'ru',
    text: '',
    matches: {},
  },
  search: {
    semtone: [],
    actclass: [],
    organ: [],
    semfunc: null,
    intonation: null,
    translations: null,
    parts: null, // was false => null or change UI to radiobuttons
  },
  config: {
    features: {},
    pages: null,
  },
});

if (import.meta.env.VITE_DATA && Object.keys(data).length) {
  state.config = data;
}

const getData = async () => {
  try {
    const endpoint = '/api/data';
    const getApiData = await fetch(endpoint);
    const datum = await getApiData.json();
    // console.log(`API [${endpoint}] →  app`);
    state.config = datum;
  } catch (e) {
    console.log(e);
  }
};

const italic = (x) => x.replace('{', '<strong>').replace('}', '</strong>').replace('[', '<em>').replace(']', '</em>');

export default {
  title: import.meta.env.VITE_TITLE || project?.name || 'App Title',
  name: import.meta.env.VITE_NAME || project?.name || 'App Name',
  sub: import.meta.env.VITE_SUB,
  italic,
  getData,
  version: project.version,
  state,
  media,
  actions: {
    isAuth() {
      return Boolean(Object.keys(state.config.user).length);
    },
    set(key, value) {
      state.config[key] = value;
    },
  },
};
