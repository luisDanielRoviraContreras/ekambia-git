<template>
  <div class="divider">
    <div class="line-1 line"></div>
    <div class="con">
      <slot></slot>
    </div>
    <div class="line-1 line"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class divider extends Vue {}
</script>
<style lang="sass" scoped>
.divider
  position: relative
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  margin-top: 30px
  .con
    padding: 0px 15px
  .line
    width: 50%
    height: 2px
    background: -color('black', .08)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
