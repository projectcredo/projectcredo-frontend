<template>
  <span>
    <span v-if="truncateComment" class="newlines">{{ comment.content | truncate(250) }}</span>
    <span v-else class="newlines">{{ comment.content }}</span>
    <a v-if="comment.content.length > 250" class="action-link" @click.stop="truncateComment = ! truncateComment">
      {{ truncateComment ? 'see more' : 'see less' }}
    </a>
    <div class="note-details">
      {{ comment.user.username }} · {{ timeAgo }}
      <slot name="citation" />
    </div>
  </span>
</template>

<script>
import moment from 'moment-mini'

export default {
  props: ['comment'],

  data () {
    return {
      truncateComment: true,
    }
  },

  computed: {
    timeAgo () {
      return moment(this.comment.created_at).fromNow()
    },
  },
}
</script>
