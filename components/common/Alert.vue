<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div v-if="open" class="alert">
      <div class="con-alert">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Alert extends Vue {
  @Prop({ default: false, type: Boolean }) open: boolean

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const h = el.scrollHeight
    el.style.height = h - 1 + 'px'
    done()
  }

  leave (el: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }
}
</script>
<style lang="sass" scoped>
.alert
  width: 100%
  transition: all .25s ease
  overflow: hidden
  background: rgba(255,54,95, .1)
  color: rgba(255,54,95, 1)
  border-radius: 0px 0px 20px 20px
  .con-alert
    padding: 8px 20px
    padding-bottom: 10px
    font-size: .8rem
    font-weight: 600
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
