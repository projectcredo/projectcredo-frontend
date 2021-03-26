<template>
  <tbody>
    <tr>
      <td>
        <bookmark :bookmarkable="r.paper" :signed-in="signedIn" />
      </td>
      <td align="center">
        <b v-if="r.paper.published_at">{{ r.paper.published_at | age }}</b>
      </td>
      <td>
        <a href="#" @click.prevent="selectReference(index)">
          {{ r.paper.title }}
        </a>
        <mini-bib :r="r" />
      </td>
      <td>
        <a v-if="showRemove" href="#" class="hidden-remove" @click.prevent="removeReference(index)" />
      </td>
      <td>
        <a
          v-if="hasPaperDetails"
          class="show-details"
          :class="{'toggled': showPaperDetails}"
          @click="showPaperDetails = !showPaperDetails"
        />
      </td>
    </tr>

    <tr v-if="showPaperDetails" class="ref-details">
      <td colspan="4">
        <div v-if="r.paper.tag_list.length > 0" class="section">
          <a v-for="tag in r.paper.tag_list" class="tag" @click="filter(tag)" v-text="tag" />
        </div>
        <div v-if="r.notes.length > 0">
          <div class="header">
            Notes and Highlights
          </div>
          <div v-for="note in r.notes.slice(0,3)" class="note">
            <vote :voteable="note" :signed-in="signedIn" />
            <note :note="note" />
          </div>
        </div>
        <div v-if="r.paper.abstract != null">
          <span class="header">Abstract</span>
          <abstract :abstract="r.paper.abstract" />
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import Vote from '../votes/Vote.vue'
import Bookmark from '../bookmarks/Bookmark.vue'
import MiniBib from './MiniBib.vue'
import Note from './Note.vue'
import Abstract from './Abstract.vue'

export default {

  components: {
    Vote,
    Bookmark,
    MiniBib,
    Note,
    Abstract,
  },

  props: ['r', 'index', 'signedIn', 'editsAllowed', 'currentUsername'],

  data () {
    return {
      recommendIsLoading: false,
      hoverPaperDetails: false,
      showPaperDetails: false,
      truncateAbstract: true,
    }
  },

  computed: {
    hasPaperDetails () {
      return this.r.notes.length > 0 || this.r.paper.tag_list.length > 0 || this.r.paper.abstract != null
    },
    showRemove () {
      return this.editsAllowed || this.r.added_by == this.currentUsername
    },
  },

  methods: {
    filter (add) {
      this.$parent.$emit('filter', add)
    },
    selectReference (index) {
      this.$parent.$emit('select-ref', index)
    },
    removeReference (index) {
      this.$parent.$emit('remove-ref', index)
    },
  },
}
</script>
