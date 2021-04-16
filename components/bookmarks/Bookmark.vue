<template>
  <span>
    <a
      v-show="! isLoading"
      :class="[{'toggled': bookmarkable.bookmarked}, 'bookmark']"
      @click.prevent="toggleBookmark"
    >
      <i class="fa" :class="{'fa-bookmark-o': ! bookmarkable.bookmarked, 'fa-bookmark': bookmarkable.bookmarked}" />
    </a>
    <span v-show="isLoading" class="spinner">
      <span class="double-bounce1" />
      <span class="double-bounce2" />
    </span>
    bookmarked by {{ bookmarkable.bookmarks_count }} people
  </span>
</template>

<script>
import axios from 'axios'

export default {
  props: ['bookmarkable', 'type', 'signedIn'],

  data () {
    return {
      isLoading: false,
    }
  },

  methods: {
    async bookmark () {
      await axios.post('/api/bookmarks', {
        id: this.bookmarkable.id,
        type: this.type,
      })
      this.bookmarkable.bookmarked = true // eslint-disable-line
      this.bookmarkable.bookmarks_count = this.bookmarkable.bookmarks_count + 1 // eslint-disable-line
    },

    async unbookmark () {
      await axios.delete('/api/bookmarks', {
        params: {
          id: this.bookmarkable.id,
          type: this.type,
        },
      })
      this.bookmarkable.bookmarked = false // eslint-disable-line
      this.bookmarkable.bookmarks_count = this.bookmarkable.bookmarks_count - 1 // eslint-disable-line
    },

    async toggleBookmark () {
      if (! this.signedIn) {
        window.location.href = '/users/sign_in'
      } else if (! this.isLoading) {
        this.isLoading = true

        if (this.bookmarkable.bookmarked) {
          await this.unbookmark()
        } else {
          await this.bookmark()
        }
        this.isLoading = false
      }
    },
  },
}
</script>
