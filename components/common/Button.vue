<template>
  <button
    class="button"
    :class="{ yellow, block }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
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
  &.yellow
    background: -color('color')
    color: #000
    box-shadow: 0px 7px 20px 0px -color('color', .3)
  &.block
    width: 100%
  &:disabled
    opacity: .5
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
