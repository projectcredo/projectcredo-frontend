<template>
  <modal ref="modal" :value="show" size="md" @input="$emit('hide')">
    <div slot="title">
      <h4 class="modal-title">
        Cite Paper
      </h4>
    </div>

    <ul>
      <li v-for="paper in papers" :key="paper.id">
        <a href="#" @click.prevent="$emit('selected', paper)">{{ paper.title }}</a>
      </li>
    </ul>

    <div slot="footer">
      <button type="button" class="btn btn-default" @click="$emit('hide')">
        Close
      </button>
    </div>
  </modal>
</template>

<script>
import { Modal } from 'uiv'
import uniqBy from 'lodash/uniqBy'

export default {

  components: {
    Modal,
  },

  props: [
    'show',
    'list',
  ],

  computed: {
    papers () {
      const papers = this.list.posts.reduce((acc, post) => {
        post.articles.forEach((article) => {
          acc = acc.concat(article.papers)
        })

        return acc
      }, [])

      return uniqBy(papers, 'id')
    },
  },

  methods: {

  },

}
</script>
