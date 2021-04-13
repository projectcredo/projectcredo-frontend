<template>
  <div>
    <client-only>
      <notifications />
    </client-only>
    <navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar'
import Notifications from '../components/layout/Notifications'

export default {
  components: { Notifications, Navbar },
}
</script>
