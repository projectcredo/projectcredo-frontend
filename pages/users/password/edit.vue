<template>
  <div class="container">
    <h2>Change your password</h2>
    <hr>

    <div v-if="errors && errors.full_messages && errors.full_messages.length" class="alert alert-danger">
      <ul>
        <li v-for="(error, idx) in errors.full_messages" :key="idx">
          {{ error }}
        </li>
      </ul>
    </div>

    <div class="row">
      <div class="col-md-8 col-md-push-2">
        <div class="form-group">
          <label for="user_password">New Password</label>
          <em>(6 characters minimum)</em>
          <br>
          <input id="user_password" v-model="form.password" autocomplete="off" class="form-control" type="password">
        </div>

        <div class="form-group">
          <label for="user_password_confirmation">Password new confirmation</label><br>
          <input id="user_password_confirmation" v-model="form.password_confirmation" autocomplete="off" class="form-control" type="password">
        </div>

        <div class="form-group actions">
          <a role="button" class="btn btn-primary" :disabled="loading" @click="submit">Change my password</a>
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
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import isObject from 'lodash/isObject'

export default {
  data: () => ({
    form: {
      password: '',
      password_confirmation: '',
      redirect_url: '',
    },
    errors: [],
  }),

  computed: {
    ...mapState({
      loading: s => s.auth.loading,
    }),
  },

  async mounted () {
    try {
      await this.editPassword({ redirect_url: '', reset_password_token: this.$route.query.reset_password_token })
    } catch (e) {
      this.$notify({
        title: 'Error',
        text: 'Incorrect password reset link',
        type: 'error',
      })
      this.$router.push('/')
      console.error(e)
    }
  },

  methods: {
    ...mapActions({
      editPassword: 'auth/editPassword',
    }),

    async submit () {
      if (this.loading) { return }
      this.errors = []
      try {
        const res = await axios.put('/api/auth/password', this.form)
        this.$notify({
          title: 'Success',
          text: res.data.message,
          type: 'info',
        })
        this.$router.push('/')
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.errors = isObject(e.response.data.errors) ? e.response.data.errors : { full_messages: [e.message] }
          this.$notify({
            title: 'Errors',
            text: 'There are errors in the form',
            type: 'error',
          })
        } else {
          throw e
        }
      }
    },
  },

  head () {
    const title = `${this.$config.name} | Change your password`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
