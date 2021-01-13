<template >
  <div id="main" v-if="dataReady">
  <div id="nav" class="p-component" style="text-align: center;">
    <router-link to="/">PRAGMATICON</router-link> |
    <router-link to="/home">{{$primevue.config.locale.filtering}}</router-link> |
    <router-link to="/about"><span class="nowrap">{{$primevue.config.locale.about}}</span></router-link>
    <!-- | -->
    <router-link v-if="isAuth()" to="/logout">{{$primevue.config.locale.logout}}</router-link>
    <!-- <router-link v-else to="/login">Войти</router-link> -->
  </div>
  <div id="content">
    <router-view />
  </div>
  <div id="footer" class="p-component p-mt-4 back-1">
    <div class="p-grid p-p-4">
      <div class="p-col">
      <div>Контакты:
          discourseformulae@gmail.com
        </div>
        <div class="p-p-2">
          <img src="/api/media/constructicon.png" style="max-height:5rem;"/>
        </div>
      </div>
    <div class="p-col">
      <div>О проекте</div>
      <div>Как пользоваться сайтом</div>
      <div>Русский Конструктикон</div>
    </div>
    </div>
      <!-- <pre>store.state: {{ state }}</pre>
      <pre>store.state: {{ isAuth() }}</pre> -->
  </div>
  <div id="footer" class="p-component back-1">
    <div class="p-grid p-pr-4 p-pl-4">
      <div class="p-col">
          2021, Прагматикон
      </div>
      <div class="p-col">
        Школа лингвистики НИУ ВШЭ
      </div>
    </div>
  </div>
  </div>
  <div v-else>
    {{$primevue.config.locale.loading}}
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
    console.log(store.actions.isAuth());
    return {
      dataReady,
      isAuth: store.actions.isAuth,
      state: store.state,
      // featuresError
    };
  },
};
</script>

<style>
body {
}

.back-1 {
  background-color:#E8EDDF;
}
.back-2 {
  background-color:#CFDBD5;
}
.back-3 {
  background-color:#F5CB5C;
}

.p-component {
  font-family: 'Montserrat', sans-serif !important;
  line-height: 1.5;
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
  /* padding: 2rem; */
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  display: inline-block; */
  /* height: 100px; */
  /* width: 100%; */
  /* background-color: lightblue; */
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
  color: blue;
}
#footer {
  /* background-color:#2E86C1;
  color:white;
  padding: .2rem;
  margin-top:auto;
  text-align:center; */
}
.nowrap {
  white-space: nowrap;
}
</style>
