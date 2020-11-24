<template>
  <div class="socket">

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Echo from 'laravel-echo'
import axios from '~/plugins/axios'
import { State, Action } from 'vuex-class'
@Component
export default class name extends Vue {

  @Action('operations/getOperations') getOperations

  mounted() {
    (window as any).Pusher = require('pusher-js');

    (window as any).Echo =  new Echo({
        broadcaster: 'pusher',
        key: 'a5e37d3bc65fe2addfe4',
        cluster: 'us2',
        forceTLS: false,
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusOperation', (response) => {
      this.getOperations()
      axios.get(`/operation-show/${response.id}`).then(({data}: any) => {
        const status = data.info.status_operation_id
        console.log('data desde socket')
        console.log(data)
        console.log(status)
        if (status == 3 && this.$route.name == 'index-step3-office') {
          if (data.info.type_operation_user_id == 1) {
            this.$router.push({
              path: '/step3/office/',
              query: {
                id: response.id,
              }
            })
          }
        }

        if (status == 3 && this.$route.name == 'index-step2-office') {
          if (data.info.type_operation_ekambia_id == 3) {
            this.$router.push({
              path: '/step3/delivery/',
              query: {
                id: response.id,
              }
            })
          } else if (data.info.type_operation_ekambia_id == 1) {
            this.$router.push({
              path: '/step3/',
              query: {
                id: response.id,
              }
            })
          }
        }

        if (status == 3 && this.$route.name == 'index-step2-delivery') {
          if (data.info.direction_in === data.info.direction_out) {
            this.$router.push({
              path: '/step3/delivery/',
              query: {
                id: response.id,
                qr: 'true'
              }
            })
          } else if (data.info.type_operation_ekambia_id == 3) {
            this.$router.push({
              path: '/step3/delivery/',
              query: {
                id: response.id,
              }
            })
          } else if (data.info.type_operation_ekambia_id == 1) {
            this.$router.push({
              path: '/step3/',
              query: {
                id: response.id,
              }
            })
          }
        }


        if (status == 4) {
          if (this.$route.name == 'index-step3') {
            this.$router.push({
              path: '/step3/',
              query: {
                id: response.id,
                animate: 'true',
                transferred: 'success'
              }
            })
          } else if (data.info.type_operation_ekambia_id == 1) {
            this.$notification({
              title: 'Operación Verificada',
              text: `Su operación de cambio <b>(${data.info.send} ${data.info.coin_send.coin} = ${data.info.received} ${data.info.coin_received.coin})</b> a sido verificada y se efectuó la transferencia a su cuenta`,
              time: 7000,
              click: () => {
                this.$router.push({
                  path: '/step3/',
                  query: {
                    id: response.id,
                    animate: 'true',
                    transferred: 'success'
                  }
                })
              }
            })
          }
          if (this.$route.name == 'index-step3-delivery') {
            this.$router.push({
              path: '/step4'
            })
          }
          if (this.$route.name == 'index-step2-office' && data.info.type_operation_ekambia_id == 2) {
            this.$router.push({
              path: '/step4'
            })
          }
          if (this.$route.name == 'index-step3-office' && data.info.type_operation_ekambia_id == 2) {
            this.$router.push({
              path: '/step4'
            })
          }
        }
      })
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusLocationDelivery', (response) => {
      this.getOperations()
      axios.get(`/operation-show/${response.id}`).then(({data}: any) => {
        const statusDeliveryIn = data.info.status_location_delivery_in_id
        const statusDeliveryOut = data.info.status_location_delivery_out_id
        const statusOperation = data.info.status_operation_id
        console.log('data desde socket delivery id')
        console.log(data)
        if (statusOperation == 1 && statusDeliveryIn == 2) {
          if (this.$route.name == 'index-step2-delivery') {
            this.$router.push({
              path: '/step2/delivery/',
              query: {
                id: response.id,
                transit: 'true'
              }
            })
          } else {
            this.$notification({
              title: 'Tu operador ya esta en transito',
              text: `El delivery de la operacion de cambio <b>(${data.info.send} ${data.info.coin_send.coin} = ${data.info.received} ${data.info.coin_received.coin})</b> ya se encuentra en ruta para la entrega en (${data.info.direction_in})`,
              time: 8000,
              click: () => {
                this.$router.push({
                  path: '/step2/delivery/',
                  query: {
                    id: response.id,
                    transit: 'true'
                  }
                })
              }
            })
          }
        } else if (statusOperation == 1 && statusDeliveryIn == 3) {
          if (this.$route.name == 'index-step2-delivery') {
            this.$router.push({
              path: '/step2/delivery/',
              query: {
                id: response.id,
                qr: 'true'
              }
            })
          } else {
            this.$notification({
              title: 'Tu operador ya esta en el lugar de intercambio',
              text: `El delivery de la operación de cambio <b>(${data.info.send} ${data.info.coin_send.coin} = ${data.info.received} ${data.info.coin_received.coin})</b> ya se encuentra en la dirección (${data.info.direction_in})`,
              time: 8000,
              click: () => {
                this.$router.push({
                  path: '/step2/delivery/',
                  query: {
                    id: response.id,
                    qr: 'true'
                  }
                })
              }
            })
          }
        } else if (statusOperation == 3 && statusDeliveryOut == 2) {
          if (this.$route.name == 'index-step3-delivery') {
            this.$router.push({
              path: '/step3/delivery/',
              query: {
                id: response.id,
                transit: 'true'
              }
            })
          } else {
            this.$notification({
              title: 'Tu operador ya esta en transito',
              text: `El delivery de la operacion de cambio <b>(${data.info.send} ${data.info.coin_send.coin} = ${data.info.received} ${data.info.coin_received.coin})</b> ya se encuentra en ruta para la entrega en (${data.info.direction_in})`,
              time: 8000,
              click: () => {
                this.$router.push({
                  path: '/step3/delivery/',
                  query: {
                    id: response.id,
                    transit: 'true'
                  }
                })
              }
            })
          }
        } else if (statusOperation == 3 && statusDeliveryOut == 3) {
          if (this.$route.name == 'index-step3-delivery') {
            this.$router.push({
              path: '/step3/delivery/',
              query: {
                id: response.id,
                qr: 'true',
                btn: 'true'
              }
            })
          } else {
            this.$notification({
              title: 'Tu operador ya esta en el lugar de intercambio',
              text: `El delivery de la operación de cambio <b>(${data.info.send} ${data.info.coin_send.coin} = ${data.info.received} ${data.info.coin_received.coin})</b> ya se encuentra en la dirección (${data.info.direction_in})`,
              time: 8000,
              click: () => {
                this.$router.push({
                  path: '/step3/delivery/',
                  query: {
                    id: response.id,
                    qr: 'true'
                  }
                })
              }
            })
          }
        }
      })
    });

    (window as any).Echo.connector.pusher.connection.bind('connected', () => {
      console.log('connected----------xxx');
    })
  }
}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
