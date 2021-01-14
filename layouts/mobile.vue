<template>
  <div class="app">
    <timer />
    <websocket />
    <reload />
    <OffLine v-if="$nuxt.isOffline" />
    <Nuxt />
    <footerBar />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import footerBar from '@/components/mobile/footerBar.vue'
import navBar from '@/components/mobile/navBar.vue'
import { State, Action } from 'vuex-class'
import axios from '~/plugins/axios'
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

  handleClick() {
    axios.post(`statusoperation-update/606`, {
      status_operation_id: 1
    }).then(() => {
      console.log('paso en update')
    })
  }

  mounted () {
    this.setHeight()

    window.addEventListener('resize', this.setHeight);
  }
}
</script>
<style lang="sass">
  .app
    overflow: hidden
</style>
