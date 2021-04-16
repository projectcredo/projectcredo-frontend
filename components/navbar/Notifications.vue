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
        <div v-for="notification in notifications" :key="notification.id">
          <div class="notification-item unread">
            <b>{{ notification.activity.activity }}</b>
            {{ notification.activity.type }} {{ notification.activity.added }} {{ notification.activity.preposition }}
            <div class="notification-time">
              {{ fromNow(notification.created_at) }}
            </div>
          </div>
          <div class="notification-divider" />
        </div>

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

dayjs.extend(relativeTime)

export default {
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
      await axios.post('/api/read_notifications')
      this.notifications = []
    },

    fromNow (date) {
      return dayjs(date).fromNow()
    },
  },
}
</script>
