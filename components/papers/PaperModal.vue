<template>
  <modal ref="modal" :value="show" size="lg" @input="$emit('hide')">
    <div v-if="paper.id" slot="title">
      <h4 class="modal-title">
        <vote :voteable="paper" :signed-in="!! currentUser" />
        {{ paper.title }}
        <a class="modal-external-link" :href="paper.direct_link" target="_blank" />
      </h4>
      <mini-bib :paper="paper" />
      <div>
        <span v-if="paper.tags == 0 && list.can_update">Add tags</span>
        <a v-for="(tag, index) in paper.tags" :key="tag.id" class="tag">
          {{ tag.name }}
          <button v-show="showTagForm" class="tag-remove" @click="removeTag(index)" />
        </a>
        <a v-if="list.can_update" class="edit-btn" @click="showTagForm = ! showTagForm" />
        <div v-show="showTagForm">
          <input
            v-model="newTag"
            class="form-control input-sm tag-form"
            placeholder="Hit enter to add a tag"
            @keyup.enter="addTag"
          >
        </div>
      </div>
    </div>

    <div v-if="paper.id">
      <div class="modal-section">
        <div class="modal-section-header">
          Notes and Highlights
        </div>
        <div v-if="list.can_update">
          <div class="form-group">
            <textarea
              v-model="commentField"
              rows="3"
              class="form-control comment-box"
              placeholder="help summarize this paper, what are some key takeaways?"
            />
          </div>
          <div class="form-btns form-group">
            <button v-show="commentField !== ''" class="submit-btn" :disabled="submittingComment" @click="submitComment">
              Submit
            </button>
          </div>
        </div>
        <div v-if="listComments.length === 0" class="nothing-yet">
          No notes yet...
        </div>
        <div v-for="comment in listComments.slice(0, showAllComments ? paper.comments.length + 1 : 3)" :key="comment.id" class="note">
          <div v-if="editCommentId === comment.id">
            <div class="form-group">
              <textarea v-model="editCommentField" class="form-control" :readonly="submittingEditComment" />
            </div>
            <div class="form-btns">
              <button class="submit-btn" :disabled="submittingEditComment" @click.prevent="updateComment">
                Submit
              </button>
              <a href="#" class="cancel-link" @click.prevent="cancelEditComment">Cancel</a>
            </div>
          </div>
          <div v-else>
            <comment :comment="comment" />
          </div>
          <!-- <vote :voteable="note" :signed-in="signedIn"></vote> -->
          <a v-if="currentUser && currentUser.id === comment.user_id" href="#" class="action-link" @click.prevent="editComment(comment)">
            edit
          </a>
          <a v-if="list.can_update" href="#" class="action-link" :disabled="deletingComment" @click.prevent="deleteComment(comment)">delete</a>
        </div>
        <a
          v-if="listComments.length > 3"
          class="action-link"
          @click="showAllComments = ! showAllComments"
        >{{ showAllComments ? 'hide notes' : 'show all notes' }}</a>
      </div>

      <div class="modal-section">
        <div class="modal-section-header">
          Abstract
          <span
            v-if="hasAbstract"
            data-toggle="tooltip"
            data-placement="right"
            :title="abstractImported ? 'this abstract was imported from a validated source' : 'this abstract was user generated and not validated'"
            v-text="abstractImported ? ' - imported' : ' - user generated' "
          />
          <a
            v-if="paper.abstract_editable && list.can_update"
            href="#"
            class="edit-btn"
            data-toggle="tooltip"
            data-placement="right"
            :title="hasAbstract ? 'Edit this abstract' : 'Add an abstract'"
            @click.prevent="editAbstract"
          />
        </div>
        <div v-if="! hasAbstract" v-show="! showEditAbstract" class="nothing-yet">
          No abstract was imported...
        </div>
        <div v-if="list.can_update" v-show="showEditAbstract">
          <div class="form-group">
            <textarea
              v-model="abstractField"
              rows="10"
              class="form-control"
              placeholder="No abstract was imported.  Submitted abstracts will be labeled as user generated."
              :disabled="submittingAbstract"
            />
          </div>
          <div class="form-btns">
            <button class="submit-btn" :disabled="submittingAbstract" @click="submitAbstract">
              Submit
            </button>
            <a class="cancel-link" @click="cancelAbstractForm">Cancel</a>
          </div>
        </div>
        <abstract v-if="hasAbstract" v-show="! showEditAbstract" :abstract="paper.abstract" />
      </div>

      <div class="modal-section">
        <div class="modal-section-header">
          Details
        </div>
        <ul class="list-unstyled">
          <li v-if="paper.doi != null">
            DOI: <a :href="'http://dx.doi.org/'+paper.doi" target="_blank">{{ paper.doi }}</a>
          </li>
          <li v-if="paper.pubmed_id != null">
            Pubmed:
            <a :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + paper.pubmed_id" target="_blank">{{ paper.pubmed_id }}</a>
          </li>
          <div v-if="paper.links && paper.links.length > 0">
            Direct Links:
          </div>
          <li v-for="link in paper.links" :key="link.id">
            <a :href="link.url" target="_blank" v-text="link.url" />
          </li>
        </ul>
      </div>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-default" @click="$emit('hide')">
        Close
      </button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios'
import { Modal } from 'uiv'
import Vote from '../votes/Vote.vue'
import Abstract from './Abstract.vue'
import MiniBib from './MiniBib.vue'
import Comment from './Comment.vue'

export default {

  components: {
    Abstract,
    Vote,
    MiniBib,
    Modal,
    Comment,
  },

  props: [
    'list',
    'paper',
    'show',
    'currentUser',
  ],

  data () {
    return {
      abstractField: '',
      showEditAbstract: false,
      submittingAbstract: false,
      truncateAbstract: true,

      showTagForm: false,
      newTag: '',

      commentField: '',
      showAllComments: false,
      submittingComment: false,
      editCommentId: null,
      editCommentField: '',
      submittingEditComment: false,
      deletingComment: false,
    }
  },

  computed: {
    listComments () {
      return this.paper.comments.filter(c => c.list_id === this.list.id)
    },

    hasAbstract () {
      return this.paper.abstract !== undefined
    },

    abstractImported () {
      return ! this.paper.abstract_editable && this.hasAbstract
    },
  },

  watch: {
    //
  },

  mounted () {
    this.abstractField = this.paper.abstract
  },

  methods: {
    editAbstract () {
      this.showEditAbstract = true
      this.abstractField = this.paper.abstract
    },

    cancelAbstractForm () {
      this.showEditAbstract = false
    },

    submitAbstract () {
      this.submittingAbstract = true

      axios.patch(`/papers/${this.paper.id}.json`, {
        paper: {
          abstract: this.abstractField,
        },
      }).then((res) => {
        this.submittingAbstract = false
        this.showEditAbstract = false
        this.paper.abstract = this.abstractField // eslint-disable-line
      })
    },

    submitTags (tags) {
      let tagList = this.paper.tags.map(t => t.name)
      if (this.paper.tags.length === 0) { tagList = [''] }
      tagList = tagList.concat(tags).filter(t => t)
      axios.patch(`/papers/${this.paper.id}.json`, {
        paper: {
          tag_list: tagList,
        },
      }).then((res) => {
        this.paper.tags = res.data.tags // eslint-disable-line
      })
    },

    addTag () {
      if (this.newTag !== '') {
        const tags = this.newTag.split(',')
        this.newTag = ''
        this.submitTags(tags)
      }
    },

    removeTag (index) {
      this.paper.tags.splice(index, 1) // eslint-disable-line
      this.submitTags()
    },

    submitComment () {
      this.submittingComment = true

      axios.post('/comments.json', {
        comment: {
          content: this.commentField,
          commentable_type: 'Paper',
          commentable_id: this.paper.id,
          list_id: this.list.id,
        },
      }).then((res) => {
        this.submittingComment = false
        this.commentField = ''
        this.paper.comments.unshift(res.data) // eslint-disable-line
      }).catch((err) => {
        this.submittingComment = false
        alert(err)
      })
    },

    editComment (comment) {
      this.editCommentId = comment.id
      this.editCommentField = comment.content
    },

    cancelEditComment () {
      this.editCommentId = null
      this.editCommentField = ''
    },

    updateComment () {
      this.submittingEditComment = true

      axios.patch(`/comments/${this.editCommentId}.json`, {
        comment: {
          content: this.editCommentField,
          commentable_type: 'Paper',
        },
      }).then((res) => {
        this.submittingEditComment = false
        this.paper.comments.find((comment) => {
          if (comment.id === this.editCommentId) {
            comment.content = this.editCommentField
            return true
          }
          return false
        })
        this.editCommentId = null
        this.editCommentField = ''
      }).catch((err) => {
        this.submittingEditComment = false
        alert(err)
      })
    },

    deleteComment (comment) {
      this.deletingComment = true

      axios.delete(`/comments/${comment.id}.json`).then((res) => {
        this.deletingComment = false
        this.paper.comments.splice(this.paper.comments.findIndex(c => c.id = comment.id), 1) // eslint-disable-line
      }).catch((err) => {
        this.deletingComment = false
        alert(err)
      })
    },
  },

}
</script>
