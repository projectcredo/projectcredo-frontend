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

export const actions = {
  async signIn ({ commit }, form) {
    commit('SIGNIN')
    try {
      const res = await axios.post('/api/auth/sign_in', form)
      commit('SIGNIN_OK', {
        user: res.data,
        token: res.headers['access-token'],
        client: res.headers.client,
        expiry: res.headers.expiry,
        uid: res.headers.uid,
        tokenType: res.headers['token-type'],
      })
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  async signUp ({ commit }, form) {
    commit('SIGNIN')
    try {
      const res = await axios.post('/api/auth', form)
      commit('SIGNIN_OK', {
        user: res.data,
        token: res.headers['access-token'],
        client: res.headers.client,
        expiry: res.headers.expiry,
        uid: res.headers.uid,
        tokenType: res.headers['token-type'],
      })
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  async editPassword ({ commit }, form) {
    commit('SIGNIN')
    try {
      const res = await axios.get('/api/auth/password/edit', { params: form })
      commit('SIGNIN_OK', {
        user: res.data,
        token: res.headers['access-token'],
        client: res.headers.client,
        expiry: res.headers.expiry,
        uid: res.headers.uid,
        tokenType: res.headers['token-type'],
      })
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  signOut ({ commit }) {
    commit('SIGNOUT_OK')
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

  UPDATE_USER (state, user) {
    state.user = user
    state.uid = user.email
  },
}
