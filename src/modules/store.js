// eslint-disable-next-line no-unused-vars
import { reactive, readonly, computed } from "vue";

const state = reactive({
  msg: ["hi"],
  accessed: [],
  search:  {
   'semtone' : [],
   'actclass' : [],
   'organ' : [],
   'semfunc' : null,
   'intonation' : null,
   'translations' : null,
   'parts' : null, // was false => null or change UI to radiobuttons
 },
  config: {
    "user": {},
    "test": 1,
    "features": {},
    "pages": null,
  }
});

export default {
  // state: readonly(state),
  state: state,
  actions: {
    isAuth() {
      return Boolean(Object.keys(state.config.user).length);
    },
    add(item) {
      state.msg.push(item);
    },
    page(key, datum){
      state.config[key] = datum;
      // console.log(key, datum);
      // console.log("STORE", key, state.config.pages);
      // state.config.pages[key] = datum;
      // Object.assign(state.config.page, {[key]: datum});
      // console.log("store", state);
    },
    set(key, value) {
      state.config[key] = value;
    },
    init(value) {
      state.config = value;
    },
  }
};
