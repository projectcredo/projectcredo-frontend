<template>
  <div class="container">
    <h2>Notifications</h2>
    <hr>

    <div v-if="$fetchState.pending" class="text-center">
      Loading...
    </div>

    <div v-else>
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
import NotificationItem from '../components/navbar/NotificationItem'

dayjs.extend(relativeTime)

export default {
  components: { NotificationItem },
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
}
</script>
