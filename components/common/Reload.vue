<template>
  <div
    :style="{
      transform: `translate(0, ${-100 - translate}%)`
    }"
    class="reload">
    <div :style="{
      transform: `rotate(${-translate*2.5}deg)`
    }" class="icon">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 488.932 488.932" style="enable-background:new 0 0 488.932 488.932;" xml:space="preserve">
      <g>
        <path d="M243.158,61.361v-57.6c0-3.2,4-4.9,6.7-2.9l118.4,87c2,1.5,2,4.4,0,5.9l-118.4,87c-2.7,2-6.7,0.2-6.7-2.9v-57.5
          c-87.8,1.4-158.1,76-152.1,165.4c5.1,76.8,67.7,139.1,144.5,144c81.4,5.2,150.6-53,163-129.9c2.3-14.3,14.7-24.7,29.2-24.7l0,0
          c17.9,0,31.8,15.9,29,33.5c-17.4,109.7-118.5,192-235.7,178.9c-98-11-176.7-89.4-187.8-187.4
          C18.558,171.961,118.158,62.761,243.158,61.361z"/>
      </g>
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class reload extends Vue {
  y: number = 0
  activeTouch: boolean = false
  translate: number = 0
  mounted() {
    window.addEventListener('touchstart', (evt) => {
      this.y = evt.touches[0].pageY

      if (this.y < 70 && document.querySelector('.page').scrollTop == 0 && this.$route.name !== 'accounts') {
        this.activeTouch = true
      }
      if (!document.querySelector('.con-accounts')) return
      if (this.y < 70 && document.querySelector('.con-accounts').scrollTop == 0) {
        this.activeTouch = true
      }
    })
    window.addEventListener('touchmove', (evt) => {
      if (!this.activeTouch) {
        return
      }
      this.translate = this.y - evt.touches[0].pageY + 50

      if (this.translate < -100) {
        this.translate = -100
      }
    })
    window.addEventListener('touchend', (evt) => {
      this.activeTouch = false
      this.y = 0

      if (this.translate <= -100) {
        console.log('reload')
        location.reload()
      }

      this.$el.style.transition = 'all .25s ease'
      this.translate = 0

      setTimeout(() => {
        this.$el.style.transition = ''
      }, 250);
    })
  }
}
</script>
<style lang="sass" scoped>
.reload
  position: fixed
  top: 0px
  left: 0px
  width: 100%
  z-index: 10000
  display: flex
  align-items: center
  justify-content: center
  padding: 30px 15px
  transform: translate(0, -100%)
  .icon
    display: flex
    align-items: center
    justify-content: center
    width: 45px
    height: 45px
    border-radius: 50%
    background: #fff
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,.1)
    svg
      width: 24px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
