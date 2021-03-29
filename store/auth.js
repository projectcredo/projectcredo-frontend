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
    const res = await axios.post('/api/auth/sign_in', form)

    commit('SIGNIN_OK', {
      user: res.data,
      token: res.headers['access-token'],
      client: res.headers.client,
      expiry: res.headers.expiry,
      uid: res.headers.uid,
    })
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

  SIGNOUT_OK (state) {
    state.user = null
    state.token = null
  },
}
