<template>
  <div
    :class="{
      absolute,
      back
    }"
    class="navbar-mobile">
    <button v-if="back" class="back-btn" @click="$emit('click')">
      <i class='bx bx-arrow-back'></i>
    </button>
    <div class="right">
      <img src="/logo1.png" alt="">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class NavbarMobile extends Vue {
  @Prop({ type: Boolean }) absolute: boolean
  @Prop({ type: Boolean }) back: boolean
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
  min-height: 40px
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
    i
      font-size: 1.4rem
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
