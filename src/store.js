import { reactive } from 'vue';
import project from '../package.json';
import { data } from 'vite:data';

const lang = import.meta.env.VITE_LANG || 'ru';

const media = import.meta.env.VITE_MEDIA
  ? location.protocol + '//' + import.meta.env.VITE_MEDIA
  : document.location.origin + '/api/media';

const similarity = { f: ['semfunc', 'semtone'], r: [null, 'pragma'] };

const state = reactive({
  accessed: [],
  about: {
    active: 3,
  },
  autocomplete: {
    checked: false,
    mode: 'native',
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

const ruen = {
  "А": "A",
  "Б": "B",
  "В": "V",
  "Г": "G",
  "Д": "D",
  "Е": "E",
  "Ё": "Ë",
  "Ж": "Ž",
  "З": "Z",
  "И": "I",
  "Й": "J",
  "К": "K",
  "Л": "L",
  "М": "M",
  "Н": "N",
  "О": "O",
  "П": "P",
  "Р": "R",
  "С": "S",
  "Т": "T",
  "У": "U",
  "Ў": "Ŭ",
  "Ф": "F",
  "Х": "X",
  "Ц": "C",
  "Ч": "Č",
  "Ш": "Š",
  "Щ": "Šč",
  "Ы": "Y",
  "Ь": "ʹ",
  "Ъ": "",
  "Э": "È",
  "Ю": "Ju",
  "Я": "Ja",
  "а": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "д": "d",
  "е": "e",
  "ё": "ë",
  "ж": "ž",
  "з": "z",
  "и": "i",
  "й": "j",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ф": "f",
  "х": "x",
  "ц": "c",
  "ч": "č",
  "ш": "š",
  "щ": "šč",
  "ы": "y",
  // "ь" : "ʹ",
  "ь": "’",
  "ъ": "",
  "э": "è",
  "ю": "ju",
  "я": "ja"
};

const translit = (content) => {
  if (!import.meta.env.VITE_TRANSLIT) {
    return content;
  }
  var res = '';
  for (var i = 0; i < content.length; i++) {
    var ch = content.charAt(i);
    if (ch === "\n") {
      res += "<br/>";
      continue;
    }
    var trch = ruen?.[ch] ? ruen[ch] : ch;
    res += trch;
  }
  return res;
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
  translit,
  similarity,
  title: import.meta.env.VITE_TITLE || project?.name || 'App Title',
  name: import.meta.env.VITE_NAME || project?.name || 'App Name',
  sub: import.meta.env.VITE_SUB,
  credits: import.meta.env.VITE_CREDITS,
  lang,
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
