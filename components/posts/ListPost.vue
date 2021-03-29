<template>
  <li class="list-post">
    <div class="list-post-author">
      <a v-if="list.can_update" href="#" class="pull-right" :disabled="deleting" @click.prevent="destroy"><i
        class="fa fa-trash"
      /></a>
      <div class="lpa-avatar">
        <a :href="post.user.url"><img :src="post.user.avatar_thumb" alt=""></a>
      </div>
      <div class="lpa-name">
        <a :href="post.user.url">{{ post.user.full_name }}</a>
      </div>
      <div class="lpa-date">
        {{ post.created_at | date('M/D/YYYY [at] h:mm a') }}
      </div>
    </div>
    <div class="list-post-content">
      <a v-if="list.can_update && ! edit" href="#" class="pull-right" @click.prevent="edit = true"><i
        class="fa fa-pencil"
      /></a>
      <div v-if="edit">
        <textarea v-model="editContent" class="form-control mb-5" :disabled="updating" />
        <div class="text-right">
          <a href="#" class="text-small" :disabled="updating" @click.prevent="edit = false">Cancel</a>
          <a href="#" class="btn btn-primary btn-sm" :disabled="updating" @click.prevent="update">Save</a>
        </div>
      </div>
      <div v-if="! edit">
        {{ post.content }}
      </div>
    </div>
    <div
      v-for="article in post.articles"
      :key="article.id"
      class="lits-post-article"
      :class="{empty: ! article.papers.length}"
    >
      <div class="lpar-header">
        <div class="lpar-thumb">
          <div class="cropped-image">
            <div><img :src="article.cover_thumb" alt=""></div>
          </div>
        </div>
        <div class="lpar-heading">
          <div class="lpar-title">
            <a :href="article.url" target="_blank">{{ article.title || 'No article' }}</a>
          </div>
          <div class="lpar-source">
            {{ article.source }}
          </div>
          <div class="lpar-bookmarks">
            <bookmark :bookmarkable="article" :type="'Article'" :signed-in="!! currentUser" />
          </div>
        </div>
      </div>
      <div v-if="article.papers.length" class="lpar-papers">
        <div class="lpar-papers-title">
          Research Papers Cited in this Article
        </div>
        <post-paper
          v-for="paper in article.papers"
          :key="paper.id"
          :paper="paper"
          :current-user="currentUser"
          @select-paper="selectPaper"
        />
      </div>
    </div>
  </li>
</template>

<script>
import axios from 'axios'
import PostPaper from '../papers/PostPaper.vue'
import Bookmark from '../bookmarks/Bookmark.vue'

export default {

  components: {
    PostPaper,
    Bookmark,
  },
  props: ['list', 'post', 'currentUser'],

  data () {
    return {
      edit: false,
      editContent: '',
      updating: false,
      deleting: false,
    }
  },

  computed: {
    //
  },

  mounted () {
    this.editContent = this.post.content
  },

  methods: {
    selectPaper (paper) {
      this.$emit('select-paper', paper)
    },

    update () {
      if (!this.editContent) { return }

      this.updating = true
      axios.put(`/posts/${this.post.id}`, {
        post: { content: this.editContent },
      })
        .then((res) => {
          this.$emit('post-updated', res.data)
          this.content = ''
        })
        .catch((err) => {
          alert(err.message)
        })
        .then(() => {
          this.updating = false
          this.edit = false
        })
    },

    destroy () {
      this.deleting = true
      axios.delete(`/posts/${this.post.id}`)
        .then((res) => {
          this.$emit('post-deleted', this.post)
        })
        .catch((err) => {
          alert(err.message)
        })
        .then(() => {
          this.deleting = false
        })
    },
  },
}
</script>
