<template>
  <div
    :style="{
      height: this.height
    }"
    class="load">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class load extends Vue {
  @Prop({}) height: any
}
</script>
<style lang="sass" scoped>
@keyframes load
  0%
    transform: translate(-100%)
  100%
    transform: translate(100%)
.load
  height: 60px
  width: 100%
  background: rgba(0,0,0,.04)
  border-radius: 24px
  overflow: hidden
  position: relative
  &:after
    width: 100%
    height: 100%
    content: ''
    left: 0px
    position: absolute
    animation: load 1s ease infinite
    background-image: linear-gradient(90deg, rgba(255,255,255,0.001) 0%, #fff 50% ,rgba(255,255,255,0.001) 100%)
    opacity: .6


// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
