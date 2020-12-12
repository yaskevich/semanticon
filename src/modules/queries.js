import { reactive, toRefs } from "vue";

const state = reactive({
  error: null,
  phraseslist: null,
  loaded: false,
  loading: false,
});

export default function getPhrasesData() {
  const load = async () => {
    if (!state.loaded) {
      try {
        const getApiData = await fetch(
          "/api/data"
        );
        // console.log();
        state.phraseslist = await getApiData.json();
        state.loaded = true;
      } catch (e) {
        state.error = e;
      }
    }
  };

  return { ...toRefs(state), load };
}
