<template>
  <div>
    <div class="row">
      <div class="col-md-8 col-md-push-2">
        <div class="form-group">
          <a role="button" class="btn btn-fb">Sign up with Facebook</a>
          <a role="button" class="btn btn-google">Sign up with Google</a>
        </div>

        <p>Or</p>

        <div v-if="errors.length" class="alert alert-danger">
          <ul>
            <li v-for="(error, idx) in errors" :key="idx">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="form-group">
          <label for="user_email">Email</label><br>
          <input id="user_email" v-model="form.email" autofocus="autofocus" class="form-control" type="email">
        </div>

        <div class="form-group">
          <label for="user_username">Username</label><br>
          <input id="user_username" v-model="form.username" class="form-control" type="text">
        </div>

        <div class="form-group">
          <label for="user_password">Password</label>
          <em>(6 characters minimum)</em>
          <br>
          <input id="user_password" v-model="form.password" autocomplete="off" class="form-control" type="password">
        </div>

        <div class="form-group">
          <label for="user_password_confirmation">Password confirmation</label><br>
          <input id="user_password_confirmation" v-model="form.password_confirmation" autocomplete="off" class="form-control" type="password">
        </div>

        <div class="form-group actions">
          <a role="button" class="btn btn-primary" :disabled="loading" @click="submit">Sign up</a>
        </div>

        <nuxt-link to="/users/sign_in">
          Sign in
        </nuxt-link>
        <br>
        <nuxt-link to="/users/password/new">
          Forgot your password?
        </nuxt-link>
        <!--
        <br>
        <nuxt-link to="/users/confirmation/new.user">
          Didn't receive confirmation instructions?
        </nuxt-link>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import isObject from 'lodash/isObject'

export default {

  data: () => ({
    form: {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      confirm_success_url: '',
    },
    errors: [],
  }),

  computed: {
    ...mapState({
      loading: s => s.auth.loading,
    }),
  },

  mounted () {
    this.form.confirm_success_url = window.location.href
  },

  methods: {
    ...mapActions({
      signUp: 'auth/signUp',
    }),

    async submit () {
      if (this.loading) { return }
      this.errors = []
      try {
        await this.signUp(this.form)
        this.$router.replace('/')
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.errors = isObject(e.response.data.errors) ? e.response.data.errors.full_messages : e.response.data.errors
        } else {
          throw e
        }
      }
    },
  },
}
</script>
