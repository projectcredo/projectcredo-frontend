<template>
  <div class="container">
    <div v-if="$fetchState.pending" class="text-center">
      Loading...
    </div>
    <div v-else>
      <h2>
        <nuxt-link :to="`/${list.owner.username}/${list.slug}`">
          {{ list.name }}
        </nuxt-link>
      </h2>
      created by <nuxt-link :to="`/${list.owner.username}`">
        {{ list.owner.username }}
      </nuxt-link>
      <hr>

      <list-form v-model="form" :errors="errors" :list="list" @removed-attachment="list.cover.present = false" />

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input
            type="submit"
            class="btn btn-primary"
            name="commit"
            :value="loading ? 'Loading...' : 'Update'"
            :disabled="loading"
            @click.prevent="submit"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ListForm from '../../../components/lists/ListForm'

export default {
  components: { ListForm },

  data: () => ({
    list: {},
    form: {
      name: '',
      tag_list: '',
      description: '',
      cover: null,
    },
    loading: false,
    errors: {},
  }),

  fetchOnServer: false,

  async fetch () {
    const { username, listSlug } = this.$route.params
    if (! listSlug) {
      // set status code on server and
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      // use throw new Error()
      throw new Error('Page not found')
    }
    const res = await axios.get('/api/lists', { params: { username, slug: listSlug } })
    this.list = res.data
    this.setForm(this.list)
  },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  methods: {
    setForm (data) {
      this.form = {
        name: data.name,
        tag_list: data.tags.map(t => t.name).join(', '),
        description: data.description,
        cover: null,
      }
    },

    async submit () {
      if (this.loading) { return }
      this.loading = true
      this.errors = []

      const formData = new FormData()
      formData.append('username', this.list.owner.username)
      formData.append('slug', this.list.slug)
      for (const [key, value] of Object.entries(this.form)) {
        if (value !== null) { formData.append(key, value) }
      }

      try {
        const res = await axios.put('/api/lists', formData)

        this.$notify({
          title: 'Success',
          text: 'Board was updated',
          type: 'info',
        })

        this.$router.push(`/${res.data.owner.username}/${res.data.slug}`)
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.errors = e.response.data
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
  },
}
</script>
