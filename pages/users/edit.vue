<template>
  <div class="container">
    <h2>Edit Your Account</h2>
    <hr>

    <div v-if="errors && errors.full_messages && errors.full_messages.length" class="alert alert-danger">
      <ul>
        <li v-for="(error, idx) in errors.full_messages" :key="idx">
          {{ error }}
        </li>
      </ul>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <fieldset>
          <legend>Basic Data</legend>

          <div class="form-group">
            <label for="user_first_name">First name</label>
            <input id="user_first_name" v-model="form.first_name" class="form-control" type="text">
          </div>

          <div class="form-group">
            <label for="user_last_name">Last name</label>
            <input id="user_last_name" v-model="form.last_name" class="form-control" type="text">
          </div>

          <div class="form-group">
            <label for="user_email">Email</label>
            <input
              id="user_email"
              v-model="form.email"
              autofocus="autofocus"
              class="form-control"
              type="email"
            >
            <!--<span v-for="error in getErrors('email')" :key="error" class="help-block small">{{ error }}</span>-->
          </div>

          <div class="form-group">
            <label for="user_username">Username</label>
            <input id="user_username" v-model="form.username" class="form-control" type="text">
          </div>

          <div v-if="user.pending_reconfirmation">
            Currently waiting confirmation for: {{ user.email }}
          </div>
        </fieldset>

        <fieldset class="mt-40">
          <legend>Password</legend>

          <div class="form-group">
            <label for="user_password">Password</label> <i>(leave blank if you don't want to change it)</i>
            <input id="user_password" v-model="form.password" autocomplete="off" class="form-control" type="password">
            <em>6 characters minimum</em>
          </div>

          <div class="form-group">
            <label for="user_password_confirmation">Password confirmation</label>
            <input id="user_password_confirmation" v-model="form.password_confirmation" autocomplete="off" class="form-control" type="password">
          </div>
        </fieldset>
      </div>
      <div class="col-sm-6">
        <fieldset>
          <legend>Profile Data</legend>

          <div class="form-group">
            <label for="user_about">About Me</label>
            <input id="user_about" v-model="form.about" class="form-control" type="text">
          </div>

          <div class="form-group">
            <label for="user_country">Country</label>
            <input id="user_country" v-model="form.country" class="form-control" type="text">
          </div>

          <div class="form-group">
            <label for="user_city">City</label>
            <input id="user_city" v-model="form.city" class="form-control" type="text">
          </div>

          <div class="form-group">
            <label for="user_website">Website</label>
            <input id="user_website" v-model="form.website" class="form-control" type="text">
          </div>
        </fieldset>

        <fieldset class="mt-40">
          <legend>Attachments</legend>

          <div class="form-group form-image-group">
            <label for="user_avatar">Avatar Image</label>
            <input id="user_avatar" accept="image/png,image/gif,image/jpeg" class="form-control" type="file" @change="avatar = $event.target.files[0]">
            <div v-if="user.avatar.present" class="form-selected-image">
              <a class="fancy-box" :href="user.avatar.medium">
                <img class="form-image-preview" :src="user.avatar.thumb" alt="">
              </a>
              <div><a role="button" @click="removeAttachment('avatar')">Remove</a></div>
            </div>
          </div>

          <div class="form-group form-image-group">
            <label for="user_cover">Profile Page Cover Image</label>
            <input id="user_cover" accept="image/png,image/gif,image/jpeg" class="form-control" type="file" @change="cover = $event.target.files[0]">
            <div v-if="user.cover.present" class="form-selected-image">
              <a class="fancy-box" :href="user.cover.cover">
                <img class="form-image-preview" :src="user.cover.thumb" alt="">
              </a>
              <div><a role="button" @click="removeAttachment('cover')">Remove</a></div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="form-group text-right">
      <a role="button" class="btn btn-primary" :disabled="loading" @click="submit">
        <span v-if="loading">Loading...</span>
        <span v-else>Update</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import pick from 'lodash/pick'
import isObject from 'lodash/isObject'
import axios from 'axios'

export default {
  middleware: 'authenticated',

  data: () => ({
    form: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      about: '',
      country: '',
      city: '',
      website: '',
      password: '',
      password_confirmation: '',
    },
    avatar: null,
    cover: null,
    errors: {},
    loading: false,
  }),

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  mounted () {
    this.setForm(this.user)
  },

  methods: {
    ...mapMutations({
      updateUser: 'auth/UPDATE_USER',
    }),

    setForm (data) {
      this.form = pick(data, ['first_name', 'last_name', 'username', 'email', 'about', 'country', 'city', 'website'])
    },

    validate () {
      if (this.form.password !== this.form.password_confirmation) {
        this.errors = { full_messages: ['Password confirmation donesn\'t match'] }
        return false
      }
      return true
    },

    async submit () {
      if (this.loading) { return }
      this.loading = true
      this.errors = []
      if (! this.validate()) {
        return this.$notify({
          title: 'Errors',
          text: 'There are errors in the form',
          type: 'error',
        })
      }

      const data = { ...this.form, avatar: this.avatar, cover: this.cover }

      const formData = new FormData()
      for (const [key, value] of Object.entries(data)) {
        if (value !== null) { formData.append(key, value) }
      }

      try {
        const res = await axios.put('/api/auth', formData)
        this.setForm(res.data)
        this.updateUser(res.data)

        this.$notify({
          title: 'Success',
          text: 'Profile data updated',
          type: 'info',
        })
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
      this.loading = false
    },

    async removeAttachment (type) {
      try {
        const res = await axios.delete(`/api/auth/remove-attachment/${type}`)
        this.setForm(res.data)
        this.updateUser(res.data)
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
    },
  },

  head () {
    const title = `${this.$config.name} | Edit Your Account`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
