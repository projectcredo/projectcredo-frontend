<template>
  <div :id="'comment-' + comment.id" class="comment">
    <p class="text-muted">
      <span v-if="comment.created_at == comment.updated_at">Added by </span>
      <span v-else>Updated by </span>
      <strong><a :href="comment.user.url">{{ comment.user.username }}</a></strong>
      on {{ formatDate(comment.updated_at) }}
    </p>
    <client-only>
      <comment-form
        v-if="showEdit"
        :signed-in="signedIn"
        :commentable-type="commentableType"
        :commentable-id="commentableId"
        :parent-id="comment.id"
        :comment="comment"
        type="edit"
        @cancel="showEdit = false"
      />
    </client-only>
    <div v-if="!showEdit" class="content">
      <p>{{ comment.content }}</p>
    </div>

    <client-only>
      <ul v-if="signedIn">
        <li>
          <upvote :comment="comment" />
        </li>
        <li><a class="toggle-reply active-link btn-xs" href="#" @click.prevent="showReply = ! showReply">reply</a></li>
        <li v-if="comment.user_id === userId">
          <a class="active-link btn-xs cursor-pointer" @click.prevent="showEdit = ! showEdit">edit</a>
        </li>
        <li v-if="comment.user_id === userId">
          <span v-if="removing">deleting...</span>
          <a v-else class="text-danger small cursor-pointer" @click.prevent="removeComment">delete</a>
        </li>
        <li />
      </ul>
    </client-only>

    <client-only>
      <comment-form
        v-if="showReply"
        :signed-in="signedIn"
        :commentable-type="commentableType"
        :commentable-id="commentableId"
        :parent-id="comment.id"
        type="reply"
        @cancel="showReply = false"
      />
    </client-only>

    <comments-list :signed-in="signedIn" :user-id="userId" :comments="comment.nested_comments" />
  </div>
</template>

<script>
import moment from 'moment-mini'
import axios from 'axios'
import CommentForm from './CommentForm.vue'
import Upvote from './Upvote.vue'

export default {
  name: 'Comment',

  components: {
    CommentForm,
    Upvote,
  },

  props: ['commentableType', 'commentableId', 'signedIn', 'userId', 'comment'],

  data () {
    return {
      showReply: false,
      showEdit: false,
      removing: false,
    }
  },

  beforeCreate () {
    // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    this.$options.components.CommentsList = require('./CommentsList.vue').default
  },

  created () {
    this.$eventHub.$on('reply-comment', () => (this.showReply = false))
  },

  methods: {
    formatDate (date) {
      return moment(date).format('MMMM Do YYYY hh:mm:ss')
    },

    removeComment () {
      if (! confirm('Are you sure?')) { return }

      this.removing = true
      try {
        axios.delete(`/comments/${this.comment.id}`)
        this.$emit('deleted')
      } catch (e) {
        //
      }
      this.removing = false
    },
  },

}
</script>
