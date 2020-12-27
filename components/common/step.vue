<template>
  <nuxt-link
    :class="{ locked, ready }"
    class="step"
    :to="to || ''"
    @click.native="$emit('click')"
  >
    <slot />
  </nuxt-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Step extends Vue {
  @Prop({ type: String }) to!: string
  @Prop({ type: Boolean }) locked!: boolean
  @Prop({ type: Boolean }) ready!: boolean
}
</script>
<style lang="sass" scoped>
.step
  font-weight: bold
  margin: 0px 10px
  display: flex
  align-items: center
  justify-content: center
  position: relative
  border-radius: 16px
  padding: 8px 16px
  border: 2px solid -color('color', .05)
  color: -color('color')
  font-size: .9rem
  transition: all .25s ease
  &.ready
    background: -color('color')
    color: -color('bg')
  &.locked
    pointer-events: none
    opacity: .5
  &.nuxt-link-exact-active
    border: 2px solid -color('color', 1)
  & ~ .step
    &.nuxt-link-exact-active, &.ready
      &:after
        background: -color('color', 1)
    &:after
      content: ''
      position: absolute
      left: -18px
      width: 12px
      height: 2px
      background: -color('color', .05)
      transition: all .25s ease
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
