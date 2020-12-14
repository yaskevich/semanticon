<template>
  <div class="home p-component">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Дискурсивные формулы"/>
    <div class="div-container">
      <h3>Введите свой e-mail</h3>
      <form @submit.prevent="greet">
        <InputText type="text" v-model="text"/>
        <Button type="submit" label="Submit"/>
        <div class="msg">{{message}}</div>
      </form>
    </div>

    <Toast/>

  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from './HelloWorld.vue'

export default {
  name: 'Home',
  data() {
      return {
          message: null,
          text: null
      }
  },
  methods: {
      greet() {
          this.$toast.add({severity: 'info', summary: this.text.substring(0,12) + '...'});
          this.message = 'E-mail ' + this.text + ' добавлен в базу';
      }
  },
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.msg {
  margin-top: 1rem;
}

.app-container {
  text-align: center;
}

body #app .p-button {
  margin-left: .2em;
}

form {
  margin-top: 2em;
}
</style>
