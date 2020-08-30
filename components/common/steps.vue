<template>
  <div class="steps">
    <div
      v-for="item in items"
      :key="item"
      class="step"
      :class="{
        active: value == item,
        check: item < value
      }"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class steps extends Vue {
  @Prop() value: any
  @Prop({ default: 1 }) items: number
}
</script>
<style lang="sass" scoped>
.steps
  display: flex
  align-items: center
  justify-content: center
  .step
    width: 16px
    height: 16px
    border-radius: 50%
    position: relative
    display: flex
    align-items: center
    justify-content: center
    margin-left: 22px
    border: 2px solid -color('color')
    transition: all .25s ease
    &.check
      background: -color('color', .4)
    &.active
      &:before
        opacity: 1
        transform: scale(1)
    &:not(:last-child):after
      content: ''
      right: 0px
      background: -color('color')
      width: 24px
      height: 2px
      position: absolute
      display: block
      transform: translate(100%)
    &:before
      content: ''
      width: 22px
      height: 22px
      position: absolute
      background: -color('color')
      border-radius: 50%
      opacity: 0
      transition: all .25s ease
      transform: scale(.2)
      box-shadow: 0px 4px 15px 0px -color('color', .45)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
