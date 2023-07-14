<template>
  <div class="home p-component">
    <!-- <div class="text-center">
      <h2>Дискурсивные формулы</h2>
    </div> -->
    <TabView v-model:activeIndex="store.state.about.active" @tab-change="store.state.about.active = $event.index">
      <TabPanel header="Проект">
        <div class="p-component p-4 info">
          <div class="explain-header">Короткое видео о проекте</div>
          <div class="ml-4">Презентация сайта на конференции <i>Slavic Cognitive Linguistics Conference 2021</i></div>
          <div class="ml-4">
            <div class="videoWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/-j7krkUHTt8"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <div class="p-component p-4 back-1 info">
          <div class="explain-header">Для цитирования</div>
          <div class="ml-4">
            Alyaxey Yaskevich, Polina Bychkova, Evgenia Koziuk, Ekaterina Rakhilina, Evgenia Slepak, Alevtina Utkina,
            Svetlana Zhukova, Tatiana Zotova. The Russian Pragmaticon. An electronic database of the Russian pragmatic
            constructions. Available at
            <a href="https://pragmaticon.ruscorpora.ru/" target="_blank">https://pragmaticon.ruscorpora.ru/</a>
          </div>
        </div>

        <div class="p-component p-4 info">
          <div class="explain-header">Pragmaticon</div>
          <div class="ml-4">
            Лингвистическая база данных, посвященная дискурсивным формулам русского языка. Создана в рамках
            исследовательского проекта Школы Лингвистики НИУ ВШЭ, работа над которым ведется с 2017 года.
          </div>
        </div>

        <div class="p-component back-1 p-4 info">
          <div class="ml-4">
            <strong>Дискурсивные формулы</strong> &mdash; особые разговорные конструкции, которые используются в диалоге
            в качестве ответных реплик, как, например, Ну и ну! Не то слово! Не скажи!
          </div>
          <div class="ml-4">
            Они состоят из нескольких слов (обычно служебных), практически неизменяемы и идиоматичны.
          </div>
          <div class="ml-4">Для употребления дискурсивных формул важен тип предшествующей реплики.</div>
        </div>

        <div class="p-component p-4 info">
          <div class="ml-4">
            Дискурсивных формул в языке очень много. По нашим данным, в русском их не менее 700, не считая вариантов.
          </div>
          <div class="ml-4">
            При этом во фразеологических словарях русского языка, не говоря уже об обычных толковых, оказывается лишь
            небольшой процент от этого списка. Они не похожи на другие языковые единицы, и потому нуждаются в особенном
            формате описания и отдельной базе данных.
          </div>
        </div>

        <div class="p-component back-1 p-4 info">
          <div class="explain-header">Всё о дискурсивных формулах</div>
          <div class="ml-4">Доклад Е. В. Рахилиной на коллоквиуме ОТиПЛа в МГУ</div>
          <div class="ml-4">
            <div class="videoWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/jUUJmnilqy0"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <div class="p-component p-4 info">
          <div class="explain-header">Russian Constructicon</div>
          <div class="ml-4">
            Идея создания Прагматикона возникла в работе над другой базой данных &mdash; Русским Конструктиконом. Этот
            проект создается лингвистами из Норвежского арктического университета (Университет Тромсе) вместе со Школой
            Лингвистики НИУ ВШЭ. Задача проекта &mdash; собрать и систематически описать конструкции русского языка.
          </div>
          <div class="ml-4">
            Дискурсивные формулы в нашем понимании &mdash; тоже своеобразные конструкции, но из-за ряда особенностей их
            нужно описывать отдельно.
          </div>
          <div class="ml-4">
            Прагматикон дополняет Русский Конструктикон. Некоторые конструкции напрямую связаны с дискурсивными
            формулами:
          </div>
          <div class="ml-4"><strong>Дискурсивная формула</strong>: А: Он так рад! Б: С чего бы?</div>
          <div class="ml-4"><strong>Конструкция</strong>: (Да) (и) с чего бы (это) Cl? С чего бы ему радоваться?</div>
        </div>

        <div class="p-component p-4 back-1 info">
          <div class="explain-header">Список</div>
          <div class="ml-4">
            Список дискурсивных формул мы собрали из драматических текстов и детской литературы &mdash; при помощи
            ручной разметки и машинного обучения.
          </div>
          <div class="ml-4">
            В итоговый список <strong>не</strong> включали: реплики-реакции на конкретные ситуации, а не на речь
            (например, <span class="cite">Кто там?</span> в ответ на стук в дверь), формулы вежливости (<span
              class="cite"
              >Благодарю вас</span
            >, <span class="cite">Прости меня</span>) и выражения, при помощи которых мы регулируем диалог (<span
              class="cite"
              >Подожди минуту</span
            >, <span class="cite">Вот так вот</span>).
          </div>
        </div>

        <div class="p-component back-3 p-4 info">
          <div class="explain-header">Курс РКИ «Как скажешь»</div>
          <div class="ml-4">
            Результаты проекта используются в бесплатном онлайн-курсе разговорного русского языка на образовательной
            платформе «Верные слова»
            <a href="https://vsrussian.com/courses/5c0d40d765a47aa367cbfb4c" target="_blank"
              ><i class="pi pi-external-link"></i></a
            >. Каждый модуль курса содержит задания по одному из семантических классов дискурсивных формул.
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Участники">
        <div class="person"></div>
        <!-- <PhraseListItem v-for="eid in eids" :key="eid" :data="data" :eid="Number(eid)" /> -->
        <div
          v-for="(person, index) in persons"
          :key="index"
          :class="'flex align-items-end mt-4  flex-column md:flex-row person back-' + ((index % 2) + 1)">
          <div class="pb-4">
            <img
              :src="require(`@/assets/people/${person[3]}.jpg`)"
              style="max-height: 15rem; margin-top: -4rem; text-align: left" />
          </div>
          <div class="pl-2 pb-2">
            <div class="font-bold">{{ person[0] }}</div>
            <div class="font-italic">{{ person[1] }}</div>
            <div class="">{{ person[2] }}</div>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Публикации">
        <div class="info chapter explain-header mb-4">Основные</div>

        <div class="info mb-4">
          Е. В. Рахилина, П. А. Бычкова.
          <strong>Речевые акты как лингвистическая категория. Дискурсивные формулы</strong> // Вопросы языкознания.
          2021. № 2.
        </div>

        <div class="info mb-4">
          С. Ю. Пужаева и др.
          <strong>Автоматическое извлечение дискурсивных формул из текстов на русском языке</strong> // Вестник
          Новосибирского государственного университета. Серия: Лингвистика и межкультурная коммуникация. 2018. Т. 16. №
          2. – С. 5-18.
        </div>

        <div class="info chapter explain-header mb-4">Полисемичные формулы</div>

        <div class="info mb-4">
          П. А. Бычкова, Е. В. Рахилина, Е. А. Слепак.
          <strong>Дискурсивные формулы, полисемия и жестовое маркирование</strong> // Труды института русского языка им.
          Виноградова. № 21, 2019. – С. 256-283.
        </div>
        <div class="info mb-4">
          П. А. Бычкова.
          <strong
            >Свойства дискурсивных формул на примере русских конструкций <span class="cite">ты что</span> и
            <span class="cite">что ты</span></strong
          >
          // Русский язык в научном освещении. 2020. № 2 (40). – С. 88-111.
        </div>

        <div class="info chapter explain-header mb-4">Диахрония</div>

        <div class="info mb-4">
          В. А. Плунгян С. Ю. Пужаева Е. В. Рахилина. <strong>«Об этом рано говорить…»</strong> // Сборник статей к
          85-летию В.С. Храковского / Под общ. ред.: Д. В. Герасимов, С. Ю. Дмитренко, Н. М. Заика. М. : Издательский
          дом ЯСК, 2019. – С. 448-462.
        </div>
        <div class="info mb-4">
          С. Ю. Жукова, Б. В. Орехов, Е. В. Рахилина.
          <strong>Дискурсивные формулы русского языка: диахронический подход</strong> // Труды института русского языка
          им. ВВ Виноградова. 2019. № 21. – С. 142-164.
        </div>
        <div class="info mb-4">
          С. Ю. Жукова.
          <strong
            >Дискурсивные формулы русского языка <span class="cite">как хочешь</span>,
            <span class="cite">как знаешь</span> в диахроническом аспекте</strong
          >
          // Acta Linguistica Petropolitana. Труды института лингвистических исследований. – 2019. – Т. 3. – №. 15. – С.
          295-319.
        </div>
        <div class="info mb-4">
          В. А. Плунгян, Е. В. Рахилина. <strong><span class="cite">А Что?</span></strong> // Друзья, Слова, Таблицы:
          Сборник Статей в Честь 75-Летия А.К. Поливановой. Кейдан А. В. Москва; Екатеринбург: Кабинетный ученый, 2020.
          – С. 323–328.
        </div>

        <div class="info chapter explain-header mb-4">Типология</div>

        <div class="info mb-4">
          П. Бычкова. <strong>Дискурсивные формулы подтверждения в типологической перспективе</strong> // Jezikoslovni
          zapiski. 2020. 27(2).
        </div>
        <div class="info mb-4">
          П. А. Бычкова.
          <strong
            >Источники прагматикализации дискурсивных формул отрицания в типологическом освещении: русский и
            словенский</strong
          >
          // Филологические заметки. 2020. Т. 2. № 18. – С. 187-211.
        </div>

        <div class="info chapter explain-header mb-4">In English</div>

        <div class="info mb-4">
          Gerasimenko, E., Puzhaeva, S., Zakharova, E., & Rakhilina, E. (2019).
          <strong>Defining discourse formulae: computational approach</strong>. EPiC Series in Language and Linguistics,
          4, 61-69.
        </div>
        <div class="info mb-4">
          SLE 2020, Workshop "Discourse phenomena in typological perspective" E. Rakhilina, P. Bychkova.
          <strong>Towards Pragmatic Construction Typology: The case of Discourse Formulae</strong>. (presentation)
        </div>
      </TabPanel>
      <TabPanel header="Помощь">
        <template v-for="(value, index) in defs">
          <div v-if="value.length === 1" class="chapter mb-4" :key="index">{{ value[0] }}</div>
          <Panel v-else :header="value[0]" :toggleable="true" :collapsed="true" class="mb-4" :key="index + 10">{{
            value[1]
          }}</Panel>
        </template>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import store from '@/modules/store';
export default {
  name: 'Home',
  setup() {
    const persons = [
      [
        'Екатерина Владимировна Рахилина',
        'д. ф. н., профессор, руководитель Школы Лингвистики НИУ ВШЭ',
        'руководитель проекта',
        'rakhilina',
      ],
      [
        'Светлана Пужаева',
        'аспирантка Школы Лингвистики НИУ ВШЭ',
        'составление, классификация и разметка исходного списка; исследование диахронии',
        'puzhaeva',
      ],
      [
        'Полина Бычкова',
        'аспирантка Школы Лингвистики НИУ ВШЭ',
        'разработка структуры базы, типологическое исследование формул',
        'bychkova',
      ],
      [
        'Евгения Слепак',
        'студентка магистратуры «Русский язык как иностранный», НИУ ВШЭ',
        'исследование интонации и жестикуляции, разметка',
        'slepak',
      ],
      [
        'Евгения Козюк',
        'аспирантка Школы Лингвистики НИУ ВШЭ',
        'поиск переводных аналогов в английском, типологическое исследование формул, исследование связи формул и конструкций',
        'koziuk',
      ],
      [
        'Татьяна Зотова',
        'к. ф. н., преподаватель Школы иностранных языков НИУ ВШЭ',
        'поиск переводных аналогов в немецком',
        'zotova',
      ],
      [
        'Алевтина Уткина',
        'студентка магистратуры «Лингвистическая теория и описание языка», НИУ ВШЭ',
        'разметка, поиск переводных аналогов в китайском',
        'utkina',
      ],
      [
        'Алексей Яскевич',
        'специалист Центра цифровых гуманитарных исследований НИУ ВШЭ',
        'разработка веб-проекта',
        'yaskevich',
      ],
    ];
    const defs = [
      ['Поиск'],
      [
        'Как найти конкретную дискурсивную формулу',
        'В строке поиска начните вводить формулу на русском языке и выберите нужную из списка',
      ],
      ['Как найти русские аналоги иностранной формулы', '...'],
      ['Как посмотреть весь список формул', '...'],
      ['Как найти группу формул', '...'],
      ['Теги'],
      ['Функция', '...'],
      ['Семантика', '...'],
      ['Интонация', '...'],
      ['Жесты', '...'],
      ['Конструкции', '...'],
      ['Дополнительные возможности'],
      ['Как посмотреть похожие формулы?', '...'],
      ['Как посмотреть формулы с тем же переводным аналогом?', '...'],
      ['Как скачать результаты?', '...'],
    ];

    return { persons, defs, store };
  },
};
</script>

<style scoped>
.person {
  margin-bottom: 10rem;
}
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
