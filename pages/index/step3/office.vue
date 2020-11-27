<template>
  <div class="office">
    <div class="checking" v-if="$route.query.checking">
      <h3>Verificando Transferencia</h3>
      <p>
        Al verificar la transferencia ya podrás dirigirte a nuestra oficina para recibir el dinero
      </p>
    </div>
    <div v-show="stepx == 1" class="content-delivery con-map">
      <nav-bar absolute back @click="$route.query.source == 'operations' ? $router.push('/?operations=true') : $router.push('/')" />
      <tracking from="honorio lozano 8, collado villalba, españa" to="rafael alberti 13, collado villalba, españa">
        <h3>Ruta para ir a la oficina</h3>
        <Button @click="changeState" class="mt-3" block yellow>
          Ya estoy en la oficina
        </Button>
      </tracking>
    </div>
    <div v-show="stepx == 2" class="content-delivery">
      <nav-bar not-padding back @click="$route.query.source == 'operations' ? $router.push('/?operations=true') : $router.push('/')" />
      <header>
        <h2>
          Código de tu operación
        </h2>
      </header>
      <div class="con-qr">
        <!-- <img :src="qr" alt=""> -->

        <!-- <divider>
          O
        </divider> -->
        <div class="con-inputs">
          <div class="con-input">
            <input disabled ref="input1" v-model="form.n1" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
          </div>
          <div class="con-input">
            <input disabled ref="input2" v-model="form.n2" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
          </div>
          <div class="con-input">
            <input disabled ref="input3" v-model="form.n3" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
          </div>
          <div class="con-input">
            <input disabled ref="input4" v-model="form.n4" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
          </div>
        </div>
      </div>
      <footer>
        <p>
          Proporciona este código a tu operador en la oficina
        </p>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import QRCode from 'qrcode'
import axios from '~/plugins/axios'
import { Action } from 'vuex-class'
@Component
export default class office extends Vue {
  qr: any = ''
  stepx: any = 1
  data: any = null
  form: any = {
    n1: null,
    n2: null,
    n3: null,
    n4: null
  }

  @Action('operations/getOperations') getOperations

  changeState() {
    axios.post(`/step-out-update/${this.$route.query.id}`, {
      step_out_id: 2
    }).then(({data}: any) => {
      this.stepx = 2
      this.getOperations()
    })
  }

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      console.log(data)
      this.form.n1 = this.data.code_check[0]
      this.form.n2 = this.data.code_check[1]
      this.form.n3 = this.data.code_check[2]
      this.form.n4 = this.data.code_check[3]
    })
  }

  mounted() {
    this.getOperation()
    if (this.$route.query.step) {
      this.stepx = this.$route.query.step
    }
  }
}
</script>
<style lang="sass">
.checking
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  z-index: 4000
  background: -color(bg)
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 20px
.office
  .con-map
    .navbar-mobile
      padding-right: 10px
      z-index: 10000
      .right
        background: #fff
        height: 45px
        padding: 0px 10px
        margin-top: 10px
        border-radius: 10px
        box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
        img
          height: 20px

      .back-btn
        background: #fff
        border-radius: 10px
        width: 45px
        height: 45px
        margin-top: 10px
        box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
        svg
          width: 22px
</style>
<style lang="sass" scoped>
.con-inputs
  display: flex
  align-items: center
  justify-content: center
  padding-top: 20px
  .con-input
    padding: 10px
    input
      width: 60px
      height: 60px
      text-align: center
      font-size: 1.5rem
      font-weight: 600
      border: 0px
      background: -color('gray-2')
      border-radius: 15px
.content-delivery
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  width: 100%
  footer
    p
      padding: 10px
  h2
    margin-top: 10px
.office
  width: 100%
  height: auto
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 0px 20px
  flex: 1
  p
    margin-top: 20px
    text-align: center
    font-size: .9rem
    opacity: .8
  .con-qr
    display: flex
    align-items: center
    justify-content: center
    padding: 20px
    width: 100%
    flex: 1
    flex-direction: column
    img
      width: 100%
      max-width: 250px
      border-radius: 40px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
