import Vue from 'vue'
// import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'
import * as GmapVue from '~/node_modules/gmap-vue'

// region: 'ES',
// language: 'es',
Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyAWqBUhd1uSQo3OlR03y2gNmJziN7aYPik',
    libraries: 'places'
  },
  installComponents: true
})
