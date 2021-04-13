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

    <div class="container">
      <div v-if="$fetchState.pending" class="text-center">
        Loading...
      </div>
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

  data: () => ({
    lists: [],
  }),

  async fetch () {
    console.log('Running fetch')
    console.log(process.server ? 'On server' : 'On client')

    const res = await axios.get('/api/activities')
    this.lists = res.data
  },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },
}
</script>
