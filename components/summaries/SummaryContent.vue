<template>
  <div>
    <div class="summary-content newlines" :class="{truncate: truncate}" @click="truncate = false">
      <component :is="part.type" v-for="(part, idx) in contentParts" :key="idx" :paper="part.paper">
        {{ part.content }}
      </component>
    </div>
    <a v-if="summary.content.length > 250" href="#" class="action-link" @click.stop.prevent="truncate = ! truncate">
      {{ truncate ? 'see more' : 'see less' }}
    </a>
  </div>
</template>

<script>
import CitePaper from '../papers/CitePaper.vue'
import { getPaper } from '../papers/helpers'

export default {

  components: {
    CitePaper,
  },
  props: ['summary', 'list'],

  data () {
    return {
      truncate: true,
    }
  },

  computed: {
    contentParts () {
      return this.summary.content.split(/(\[cite_paper id=\d+\])/gi).map((part) => {
        const match = /\[cite_paper id=(\d+)\]/gi.exec(part)
        if (match) {
          return { type: 'cite-paper', id: match[1], paper: getPaper(this.list, match[1]) }
        }
        return { type: 'span', content: part, paper: null }
      })
    },
  },

  methods: {
    getPaper (id) {
      return getPaper(this.list, id)
    },
  },
}
</script>
