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
      <activity-feed :lists="lists" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ActivityFeed from '../components/lists/ActivityFeed'

export default {
  components: { ActivityFeed },

  data: () => ({
    lists: [],
  }),

  async fetch () {
    const res = await axios.get('/api/activities')
    this.lists = res.data
  },
}
</script>
