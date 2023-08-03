<template>
  <div class="example">
    <span class="example-text" v-html="store.italic(datum.text)"></span>
    <template v-if="datum.length > 2">
      <span v-if="datum.movie" title="кинофильм" class="ml-1 valign"><i class="pi pi-video"></i></span>
      <span v-else title="публикация" class="ml-1 valign"><i class="pi pi-book"></i></span>
      <span class="example-author ml-1">{{ datum.author }}.</span>
      <span class="example-pub ml-1 font-bold">{{ datum.pub }}</span>
      <span v-if="datum.journal" class="ml-1 example-journal" title="публикация в журнале">(«{{ v.journal }}»)</span>
      <span class="example-pubdate">, {{ datum.pubdate }}</span>
    </template>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'Example',
  props: {
    datum: Object,
  },
  setup() {
    return { store }
  },
  components: {},
};
</script>

<style scoped>
.example {
  /* border: 1px solid orange; */
  padding: 0.5rem;
}

/* .construction {
  padding-left: 1rem;
} */
.example-text {
  /* font-stretch: condensed; */
  letter-spacing: -1px;
  font-style: italic;
}

.example-author {
  /* color: purple; */
}

.example-pub {
  color: #f5cb5c;
  text-shadow: black 0 0 0.5px;
}

.example-pubdate {
  /* color: blue; */
}
</style>
