<template>
  <a role="button" class="btn btn-google" @click="logInWithGoogle">{{ buttonText }}</a>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  props: {
    buttonText: { type: String, default: 'Sign in with Google' },
  },

  mounted () {
    this.loadGoogleSdk()
  },

  methods: {
    ...mapMutations({
      socialLogin: 'auth/SOCIAL_LOGIN',
    }),

    async logInWithGoogle () {
      await this.initGoogle({
        client_id: this.$config.googleClientId,
        scope: 'profile email',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      })

      /** @var GoogleUser user */
      const user = await window.gapi.auth2.getAuthInstance().signIn()
      const res = await axios.post('/api/auth/google', user.getAuthResponse())
      this.socialLogin({ user: res.data, headers: res.headers })
      this.$router.replace('/')
    },

    loadGoogleSdk () {
      const apiUrl = 'https://apis.google.com/js/api.js'
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = apiUrl
        script.onreadystatechange = script.onload = function () {
          if (! script.readyState || /loaded|complete/.test(script.readyState)) {
            setTimeout(function () {
              resolve()
            }, 500)
          }
        }
        document.getElementsByTagName('head')[0].appendChild(script)
      })
    },

    initGoogle (config) {
      return new Promise((resolve) => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init(config)
            .then(() => {
              resolve(window.gapi)
            })
        })
      })
    },
  },
}
</script>
