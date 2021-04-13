<template>
  <div class="container">
    <div v-if="$fetchState.pending" class="text-center">
      Loading...
    </div>

    <div v-if="list.id" class="row list-show">
      <div class="col-md-8">
        <list :list="list" :current-user="user" />
      </div>
      <div class="col-md-4">
        <client-only>
          <div v-if="user && user.id === list.owner.id" class="edit-section">
            <nuxt-link :to="`/${list.owner.username}/${list.slug}/edit`" class="edit-list-btn">
              Edit this board
            </nuxt-link>
          </div>
        </client-only>

        <div class="list-section">
          <div class="list-section-h3">
            Comments
          </div>
          <div v-if="list.comments" :id="`comments-${list.id}`" class="sidebar-body">
            <comments
              commentable-type="List"
              :commentable-id="list.id"
              :signed-in="user"
              :user-id="user && user.id"
              :comments="list.comments"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import List from '../../../components/lists/List'
import Comments from '../../../components/comments/Comments'

export default {
  components: { Comments, List },

  data: () => ({
    list: {},
  }),

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
  },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },
}
</script>
