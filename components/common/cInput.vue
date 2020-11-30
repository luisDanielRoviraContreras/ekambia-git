<template>
  <label
    :class="{
      hasValue: !!value,
      danger,
      gray,
      disabled,
      sticky,
      stickyPrev,
      lowercase,
      yellow
    }"
    class="con-input"
  >
    <input
      v-bind="attrs"
      :class="[identificador]"
      :value="value"
      @focus="focus = true, $emit('focus', $event)"
      @blur="focus = false"
      v-on="listeners"
    >
    <span ref="placeholder" class="placeholder">
      <slot />
    </span>
    <button
      @click="handleClickHidePassword"
      v-if="$attrs.type === 'password'"
      class="btn-hide"
    >
      <i v-if="!forceInputText" class='bx bxs-hide'></i>
      <i v-else class='bx bxs-show' ></i>
    </button>
    <div class="bg" />
  </label>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  inheritAttrs: false
})
export default class InputComponent extends Vue {
  @Prop({}) identificador: any
  @Prop({}) value: any
  @Prop({ type: Boolean, default: false }) danger: boolean
  @Prop({ type: Boolean, default: false }) gray: boolean
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ type: Boolean }) sticky: boolean
  @Prop({ type: Boolean }) stickyPrev: boolean
  @Prop({ type: Boolean }) lowercase: boolean
  @Prop({ type: Boolean }) yellow: boolean

  focus: boolean = false
  forceInputText: boolean = false

  handleClickHidePassword () {
    this.forceInputText = !this.forceInputText
    this.$el.querySelector('input').focus()
  }

  get listeners () {
    return {
      ...this.$listeners,
      input: (evt: any) => {
        const max = Number(this.$attrs.maxlength)
        if (!!this.$attrs.maxlength) {
          if (evt.target.value.length < max) {
              this.$emit('input', evt.target.value)
              this.$emit('change-value', evt.target.value)
          } else {
            evt.target.value = evt.target.value.substring(0, max)
          }
        } else {
          this.$emit('input', evt.target.value)
          this.$emit('change-value', evt.target.value)
        }
      }
    }
  }

  get attrs () {
    return {
      ...this.$attrs,
      type: this.forceInputText ? 'text' : this.$attrs.type
    }
  }
}
</script>
<style lang="sass" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

/* Firefox */
input[type=number]
  -moz-appearance: textfield

.con-input
  position: relative
  width: 100%
  display: flex
  align-items: center
  justify-content: flex-start
  &.yellow
    input
      color: #000
    .placeholder
      background: -color('color') !important
      z-index: 200
    .bg
      background: -color('color')
      border: 2px solid -color('black') !important
  &.lowercase
    input
      text-transform: lowercase
  &.sticky
    .bg
      border-radius: 24px 0px 0px 24px
  &.disabled
    opacity: .5
    pointer-events: none
  &.gray
    .placeholder
      background: -color('gray')
    .bg
      background: -color('gray')
  &.danger
    .placeholder
      color: rgba(255,54,95, 1) !important
    .bg
      border-radius: 24px 24px 0px 0px
      border: 2px solid rgba(255,54,95, .2) !important
    i
      color: rgba(255,54,95, 1) !important
  &.stickyPrev
    margin-left: 0px !important
    .bg
      border-left: 0px !important
      border-top-left-radius: 0px !important
      border-bottom-left-radius: 0px !important
  &.hasValue
    .placeholder
      transform: translate(9px, -30px) scale(1)
      color: -color('black', 1)
  input
    padding: 19px 15px
    font-size: 16px
    display: block
    border: 0px
    width: 100%
    max-height: none
    position: relative
    background: transparent
    color: -color('black', 1)
    z-index: 10
    &:read-only
      opacity: .5
      ~ .placeholder
        color: rgba(0,0,0,.5)
      ~ .bg
        opacity: .5
        border: 2px solid #e2e7ec
    &:focus
      ~ .bg
        border: 2px solid -color('color', 1)
      ~ .placeholder
        transform: translate(9px, -30px) scale(1)
        color: -color('black', 1)
  .btn-hide
    position: absolute
    right: 0px
    background: inherit
    border: 0px
    width: 60px
    height: 60px
    font-size: 1.25rem
    display: flex
    align-items: center
    justify-content: center
    z-index: 100
  .placeholder
    position: absolute
    margin-left: 12px
    padding: 0px 8px
    color: -color('black', .3)
    background: -color('bg')
    display: block
    z-index: 30
    transition: all .2s ease
    font-weight: 600
    line-height: 1rem
    border-radius: 5px
    font-size: 16px
    pointer-events: none
    &:first-letter
      text-transform: uppercase
  .bg
    width: 100%
    height: 100%
    position: absolute
    left: 0px
    top: 0px
    // border: 2px solid -color('black', .1)
    border: 2px solid #e2e7ec
    border-radius: 24px
    transition: all .25s ease
    background: -color('bg')
    pointer-events: none
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
