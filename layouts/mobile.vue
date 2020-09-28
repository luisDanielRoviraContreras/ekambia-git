<template>
  <div class="app">
    <!-- <guide v-model="guide" /> -->
    <OffLine v-if="$nuxt.isOffline" />
    <!-- <Nuxt keep-alive /> -->
    <Nuxt />
    <footerBar />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import footerBar from '@/components/mobile/footerBar.vue'
import navBar from '@/components/mobile/navBar.vue'
import { State } from 'vuex-class'
@Component({
  components: {
    footerBar,
    navBar
  }
})
export default class name extends Vue {
  guideActive: boolean = false

  @State(state => state.guide) guide

  handleActiveGuide() {
    this.guideActive = true
  }

  setHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)
  }

  mounted () {
    this.setHeight()

    window.addEventListener('resize', this.setHeight)
  }
}
</script>
<style lang="sass">
  .app
    overflow: hidden
</style>
