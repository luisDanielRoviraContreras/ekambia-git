<template>
  <div class="app">
    <OffLine v-if="$nuxt.isOffline" />
    <Nuxt keep-alive />
    <footerBar />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import footerBar from '@/components/mobile/footerBar.vue'
import navBar from '@/components/mobile/navBar.vue'
@Component({
  components: {
    footerBar,
    navBar
  }
})
export default class name extends Vue {
  mounted () {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)
  }
}
</script>
<style lang="sass">
  .app
    overflow: hidden
</style>
