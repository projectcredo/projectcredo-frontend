<template>
  <div class="container">
    <h2>Notifications</h2>
    <hr>

    <CircleLoader
      class="mx-auto mt-20"
      :loading="$fetchState.pending"
      color="#64D6BD"
      size="200"
      size-unit="px"
    />

    <div v-if="! $fetchState.pending">
      <div class="notification-index-list">
        <div>
          <notification-item v-for="notification in notifications" :key="notification.id" :notification="notification" />
          <div class="notification-item">
            <b>Welcome to Project Credo! You signed up {{ fromNow(user.created_at) }}.</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CircleLoader } from '@saeris/vue-spinners'
import NotificationItem from '../components/navbar/NotificationItem'

dayjs.extend(relativeTime)

export default {
  components: { NotificationItem, CircleLoader },

  data: () => ({
    notifications: [],
  }),

  fetchOnServer: false,

  async fetch () {
    const res = await axios.get('/api/notifications')
    this.notifications = res.data
  },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  methods: {
    fromNow (date) {
      return dayjs(date).fromNow()
    },
  },

  head () {
    const title = `${this.$config.name} | My Notifications`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
