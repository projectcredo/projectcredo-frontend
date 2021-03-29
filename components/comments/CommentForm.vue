<template>
  <div class="comment-reply">
    <div v-if="signedIn" class="comment-form">
      <div class="form-group">
        <textarea v-model="content" class="form-control comment-box" placeholder="Write a reply..." :disabled="loading" />
      </div>
      <div class="form-group">
        <input type="submit" value="Submit" class="btn btn-primary btn-xs" :disabled="loading" @click.prevent="submit">
        <a v-if="['edit', 'reply'].includes(type)" class="cancel-link cancel-comment-form" href="#" @click.prevent="$emit('cancel')">cancel</a>
      </div>
    </div>
    <h4 v-else>
      <a href="/users/sign_in">Sign in</a> or <a href="/users/sign_up">Sign up</a> to comment
    </h4>
  </div>
</template>

<script>
import axios from 'axios'
import pick from 'lodash/pick'

export default {
  name: 'CommentForm',

  props: ['commentableType', 'commentableId', 'parentId', 'signedIn', 'comment', 'type'],

  data () {
    return {
      loading: false,
      content: '',
      errors: {},
    }
  },

  mounted () {
    if (this.comment) {
      this.content = this.comment.content
    }
  },

  methods: {
    submit () {
      this.loading = true

      const data = {
        comment: {
          commentable_type: this.commentableType,
          commentable_id: this.commentableId,
          parent_id: this.parentId,
          content: this.content,
        },
      }

      let request

      if (this.type === 'edit') {
        request = axios.put(`/comments/${this.comment.id}`, pick(data, ['comment.content', 'comment.commentable_type']))
      } else {
        request = axios.post('/comments', data)
      }

      request.then((response) => {
        this.$eventHub.$emit(`${this.type}-comment`, Object.assign({}, response.data))
        this.content = ''
        this.$emit('cancel')
      })
        .catch(e => (console.error(e)))
        .then(response => (this.loading = false))
    },
  },

}
</script>
