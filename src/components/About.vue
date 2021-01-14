<template>
  <div class="home p-component">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="p-text-center">
      <h2>Дискурсивные формулы</h2>
    </div>
    <div class="p-shadow-1 item">Это модно и современно! Также это подходит тем, кто чтит традиции.</div>
    <div class="p-shadow-2 item">Откройте для себя Вашу дискурсивную формулу успеха!</div>
    <div class="p-shadow-3 item">Успейте подписаться на нашу закрытую новостную рассылку:</div>

    <div class="div-container form-container">
      <h4>Введите свой e-mail</h4>
      <form @submit.prevent="greet">
        <InputText type="text" v-model="text"/>
        <Button type="submit" label="Отправить"/>
        <div class="msg">{{message}}</div>
      </form>
    </div>

    <Toast/>

  </div>


</template>

<script>
// @ is an alias to /src

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
  }
}
</script>

<style scoped>
.item{
  margin:2rem;
  padding:1rem;
}
.form-container{
  margin-bottom:1rem;
}
</style>
