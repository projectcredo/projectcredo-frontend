<template>
  <div class="container">
    <h2>My Bookmarks</h2>
    <hr>

    <CircleLoader
      class="mx-auto mt-20"
      :loading="$fetchState.pending"
      color="#64D6BD"
      size="200"
      size-unit="px"
    />

    <div v-if="! $fetchState.pending">
      <p v-if="! bookmarks.length">
        No don't have any bookmarks yet.
      </p>

      <div class="bookmarks-list">
        <div v-for="bookmark in bookmarks" :key="bookmark.id" class="bookmark-item">
          <div v-if="bookmark.paper">
            <h4 class="color-primary">
              {{ bookmark.paper.title }}
            </h4>
            <p v-if="bookmark.paper.authors.length" class="bookmark-authors">
              by <span v-html="bookmark.paper.authors.map(a => a.full_name).join(', ')" />
            </p>
            <p class="bookmark-meta">
              <span v-if="bookmark.paper.doi"><b>DOI:</b>{{ bookmark.paper.doi }}</span>
              <span v-if="bookmark.paper.pubmed_id"><b>Pubmed ID:</b> {{ bookmark.paper.pubmed_id }}</span>
              Direct Link: <a :href="bookmark.paper.direct_link" target="_blank">{{ bookmark.paper.direct_link }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { CircleLoader } from '@saeris/vue-spinners'

export default {
  components: { CircleLoader },

  data: () => ({
    bookmarks: [],
  }),

  fetchOnServer: false,

  async fetch () {
    const res = await axios.get('/api/bookmarks')
    this.bookmarks = res.data
  },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  head () {
    const title = `${this.$config.name} | My Bookmarks`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
