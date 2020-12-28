<template>
  <div class="steps">
    <div
      v-for="item in items"
      :key="item"
      class="step"
      :class="{
        active: value == item,
        check: item < value,
        numbers
      }"
    >
    <span v-if="numbers">
      {{ item }}
    </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class steps extends Vue {
  @Prop() value: any
  @Prop({ type: Boolean }) numbers: any
  @Prop({ default: 1 }) items: number
}
</script>
<style lang="sass" scoped>
.steps
  display: flex
  align-items: center
  justify-content: center
  user-select: none
  .step
    width: 16px
    height: 16px
    border-radius: 50%
    position: relative
    display: flex
    align-items: center
    justify-content: center
    margin-left: 18px
    border: 2px solid #000
    transition: all .25s ease
    &.numbers
      width: 38px !important
      height: 32px !important
      font-weight: bold !important
      border: 2px solid #000 !important
      border-radius: 15px !important
      &.check
        background: transparent !important
      &:not(:last-child):after
        background: #000 !important
      &:before
        background: #000 !important
        width: 38px !important
        height: 32px !important
        border-radius: 15px !important
    &.active
      span
        color: #fff
      &:before
        opacity: 1
        transform: scale(1)
    span
      z-index: 200
    &:not(:last-child):after
      content: ''
      right: 0px
      background: #000
      width: 20px
      height: 2px
      position: absolute
      display: block
      transform: translate(100%)
    &:before
      content: ''
      width: 22px
      height: 22px
      position: absolute
      background: #000
      border-radius: 50%
      opacity: 0
      transition: all .25s ease
      transform: scale(.2)
      // box-shadow: 0px 4px 15px 0px rgba(0,0,0,.4)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
