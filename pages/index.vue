<template>
  <div ref="page" :class="{ slide: $route.name !== 'index' }" class="index page">
    <nav-bar v-if="$device.isMobile" />
    <div ref="change" id="change" class="con-change">

      <h2 v-if="$device.isDesktop" class="mb-6">
        Cambiar dinero
      </h2>
      <!-- <div v-if="sale_price" class="con-img">
        <img src="/home.svg" alt="">
      </div>
      <load v-else class="mb-6" height="155px" width="240px" /> -->
      <div v-if="sale_price" class="con-prices">
        <div class="price-1 price">
          Compra: <span v-if="purchase_price">{{ purchase_price }}</span>
        </div>
        <div class="price-2 price">
          Venta: <span v-if="sale_price">{{ sale_price }}</span>
        </div>
      </div>
      <load v-else />
      <div class="con-inputs mt-6">
        <div v-if="coins" class="input-select">
            <!-- :inputmode="$device.isIos ? 'numeric' : 'none'" -->
          <c-input
            ref="send"
            v-model="form.send"
            :inputmode="$device.isIos ? 'numeric' : 'none'"
            :type="$device.isDesktop ? 'number' : null"
            identificador="send"
            @focus="inputFocus"
            @change-value="handleFormSend"
            money
            :guaranies="form.coinSend == 1"
          >
            Yo tengo
          </c-input>
          <Select esquina @change="handleChangeCoin" child="coin" :data="coins" placeholder="Moneda" block v-model="form.coinSend" :danger="!form.coinSend && send">
            <template>
              <Option :disabled="option.id == form.coinReceive" :key="i" v-for="(option, i) in coins" :value="option.id" :text="option.coin" />
            </template>
          </Select>
        </div>
        <load v-else />
        <invert @change="handleChange"/>
        <div v-if="coins" class="input-select readonly">
          <c-input
            ref="receive"
            v-model="form.receive"
            :inputmode="$device.isIos ? 'numeric' : 'none'"
            class="receive"
            identificador="receive"
            @focus="inputFocus"
            money
            disabled
            :guaranies="form.coinReceive == 1"
          >
            Yo recibo
          </c-input>
          <Select esquina @change="handleChangeCoin" child="coin" :data="coins" placeholder="Moneda" block v-model="form.coinReceive" :danger="!form.coinReceive && send">
            <template>
              <Option :disabled="option.id == form.coinSend" :key="i" v-for="(option, i) in coins" :value="option.id" :text="option.coin" />
            </template>
          </Select>
        </div>
        <load v-else />
      </div>


      <Button :loading="loading" :disabled="form.send <= 0" @click="handleInitOperation" class="mt-6" yellow block>
        Iniciar Operación
      </Button>

      <limits />
    </div>

    <nuxt-child />
    <operations :scroll-top="scrollTop" ref="operations" @click="handleClick" />
    <transition name="fade-teclado">
      <teclado v-if="focus && $device.isMobile && !$device.isIos" @click="handleTeclado" />
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import operations from '@/components/index/operations.vue'
import invert from '@/components/index/invert.vue'
import teclado from '@/components/common/teclado.vue'
import accounting from 'accounting/accounting'
import axios from '~/plugins/axios'
@Component({
  name: 'index',
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    operations,
    invert,
    teclado
  },
})
export default class name extends Vue {
  scrollTop: number = 0
  reverse: boolean = false
  focus: any = null
  data: any = null
  loading: boolean = false
  sale_price: any = null
  purchase_price: any = null
  form: any = {
    send: 0,
    receive: 0,
    coinSend: 2,
    coinReceive: 1
  }
  // coins: any = []
  @State('status_user_id') status_user_id

  // @State('sale_price') sale_price

  // @State('purchase_price') purchase_price

  @State('coins') coins

  @Mutation('SET_GUIDE') setGuide

  @Mutation('SET_COINS') setCoins

  @Mutation('SET_PURCHASE') setPurchase

  @Mutation('SET_SALE') setSale

  handleFormSend(val) {
    this.handleChangeCoin()
  }

  getCoins() {
    axios.get('/coins').then(({ data }) => {
      this.setCoins(data.info)
      axios.get(`/coins-show/${2}`).then(({ data }) => {
        // this.setPurchase(data.info.purchase_price)
        // this.setSale(data.info.sale_price)
        this.purchase_price = data.info.purchase_price
        this.sale_price = data.info.sale_price
        if(this.form.send) {
          this.handleFormSend(this.form.send)
        }
      })
    })
  }

  handleChangeCoin() {
    console.log(this.form.send)
    if (!this.form.send) {
      return
    }
    axios.post('/converter', {
      amount: this.form.send,
      coin_id_origin: this.form.coinSend,
      coin_id_destination: this.form.coinReceive,
      action: 1
    }).then(({data}) => {
      console.log(data.info)
      this.form.receive = data.info.result
      this.purchase_price = data.info.purchase_price
      this.sale_price = data.info.sale_price
    })
  }

  getData() {
    this.getCoins()
  }

  handleInitOperation() {
    const optionsSend = {
      symbol : "",
      decimal : this.form.coinSend == 1 ? '.' : ',',
      thousand: ".",
      precision : 2,
    }
    const optionsReceive = {
      symbol : "",
      decimal : this.form.coinReceive == 1 ? '.' : ',',
      thousand: ".",
      precision : 2,
    }
    // {
    //   decimal: guaranies ? '.' : ',',
    //   thousands: '.',
    //   prefix: '',
    //   suffix: '',
    //   precision: 2,
    //   masked: false /* doesn't work with directive */
    // }
    console.log('send old === ', this.form.send)
    console.log('send new === ',accounting.formatMoney(this.form.send, optionsSend))
    console.log('receive old === ', this.form.receive)
    console.log('receive new === ',accounting.formatMoney(this.form.receive, optionsReceive))

    this.loading = true
    axios.get('/limites-user').then(({data}: any) => {
      this.loading = false
      if (data.info.status_user_id[0] == 1) {
        if (this.$cookies.get('profile_id') == 2) {
          this.$router.push({
            path: '/verified/business', query: {
              send: btoa(accounting.formatMoney(this.form.send, optionsSend)),
              receive: btoa(accounting.formatMoney(this.form.receive, optionsReceive)),
              coinSend: this.form.coinSend,
              coinReceive: this.form.coinReceive,
              cp: btoa(this.sale_price),
            }
          })
        } else {
          this.$router.push({
            path: '/verified', query: {
              send: btoa(accounting.formatMoney(this.form.send, optionsSend)),
              receive: btoa(accounting.formatMoney(this.form.receive, optionsReceive)),
              coinSend: this.form.coinSend,
              coinReceive: this.form.coinReceive,
              cp: btoa(this.sale_price),
            }
          })
        }
      } else {
        this.$router.push({
          path: '/step1/step1', query: {
            send: btoa(accounting.formatMoney(this.form.send, optionsSend)),
            receive: btoa(accounting.formatMoney(this.form.receive, optionsReceive)),
            coinSend: this.form.coinSend,
            coinReceive: this.form.coinReceive,
            cp: btoa(this.sale_price),
          }
        })

        this.form.send = ''
        this.form.receive = ''
      }
    })
  }

  @Watch('$route.query.operations')
  handleOperations() {
    if (this.$route.name !== 'index') {
      return
    }
    if (this.$route.query.operations) {
      const page: any = document.querySelector('.index.page')
      const operations: any = page.querySelector('#operations')
      page.scrollTo(0, operations.scrollHeight)
    } else {
      const page: any = document.querySelector('.index.page')
      page.scrollTo(0, 0)
    }
  }

  mounted () {
    this.getData()
    this.handleOperations()
    this.$bounceClose()
    this.handleScroll();
    if (this.$device.isDesktop) {
      (this.$refs.send as any).$el.focus()
    }
  }

  handleScroll() {
    const el: any = this.$el

    el.addEventListener('scroll', () => {
      if (el.scrollTop === 0 && this.$route.name == 'index') {
        this.$router.push('/')
      } else if (el.scrollTop + window.innerHeight >= el.scrollHeight && this.$route.name == 'index') {
        this.$router.push({
          path: '/',
          query: {
            operations: 'true'
          }
        })
      }
    })
  }

  handleChange () {
    const oldForm = JSON.parse(JSON.stringify(this.form))
    console.log(`${oldForm.receive}`)
    console.log(`${oldForm.send}`)
    this.form.send = Number(`${oldForm.receive}`)
    this.form.receive = Number(`${oldForm.send}`)
    this.form.coinSend = Number(`${oldForm.coinReceive}`)
    this.form.coinReceive = Number(`${oldForm.coinSend}`)
  }

  inputFocus (evt: any) {
    this.focus = evt.target

    window.addEventListener('click', (evt: any) => {
      if (evt.target.closest('.teclado')) {
        return
      }
      if (evt.target.closest('.con-input')) {
        return
      }

      this.focus = null
    })

    if (evt.target.classList.contains('send')) {
      this.focus = 'send';
      (this.$refs.send as any).$el.querySelector('.send').focus()
    } else if (evt.target.classList.contains('receive')) {
      this.focus = 'receive';
      (this.$refs.receive as any).$el.querySelector('.receive').focus()
    }
  }

  handleTeclado (val: any) {
    if (val !== 'back') {
      this.form.send += `${val}`
    } else {
      this.form.send = this.form.send.slice(0, -1)
    }
    if (this.focus) {
      (this.$refs.send as any).$el.querySelector(`.${this.focus}`).focus()
    }
    this.handleFormSend(this.form.send)
  }

  handleClick (el: any) {
    const page: any = this.$refs.page
    if (page.scrollTop > 100) {
      this.$router.push({
        path: '/'
      })
    } else {
      this.$router.push({
        path: '/',
        query: {
          operations: 'true'
        }
      })
    }
  }
}
</script>
<style lang="sass">
.input-select
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  max-width: 100%
  position: relative

  &.readonly
    .select
      input
        border: 2px solid rgba(226, 231, 236, .5)
  .con-input
    position: relative
    z-index: 10
  .select
    max-width: 150px
    position: absolute !important
    right: 0px
    z-index: 15
    i
      right: 15px !important
    input
      border-radius: 0px 24px 24px 0px !important
      border: 2px solid transparent !important
      width: 100%
.index
  height: 100vh
  overflow: auto
  scroll-snap-type: y mandatory
  position: relative
  height: calc(var(--vh, 1vh) * 100)
  scroll-behavior: smooth
  width: 100%
  &.slide
    .operations
      transform: translate(-30px)
    .con-change
      transform: translate(-30px)
  .con-change
    width: 100%
    padding: 15px
    position: relative
    height: calc(100vh - 175px)
    height: calc(var(--vh, 1vh) * 100 - 175px)
    scroll-snap-align: center
    background: #fff
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    box-sizing: border-box
    max-width: 450px
    padding-top: 10px
    transition: all .25s ease-out
    .con-img
      margin-bottom: -15px
      z-index: 10
      position: relative
      min-height: 193px
      img
        max-width: 230px
.con-inputs
  position: relative
  width: 100%
.con-prices
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  background: -color('black')
  border-radius: 24px
  color: #fff
  z-index: 100
  position: relative
  .price
    width: 50%
    text-align: center
    padding: 19px 10px
    position: relative
    display: flex
    align-items: center
    font-size: .9rem
    justify-content: center
    span
      font-size: 1rem
      font-weight: bold
      display: block
      padding-left: 5px
    &:last-child
     &:after
       content: ''
       position: absolute
       left: 0px
       width: 1px
       background: #fff
       height: 26px
.change
  flex-wrap: wrap
// responsive

@media (max-height: 700px)
  .con-change
    .con-img
      display: none
@media (min-width: 812px)
  .index
    scroll-snap-type: none
    .con-change
      margin: auto
      min-height: calc(100vh - 62px)
</style>
