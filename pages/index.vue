<template>
  <div ref="page" class="index page">
    <nav-bar v-if="$device.isMobile" />
    <div ref="change" id="change" class="con-change">
      <div v-if="data" class="con-img">
        <img src="home.png" alt="">
      </div>
      <load v-else class="mb-6" height="150px" width="240px" />
      <div v-if="data" class="con-prices">
        <div class="price-1 price">
          Compra: <span v-if="data">{{ data.exchange_purchase.price_purchase }}</span>
        </div>
        <div class="price-2 price">
          Venta: <span v-if="data">{{ data.exchange_sale.price_sale }}</span>
        </div>
      </div>
      <load v-else />
      <div class="con-inputs mt-6">
        <div v-if="data" class="input-select">
          <c-input
            ref="send"
            v-model="form.send"
            :inputmode="$device.isIos ? 'numeric' : 'none'"
            identificador="send"
            @focus="inputFocus"
          >
            Yo tengo
          </c-input>
          <Select child="name" :data="coins" placeholder="Moneda que tienes" block v-model="form.coinSend" :danger="!form.coinSend && send">
            <Option :disabled="option.id == form.coinReceive" :key="i" v-for="(option, i) in coins" :value="option.id" :text="option.name" />
          </Select>
        </div>
        <load v-else />
          <!-- :inputmode="$device.isIos ? 'numeric' : 'none'" -->
        <invert @change="handleChange"/>
        <div v-if="data" class="input-select readonly">
          <c-input
            ref="receive"
            v-model="form.receive"
            :inputmode="$device.isIos ? 'numeric' : 'none'"
            class="receive"
            identificador="receive"
            @focus="inputFocus"
            disabled
          >
            Yo recibo
          </c-input>
          <Select child="name" :data="coins" placeholder="Moneda que recibes" block v-model="form.coinReceive" :danger="!form.coinReceive && send">
            <Option :disabled="option.id == form.coinSend" :key="i" v-for="(option, i) in coins" :value="option.id" :text="option.name" />
          </Select>
        </div>
        <load v-else />
      </div>
      <Button :disabled="form.send <= 0" @click="handleInitOperation" class="mt-6" yellow block>
        Iniciar Operación
      </Button>
    </div>

    <nuxt-child />
    <operations v-if="$device.isMobile" :scroll-top="scrollTop" ref="operations" @click="handleClick" />
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
  form: any = {
    send: '',
    receive: '',
    coinSend: '1',
    coinReceive: '2'
  }
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

  @Mutation('SET_GUIDE') setGuide

  @Watch('form.send')
  handleFormSend(val) {
    if (!this.reverse) {
      this.form.receive = (Math.round((val * this.data.exchange_sale.price_sale) * 100) / 100).toFixed(2)
    }
    if (this.reverse && focus) {
      this.form.receive = (Math.round((val / this.data.exchange_sale.price_sale) * 100) / 100).toFixed(2)
    }
  }

  getData() {
    axios.get('/operation-create').then(({ data }) => {
      this.data = data.info
    })
  }

  handleInitOperation() {
    this.$router.push({
      path: '/step1/step1', query: {
        send: btoa(this.form.send),
        receive: btoa(this.form.receive),
        coinSend: this.form.coinSend,
        coinReceive: this.form.coinReceive,
        cp: btoa(this.data.exchange_purchase.price_purchase),
      }
    })

    this.form.send = ''
    this.form.receive = ''
  }

  @Watch('$route.query.operations')
  handleOperations() {
    if (this.$route.name !== 'index') {
      return
    }
    if (this.$route.query.operations) {
      console.log('paso')
      const page: any = document.querySelector('.index.page')
      const operations: any = page.querySelector('#operations')
      page.scrollTo(0, operations.scrollHeight)
    } else {
      const page: any = document.querySelector('.index.page')
      page.scrollTo(0, 0)
    }
  }

  getFirstOperation() {
    axios.get('/firstoperation').then(({ data }) => {
      this.setGuide(true)
      // (this.$parent as any).handleActiveGuide()
      // this.$guide({
      //   this: this
      // })
      // if (data.accounts.length == 0) {
      //   this.$router.push('/accounts')
      // }
    })
  }

  mounted () {
    this.getData()
    this.getFirstOperation()
    this.handleOperations()
    this.$bounceClose()
    this.handleScroll()
  }

  handleScroll() {
    const el: any = this.$el
    el.addEventListener('scroll', () => {
      if (el.scrollTop === 0) {
        this.$router.push('/')
      } else if (el.scrollTop + window.innerHeight / 5 >= el.scrollHeight - (this.$refs.operations as any).$el.scrollHeight) {
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
    this.form.send = `${oldForm.receive}`
    this.form.receive = `${oldForm.send}`
    this.form.coinSend = `${oldForm.coinReceive}`
    this.form.coinReceive = `${oldForm.coinSend}`
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
    console.log(val)
    if (val !== 'back') {
      this.form[this.focus] += `${val}`
    } else {
      this.form[this.focus] = this.form[this.focus].slice(0, -1)
    }
    if (this.focus) {
      (this.$refs[this.focus] as any).$el.querySelector(`.${this.focus}`).focus()
    }
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
    .bg
      // border-radius: 24px 0px 0px 24px !important
      // border-right: 0px !important
  .select
    max-width: 140px
    position: absolute !important
    right: 0px
    z-index: 10
    i
      right: 15px !important
    input
      border-radius: 0px 24px 24px 0px !important
      border: 2px solid transparent !important
.index
  height: 100vh
  overflow: auto
  scroll-snap-type: y mandatory
  position: relative
  height: calc(var(--vh, 1vh) * 100)
  scroll-behavior: smooth
  width: 100%
  .con-change
    width: 100%
    padding: 20px 20px
    position: relative
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
    .con-img
      margin-bottom: -20px
      z-index: 10
      position: relative
      min-height: 203px
      img
        max-width: 240px
        transition: all .25s ease
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
       width: 2px
       background: -color('black', .1)
       height: 26px
.change
  flex-wrap: wrap
// responsive

@media (max-height: 700px)
  .con-change
    .con-img
      img
        display: none
@media (min-width: 812px)
  .index
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
</style>
