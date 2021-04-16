<template>
  <div class="list-post-form">
    <textarea ref="textarea" v-model="content" class="lpf-textarea" placeholder="What are you reading?" :disabled="loading" />
    <url-preview v-if="url" :info="urlInfo" :loading="loadingUrlInfo" @checked="(c) => checkedPapers = c" />
    <button class="btn btn-primary" :disabled="loadingUrlInfo || loading || ! content" @click="submit">
      <span v-if="loading">Posting...</span>
      <span v-else>Post</span>
    </button>
    <a v-if="url" class="lpf-clear" href="#" @click.prevent="url = ''">clear</a>
  </div>
</template>

<script>
import urlRegex from 'url-regex'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import autosize from 'autosize'
import UrlPreview from './UrlPreview'

export default {
  components: {
    UrlPreview,
  },

  props: {
    list: { type: Object, required: true },
  },

  data () {
    return {
      content: '',
      url: '',
      urlInfo: {},
      loadingUrlInfo: false,
      loading: false,
      checkedPapers: [],
    }
  },

  computed: {
    article () {
      if (isEmpty(this.urlInfo)) { return null }
      return {
        url: this.urlInfo.url,
        title: this.urlInfo.title,
        cover: this.urlInfo.images.length ? this.urlInfo.images[0].src : null,
        papers: this.checkedPapers,
      }
    },
  },

  watch: {
    content (val) {
      if (! this.url) { this.findUrl() }
    },

    url (val) {
      if (val) { this.loadUrlInfo() } else { this.urlInfo = {} }
    },
  },

  mounted () {
    this.$refs.textarea.addEventListener('focus', () => autosize(this.$refs.textarea))
  },

  methods: {
    findUrl: debounce(function () {
      this.content.replace(urlRegex(), (url) => {
        if (! this.url) { this.url = url }
      })
    }, 300),

    loadUrlInfo () {
      this.loadingUrlInfo = true
      axios.post('/api/posts/load-open-graph', { url: this.url })
        .then((res) => {
          this.urlInfo = res.data
        })
        .catch((err) => {
          this.url = ''
          console.error(err) // eslint-disable-line
        })
        .then(() => (this.loadingUrlInfo = false))
    },

    submit () {
      if (! this.content) { return }

      this.loading = true
      axios.post('/api/posts', {
        list_id: this.list.id,
        post: { content: this.content },
        article: this.article,
      })
        .then((res) => {
          this.$emit('post-created', res.data)
          this.content = ''
          this.url = ''

          this.$notify({
            title: 'Success',
            text: 'Post was created',
            type: 'info',
          })
        })
        .catch((err) => {
          this.$notify({
            title: 'Error',
            text: err.message,
            type: 'error',
          })
        })
        .then(() => (this.loading = false))
    },
  },
}
</script>
