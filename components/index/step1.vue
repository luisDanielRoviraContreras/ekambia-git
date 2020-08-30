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
                $100.00
              </p>
            </div>
            <div class="text">
              <span>
                Tu recibes
              </span>
              <p>
                345.30 Guarani
              </p>
            </div>
          </div>
          <div class="textw">
            <span>
              Tipo de cambio utilizando
            </span>
            <p>
              3.655
            </p>
          </div>
        </div>

        <Select class="mt-6" block>
          <option value="1">
            Banco
          </option>
          <option value="2">
            BBVA
          </option>
          <option value="3">
            Santander
          </option>
        </Select>
        <Select class="mt-6" block>
          <option value="1">
            Escoger cuenta
          </option>
          <option value="2">
            BBVA
          </option>
          <option value="3">
            Santander
          </option>
        </Select>
        <Select class="mt-6" block>
          <option value="1">
            Origen de fondos
          </option>
          <option value="2">
            BBVA
          </option>
          <option value="3">
            Santander
          </option>
        </Select>
        <Button class="mt-6" block yellow>
          Iniciar Operación
        </Button>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class step1 extends Vue {
  @Prop() open: boolean
  @Prop() ready: boolean

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const header = document.querySelector('.navbar-mobile')
    const step2 = document.querySelector('.step2')
    const step3 = document.querySelector('.step3')
    const h = window.innerHeight - header.scrollHeight - step2.querySelector('header').scrollHeight - step3.querySelector('header').scrollHeight - this.$refs.header.scrollHeight
    el.style.height = h - 1 + 'px'
    step2.querySelector('.con').style.height = '0px'
    step3.querySelector('.con').style.height = '0px'
    done()
  }

  leave (el: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  mounted () {
    const header = document.querySelector('.navbar-mobile')
    const step2 = document.querySelector('.step2 header')
    const step3 = document.querySelector('.step3 header')
    const h = window.innerHeight - header.scrollHeight - step2.scrollHeight - step3.scrollHeight - this.$refs.header.scrollHeight
    this.$refs.con.style.height = h - 1 + 'px'
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
    h3
      font-weight: 600
      font-size: 1rem
      b
        font-weight: bold
        font-size: 1.1rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
