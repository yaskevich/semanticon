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
import axios from "axios"
import router from "../router"
import store from "@/modules/store";

export default function queryLibrary() {
  const getUser = () => {
    if (!store.actions.isAuth()) {
      axios.get("/api/user")
          .then((response) => {
              store.actions.set("user", response.data.user);
          })
          .catch((errors) => {
              console.log(errors)
              // router.push("/")
          })
    }
  }
  const doLogout = () => {
    axios.get("/api/logout")
        // .then((response) => {
        .then(() => {
          store.actions.set("user", {});
          // console.log(response);
          // router.push("/")
          // router.go('/');
        })
        .catch((errors) => {
            console.log(errors)
        })
  }
    const doLogin = (email, password) => {
    if (!store.actions.isAuth()) {
      let payload = {
              email: email,
              password: password
          }
          axios.post("/api/login", payload)
              .then((response) => {
                  store.actions.set("user", response.data.user);
                  router.push("/dashboard")
              })
              .catch((errors) => {
                  console.log("Cannot log in", errors)
              })
      }
  }
  const loadData = async (key, endpoint) => {
    if (!state.isLoaded[key]) {
      // console.log("← API", endpoint);
      try {
        const getApiData = await fetch(endpoint);
        const datum = await getApiData.json();
        console.log("get", endpoint);
        if (key === "features"){
          // console.log("FEATURES", Object.keys(datum.user).length);
          state.data = datum;
          store.actions.init(datum);
          if (Object.keys(datum.user).length){
            store.actions.set("user", datum.user);
          }
        } else {
          console.log("working query");
          // state.data[key] =  datum;
          store.actions.page(key, datum);
        }
        state.isLoaded[key] = true;
      } catch (e) {
        state.errors[key] = e;
      }
    }
  };

  return { ...toRefs(state), loadData, doLogin, doLogout, getUser };
}
