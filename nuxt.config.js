
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  components: true,
  mode: 'universal',
  router: {
    middleware: ['mobile']
  },

  loading: {
    height: '5px',
    color: '#ffda1a'
  },
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  head: {
    title: 'Ekambia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['boxicons/css/boxicons.min.css', '~/style/root.sass'],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '@/plugins/touch.client.ts', ssr: false},
    {src: '@/plugins/notification.client.ts', ssr: false},
    {src: '@/plugins/dialog.client.ts', ssr: false},
    {src: '@/plugins/bounce.client.ts', ssr: false},
    {src: '@/plugins/guide.client.ts', ssr: false}
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/device'
  ],
  styleResources: {
    sass: ['~/style/mixins.sass']
  },

  pwa: {
    manifest: {
      name: 'Ekambia',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      description: 'Ekambia',
      lang: 'es',
      display: 'standalone',
      crossorigin: 'use-credentials'
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },

  env: {
    // API: 'http://3.16.43.49/ekambiault/public/api/'
    API: 'https://ekambia.lusaxweb.pro/api/'
  }
}
