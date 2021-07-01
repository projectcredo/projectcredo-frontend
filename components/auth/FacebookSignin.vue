<template>
  <a role="button" class="btn btn-fb" @click="logInWithFacebook">{{ buttonText }}</a>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  props: {
    buttonText: { type: String, default: 'Sign in with Facebook' },
  },

  mounted () {
    this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
    this.initFacebook()
  },

  methods: {
    ...mapMutations({
      facebookLogin: 'auth/FACEBOOK_LOGIN',
    }),

    logInWithFacebook () {
      const that = this
      window.FB.login(async function (response) {
        if (response.authResponse) {
          const res = await axios.post('/api/auth/facebook', response.authResponse)
          that.facebookLogin({ user: res.data, headers: res.headers })
          that.$router.replace('/')
        } else {
          alert('User cancelled login or did not fully authorize.')
        }
      }, { scope: 'email' })
      return false
    },

    initFacebook () {
      const that = this
      return new Promise((resolve) => {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: that.$config.facebookAppId, // You will need to change this
            cookie: true, // This is important, it's not enabled by default
            version: 'v13.0',
          })
          setTimeout(() => resolve(), 100)
        }
      })
    },

    loadFacebookSDK (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    },
  },
}
</script>
