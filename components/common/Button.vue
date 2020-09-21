<template>
  <button
    class="button"
    :class="{ yellow, block, loading }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
    <div class="load">

    </div>
  </button>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  inheritAttrs: false
})
export default class btn extends Vue {
  @Prop({ type: Boolean }) yellow: boolean
  @Prop({ type: Boolean }) block: boolean
  @Prop({ type: Boolean }) loading: boolean
}
</script>
<style lang="sass" scoped>
.button
  background: #000
  padding: 19px 20px
  border: 0px
  color: #fff
  border-radius: 24px
  font-size: 16px
  font-weight: 600
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  position: relative
  &.loading
    pointer-events: none
    .load
      position: absolute
      z-index: 10
      width: 100%
      height: 100%
      background: -color('color')
      top: 0px
      left: 0px
      border-radius: inherit
      display: flex
      align-items: center
      justify-content: center
      &:after
        content: ''
        width: 32px
        height: 32px
        border-radius: 50%
        position: absolute
        border: 3px dashed #fff
        border-top: 3px solid transparent
        border-left: 3px solid transparent
        animation: load 1s linear infinite .1s
      &:before
        content: ''
        width: 32px
        height: 32px
        border-radius: 50%
        position: absolute
        border: 3px solid #fff
        border-top: 3px solid transparent
        border-left: 3px solid transparent
        animation: load 1s ease infinite
  &.yellow
    background: -color('color')
    color: #000
    box-shadow: 0px 7px 20px 0px -color('color', .3)
  &.block
    width: 100%
  &:disabled
    opacity: .5
// responsive

@keyframes load
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
