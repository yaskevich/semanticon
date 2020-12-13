// eslint-disable-next-line no-unused-vars
import { reactive, toRefs, unref} from "vue";

const state = reactive({
  // error: null,
  // phraseslist: null,
  // loaded: false,
  // loading: false,
  isLoaded: {},
  errors:  {},
  data: {}
});

export default function queryLibrary() {
  const loadData = async (key, endpoint) => {
    if (!state.isLoaded[key]) {
      try {
        const getApiData = await fetch(endpoint);
        const datum = await getApiData.json();
        console.log("get", endpoint);
        state.data[key] =  datum;
        // console.log(key, unref(state.data[key]));
        // console.log(key, datum);
        // console.log(key, unref(state.data));
        state.isLoaded[key] = true;
      } catch (e) {
        state.errors[key] = e;
      }
    }
  };

  return { ...toRefs(state), loadData };
}
