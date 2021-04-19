<template>
  <li class="dropdown">
    <a
      href="#"
      :class="{'unread-notifications': notifications.length}"
      class="dropdown-toggle notification-button"
      data-toggle="dropdown"
      role="button"
      v-text="notifications.length ? notifications.length : undefined"
    />
    <ul class="dropdown-menu notifications-menu">
      <div class="notification-heading">
        <span class="bold text-lg">Unread Notifications</span>
      </div>
      <div class="notifications-wrapper">
        <notification-item v-for="notification in notifications" :key="notification.id" :notification="notification" />

        <div v-if="! notifications.length" class="notification-item">
          Welcome to Project Credo. No new activity yet!
        </div>
      </div>
      <div class="notification-footer">
        <nuxt-link to="/notifications">
          see all
        </nuxt-link>
        <a v-if="notifications.length" role="button" class="pull-right" @click="readAll">read all</a>
      </div>
    </ul>
  </li>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
import NotificationItem from './NotificationItem'

dayjs.extend(relativeTime)

export default {
  components: { NotificationItem },

  data: () => ({
    notifications: [],
  }),

  mounted () {
    this.loadNotifications()
  },

  methods: {
    async loadNotifications () {
      const res = await axios.get('/api/unread-notifications')
      this.notifications = res.data
    },

    async readAll () {
      await axios.post('/api/read-notifications')
      this.notifications = []
    },
  },
}
</script>
