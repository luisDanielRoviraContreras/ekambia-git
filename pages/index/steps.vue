<template>
  <div class="steps-transfer">
    <nav-bar back @click="$router.push('/')" />
    <step-1 @click="isOpen = 1" :ready="isOpen === 2 || isOpen === 3" :open="isOpen === 1" />
    <step-2 @click="isOpen = 2" :ready="isOpen === 3" :open="isOpen === 2" />
    <step-3 @click="isOpen = 3" :black="isOpen === 2" :open="isOpen === 3" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class steps extends Vue {
  isOpen: number = 1
}
</script>
<style lang="sass" scoped>
.page-enter-active, .page-leave-active
  transition: all .2s ease

.steps-transfer.page-enter
  transform: translate(0,100%) !important
  opacity: 1 !important
.steps-transfer.page-leave-to
  transform: translate(0,100%) !important
  opacity: 1 !important

.steps-transfer
  position: fixed
  width: 100%
  height: 100%
  background: -color('gray')
  top: 0px
  left: 0px
  z-index: 3000
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
