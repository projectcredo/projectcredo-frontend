import https from 'https'
import axios from 'axios'

export default ({ store, $config }) => {
  axios.defaults.baseURL = $config.apiUrl
  axios.defaults.params = {}

  if (process.env.NODE_ENV !== 'production') {
    axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  }

  // Request interceptor
  if (typeof axios.defaults.interceptorId !== 'undefined') {
    axios.interceptors.request.eject(axios.defaults.interceptorId)
  }

  axios.defaults.interceptorId = axios.interceptors.request.use((request) => {
    if (! request.headers) {
      request.headers = {}
    }
    request.headers.accept = 'application/json'

    if (store.state.auth.token) {
      request.headers['access-token'] = store.state.auth.token
      request.headers.client = store.state.auth.client
      request.headers.uid = store.state.auth.uid
      request.headers['token-type'] = store.state.auth.tokenType
    }

    return request
  })
}
