<template >
  <div id="main" v-if="dataReady">
  <div id="nav" class="p-component p-d-flex p-p-3 card">
    <router-link to="/" class=""><span class="app-title app-title-basic">Pragmaticon</span></router-link>
    <router-link to="/about" class="p-ml-auto p-mr-4 page"><span class="nowrap">{{$primevue.config.locale.about}}</span></router-link>
    <router-link to="/home" class="page">{{$primevue.config.locale.filtering}}</router-link>
    <!-- | -->
    <!-- <router-link v-if="isAuth()" to="/logout">{{$primevue.config.locale.logout}}</router-link> -->
    <!-- <router-link v-else to="/login">Войти</router-link> -->
  </div>
  <div class="p-component p-pl-3" style="margin-top:-1.5rem;">
    {{$primevue.config.locale.sub}}
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
  <ScrollTop />
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

export default {
  name: "App",

   setup() {
    const store = inject("store");
    onBeforeMount(async() => {
      await store.backend.getData();
      // console.log(store);
      // document.title = $primevue.config.locale.hi;
      // if (errors.features && errors.features.value) {
      //     console.log("error", errors.features);
      // }
      dataReady.value = true;
      console.log('app → mounted!')
   })
    console.log("app → setup");
    let dataReady = ref(false);
    console.log("auth:", store.actions.isAuth());
    return {
      dataReady,
      isAuth: store.actions.isAuth,
      state: store.state,
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
.chapter {
  font-size: 1.5rem;
}
.p-inputtext, .p-component {
  font-family: 'Montserrat', sans-serif !important;
  line-height: 1.5;
}


#content {
  display: flex;
  flex-direction: column;
  min-height: 97vh;
  max-width: 100vh;
  /* max-width: 800px; */
  margin: auto;
}
#main {
  /* display: flex;
  flex-direction: column; */
  /* min-height: 97vh; */
  /* max-width: 100vh; */
  /* max-width: 1000px; */
  /* margin: auto; */
}
#nav {
  /* display: flex;
    flex-direction: row;
    flex-wrap: nowrap; */
    align-items: baseline;
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
  /* font-weight: bold; */
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  /* color: blue; */

}
#footer {
}
.app-title-basic{
  font-weight: 900;
  text-transform: uppercase;
}
@media only screen and (max-width : 420px) {
  .app-title{

    font-size: 1rem;
    line-height: 1rem;
  }
  .page{
    display: inline-block;
  }
}
@media only screen and (min-width : 421px) {
  .app-title{
      font-size: 2rem;
      line-height: 2rem;
      align-items: baseline;
  }
  .page{
    line-height: 2rem;
  }
}

/* vertical-align: bottom;
 display: inline-block;
} */
.nowrap {
  white-space: nowrap;
}
.p-panel-title{
  font-weight:400 !important;
}
.p-dropdown-items{
  text-align:left;
}
.p-autocomplete {
	text-align:left;
}
.p-inplace-display{
  padding: 0 !important;
}
span.p-inputswitch-slider{
	max-height: 1.5rem;
	background: red;
}
.explain-header{
	font-weight: bold;
}
.cite{
	font-style: italic;
}
.info{
	line-height: 1.5rem;
}
.article-title{
  text-transform: uppercase;
}
.article-field {
    display: inline-block;
    font-weight: bold;
    padding-right: .3rem;
}

.article-field:first-letter {
    text-transform: uppercase;
}
</style>
