<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      :class="[color]"
      v-if="isVisible"
      class="bounce">
      <div class="bg"></div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class BounceBase extends Vue {
  isVisible: boolean = false
  x: number = 0
  y: number = 0
  color: string = ''

  beforeEnter (el: any) {
    el.style.height = 0
    el.style.width = 0
    el.style.left = `${this.x}px`
    el.style.top = `${this.y}px`
    console.log(this.x)
    console.log(this.y)
  }

  enter (el: any, done: any) {
    let h = window.innerHeight * 2.5
    const w = window.innerWidth * 2.5

    if (w > h) {
      h = w
    }
    setTimeout(() => {
      el.style.height = h - 1 + 'px'
      el.style.width = h - 1 + 'px'
    }, 10);
    done()
  }

  leave (el: any) {
    el.style.opacity = 0
  }
}
</script>
<style lang="sass" scoped>
.fade-bounce-enter-active, .fade-bounce-leave-active
  transition: all .25s ease
.fade-bounce-enter, .fade-bounce-leave-to
  .bg
    opacity: 0

.bounce
  position: fixed
  width: 100%
  height: 100vh
  z-index: 100000
  bottom: 0px
  left: 0px
  border-radius: 50%
  transition: all .5s ease
  background: -color('color', 1)
  transform: translate(-50%, -50%)
  &.black
    background: -color('black', 1)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
