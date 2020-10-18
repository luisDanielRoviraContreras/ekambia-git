<template>
  <div
    :class="{
      open,
      ready
    }"
    class="step1"
    v-on="$listeners"
  >
    <header ref="header">
      <h3>
        <b>
          Paso 1
        </b>
        Ingreso de datos de transacción
      </h3>
    </header>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div ref="con" v-show="open" class="con">
        <div class="card-texts">
          <div class="texts">
            <div class="text">
              <span>
                Tu envías
              </span>
              <p>
                {{ getSend }} {{ coinSend[0].name }}
              </p>
            </div>
            <div class="text">
              <span>
                Tu recibes
              </span>
              <p>
                {{ getReceive }} {{ coinReceive[0].name }}
              </p>
            </div>
          </div>
          <div class="textw">
            <span>
              Tipo de cambio utilizado
            </span>
            <p v-if="data">
              {{ data.exchange_purchase.price_purchase }}
            </p>
          </div>
        </div>
        <template v-if="data">
          <Select :data="data.accounts" placeholder="Cuenta de origen" v-if="data.accounts.length > 0" :danger="!form.source_account_id && send" v-model="form.source_account_id" class="mt-6" block>
            <template v-if="data">
              <Option :key="i" v-for="(option, i) in data.accounts" :value="option.id" :text="option.alias" />
            </template>
          </Select>
        </template>
        <load class="mt-6" v-else />

        <template v-if="data">
          <Button @click="handleCreateAccount" class="mt-6" block v-if="data.accounts.length == 0">
            Crear cuenta bancaria
          </Button>
        </template>

        <Alert :open="!form.source_account_id && send">
          Este campo es requerido
        </Alert>
        <template v-if="data">
          <Select :data="data.accounts" placeholder="Cuenta de destino" v-if="data.accounts.length > 0" :danger="!form.destination_account_id && send" class="mt-6" v-model="form.destination_account_id" block>
            <template v-if="data">
              <Option :key="i" v-for="(option, i) in data.accounts" :value="option.id" :text="option.alias" />
            </template>
          </Select>
          <Alert :open="!form.destination_account_id && send">
            Este campo es requerido
          </Alert>
        </template>
        <load class="mt-6" v-else />

        <Select :data="data.origins" placeholder="Origen de fondos" v-if="data && data.accounts.length > 0" :danger="!form.source_funds && send" class="mt-6" v-model="form.source_funds" block>
          <template v-if="data">
            <Option :key="i" v-for="(option, i) in data.origins" :value="option.id" :text="option.alias" />
          </template>
        </Select>
        <load class="mt-6" v-else />
        <Alert :open="!form.source_funds && send">
          Este campo es requerido
        </Alert>
        <Button :disabled="!data" :loading="loading" @click="createOperation" class="mt-6" block yellow>
          Iniciar Operación
        </Button>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import axios from '~/plugins/axios'
@Component
export default class step1 extends Vue {
  @Prop() open: boolean
  @Prop() ready: boolean
  data: any = null
  loading: boolean = false
  send: boolean = false

  coins: any = [
    {
      name: 'Dolares',
      id: 1
    },
    {
      name: 'Guaranies',
      id: 2
    },
    {
      name: 'Euros',
      id: 3
    },
    {
      name: 'Pesos',
      id: 4
    }
  ]

  get coinSend() {
    return this.coins.filter(coin => coin.id == this.$route.query.cs)
  }
  get coinReceive() {
    return this.coins.filter(coin => coin.id == this.$route.query.cr)
  }

  @Action('operations/getOperations') getOperations

  form: any = {
    destination_account_id: 0,
    source_account_id: 0,
    source_funds: 0
  }

  get getSend() {
    return this.$route.query.s
  }
  get getReceive() {
    return this.$route.query.r
  }

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const header = document.querySelector('.navbar-mobile')
    const step2 = document.querySelector('.step2')
    const step3 = document.querySelector('.step3')
    const h = window.innerHeight - header.scrollHeight - step2.querySelector('header').scrollHeight - step3.querySelector('header').scrollHeight - (this.$refs.header as any).scrollHeight

    el.style.height = h - 1 + 'px';
    (step2.querySelector('.con') as any).style.height = '0px';
    (step3.querySelector('.con') as any).style.height = '0px'
    done()
  }

  leave (el: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  getData() {
    axios.get('/operation-create').then(({ data }) => {
      console.log(data.info)
      this.data = {
        ...data.info,
        origins: [
          {
            id: 1,
            alias: 'Venta de inmueble'
          },
          {
            id: 2,
            alias: 'Trabajo'
          },
          {
            id: 3,
            alias: 'Contrataciones'
          },
          {
            id: 4,
            alias: 'Otro'
          }
        ]
      }
    }).catch((err) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  createOperation() {
    this.send = true
    if (!this.form.destination_account_id || !this.form.source_account_id || !this.form.source_funds) {
      return
    }

    this.loading = true

    axios.post('/operation-store', {
      send: this.getSend,
      received: this.getReceive,
      coin_send_id: "1",
      coin_received_id: "2",
      destination_account_id: "2",
      source_account_id: "1",
      source_funds: "Venta de inmueble",
      exchange_type: '1'
    }).then((res) => {
      this.loading = false;
      (this.$parent as any).isOpen = 2
      this.$router.push({
        path: 'steps',
        query: {
          id: res.data.info.operation_id
        }
      })
      this.getOperations()
    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  handleCreateAccount() {
    this.$router.push({
      path: '/accounts/create',
      query: {
        create: 'true',
        s: this.getSend,
        r: this.getReceive
      }
    })
  }

  mounted () {
    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)
    this.getData()
    const header = document.querySelector('.navbar-mobile')
    const step2 = document.querySelector('.step2 header')
    const step3 = document.querySelector('.step3 header')
    setTimeout(() => {
      const h = window.innerHeight - header.scrollHeight - step2.scrollHeight - step3.scrollHeight - (this.$refs.header as any).scrollHeight;
      (this.$refs.con as any).style.height = h - 1 + 'px'
    }, 100);
  }
}
</script>
<style lang="sass" scoped>
.step1
  background: -color('gray')
  width: 100%
  // transition: all .25s ease
  border-radius: 30px 30px 0px 0px
  padding-bottom: 30px
  margin-bottom: -30px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  &.ready
    background: -color('black')
    .con
      opacity: 0
    header
      color: -color('bg')
  .con
    // transition: all .25s ease
    overflow: auto
    padding: 0px 20px
    max-width: 600px
    width: 100%
    padding-bottom: 30px
    .card-texts
      background: -color('gray-2')
      border-radius: 30px
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
  header
    padding: 20px
    max-width: 600px
    width: 100%
    h3
      font-weight: 600
      font-size: 1rem
      b
        font-weight: bold
        font-size: 1.1rem
// responsive

@media (min-width: 812px)
  .step1
    padding-bottom: 0px
    margin-bottom: 0px
    border-radius: 30px
    header
      border-radius: 30px
</style>
