<template>
  <div class="list-index">
    <div class="main-splash splash">
      <img src="~assets/images/white_logo_color_background.png" class="img-thumbnail thumbnail-no-border" width="500" alt="">
      <p class="text-center">
        Welcome, let's make research understandable
      </p>
    </div>

    <div class="tag-splash splash mb-40">
      <img src="~assets/images/tag.png" class="img-thumbnail thumbnail-no-border">
    </div>

    <div class="container mt-10">
      <activity-feed v-if="lists.length" :lists="lists" :signed-in="!! user" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ActivityFeed from '../components/lists/ActivityFeed'

export default {
  components: { ActivityFeed },

  async asyncData ({ params, error }) {
    const res = await axios.get('/api/activities')
    return {
      lists: res.data,
    }
  },

  data: () => ({
    lists: [],
  }),

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  head () {
    const title = `${this.$config.name} | Home`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
