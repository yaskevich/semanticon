<template>
  <div class="example">
  <span class="example-text" v-html="datum.text.replace('{', '<strong>').replace('}', '</strong>')"></span> <span class="example-author">{{datum.author}}</span>  <span class="example-pub">{{datum.pub}}</span>  <span v-if="datum.journal" class="example-journal" title="публикация в журнале">(«{{v.journal}}»)</span> <span class="example-pubdate">{{datum.pubdate}}
  </span>
</div>
</template>

<script>
export default {
  name: "Example",
  props: {
    datum: Object,
  },
  setup() {

  },
  components: {

  }
};
</script>

<style scoped>
.example {
  border: 1px solid orange;
  padding: .5rem;
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
  color: purple;
}
.example-pub {
  color: green;
}
.example-pubdate {
  color: blue;
}
</style>
