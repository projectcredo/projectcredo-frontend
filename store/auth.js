import axios from 'axios'

export const state = () => ({
  token: null,
  client: null,
  expiry: null,
  uid: null,
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
      })
    } catch (e) {
      commit('SIGNIN_ERR')
      throw e
    }
  },

  async signUp ({ commit }, form) {
    commit('SIGNUP')
    try {
      const res = await axios.post('/api/auth', form)
      commit('SIGNUP_OK', {
        user: res.data,
        token: res.headers['access-token'],
        client: res.headers.client,
        expiry: res.headers.expiry,
        uid: res.headers.uid,
      })
    } catch (e) {
      commit('SIGNUP_ERR')
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

  SIGNIN_OK (state, { user, token, client, expiry, uid }) {
    state.loading = false
    state.user = user
    state.token = token
    state.client = client
    state.expiry = expiry
    state.uid = uid
  },

  SIGNIN_ERR (state) {
    state.loading = false
  },

  SIGNUP (state) {
    state.loading = true
  },

  SIGNUP_OK (state, { user, token, client, expiry, uid }) {
    state.loading = false
    state.user = user
    state.token = token
    state.client = client
    state.expiry = expiry
    state.uid = uid
  },

  SIGNUP_ERR (state) {
    state.loading = false
  },

  SIGNOUT_OK (state) {
    state.user = null
    state.token = null
  },
}
