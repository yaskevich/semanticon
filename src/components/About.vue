<template>
  <div class="home p-component">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="p-text-center">
      <h2>Дискурсивные формулы</h2>
    </div>
    <TabView>
	<TabPanel header="Проект">

    <div class="p-component p-p-4 info">
      <div class="explain-header">Pragmaticon</div>
      <div class="p-ml-4">Лингвистическая база данных, посвященная дискурсивным формулам русского языка. Создана в рамках исследовательского проекта Школы Лингвистики НИУ ВШЭ, работа над которым ведется с 2017 года.</div>
    </div>

    <div class="p-component back-1 p-p-4 info">
      <div class="p-ml-4"><strong>Дискурсивные формулы</strong> — особые разговорные конструкции, которые используются в диалоге в качестве ответных реплик, как, например, Ну и ну! Не то слово! Не скажи!</div>
      <div class="p-ml-4">
        Они состоят из нескольких слов (обычно служебных), практически неизменяемы и идиоматичны.
      </div>
      <div class="p-ml-4">
        Для употребления дискурсивных формул важен тип предшествующей реплики.
      </div>
    </div>

    <div class="p-component p-p-4 info">
      <div class="p-ml-4">Дискурсивных формул в языке очень много. По нашим данным, в русском их не менее 700, не считая вариантов.</div>
      <div class="p-ml-4">При этом во фразеологических словарях русского языка, не говоря уже об обычных толковых, оказывается лишь небольшой процент от этого списка. Они не похожи на другие языковые единицы, и потому нуждаются в особенном формате описания и отдельной базе данных.</div>
    </div>

    <div class="p-component back-1 p-p-4 info">
      <div class="explain-header">Всё о дискурсивных формулах</div>
      <div class="p-ml-4">
        доклад Е. В. Рахилиной на коллоквиуме ОТиПЛа в МГУ
      </div>
      <div class="p-ml-4">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/jUUJmnilqy0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>

    <div class="p-component p-p-4 info">
      <div class="explain-header">Russian Constructicon</div>
      <div class="p-ml-4">
        Идея создания Прагматикона возникла в работе над другой базой данных — Русским Конструктиконом. Этот проект создается лингвистами из Норвежского арктического университета (Университет Тромсе) вместе со Школой Лингвистики НИУ ВШЭ. Задача проекта — собрать и систематически описать конструкции русского языка.
      </div>
      <div class="p-ml-4">
        Дискурсивные формулы в нашем понимании — тоже своеобразные конструкции, но из-за ряда особенностей их нужно описывать отдельно.
      </div>
      <div class="p-ml-4">
        Прагматикон дополняет Русский Конструктикон. Некоторые конструкции напрямую связаны с дискурсивными формулами:
      </div>
      <div class="p-ml-4">
        <strong>Дискурсивная формула</strong>: А: Он так рад! Б: С чего бы?
      </div>
      <div class="p-ml-4">
        <strong>Конструкция</strong>:
        (Да) (и) с чего бы (это) Cl? С чего бы ему радоваться?
      </div>
    </div>

    <div class="p-component p-p-4 info">
      <div class="explain-header">Список</div>
      <div class="p-ml-4">Список дискурсивных формул мы собрали из драматических текстов и детской литературы — при помощи ручной разметки и машинного обучения.</div>
      <div class="p-ml-4">В итоговый список <strong>не</strong> включали: реплики-реакции на конкретные ситуации, а не на речь (например, <span class="cite">Кто там?</span> в ответ на стук в дверь), формулы вежливости (<span class="cite">Благодарю вас</span>, <span class="cite">Прости меня</span>) и выражения, при помощи которых мы регулируем диалог (<span class="cite">Подожди минуту</span>, <span class="cite">Вот так вот</span>).</div>
    </div>

    <div class="p-component back-3 p-p-4 info">
      <div class="explain-header">Курс РКИ «Как скажешь»</div>
      <div class="p-ml-4">
        Результаты проекта используются в бесплатном онлайн-курсе разговорного русского языка на образовательной платформе «Верные слова». В каждом модуле курса есть раздел с заданиями, по одному из семантических классов дискурсивных формул.
      </div>
    </div>

	</TabPanel>
	<TabPanel header="Участники">
		Content II
	</TabPanel>
	<TabPanel header="Публикации">
		Content III
	</TabPanel>
	<TabPanel header="Помощь">
		Content III4
	</TabPanel>
</TabView>

    <!-- <div class="p-shadow-1 item">Это модно и современно! Также это подходит тем, кто чтит традиции.</div>
    <div class="p-shadow-2 item">Откройте для себя Вашу дискурсивную формулу успеха!</div>
    <div class="p-shadow-3 item">Успейте подписаться на нашу закрытую новостную рассылку:</div>

    <div class="div-container form-container p-text-center">
      <h4>Введите свой e-mail</h4>
      <form @submit.prevent="greet">
        <InputText type="text" v-model="text"/>
        <Button type="submit" label="Отправить"/>
        <div class="msg">{{message}}</div>
      </form>
    </div>

    <Toast/> -->

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
