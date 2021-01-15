
export default {
  components: true,

  mode: 'universal',
  router: {
    middleware: ['mobile']
  },
  loading: {
    height: '5px',
    color: '#ffda1a'
  },
  target: 'server',
  head: {
    title: 'Ekambia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=no, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
  },
  css: ['boxicons/css/boxicons.min.css', '~/style/root.sass'],
  plugins: [
    {src: '@/plugins/touch.client.ts', ssr: false},
    {src: '@/plugins/notification.client.ts', ssr: false},
    {src: '@/plugins/dialog.client.ts', ssr: false},
    {src: '@/plugins/bounce.client.ts', ssr: false},
    {src: '@/plugins/guide.client.ts', ssr: false},
    {src: '@/plugins/maps.client.js', ssr: false},
    { src: '@/plugins/vue-confetti.js', ssr: false}
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/device'
  ],
  styleResources: {
    sass: ['~/style/mixins.sass']
  },

  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent',
      nativeUI: true
    },
    icon: {
      source: '/static/icon-app.png'
    },
    manifest: {
      name: 'Ekambia',
      theme_color: '#fedc00',
      background_color: '#fedc00',
      description: 'Con Ekambia cambiar dinero nunca fue tan fácil',
      lang: 'es',
      display: 'standalone',
      crossorigin: 'use-credentials',
    }
  },
  axios: {},
  build: {
    transpile: [/^gmap-vue($|\/)/]
  },
  transpile: [/^vue2-google-maps($|\/)/, /^gmap-vue($|\/)/],
  env: {
    // API: 'http://3.16.43.49/api/'
    //
    API: 'https://ekambia.lusaxweb.pro/api/'
  }
}
