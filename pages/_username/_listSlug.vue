<template>
  <div class="container">
    <div class="row list-show">
      <div class="col-md-8">
        <list :list="list" :current-user="currentUser" />
      </div>
      <div class="col-md-4">
        <div class="edit-section">
          <a v-if="currentUser" href="" class="edit-list-btn">Edit this board</a>
        </div>

        <div class="list-section">
          <div class="list-section-h3">
            Comments
          </div>
          <div v-if="list.comments" :id="`comments-${list.id}`" class="sidebar-body">
            <comments
              commentable-type="List"
              :commentable-id="list.id"
              :signed-in="currentUser"
              :user-id="currentUser && currentUser.id"
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
import List from '../../components/lists/List'
import Comments from '../../components/comments/Comments'

export default {
  components: { Comments, List },

  data: () => ({
    list: {},
    currentUser: null,
  }),

  async fetch () {
    const { username, listSlug } = this.$route.params
    const res = await axios.get('/api/lists', { params: { username, slug: listSlug } })
    this.list = res.data
  },
}
</script>
