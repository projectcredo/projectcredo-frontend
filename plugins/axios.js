import axios from 'axios'

export default ({ store }) => {
  axios.defaults.baseURL = process.env.API_URL
  axios.defaults.params = {}

  // Request interceptor
  axios.interceptors.request.use((request) => {
    if (! request.params) {
      request.params = {}
    }
    if (! request.params.api_key) {
      request.params.api_key = process.env.API_KEY
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
