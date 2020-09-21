<template>
  <div class="guide">
    <div class="ref">

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class guide extends Vue {}
</script>
<style lang="sass" scoped>
// responsive
.guide
  position: fixed
  width: 100%
  height: 100%
  z-index: 100000
  background: #fff
  mix-blend-mode: exclusion
  .ref
    width: 90px
    height: 90px
    background: #000
    right: 0px
    bottom: 70px
    border-radius: 50%
    position: absolute
    mix-blend-mode: exclusion
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
