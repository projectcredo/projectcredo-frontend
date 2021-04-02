<template>
  <div class="list-index">
    <div v-if="$fetchState.pending" class="text-center">
      Loading...
    </div>
    <div v-if="profile">
      <div class="user-profile-heading">
        <div class="uph-cover" :style="`background-image: url(${profile.cover && profile.cover.cover})`" />
        <div class="container">
          <div class="uph-info">
            <div class="uph-avatar">
              <img :src="profile.avatar && profile.avatar.medium" alt="">
            </div>
            <h2 class="uph-username">
              {{ profile.full_name || profile.username }}
            </h2>
            <div class="uph-infoline">
              {{ profile.about }}
            </div>
            <div v-if="profile.location" class="uph-infoline">
              <i class="fa fa-map-marker" /> {{ profile.location }}
            </div>
            <div v-if="profile.website" class="uph-infoline">
              <i class="fa fa-globe" /> <a :href="profile.website" target="_blank" rel="noopener">{{ profile.website }}</a>
            </div>
            <div class="uph-infoline">
              <i class="fa fa-clock-o" /> contributor since {{ profile.created_at | date('YYYY-MM') }}
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-sm-7">
            <div class="panel panel-primary no-border no-border-radius">
              <div class="panel-heading">
                <h4>Top Tags</h4>
              </div>
              <div class="panel-body">
                <p class="text-gray">
                  Top tags are based on {{ profile.first_name || profile.username }}`s lists, comments, and pins.
                </p>
                <a v-for="tag in profile.top_tags" :key="tag.id" href="#" class="label label-tag"><span class="tag-wrap"><span class="tag-name">{{ tag.name }}</span> <span class="tag-count">{{ tag.taggings_count }}</span></span></a>
              </div>
            </div>

            <div class="panel panel-primary no-border no-border-radius">
              <div class="panel-heading">
                <h4>{{ profile.visible_lists.length }} {{ profile.visible_lists.length | pluralize('List') }}</h4>
              </div>
              <div class="panel-body">
                <div v-if="user" class="mb-20">
                  <nuxt-link to="/lists/new" class="btn btn-primary">
                    Create a new board
                  </nuxt-link>
                </div>

                <div v-for="list in profile.visible_lists" :key="list.id" class="list-item-short">
                  <div class="lis-title">
                    <nuxt-link :to="`/${list.owner.username}/${list.slug}`">
                      {{ list.name }}
                    </nuxt-link>
                  </div>
                  <div class="lis-meta">
                    {{ list.posts.length }} {{ list.posts.length | pluralize('post') }}
                    &middot; last activity {{ list.updated_at | date }}
                  </div>
                  <div class="lis-tags">
                    <a v-for="tag in list.tags" :key="tag.id" href="#" class="label label-tag"><span class="tag-wrap"><span class="tag-name">{{ tag.name }}</span> <span class="tag-count">{{ tag.taggings_count }}</span></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-1">
            &nbsp;&nbsp;
          </div>
          <div class="col-sm-4">
            <div class="panel panel-primary no-border no-border-radius">
              <div class="panel-heading">
                <h4>Total Reach</h4>
              </div>
              <div class="panel-body">
                <p><strong>Contribution Activity Over Time</strong></p>
                <p class="color-gray">
                  Contribution activity includes creating and editing lists, uploading papers, commenting, and liking content.
                </p>
                <simple-chart
                  x-label="month"
                  y-label="contribution"
                  :data="[
                    {key: 'Oct', value: 3},
                    {key: 'Nov', value: 6},
                    {key: 'Dec', value: 4},
                    {key: 'Jav', value: 2},
                    {key: 'Feb', value: 4},
                    {key: 'Mar', value: 7},
                    {key: 'Apr', value: 10},
                    {key: 'May', value: 8},
                    {key: 'Jun', value: 10},
                    {key: 'Jul', value: 18},
                    {key: 'Aug', value: 16},
                  ]"
                />

                <p class="mt-40">
                  <strong>Content Views Over Time</strong>
                </p>
                <p class="color-gray">
                  {{ profile.first_name || profile.username }}`s content views include views of their profile, lists, uploaded papers, and comments.
                </p>
                <simple-chart
                  x-label="month"
                  y-label="views"
                  :data="[
                    {key: 'Oct', value: 80},
                    {key: 'Nov', value: 130},
                    {key: 'Dec', value: 200},
                    {key: 'Jav', value: 150},
                    {key: 'Feb', value: 110},
                    {key: 'Mar', value: 200},
                    {key: 'Apr', value: 250},
                    {key: 'May', value: 240},
                    {key: 'Jun', value: 300},
                    {key: 'Jul', value: 370},
                    {key: 'Aug', value: 310},
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import SimpleChart from '../../components/charts/SimpleChart'

export default {
  components: { SimpleChart },

  data: () => ({
    profile: null,
  }),

  async fetch () {
    const { username } = this.$route.params
    const res = await axios.get(`/api/profile/${username}`)
    this.profile = res.data
  },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },
}
</script>
