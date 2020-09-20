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
        Verifica el monto y la cuenta
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
                Tu enviás
              </span>
              <p>
                {{ getSend }}
              </p>
            </div>
            <div class="text">
              <span>
                Tu recibes
              </span>
              <p>
                {{ getReceive }} Guarani
              </p>
            </div>
          </div>
          <div class="textw">
            <span>
              Tipo de cambio utilizando
            </span>
            <p v-if="data">
              {{ data.exchange_purchase.price_purchase }}
            </p>
          </div>
        </div>

        <Select v-if="data" class="mt-6" block>
          <option disabled value="1">
            Cuenta de origen
          </option>
          <option :key="i" v-for="(option, i) in data.accounts" :value="option.id">
            {{ option.alias }}
          </option>
        </Select>
        <Select v-if="data" class="mt-6" block>
          <option value="1">
            Cuenta de destino
          </option>
          <option :key="i" v-for="(option, i) in data.accounts" :value="option.id">
            {{ option.alias }}
          </option>
        </Select>
        <Select class="mt-6" block>
          <option value="1">
            Origen de fondos
          </option>
          <option value="2">
            Venta de inmueble
          </option>
          <option value="3">
            Trabajo
          </option>
          <option value="4">
            Contrataciones
          </option>
          <option value="5">
            Otro
          </option>
        </Select>
        <Button @click="createOperation" class="mt-6" block yellow>
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
      console.log('data', data)
      this.data = data
    })
  }

  createOperation() {
    axios.post('/operation-store', {
      send: this.getSend,
      received: this.getReceive,
      coin_send_id: "1",
      coin_received_id: "2",
      destination_account_id: "2",
      source_account_id: "1",
      source_funds: "Venta de inmueble",
      exchange_type: '1'
    }).then(({ data }) => {
      (this.$parent as any).isOpen = 2
    })
  }

  mounted () {
    this.getData()
    const header = document.querySelector('.navbar-mobile')
    const step2 = document.querySelector('.step2 header')
    const step3 = document.querySelector('.step3 header')
    const h = window.innerHeight - header.scrollHeight - step2.scrollHeight - step3.scrollHeight - (this.$refs.header as any).scrollHeight;
    (this.$refs.con as any).style.height = h - 1 + 'px'
  }
}
</script>
<style lang="sass" scoped>
.step1
  background: -color('gray')
  width: 100%
  transition: all .25s ease
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
    transition: all .25s ease
    overflow: auto
    padding: 0px 20px
    max-width: 600px
    width: 100%
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
