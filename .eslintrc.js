module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'vue/no-unused-components': ['warn'],
    'vue/no-v-html': 0,
    'space-unary-ops': [
      2, {
        words: true,
        nonwords: false,
        overrides: {
          '!': true,
        },
      }],
  },
  globals: {
    window: 'writable',
    mapboxgl: 'writable',
    $: 'readable',
    jQuery: 'readable',
  },
}
