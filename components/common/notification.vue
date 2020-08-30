<template>
  <transition name="fade-noti">
    <div v-if="isVisible" class="notification">
      <h5>
        {{ title }}
      </h5>
      <p v-if="text">
        {{ text }}
      </p>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class notificationBase extends Vue {
  title: any = 'Oops! Algo salió mal'
  text: any = null
  isVisible: boolean = false
}
</script>
<style lang="sass" scoped>
.fade-noti-enter-active, .fade-noti-leave-active
  transition: all .25s ease

.fade-noti-enter, .fade-noti-leave-to
  transform: translate(0,100%)

.notification
  position: fixed
  z-index: 2000
  bottom: 0px
  left: 0px
  width: 100%
  background: -color('color')
  padding: 20px
  border-radius: 30px 30px 0px 0px
  h5
    font-size: 1rem
  p
    font-weight: 600
    font-size: .85rem
    padding-top: 5px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
