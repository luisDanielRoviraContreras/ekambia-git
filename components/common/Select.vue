<template>
  <div
    :class="{ block, danger, sticky, stickyPrev }"
    class="select"
  >
      <!-- v-bind="$attrs" -->
    <select
      :class="{'empty': !this.value}"
      :value="value"
      @change="change"
      name=""
    >
      <slot />
    </select>

    <i class='bx bxs-chevron-down'></i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Select extends Vue {
  @Prop({ type: Boolean }) block: boolean
  @Prop({ type: Boolean }) danger: boolean
  @Prop({ type: Boolean }) sticky: boolean
  @Prop({ type: Boolean }) stickyPrev: boolean
  @Prop({}) value: any

  change(evt: any) {
    this.$emit('input', evt.target.value)
    this.$emit('change', evt.target.value)
  }

  // get listeners () {
  //   return {
  //     ...this.$listeners,
  //     change: (evt: any) => {
  //       alert(evt.target.value)
  //       this.$emit('input', evt.target.value)
  //       this.$emit('change', evt.target.value)
  //     }
  //   }
  // }
}
</script>
<style lang="sass" scoped>
.select
  display: flex
  align-items: center
  justify-content: center
  position: relative
  &.sticky
    select
      border-radius: 24px 0px 0px 24px
      border-top-right-radius: 0px !important
  &.stickyPrev
    select
      border-radius: 0px 24px 24px 0px
  &.danger
    select
      color: rgba(255,54,95, 1) !important
      border-radius: 24px 24px 0px 0px
      border: 2px solid rgba(255,54,95, .2) !important
    i
      color: rgba(255,54,95, 1) !important
  &.block
    width: 100%
    select
      width: 100%
  i
    position: absolute
    right: 20px
    pointer-events: none
    font-size: 1.2rem
  select
    border: 2px solid -color('black', .1)
    border-radius: 24px
    padding: 17px 15px
    padding-right: 40px
    -webkit-appearance: none
    -moz-appearance: none
    text-indent: 1px
    text-overflow: ''
    background: transparent
    transition: all .25s ease
    font-weight: 600
    font-size: 16px
    display: block
    &:focus
      color: -color('black', 1) !important
    &.empty
      color: -color('black', .25)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
