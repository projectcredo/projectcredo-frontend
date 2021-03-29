<template>
  <div class="container">
    <h2>Log in</h2>
    <hr>

    <div class="row">
      <div class="col-md-8 col-md-push-2">
        <div class="form-group">
          <a role="button" class="btn btn-fb">Sign in with Facebook</a>
          <a role="button" class="btn btn-google">Sign in with Google</a>
        </div>

        <p>Or</p>

        <div class="form-group">
          <label for="user_login">Login</label><br>
          <input id="user_login" v-model="form.email" autofocus="autofocus" class="form-control" type="text">
        </div>

        <div class="form-group">
          <label for="user_password">Password</label><br>
          <input id="user_password" v-model="form.password" autocomplete="off" class="form-control" type="password">
        </div>

        <div class="form-group actions">
          <a role="button" class="btn btn-primary" :disabled="loading" @click="submit">Log in</a>
        </div>

        <nuxt-link to="/users/sign_up">
          Sign up
        </nuxt-link>
        <br>
        <nuxt-link to="/users/password/new">
          Forgot your password?
        </nuxt-link>
        <br>
        <nuxt-link to="/users/confirmation/new.user">
          Didn't receive confirmation instructions?
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {

  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),

  computed: {
    ...mapState({
      loading: s => s.auth.loading,
    }),
  },

  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),

    async submit () {
      if (this.loading) { return }
      await this.signIn(this.form)
    },
  },
}
</script>
