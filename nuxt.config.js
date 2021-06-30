import path from 'path'
import fs from 'fs'
import webpack from 'webpack'

require('dotenv').config()

const name = 'Project Credo'
const description = 'A collaborative research tool to curate, comment on, and share boards of research.  Our mission is to build a scientific commons for evidence based consensus on a wide range of topics.'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: name,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'og:image', name: 'og:image', content: '/images/pc_logo_square.jpeg' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  pwa: {
    manifest: {
      name,
      short_name: name,
    },
    meta: {
      name,
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/application.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/eventHub.js',
    '@/plugins/filters.js',
    '@/plugins/axios.js',
    '@/plugins/vuex-persist.client.js',
    '@/plugins/bootstrap.js',
    '@/plugins/legacy.js',
    '@/plugins/notifications.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
  ],

  serverMiddleware: [
    { path: '/system', handler: '~/server-middleware/dev-local-files.js' },
  ],

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    vendor: ['jquery', 'bootstrap-sass'],
    transpile: ['vt-notifications', 'vue-multiselect'],
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
  },

  tailwindcss: {
    jit: true,
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    recaptchaKey: process.env.RECAPTCHA_KEY_V3,
    name,
    description,
  },

  privateRuntimeConfig: {},
}
