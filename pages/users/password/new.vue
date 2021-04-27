<template>
  <div class="container">
    <h2>Forgot your password?</h2>
    <hr>

    <div class="row">
      <div class="col-md-8 col-md-push-2">
        <div class="form-group">
          <label for="user_login">Email</label><br>
          <input id="user_login" v-model="form.email" autofocus="autofocus" class="form-control" type="text">
        </div>

        <div class="form-group actions">
          <a role="button" class="btn btn-primary" :disabled="loading" @click="submit">Send me reset password instructions</a>
        </div>

        <nuxt-link to="/users/sign_in">
          Sign in
        </nuxt-link>
        <br>
        <nuxt-link to="/users/sign_up">
          Sign up
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    form: {
      email: '',
      redirect_url: '',
    },
    errors: [],
  }),

  computed: {
    ...mapState({
      loading: s => s.auth.loading,
    }),
  },

  methods: {
    async submit () {
      if (this.loading) { return }
      this.errors = []
      try {
        const res = await axios.post('/api/auth/password', this.form)

        this.$notify({
          title: 'Success',
          text: res.data.message,
          type: 'info',
        })
        this.form.email = ''
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.errors = (e.response.data && e.response.data.errors) || []
        } else {
          throw e
        }
      }
    },
  },

  head () {
    const title = `${this.$config.name} | Forgot your password?`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
