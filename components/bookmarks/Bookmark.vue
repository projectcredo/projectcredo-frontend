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
export default {
  props: ['bookmarkable', 'type', 'signedIn'],

  data () {
    return {
      isLoading: false,
    }
  },

  methods: {
    bookmark () {
      $.ajax({
        url: '/bookmarks.json',
        type: 'POST',
        data: {
          id: this.bookmarkable.id,
          type: this.type,
        },
        success: () => {
          this.bookmarkable.bookmarked = true // eslint-disable-line
          this.bookmarkable.bookmarks_count = this.bookmarkable.bookmarks_count + 1 // eslint-disable-line
          this.isLoading = false
        },
      })
    },

    unbookmark () {
      $.ajax({
        url: '/bookmarks.json',
        type: 'DELETE',
        data: {
          id: this.bookmarkable.id,
          type: this.type,
        },
        success: () => {
          this.bookmarkable.bookmarked = false // eslint-disable-line
          this.bookmarkable.bookmarks_count = this.bookmarkable.bookmarks_count - 1 // eslint-disable-line
          this.isLoading = false
        },
      })
    },

    toggleBookmark () {
      if (! this.signedIn) {
        window.location.href = '/users/sign_in'
      } else if (! this.isLoading) {
        this.isLoading = true

        if (this.bookmarkable.bookmarked) {
          this.unbookmark()
        } else {
          this.bookmark()
        }
      }
    },
  },
}
</script>
