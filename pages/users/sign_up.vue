<template>
  <div class="container">
    <h2>Sign up</h2>
    <hr>

    <sign-up />
  </div>
</template>

<script>
import SignUp from '../../components/auth/SignUp'

export default {
  components: { SignUp },

  middleware: 'guest',

  head () {
    const title = `${this.$config.name} | Sign Up`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
