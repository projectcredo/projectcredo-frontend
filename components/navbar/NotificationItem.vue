<template>
  <div>
    <div class="notification-item unread">
      <b>{{ notification.activity.activity }}</b>
      {{ notification.activity.type }} {{ notification.activity.added }} {{ notification.activity.preposition }}
      <b><nuxt-link :to="`/${notification.activity.actable.owner}/${notification.activity.actable.slug}`">'{{ notification.activity.actable.name | truncate(50) }}'</nuxt-link></b>
      <div class="notification-time">
        {{ fromNow(notification.created_at) }}
      </div>
    </div>
    <div class="notification-divider" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  props: {
    notification: { type: Object, required: true },
  },

  methods: {
    fromNow (date) {
      return dayjs(date).fromNow()
    },
  },
}
</script>
