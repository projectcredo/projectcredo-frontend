<template>
  <nav class="navbar navbar-fixed-top navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <client-only>
          <button
            v-if="user"
            type="button"
            class="navbar-toggle collapsed navbar-avatar-toggle"
            data-toggle="collapse"
            data-target="#navbar-collapse"
          >
            <img :src="user.avatar.thumb" alt="">
          </button>
          <button v-else type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar" />
            <span class="icon-bar" />
            <span class="icon-bar" />
          </button>
        </client-only>

        <div class="navbar-brand">
          <nuxt-link to="/">
            <img src="~assets/images/logo-white.png" alt="">
          </nuxt-link>
        </div>
      </div>
      <div id="navbar-collapse" class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-left">
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >About <span class="caret" /></a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/about">
                  Our Mission
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/how-to">
                  How To
                </nuxt-link>
              </li>
              <li role="separator" class="divider" />
              <li><a href="https://www.patreon.com/projectcredo" target="_blank">Sponsor Us</a></li>
            </ul>
          </li>
        </ul>

        <client-only>
          <ul v-if="user" class="nav navbar-nav navbar-right">
            <notifications />
            <li class="dropdown">
              <a data-toggle="dropdown" href="javascript:void(0);" class="navbar-avatar dropdown-toggle" :title="user.username">
                <span class="avatar-round-image"><img :src="user.avatar.thumb" alt=""></span>
                <span class="hidden-sm hidden-md hidden-lg">{{ user.username }}</span>
                <i class="caret" />
              </a>
              <ul class="dropdown-menu">
                <li>
                  <nuxt-link :to="`/${user.username}`">
                    <i class="fa fa-user" /> My Profile
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/users/edit">
                    <i class="fa fa-pencil" /> Edit account
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/bookmarks">
                    <i class="fa fa-bookmark" /> Bookmarks
                  </nuxt-link>
                </li>
                <li class="divider" />
                <li>
                  <a role="button" @click="onSignOut">
                    <i class="fa fa-sign-out" /> Sign out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul v-else class="nav navbar-nav navbar-right">
            <li>
              <nuxt-link to="/users/sign_in">
                Sign in
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/users/sign_up">
                Sign up
              </nuxt-link>
            </li>
          </ul>
        </client-only>

        <ul class="navbar-form navbar-left navbar-search-form">
          <form>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                name="q"
                size="50"
                value=""
              >
              <div class="input-group-btn">
                <button class="btn btn-default" type="submit">
                  <i class="glyphicon glyphicon-search" />
                </button>
              </div>
            </div>
          </form>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Notifications from './Notifications'

export default {
  components: { Notifications },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
    }),

    async onSignOut () {
      await this.signOut()
      this.$router.push('/')
    },
  },
}
</script>
