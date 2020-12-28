<template>
  <div
    :class="{
      absolute,
      back,
      notPadding
    }"
    class="navbar-mobile">
    <button v-if="back" class="back-btn" :class="{ isDesktop: $device.isDesktop }" @click="$emit('click')">
      <!-- <i class='bx bx-arrow-back'></i> -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g id="Grupo_2221" data-name="Grupo 2221" transform="translate(-68 -85.773)">
          <rect id="Rectangle" width="2.571" height="18" rx="1.286" transform="translate(86 93.488) rotate(90)" opacity="0.3" />
          <path id="Path-94" d="M2.195.377A1.286,1.286,0,0,0,.377,2.195L8.091,9.909a1.286,1.286,0,0,0,1.778.039l7.714-7.071a1.286,1.286,0,1,0-1.738-1.9L9.039,7.22Z" transform="translate(78.286 85.773) rotate(90)"/>
        </g>
      </svg>

      <span>
        Volver
      </span>
    </button>
    <div class="right">
      <img v-if="$device.isDesktop ? true : !steps " src="/ekambia_logo.svg" alt="">
      <steps numbers v-else :value="step" :items="3" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class NavbarMobile extends Vue {
  @Prop({ type: Boolean }) absolute: boolean
  @Prop({ type: Boolean }) back: boolean
  @Prop({ type: Boolean }) notPadding: boolean
  @Prop({ type: Boolean }) steps: boolean
  @Prop({ }) step: any
}
</script>
<style lang="sass" scoped>
.navbar-mobile
  width: 100%
  position: relative
  left: 0px
  top: 0px
  background: inherit
  padding: 0px 20px
  display: flex
  align-items: center
  justify-content: center
  z-index: 1000
  min-height: 50px
  padding-left: 12px
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,.05)
  transition: all .25s ease
  &.notPadding
    padding: 0px !important
  &.back
    justify-content: space-between
  .back-btn
    width: 40px
    height: 40px
    border: 0px
    background: transparent
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    margin-top: 10px
    &.isDesktop
      width: auto !important
      height: auto !important
      background: -color(gray)
      padding: 14px 20px
      border-radius: 20px
      transition: all .25s ease
      &:hover
        background: -color(color)
      svg
        width: 20px
      span
        font-weight: bold
        padding-left: 10px
    i
      font-size: 1.8rem
    svg
      width: 24px
  &.absolute
    position: absolute
    top: 0px
    left: 0px
  .left
    display: flex
    align-items: center
    justify-self: center
    i
      font-size: 1.7rem
  .right
    display: flex
    align-items: center
    justify-self: center
    img
      height: 28px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
