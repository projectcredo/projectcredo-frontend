import axios from 'axios'

export const state = () => ({
  token: null,
  client: null,
  expiry: null,
  uid: null,
  tokenType: null,
  user: null,
  loading: false,
})

function getTokenData (headers) {
  return {
    token: headers['access-token'],
    client: headers.client,
    expiry: headers.expiry,
    uid: headers.uid,
    tokenType: headers['token-type'],
  }
}

function setCookie ($cookies, tokenData) {
  $cookies.set('auth', tokenData, { path: '/', maxAge: 60 * 60 * 24 * 30 })
}

export const actions = {
  async signIn ({ commit }, form) {
    commit('SIGNIN')
    try {
      const res = await axios.post('/api/auth/sign_in', form)
      const tokenData = getTokenData(res.headers)
      commit('SIGNIN_OK', {
        user: res.data,
        ...tokenData,
      })
      setCookie(this.$cookies, tokenData)
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  async signUp ({ commit }, form) {
    commit('SIGNIN')
    try {
      const res = await axios.post('/api/auth', form)
      const tokenData = getTokenData(res.headers)
      commit('SIGNIN_OK', {
        user: res.data,
        ...tokenData,
      })
      setCookie(this.$cookies, tokenData)
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  async editPassword ({ commit }, form) {
    commit('SIGNIN')
    try {
      const res = await axios.get('/api/auth/password/edit', { params: form })
      const tokenData = getTokenData(res.headers)
      commit('SIGNIN_OK', {
        user: res.data,
        ...tokenData,
      })
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  signOut ({ commit }) {
    this.$cookies.remove('auth', { path: '/' })
    commit('SIGNOUT_OK')
  },

  async getUser ({ commit, state }) {
    if (state.loading) { return }
    commit('GET_USER')
    try {
      const res = await axios.get('/api/auth/me')
      commit('GET_USER_OK', {
        user: res.data,
      })
    } catch (e) {
      commit('GET_USER_ERR')
      throw e
    }
  },
}

export const mutations = {
  SIGNIN (state) {
    state.loading = true
  },

  SIGNIN_OK (state, { user, token, client, expiry, uid, tokenType }) {
    state.loading = false
    state.user = user
    state.token = token
    state.client = client
    state.expiry = expiry
    state.uid = uid
    state.tokenType = tokenType
  },

  SIGNIN_ERR (state) {
    state.loading = false
  },

  SIGNOUT_OK (state) {
    state.user = null
    state.token = null
  },

  GET_USER (state) {
    state.loading = true
  },

  GET_USER_OK (state, { user }) {
    state.loading = false
    state.user = user
  },

  GET_USER_ERR (state) {
    state.loading = false
  },

  SET_TOKEN (state, data) {
    state.token = data.token
    state.client = data.client
    state.expiry = data.expiry
    state.uid = data.uid
    state.tokenType = data.tokenType
  },

  UPDATE_USER (state, user) {
    state.user = user
    state.uid = user.email
  },

  CLEAR_USER (state) {
    state.user = null
    state.token = null
    state.client = null
    state.expiry = null
    state.uid = null
    state.tokenType = null
    this.$cookies.remove('auth', { path: '/' })
  },

  SOCIAL_LOGIN (state, { user, headers }) {
    const tokenData = getTokenData(headers)
    state.user = user
    state.token = tokenData.token
    state.client = tokenData.client
    state.expiry = tokenData.expiry
    state.uid = tokenData.uid
    state.tokenType = tokenData.tokenType

    setCookie(this.$cookies, tokenData)
  },
}
