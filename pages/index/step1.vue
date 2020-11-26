<template>
  <div class="steps-transfer">
    <nuxt-child />
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
  isOpen: any = 1
  mapVisible: boolean = false

  @State(state => state.steps.data) operation

  @Action('steps/getOperation') getOperation

  openMap() {
    this.mapVisible = true
  }

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
  transform: translate(100%) !important
  opacity: 1 !important
.steps-transfer.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important

.steps-transfer
  position: fixed
  width: 100%
  height: 100vh
  background: -color('bg')
  top: 0px
  left: 0px
  z-index: 5000
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  overflow: auto
  .con-steps
    width: 100%
    max-width: 600px
// responsive

@media (min-width: 812px)
  .steps-transfer
    align-items: center
    /deep/.transfer-step
      >footer
        margin: 0px auto
        width: 100%
        max-width: 500px
      .content-step
        margin: 0px auto
        width: 100%
        max-width: 500px
        flex: none
        min-height: 300px
</style>
