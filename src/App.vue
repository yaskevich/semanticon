<template >
  <div id="main" v-if="dataReady">
  <div id="nav" class="p-component">
    <router-link to="/">Главная</router-link> |
    <router-link to="/about">О проекте</router-link> |
    <router-link to="/home">{{$primevue.config.locale.hi}}</router-link> |
    <router-link v-if="isAuth" to="/logout">Выйти</router-link>
    <router-link v-else to="/login">Войти</router-link>
  </div>
  <div id="content">
    <router-view />
  </div>
  <div id="footer" class="p-component">
     &copy; 2020—2021, «Дискурсивные формулы». НИУ ВШЭ, Школа лингвистики.
      <!-- <pre>store.state: {{ state }}</pre> -->
  </div>
  </div>
  <div v-else>
    загрузка...
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, unref } from "vue";
import { inject } from "vue";
import {onBeforeMount} from 'vue'
import queryLibrary from "./modules/queries";

export default {
  name: "App",

   setup() {
    const store = inject("store");
    onBeforeMount(async() => {
      const { errors, loadData } = queryLibrary();
      await loadData("features", "/api/features");
      // document.title = $primevue.config.locale.hi;
      if (errors.features && errors.features.value) {
          console.log("error", errors.features);
      }
      dataReady.value = true;
      console.log('app → mounted!')
   })
    console.log("app → setup");
    let dataReady = ref(false);
    return {
      dataReady,
      isAuth: store.isAuth,
      // featuresError
    };
  },
};
</script>

<style>
body {
}
#app {
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  justify-content: center;
  align-items: center; */
}
#main {
  display: flex;
    flex-direction: column;
    min-height: 97vh;
   max-width: 100vh;
   margin: auto;
}
#nav {
  padding: 2rem;
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  display: inline-block; */
  /* height: 100px; */
  /* width: 100%; */
  background-color: rgb(200, 200, 200);
}
#content {
  /* min-height:80vh; */
  flex: 1;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#footer {
  background-color:pink;
  margin-top:auto;
}
</style>
