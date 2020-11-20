<template>
  <div class="transfer-step1">
    <nav-bar back @click="handleBack" />

    <div class="content-step">
      <h2 class="mt-6">
        Confirmar operación
      </h2>

      <div class="card-texts">
        <div class="texts">
          <div class="text">
            <span>
              Tu envías
            </span>
            <p v-if="data">
              {{ getSend }} {{ coinSend[0].coin }}
            </p>
          </div>
          <div class="text">
            <span>
              Tu recibes
            </span>
            <p v-if="data">
              {{ getReceive }} {{ coinReceive[0].coin }}
            </p>
          </div>
        </div>
        <div class="textw">
          <span>
            Tipo de cambio utilizado
          </span>
          <p v-if="data">
            <!-- {{ data.exchange_purchase.price_purchase }} -->
            {{ getChangePrice }}
          </p>
          <p v-else>
            0.00
          </p>
        </div>
      </div>

      <h3 class="mt-6">
        Resumen
      </h3>

      <div v-if="form" class="con-resumen">
        <ul>
          <li>
            <b>Recibir</b>: {{ form.step1.typeReceiveText }}
          </li>
          <li v-if="form.step1.typeReceive == 1">
            <b>Cuenta bancaria</b>: {{ form.step1.destination_account_id__text }}
          </li>
          <li v-if="form.step1.typeReceive == 3">
            <b>Dirección</b>: {{ form.step1.direction }}
          </li>
          <li v-if="form.step1.typeReceive == 2">
            <b>Sucursal</b>: {{ form.step1.officeText }}
          </li>
        </ul>
        <ul>
          <li>
            <b>Pagar</b>: {{ form.step2.typeReceiveText }}
          </li>
          <li v-if="form.step2.typeReceive == 1">
            <b>Cuenta bancaria</b>: {{ form.step2.destination_account_id__text }}
          </li>
          <li v-if="form.step2.typeReceive == 3">
            <b>Dirección</b>: {{ form.step2.direction }}
          </li>
          <li v-if="form.step2.typeReceive == 2">
            <b>Sucursal</b>: {{ form.step2.officeText }}
          </li>
        </ul>
      </div>
    </div>

    <footer>
      <Button @click="handleInitOperation" yellow block>
        Iniciar operación
      </Button>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import { Action } from 'vuex-class'
@Component
export default class transferStep1 extends Vue {
  @Action('operations/getOperations') getOperations

  data: any = null
  send: boolean = false
  loading: boolean = false
  getSend: any = null
  getReceive: any = null
  getChangePrice: any = null

  form: any = null

  mapVisible: boolean = false
  transferVisible: boolean = false
  sucursalVisible: boolean = false

  typesOperation: any = []

  offices: any = []

  coins: any = []

  handleBack() {
    this.$router.push({
      path: '/step1/step2',
      query: {
        ...this.$route.query
      }
    })
  }

  get coinSend() {
    return this.coins.filter(coin => coin.id == this.$route.query.coinSend)
  }
  get coinReceive() {
    return this.coins.filter(coin => coin.id == this.$route.query.coinReceive)
  }

  handleInitOperation() {
    this.send = true
    this.loading = true

    const obj = {
      send: this.getSend,
      received: this.getReceive,
      coin_send_id: this.coinSend[0].id,
      coin_received_id: this.coinReceive[0].id,
      exchange_type: this.getChangePrice,
      source_funds: 0,
      source_account_id: this.form.step2.destination_account_id,
      destination_account_id: this.form.step1.destination_account_id,
      type_operation_user_id: this.form.step2.typeReceive,
      type_operation_ekambia_id: this.form.step1.typeReceive,
      office_id_in: this.form.step2.office,
      office_id_out: this.form.step1.office,
      direction_in: this.form.step2.direction,
      name_direction_in: this.form.step2.name_direction ? this.form.step1.name_direction : '',
      save_direction_in: this.form.step2.save_direction ? 1 : 0,
      direction_out: this.form.step1.direction,
      name_direction_out: this.form.step1.name_direction ? this.form.step2.name_direction : '',
      save_direction_out: this.form.step1.save_direction ? 1 : 0
    }

    console.log(obj)

    axios.post('/operation-store', obj).then((res) => {
      this.getOperations()
      axios.get(`/operation-show/${res.data.info.operation_id}`).then(({data}: any) => {
        if (data.info.type_operation_user_id == 1) {
        this.$router.push({
          path: '/step2/',
          query: {
            id: data.info.id
          }
        })
        } else if (data.info.type_operation_user_id == 2) {
          this.$router.push({
            path: '/step2/office/',
            query: {
              id: data.info.id
            }
          })
        } else if (data.info.type_operation_user_id == 3) {
          this.$router.push({
            path: '/step2/delivery/',
            query: {
              id: data.info.id
            }
          })
        }
      })

    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  getData() {
    axios.get('/office').then(({ data }) => {
      this.offices = data.info
    }).catch((err) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
    axios.get('/typeoperation').then(({ data }) => {
      this.typesOperation = data.info
    }).catch((err) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
    axios.get('/operation-create').then(({ data }) => {
      this.data = {
        ...data.info,
      }
      this.coins = data.info.coins
    }).catch((err) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  mounted() {
    this.getData()

    this.getSend = atob((this.$route.query as any).send)
    this.getReceive = atob((this.$route.query as any).receive)
    this.getChangePrice = atob((this.$route.query as any).cp)
    const step1 = atob((this.$route.query as any).step1)
    const step2 = atob((this.$route.query as any).step2)
    this.form = {
      step1: JSON.parse(step1),
      step2: JSON.parse(step2)
    }
    console.log(this.form)
  }
}
</script>
<style lang="sass" scoped>
.con-resumen
  width: 100%
  margin-top: 10px
  background: #fff
  border-radius: 20px
  padding: 10px
  ul
    width: 100%
    + ul
      margin-top: 10px
      padding-top: 10px
      border-top: 1px dashed rgba(0,0,0,.08)
    li
      padding: 10px
      text-align: left
      width: 100%
.card-texts
  background: -color('gray-2')
  border-radius: 30px
  width: 100%
  margin-top: 20px
  .texts
    background: #fff
    border-radius: 30px
    display: flex
    align-items: center
    justify-content: center
    .text
      width: 50%
      text-align: center
      padding: 15px 10px
  .textw
    width: 100%
    text-align: center
    padding: 10px
  span
    opacity: .5
    font-size: .8rem
    font-weight: bold
  p
    font-size: .9rem
    font-weight: bold
.transfer-step1
  width: 100%
  display: flex
  align-items: flex-start
  justify-content: center
  flex-direction: column
  height: 100vh
  footer
    width: 100%
    padding: 15px

.content-step
  width: 100%
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  flex: 1
  padding: 15px
  h2
    font-size: 1rem
    text-align: center
  h3
    font-size: 1rem
    text-align: center
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
