<template>
  <div>
    <span class="newlines" v-html="text" />
    <a v-if="abstract.length > 250" class="action-link" @click.stop.prevent="truncateAbstract = ! truncateAbstract">
      {{ truncateAbstract ? 'see more' : 'see less' }}
    </a>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: ['abstract'],

  data () {
    return {
      truncateAbstract: true,
    }
  },

  computed: {
    text () {
      return Vue.options.filters.truncate(this.abstract, 250, this.truncateAbstract).replace(/(?:\r\n|\r|\n)/g, '<br>')
    },
  },
}
</script>
