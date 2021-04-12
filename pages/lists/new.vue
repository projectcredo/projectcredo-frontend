<template>
  <div class="container">
    <h2>Create a New Board</h2>
    <hr>

    <list-form v-model="form" :errors="errors" />

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <input
          type="submit"
          class="btn btn-primary"
          name="commit"
          :value="loading ? 'Loading...' : 'Submit'"
          :disabled="loading"
          @click.prevent="submit"
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ListForm from '../../components/lists/ListForm'

export default {
  components: { ListForm },

  data: () => ({
    form: {
      name: '',
      tag_list: '',
      description: '',
    },
    loading: false,
    errors: {},
  }),

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  created () {
    // this.form = pick(this.list, Object.keys(this.form))
    // this.form.tag_list = this.list.tags.map(t => t.name).join(', ')
  },

  methods: {
    async submit () {
      if (this.loading) { return }
      this.loading = true
      this.errors = []

      const formData = new FormData()
      for (const [key, value] of Object.entries(this.form)) {
        if (value !== null) { formData.append(key, value) }
      }

      try {
        const res = await axios.post('/api/lists', formData)

        this.$notify({
          title: 'Success',
          text: 'Board was created',
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
