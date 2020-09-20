
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'

declare global {
  interface Window { __NUXT__: any }
  type document = any
}

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $device: any
    $bounceClose: Function
    $bounce: Function
    $notification: Function
    $dialog: Function
    $guide: Function
    $cookies: any
    title: any
  }
}

declare module 'vue/types/options' {
  type Context = any
  type $notification = any
  type $bounceClose = any
  type $guide = any
  type $dialog = any
  type $cookies = any
  type $bounce = any
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
