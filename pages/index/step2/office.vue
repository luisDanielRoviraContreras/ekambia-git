<template>
  <div class="office">
    <div v-if="status == 1" class="content-delivery con-map">
      <nav-bar absolute back @click="$router.push('/')" />
      <tracking from="honorio lozano 8, collado villalba, españa" to="rafael alberti 13, collado villalba, españa">
        <h3>Ruta para ir a la oficina</h3>
        <Button @click="status=2" class="mt-3" block yellow>
          Ya estoy en la oficina
        </Button>
      </tracking>
    </div>
    <div v-if="status == 2" class="content-delivery">
      <nav-bar not-padding back @click="$router.push('/')" />
      <header>
        <h2>
          Código QR de tu operación
        </h2>
      </header>
      <div class="con-qr">
        <img :src="qr" alt="">
      </div>
      <footer>
        <p>
          Muestra tu código QR al operador al entregar el dinero
        </p>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import QRCode from 'qrcode'
@Component
export default class office extends Vue {
  qr: any = ''
  status: any = 1

  @Prop({}) token: any
  @Prop({}) title: any
  @Prop({}) text: any

  mounted() {
    QRCode.toDataURL(`${this.token}`, {
      margin: 2,
      scale: 10,
      color: {
        dark: '#000'
      }
    })
    .then(url => {
      this.qr = url
    })
    .catch(err => {
      console.error(err)
    })
  }
}
</script>
<style lang="sass">
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
.content-delivery
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  h2
    margin-top: 10px
.office
  width: 100%
  height: auto
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 20px
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
    img
      width: 100%
      max-width: 250px
      border-radius: 40px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
