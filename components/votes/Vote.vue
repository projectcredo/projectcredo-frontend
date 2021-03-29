<template>
  <span>
    <a
      v-show="!isLoading"
      :class="[{'toggled': this.voteable.voted}, 'vote', 'thumbs-up']"
      @click="toggleVote(voteable)"
    >
      {{ voteable.votes }}
    </a>
    <span v-show="isLoading" class="spinner">
      <span class="double-bounce1" />
      <span class="double-bounce2" />
    </span>
  </span>
</template>

<script>
export default {
  props: ['voteable', 'signedIn'],

  data () {
    return {
      isLoading: false,
    }
  },

  methods: {

    vote (voteable) {
      const self = this
      const params = {
        id: voteable.id,
        type: voteable.type,
      }
      $.ajax({
        url: voteable.vote_path + '.json',
        type: 'POST',
        data: params,
      })
        .done(function () {
          voteable.voted = true
          voteable.votes = voteable.votes + 1
          self.isLoading = false
        })
    },

    unvote (voteable) {
      const self = this
      const params = {
        id: voteable.id,
        type: voteable.type,
      }
      $.ajax({
        url: voteable.vote_path + '.json',
        type: 'DELETE',
        data: params,
      })
        .done(function () {
          voteable.voted = false
          voteable.votes = voteable.votes - 1
          self.isLoading = false
        })
    },

    toggleVote (voteable) {
      if (!this.signedIn) {
        window.location.href = '/users/sign_in'
      } else if (!this.isLoading) {
        this.isLoading = true
        if (voteable.voted) {
          this.unvote(voteable)
        } else {
          this.vote(voteable)
        }
      }
    },
  },
}
</script>
