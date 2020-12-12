
   <template v-if="dataReady">
    <div id="nav">
      <router-link to="/">Главная</router-link> |
      <router-link to="/about">О проекте</router-link> |
      <router-link to="/kek">Разное</router-link> |
      <router-link to="/login">Войти</router-link>
    </div>
    <router-view/>
  </template>
  <template v-else>
    загрузка...
  </template>


<script>
import { ref } from "vue";
import {onBeforeMount} from 'vue'
import queryLibrary from "./modules/queries";
export default {
  name: "App",

   setup() {
    onBeforeMount(async() => {
      const { featuresError, loadFeatures } = queryLibrary();
      await loadFeatures();
      if (featuresError.value) {
          console.log("error", featuresError);
      }

      console.log('mounted!')
   })
    console.log("setup");
    let dataReady = ref(false);
    //
    // const { featuresError, loadFeatures } = queryLibrary();
    // //
    // await loadFeatures();
    // dataReady.value = true;

    // return { featuresList, error };
    return {
      dataReady,
      // featuresError
    };
  }

};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
