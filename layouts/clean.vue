<template>
  <div class="app clean">
    <Nuxt />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class cleanLayout extends Vue {
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
