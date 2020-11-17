import Vue from 'vue'
// import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'
import * as GmapVue from '~/node_modules/gmap-vue'

// region: 'ES',
// language: 'es',
Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyDn3JMFCvCFI3U2YCfTv29BOeyzFlc-xdI',
    libraries: 'places'
  },
  installComponents: true
})
