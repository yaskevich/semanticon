import { reactive, toRefs} from "vue";

const state = reactive({
  error: null,
  phraseslist: null,
  loaded: false,
  loading: false,

  featuresError: null,
  featuresList: null,
  featuresLoaded: false,
  featuresLoading: false,

});

export default function queryLibrary() {
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
  const loadFeatures = async () => {
    if (!state.featuresLoaded) {
      try {
        const getApiData = await fetch(
          "/api/features"
        );
        state.featuresList = await getApiData.json();
        // console.log("feats!", unref(state.featuresList));
        state.featuresLoaded = true;
      } catch (e) {
        state.featuresError = e;
      }
    }
  };

  return { ...toRefs(state), load, loadFeatures };
}
