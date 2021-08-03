<template>
  <div class="container">
    <h2>Log in</h2>
    <hr>

    <div class="row">
      <div class="col-md-8 col-md-push-2">
        <div class="form-group">
          <facebook-signin />
          <google-signin />
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
import FacebookSignin from '../../components/auth/FacebookSignin'
import GoogleSignin from '../../components/auth/GoogleSignin'

export default {
  components: { GoogleSignin, FacebookSignin },

  middleware: 'guest',

  data: () => ({
    form: {
      email: '',
      password: '',
    },
    errors: [],
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
      this.errors = []
      try {
        await this.signIn(this.form)
        this.$router.replace('/')
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
    const title = `${this.$config.name} | Sign In`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
