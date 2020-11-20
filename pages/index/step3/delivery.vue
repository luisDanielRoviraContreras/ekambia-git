<template>
  <div class="delivery">
    <nav-bar absolute back @click="$router.push('/')" />
    <div v-if="$route.query.qr" class="content-delivery">
      <header>
        <h2>
          {{ title }}
        </h2>
      </header>
      <div class="con-qr">
        <img v-if="!btn" :src="qr" alt="">
        <div class="con-btn" v-else>
          <p>
            Verifica el dinero que el operador te entrega y si todo esta correcto dale al botón para mostrar el código QR
          </p>
          <Button @click="btn = false" block yellow >
            Listo ! ya recibí el dinero
          </Button>
        </div>
      </div>
      <footer>
        <p>
          {{ text }}
        </p>
      </footer>
    </div>
    <div v-else class="content-delivery">
      <tracking v-if="data" :transit="$route.query.transit" :to="data.direction_out" :from="from">
        <div v-if="!$route.query.transit" class="con-text">
          <h3>Ruta de tu repartidor</h3>
          <p>
            Tu repartidor todavía no ha salido de la oficina
          </p>
        </div>
        <div v-else class="con-text">
          <h3>Tu repartidor ya esta en camino</h3>
          <p>
            Tu repartidor ya esta en camino hacia su destino
          </p>
        </div>
      </tracking>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import QRCode from 'qrcode'
import axios from '~/plugins/axios'
@Component
export default class delivery extends Vue {
  qr: any = ''
  data: any = null
  btn: any = false

  from: any = "Ctra. Navacerrada, s / n, 28400 Collado Villalba, Madrid, España"

  @Prop({}) token: any
  @Prop({}) title: any
  @Prop({}) text: any

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      console.log(data)

      QRCode.toDataURL(`${this.data.qrcode_out}`, {
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
    })
  }

  mounted() {
    this.getOperation()
    this.btn = this.$route.query.btn
  }
}
</script>
<style lang="sass">
.delivery
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
.con-btn
  p
    padding: 15px
.content-delivery
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
.delivery
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
