<template>
  <div class="step3">
    <nuxt-child />
    <!-- <nav-bar back @click="handleBack" /> -->
    <!-- <template v-if="data">
      <transfer v-if="data.type_operation_user_id == 1" />
      <delivery text="Este código se va a escanear por el operador cuando le entregues el dinero" title="Código QR de pago" :token="data.qrcode_in" v-if="data.type_operation_user_id !== 1" />
    </template> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import axios from '~/plugins/axios'
@Component({
  name: 'steps',
  // fetch() {
  //   (this as any).getOperation(this.$route.query.id)
  // },
  fetchOnServer: false
})
export default class step3 extends Vue {
  type: any = 'transfer'
  data: any = null

  handleBack() {
    this.$router.push({
      path: '/',
      query: {
        operations: this.$route.query.source === 'operations' ? 'true' : null
      }
    })
  }

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
    })
  }

  mounted() {
    this.getOperation()
  }
}
</script>
<style lang="sass" scoped>

.page-enter-active, .page-leave-active
  transition: all .2s ease

.step3.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.step3.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important

.step3
  position: fixed
  width: 100%
  height: 100vh
  background: #fff
  top: 0px
  left: 0px
  z-index: 5000
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  overflow: auto
  h2
    text-align: center
    font-size: 1.2rem
  p
    font-size: .8rem
    opacity: .7
    text-align: center
  .con-steps
    width: 100%
    max-width: 600px
// responsive

@media (min-width: 812px)
  .step3
    align-items: center
    .con-steps
      width: 100%
      max-width: 500px
</style>
