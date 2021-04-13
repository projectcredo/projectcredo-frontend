<template>
  <div class="like-form">
    <button name="button" class="comment-vote" :class="{clicked: comment.voted}" @click.prevent="submit">
      &nbsp;{{ comment.cached_votes_up }}
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Upvote',

  props: ['comment'],

  methods: {
    submit () {
      const url = '/api/votes'
      let request

      if (this.comment.voted) {
        request = axios.delete(url, { params: { type: 'comment', id: this.comment.id } })
      } else {
        request = axios.post(url, { type: 'comment', id: this.comment.id })
      }

      request.then((response) => {
        this.$eventHub.$emit('vote-comment', Object.assign({ id: this.comment.id }, response.data))
      })
        .catch(e => (console.error(e)))
    },
  },

}
</script>
