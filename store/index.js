import Vuex from 'vuex'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(Vuex.createLogger({
    transformer (state) {
      if (process.server) { return '' } // To reduce console data
      return state
    },
    mutationTransformer ({ type, payload }) {
      if (process.server) { return type }
      return { type, payload }
    },
    actionTransformer ({ type, payload }) {
      if (process.server) { return type }
      return { type, payload }
    },
  }))
}

// This is for SSR debugging
export { plugins }

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    const auth = this.$cookies.get('auth')
    console.log('auth', auth)
    if (typeof auth === 'object' && auth !== null && auth.token) {
      await commit('auth/SET_TOKEN', auth)
      try {
        console.log("dispatch('auth/getUser')")
        await dispatch('auth/getUser')
      } catch (e) {
        console.log(e)
        // no user logged in
        commit('auth/CLEAR_USER')
      }
    }
  },
}
