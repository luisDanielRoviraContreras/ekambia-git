<template>
  <div class="delivery">
    <nav-bar absolute back @click="$router.push('/')" />
    <div v-if="$route.query.qr" class="content-delivery">
      <header>
        <h2>
          Código QR
        </h2>
      </header>
      <div class="con-qr">
        <img :src="qr" alt="">
      </div>
      <footer v-if="data">
        <p>
          Muestra este código a tu operador al entregarle <b>{{ data.send }} {{ data.coin_send.coin }}</b>
        </p>
      </footer>
    </div>
    <div v-else class="content-delivery">
      <tracking :lng="lng" :lat="lat" :ll="ll" v-if="data" :transit="$route.query.transit" :to="data.direction_in">
        <div v-if="!$route.query.transit" class="con-text">
          <h3>Dirección de entrega</h3>
          <p>
            Tu repartidor todavía no ha salido de la oficina
          </p>
        </div>
        <div v-else class="con-text">
          <h3>Tu operador ya esta en camino</h3>
          <!-- <p>
            Tu repartidor ya esta en camino hacia su destino
          </p> -->
        </div>
        <div v-if="delivery && $route.query.transit" class="con-user">
          <div class="user">
            <div class="avatar">
              <i class='bx bx-user' ></i>
            </div>
            <p>
              {{ delivery.firstName }}
              <span>
                {{ delivery.dni }}
              </span>
            </p>
          </div>
          <a :href="`tel:${delivery.tel}`" class="call">
            <i class='bx bxs-phone' ></i>
          </a>
        </div>
      </tracking>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import QRCode from 'qrcode'
import axios from '~/plugins/axios'
import Echo from 'laravel-echo'
@Component
export default class delivery extends Vue {
  qr: any = ''
  data: any = null
  delivery: any = null

  from: any = null

  ll: any = false
  lng: any = null
  lat: any = null

  @Prop({}) token: any
  @Prop({}) title: any
  @Prop({}) text: any

  @Watch('ll')
  handleLl() {
    axios.get(`user-show/${this.data.responsible_in_id}`).then((delivery: any) => {
      this.delivery = delivery.data.info
    })
  }

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      console.log(data)

      axios.get(`user-show/${data.info.responsible_in_id}`).then((delivery: any) => {
        this.delivery = delivery.data.info
      })

      QRCode.toDataURL(`${this.data.qrcode_in}`, {
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

  ws() {
    (window as any).Pusher = require('pusher-js');

    (window as any).Echo =  new Echo({
        broadcaster: 'pusher',
        key: 'a5e37d3bc65fe2addfe4',
        cluster: 'us2',
        forceTLS: false,
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedLocationDelivery', (response) => {
      console.log('paso por cambio de lon y lat')
      this.ll = true
      this.lat = response.info.lat
      this.lng = response.info.lon
    })
  }

  mounted() {
    this.ws()
    this.getOperation()
  }
}
</script>
<style lang="sass">
.con-user
  position: relative
  display: flex
  align-items: center
  justify-content: space-between
  padding: 10px
  border-top: 1px solid -color(gray)
  .user
    display: flex
    align-items: center
    justify-content: center
    .avatar
      width: 50px
      height: 50px
      border-radius: 50%
      background: -color(gray)
      display: flex
      align-items: center
      justify-content: center
      margin-right: 5px
      i
        font-size: 1.7rem

  /deep/p
    font-size: 1.1rem !important
    display: flex
    align-items: flex-start
    justify-content: center
    flex-direction: column
    span
      opacity: .7
      font-size: .9rem
  .call
    width: 50px
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 16px
    border: 0px
    background: -color(black)
    color: #fff
    i
      font-size: 1.6rem
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
.content-delivery
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding-top: 60px
  h2
    text-align: center
  p
    text-align: center
.delivery
  width: 100%
  height: auto
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 20px
  flex: 1
  >p
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
