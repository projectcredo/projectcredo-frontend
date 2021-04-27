<template>
  <div>
    <div class="list-card">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="list-title">
            <nuxt-link :to="`/${list.owner}/${list.slug}`">
              {{ list.name }}
            </nuxt-link>
            <nuxt-link :to="`/${list.owner}`" class="timestamp">
              created by {{ list.owner }}
            </nuxt-link>
          </div>
          <div>
            {{ list.description | truncate(300) }}
          </div>
          <div v-if="list.last_activities && list.last_activities.length">
            <div
              v-for="(activity, index) in list.last_activities"
              v-show="showMore ? true : index < 3"
              :key="activity.id"
              class="list-activity-row"
            >
              <div class="col-md-1" :class="activity.type" />
              <div class="col-md-11">
                <a v-if="activity.type === 'added'" :href="activity.addable_href">{{ activity.addable | truncate(150) }}</a>
                <span v-if="activity.type === 'commented'">"{{ activity.addable | truncate(150) }}"</span>
                <span v-if="activity.type === 'created'">This board was created!</span>
                <div class="timestamp">
                  {{ activity.user }}
                  {{ activity.type }}
                  {{ activity.updated_at }} ago
                </div>
              </div>
            </div>
            <a
              v-if="list.last_activities.length > 3"
              @click="showMore = ! showMore"
              v-text="showMore ? 'see less...' : 'see more..'"
            />
          </div>
          <div class="list-footer">
            <a v-show="! likeIsLoading" role="button" class="list-vote" :class="{'toggled': list.liked}" @click="toggleLike(list)">
              {{ list.likes }}
            </a>
            <span v-show="likeIsLoading" class="spinner">
              <span class="double-bounce1" />
              <span class="double-bounce2" />
            </span>
            <a v-show="! pinIsLoading" role="button" class="list-pin" :class="{'toggled': list.pinned}" @click="togglePin(list)">
              {{ list.pins }}
            </a>
            <span v-show="pinIsLoading" class="spinner">
              <span class="double-bounce1" />
              <span class="double-bounce2" />
            </span>
            <span class="comment-count">{{ list.comments_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    list: { type: Object, required: true },
    signedIn: Boolean,
  },

  data () {
    return {
      likeIsLoading: false,
      pinIsLoading: false,
      showMore: false,
    }
  },

  methods: {
    async likeList (list) {
      await axios.post('/api/votes', { id: list.id, type: 'list' })

      list.liked = true
      list.likes = list.likes + 1
      this.likeIsLoading = false
    },

    async unlikeList (list) {
      await axios.delete('/api/votes', {
        params: { id: list.id, type: 'list' },
      })

      list.liked = false
      list.likes = list.likes - 1
      this.likeIsLoading = false
    },

    toggleLike (list) {
      if (! this.signedIn) {
        this.$router.push('/users/sign_in')
      } else if (! this.likeIsLoading) {
        this.likeIsLoading = true
        if (list.liked) {
          this.unlikeList(list)
        } else {
          this.likeList(list)
        }
      }
    },

    async pinList (list) {
      await axios.post('/api/pins', { id: list.slug })

      list.pinned = true
      list.pins = list.pins + 1
      this.pinIsLoading = false
    },

    async unpinList (list) {
      await axios.delete(`/api/pins/${list.slug}`, { params: { id: list.slug } })

      list.pinned = false
      list.pins = list.pins - 1
      this.pinIsLoading = false
    },

    togglePin (list) {
      if (! this.signedIn) {
        this.$router.push('/users/sign_in')
      } else if (! this.pinIsLoading) {
        this.pinIsLoading = true
        if (list.pinned) {
          this.unpinList(list)
        } else {
          this.pinList(list)
        }
      }
    },
  },
}
</script>
