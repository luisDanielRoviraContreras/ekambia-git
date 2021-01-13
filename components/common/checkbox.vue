<template>
  <label
    :class="{ danger, disabled }"
    class="checkbox"
  >
    <div class="check">
      <input ref="input" :id="uid" :checked="value" type="checkbox" @change="handleChange">
      <i class="bx bx-check" />
      <div class="bg" />
    </div>
    <p :class="{checkp: value}">
      <slot />
    </p>
  </label>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component
export default class Checkbox extends Vue {
  @Prop({ default: '' }) value: any
  @Prop({ default: false }) danger!: boolean
  @Prop({ default: false }) disabled: boolean
  @Prop({ default: false }) notuid: boolean
  uid: any = 0

  handleChange () {
    this.$emit('input', !this.value)
    this.$emit('change', !this.value)
  }

  mounted() {
    if (!this.notuid) {
      this.uid = (this as any)._uid
    }
  }
}
</script>
<style lang="sass" scoped>
.checkbox
  position: relative
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 10px 0px
  &.disabled
    pointer-events: none
    input,label
      pointer-events: none
  &.danger
    color: #ff365f
    p
      color: rgba(255, 54, 95, .5)
    .check
      .bg
        border: 2px solid rgba(255, 54, 95, .4)
  p
    cursor: pointer
    font-size: .9rem
    font-weight: 600
    color: rgba(0,0,0,.5)
    &.checkp
      color: #000
  .check
    width: 25px
    height: 25px
    border: 2px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    position: relative
    z-index: 10
    margin-right: 10px
    cursor: pointer
    .bg
      width: 100%
      height: 100%
      position: absolute
      top: 0px
      left: 0px
      border-radius: inherit
      border: 2px solid #e2e7ec
      z-index: -2
      transition: all .25s ease
    input
      width: 25px
      height: 25px
      opacity: 0
      cursor: pointer
      &:checked
        ~ .bg
          background: #000
          border: 2px solid #000
        ~ p
            color: #000
        ~ i
          opacity: 1
          transform: scale(1)
    i
      transform: scale(.5)
      position: absolute
      opacity: 0
      transition: all .25s ease
      font-size: 1.4rem
      margin-top: -1px
      color: #fff
      z-index: -1

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
