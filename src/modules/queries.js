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
export default function queryLibrary() {
  const getUser = () => {
    if (!state.isLoaded["user"]) {
      axios.get("/api/user")
          .then((response) => {
              // console.log(response)
              state.data["user"] = response.data.user
          })
          .catch((errors) => {
              console.log(errors)
              // router.push("/")
          })
    }
  }
    const doLogin = (email, password) => {
    if (!state.isLoaded["user"]) {
      let payload = {
              email: email,
              password: password
          }
          axios.post("/api/login", payload)
              .then((response) => {
                  state.isLoaded["user"] = true;
                  state.data["user"] = response.data.user;
                  console.log("Logged in", response.data.user);
                  router.push("/dashboard")
              })
              .catch((errors) => {
                  console.log("Cannot log in")
                  console.log(errors);
              })
      }
  }
  const loadData = async (key, endpoint) => {
    if (!state.isLoaded[key]) {
      try {
        const getApiData = await fetch(endpoint);
        const datum = await getApiData.json();
        console.log("get", endpoint);
        if (key === "features"){
          state.data = datum;
        } else {
          state.data[key] =  datum;
        }
        // console.log(key, unref(state.data[key]));
        // console.log(key, datum);
        // console.log(key, unref(state.data));
        state.isLoaded[key] = true;
      } catch (e) {
        state.errors[key] = e;
      }
    }
  };

  return { ...toRefs(state), loadData, doLogin, getUser };
}
