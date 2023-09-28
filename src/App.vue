<template>
  <div id="main" v-if="dataReady">
    <div id="nav" class="p-component flex p-3 card">
      <router-link to="/"><span class="app-title app-title-basic">{{ store.title }}</span></router-link>
      <router-link to="/about" class="ml-auto mr-4 page"><span class="nowrap">{{ $primevue.config.locale.about }}</span>
      </router-link>
      <router-link to="/filters" class="page">{{ $primevue.config.locale.filtering }}</router-link>
    </div>
    <div class="p-component pl-3 subtitle" v-if="store?.sub">
      {{ store.sub }}
    </div>
    <div id="content">
      <router-view />
    </div>
    <div id="footer1" class="p-component mt-4 back-1">
      <div class="grid p-4">
        <div class="col">
          <div>Контакты: discourseformulae@gmail.com</div>
          <div class="p-2">
            <img src="./assets/logo_pragmaticon.png" style="max-height: 5rem" />
          </div>
        </div>
        <div class="col">
          <div><a href="#" @click="doGoToHelp(0)">О проекте</a></div>
          <div><a href="#" @click="doGoToHelp(3)">Как пользоваться сайтом</a></div>
          <div>
            <a target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLScXa60guVuUqkIN64o8iebBqMsAC-CdLhAJTRrbNfsav9QfOA/viewform">Обратная
              связь <i class="pi pi-external-link"></i></a>
          </div>
          <div><a target="_blank" href="https://constructicon.github.io/russian/">Русский Конструктикон <i
                class="pi pi-external-link"></i></a></div>
        </div>
      </div>
    </div>
    <ScrollTop />
    <div id="footer2" class="p-component back-1">
      <div class="grid pr-4 pl-4">
        <div class="col">2021, Прагматикон
          <button type="button" v-tooltip="(new Date(store.state.config.settings.updated)).toLocaleString()"> {{
              store?.version
          }}</button>
          <span></span>
        </div>
        <div class="col">
          <a target="_blank" href="https://ling.hse.ru">Школа лингвистики НИУ ВШЭ <i
              class="pi pi-external-link"></i></a>
        </div>
      </div>
      <div class="grid p-4">
        <div class="col">
          Работа над ресурсом поддержана Министерством науки и высшего образования в рамках Соглашения № 075-15-2020-793
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    {{ $primevue.config.locale.loading }}
  </div>
</template>

<script setup>
import { ref, inject, onBeforeMount } from 'vue';
import router from './router';

const store = inject('store');
const dataReady = ref(false);

if (import.meta.env.VITE_DATA) {
  dataReady.value = true;
} else {
  onBeforeMount(async () => {
    await store.getData();
    dataReady.value = true;
  });
}

const doGoToHelp = tab => {
  store.state.about.active = tab || 0;
  router.push('/about');
};

</script>

<style>
.back-1 {
  background-color: #e8eddf;
}

.back-2 {
  background-color: #cfdbd5;
}

.back-3 {
  background-color: #f5cb5c;
}

.chapter {
  font-size: 1.5rem;
}

.p-inputtext,
.p-component {
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

/* #main {
  display: flex;
  flex-direction: column;
  min-height: 97vh;
  max-width: 100vh;
  max-width: 1000px;
  margin: auto;
} */
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

/*
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: blue;
}
#footer {
}
*/
a {
  text-decoration: none;
}

.app-title-basic {
  font-weight: 900;
  text-transform: uppercase;
}

@media only screen and (max-width: 420px) {
  .app-title {
    font-size: 1rem;
    line-height: 1rem;
  }

  .page {
    display: inline-block;
  }
}

@media only screen and (min-width: 421px) {
  .app-title {
    font-size: 2rem;
    line-height: 2rem;
    align-items: baseline;
  }

  .page {
    line-height: 2rem;
  }
}

.nowrap {
  white-space: nowrap;
}

.panel-title {
  font-weight: 400 !important;
}

.p-dropdown-items {
  text-align: left;
}

.p-autocomplete {
  text-align: left;
}

.p-inplace-display {
  padding: 0 !important;
}

span.p-inputswitch-slider {
  max-height: 1.5rem;
  background: red;
}

.explain-header {
  font-weight: bold;
}

.cite {
  font-style: italic;
}

.info {
  line-height: 1.5rem;
}

.article-title {
  text-transform: uppercase;
}

.article-field {
  display: inline-block;
  font-weight: bold;
  padding-right: 0.3rem;
}

.article-field:first-letter {
  text-transform: uppercase;
}

a {
  color: black;
}

.subtitle {
  margin-top: -1.5rem;
}

span.interactive,
a.interactive {
  text-decoration: none;
  /* background:yellow; */
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem;
  /* margin-left:.3rem; */
  color: black;
  border: 1px solid white;
}

a.interactive:hover {
  background: black;
  color: #ffe;
  border: 1px solid brown;
}
</style>
