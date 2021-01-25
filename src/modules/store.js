// eslint-disable-next-line no-unused-vars
import { reactive, readonly, computed } from "vue";
import axios from "axios";
import router from "../router";

const state = reactive({
  accessed: [],
  autocomplete: {
    "checked": false,
    "mode": "ru",
    "text": '',
  },
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

const getUser = () => {
  if (!state.actions.isAuth()) {
    axios.get("/api/user")
        .then((response) => {
            state.actions.set("user", response.data.user);
        })
        .catch((errors) => {
            console.log(errors)
            // router.push("/")
        })
  }
};

const doLogout = () => {
  axios.get("/api/logout")
      // .then((response) => {
      .then(() => {
        state.actions.set("user", {});
        // console.log(response);
        // router.push("/")
        // router.go('/');
      })
      .catch((errors) => {
          console.log(errors)
      })
};

const doLogin = (email, password) => {
  if (!state.actions.isAuth()) {
    let payload = {
            email: email,
            password: password
        }
        axios.post("/api/login", payload)
            .then((response) => {
                state.actions.set("user", response.data.user);
                router.push("/dashboard")
            })
            .catch((errors) => {
                console.log("Cannot log in", errors)
            })
    }
};

const getData = async () => {
    try {
      const endpoint  = "/api/data";
      const getApiData = await fetch(endpoint);
      const datum = await getApiData.json();
      console.log(`API [${endpoint}] →  app`);
      state.config = datum;
      // if (Object.keys(datum.user).length){
      //   state.actions.set("user", datum.user);
      // }
    } catch (e) {
      // state.errors[key] = e;
      console.log(e);
    }
};

export default {
  // state: readonly(state),
  backend: {
    getUser,
    doLogin,
    doLogout,
    getData
  },
  state: state,
  actions: {
    isAuth() {
      return Boolean(Object.keys(state.config.user).length);
    },
    set(key, value) {
      state.config[key] = value;
    },
  }
};
