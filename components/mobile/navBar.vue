<template>
  <div
    :class="{
      absolute,
      back,
      notPadding
    }"
    class="navbar-mobile">
    <button v-if="back" class="back-btn" @click="$emit('click')">
      <!-- <i class='bx bx-arrow-back'></i> -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g id="Grupo_2221" data-name="Grupo 2221" transform="translate(-68 -85.773)">
          <rect id="Rectangle" width="2.571" height="18" rx="1.286" transform="translate(86 93.488) rotate(90)" opacity="0.3" />
          <path id="Path-94" d="M2.195.377A1.286,1.286,0,0,0,.377,2.195L8.091,9.909a1.286,1.286,0,0,0,1.778.039l7.714-7.071a1.286,1.286,0,1,0-1.738-1.9L9.039,7.22Z" transform="translate(78.286 85.773) rotate(90)"/>
        </g>
      </svg>
    </button>
    <div class="right">
      <img src="/ekambia_logo.svg" alt="">
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
      height: 24px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
