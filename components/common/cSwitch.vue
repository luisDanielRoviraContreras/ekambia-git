<template>
  <label class="switch">
    <input
      :id="_uid"
      type="checkbox"
      name=""
      :value="value"
      @input="handleInput"
    >
    <i class="bx bx-check" />
    <span class="circle" />
    <span class="bg" />
  </label>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class SwitchElement extends Vue {
  @Prop({}) value: any

  handleInput(evt) {
    this.$emit('input', !this.value)
  }
}
</script>
<style lang="sass" scoped>
.switch
  width: 48px
  height: 26px
  background: -color('gray-2')
  border-radius: 15px
  cursor: pointer
  padding: 4px
  box-sizing: border-box
  position: relative
  overflow: hidden
  display: flex
  align-items: center
  i
    position: absolute
    left: 0px
    z-index: 9
    color: -color('black')
    transition: all .25s ease
    font-size: 1.1rem

  .circle
    width: 18px
    height: 18px
    background: -color('bg')
    border-radius: 20px
    display: block
    transition: all .25s ease
    z-index: 10
    position: relative
  .bg
    width: 0%
    height: 100%
    background: -color('color')
    display: block
    position: absolute
    top: 0px
    left: 0px
    border-radius: inherit
    transition: all .25s ease
    z-index: 5
  input
    position: absolute
    opacity: 0
    z-index: 100
    width: 100%
    height: 100%
    &:checked
      ~ .circle
        margin-left: 22px
      ~ .bg
        width: 100%
      ~ i
        left: 7px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
