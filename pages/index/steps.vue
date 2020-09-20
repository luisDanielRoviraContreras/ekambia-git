<template>
  <div class="steps-transfer">
    <nav-bar back @click="$router.push('/')" />
    <div class="con-steps">
      <step-1 @click="isOpen = 1" :ready="isOpen == 2 || isOpen == 3" :open="isOpen == 1" />
      <step-2 @click="isOpen = 2" :ready="isOpen == 3" :open="isOpen == 2" />
      <step-3 @click="isOpen = 3" :black="isOpen == 2" :open="isOpen == 3" />
      <Success v-if="isOpen == 4" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import axios from '~/plugins/axios'
@Component({
  name: 'steps',
  fetch() {
    (this as any).getOperation(this.$route.query.id)
  },
  fetchOnServer: false
})
export default class steps extends Vue {
  isOpen: any = 3

  @State(state => state.steps.data) operation

  @Action('steps/getOperation') getOperation

  mounted() {
    this.$nextTick(() => {
      this.isOpen = this.$route.query.step || 1
    })
  }
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
  .con-steps
    width: 100%
    max-width: 600px
// responsive

@media (min-width: 812px)
  .steps-transfer
    align-items: center
</style>
