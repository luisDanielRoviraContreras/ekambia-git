<template>
  <div
    :class="{ sendDollar }"
    class="invert">
    <p>
      {{ sendDollar ? 'Dólares' : 'Guaraní' }}
    </p>
    <button @click="handleChange">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
        <g id="Stockholm-icons-_-Navigation-_-Up-down" data-name="Stockholm-icons-/-Navigation-/-Up-down" transform="translate(30) rotate(90)">
          <rect id="Rectangle" width="2.5" height="15" rx="1.25" transform="translate(8.75 21.25) rotate(180)" opacity="0.3"/>
          <path id="Path-104" d="M11.866,28.366a1.25,1.25,0,0,1,1.768,1.768l-3.75,3.75a1.25,1.25,0,0,1-1.768,0l-3.75-3.75a1.25,1.25,0,0,1,1.768-1.768L9,31.232Z" transform="translate(-1.5 -10.5)"/>
          <rect id="Rectangle-Copy" width="2.5" height="15" rx="1.25" transform="translate(23.75 23.75) rotate(180)" opacity="0.3"/>
          <path id="Path-104-Copy" d="M35.866-14.116a1.25,1.25,0,0,0,1.768,0,1.25,1.25,0,0,0,0-1.768l-3.75-3.75a1.25,1.25,0,0,0-1.768,0l-3.75,3.75a1.25,1.25,0,0,0,0,1.768,1.25,1.25,0,0,0,1.768,0L33-16.982Z" transform="translate(-10.5 26.25)"/>
        </g>
      </svg>
    </button>
    <p>
      {{ !sendDollar ? 'Dólares' : 'Guaraní' }}
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class invert extends Vue {
  sendDollar: boolean = true

  handleChange () {
    this.sendDollar = !this.sendDollar
    this.$emit('change')
  }
}
</script>
<style lang="sass" scoped>
.invert
  position: absolute
  right: 16px
  top: 50%
  transform: translate(0,-50%)
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  z-index: 50
  &.sendDollar
    button
      svg
        transform: rotate(270deg)
  p
    font-size: .85rem
    padding: 7px 5px
    font-weight: 500
    background: -color('bg')
    display: block
    position: relative
    color: -color('text', .5)
  button
    width: 46px
    height: 46px
    background: -color('black')
    border-radius: 16px
    border: 0px
    display: flex
    align-items: center
    justify-content: center
    box-shadow: 0px 12px 15px -4px -color('black', .2)
    transition: all .25s ease
    z-index: 59
    &:active
      transform: scale(1.1)
      box-shadow: 0px 15px 15px -4px -color('black', .4)
    svg
      transition: all .25s ease
      fill: -color('bg')
      width: 26px
      transform: rotate(90deg)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
