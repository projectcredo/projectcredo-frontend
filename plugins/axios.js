import axios from 'axios'

export default ({ store, $config }) => {
  axios.defaults.baseURL = $config.apiUrl
  axios.defaults.params = {}

  // Request interceptor
  axios.interceptors.request.use((request) => {
    if (! request.headers) {
      request.headers = {}
    }
    if (! request.headers.api_key) {
      request.headers.accept = 'application/json'
    }
    if (store.state.auth.token) {
      request.headers['access-token'] = store.state.auth.token
      request.headers.client = store.state.auth.client
      request.headers.uid = store.state.auth.uid
    }

    return request
  })

  // Response interceptor
  axios.interceptors.response.use(
    response => response,
    (error) => {
      const { status } = error.response || {}

      if (status >= 500) {
        console.error(error) // eslint-disable-line
      }

      // if (status === 401 && store.getters['auth/check']) {
      //   swal({
      //     type: 'warning',
      //     title: app.i18n.t('token_expired_alert_title'),
      //     text: app.i18n.t('token_expired_alert_text'),
      //     reverseButtons: true,
      //     confirmButtonText: app.i18n.t('ok'),
      //     cancelButtonText: app.i18n.t('cancel'),
      //   }).then(() => {
      //     store.commit('auth/LOGOUT')
      //
      //     redirect({ name: 'login' })
      //   })
      // }

      return Promise.reject(error)
    },
  )
}
