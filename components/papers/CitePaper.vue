<template>
  <span>
    <span v-if="paper" class="text-capitalize r-cite" @click.prevent="$parent.$emit('select-paper', paper)">
      {{ text }}
    </span>
    <span v-else class="text-capitalize r-cite">
      [filtered]
    </span>
  </span>
</template>

<script>
import { citeText } from './helpers'

export default {
  props: ['paper'],

  computed: {
    text () {
      return citeText(this.paper)
    },
  },
}
</script>
