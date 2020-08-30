<template>
  <div ref="accounts" class="accounts page">
    <nav-bar absolute />
    <div class="con-accounts">
      <svg class="effect" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="effect2">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
              result="goo" />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <h3>
        Mis cuentas
      </h3>

      <AccountCard
        class="mt-6"
        banco="Banco de Crédito de Paraguay"
        lastNumber="*2055"
        currency="Guarani"
        ownAccount="si"
        />
      <AccountCard
        class="mt-6"
        banco="Banco de Crédito de Paraguay"
        lastNumber="*2055"
        currency="Guarani"
        ownAccount="si"
        />
    </div>

    <div class="con-create-account">
      <nav-bar absolute/>
      <div
        :class="{ hiddenPlus: windowInnerWidth - scrollLeft < 50 }"
        :style="{
          width: `${windowInnerWidth - scrollLeft}px`
        }"
        class="bg"
      >
          <!-- width: `${windowInnerWidth - scrollLeft}px`, -->
        <!-- width: windowInnerWidth - scrollLeft > 50 ? '50px' : '0px',
        height: windowInnerWidth - scrollLeft > 50 ? '50px' : '0px', -->
        <button
          :class="{ hiddenPlus: windowInnerWidth - scrollLeft < 50 }"
          :style="{
            transform: `translate(${scrollLeft / 10}px)`
          }"
          class="btn-plus">
          <i class='bx bx-plus' ></i>
        </button>
      </div>
      <h3>
        Nueva Cuenta Bancaria
      </h3>

      <c-input
        v-model="form.name"
        type="email"
        class="mt-6"
        :danger="!form.name && send"
        gray
      >
        Primer Nombre
      </c-input>

      <Alert :open="!form.name && send">
        Este campo es requerido
      </Alert>

      <Select class="mt-6" block v-model="form.typeAccount" :danger="!form.typeAccount && send">
        <option value="1">
          Ahorro
        </option>
        <option value="2">
          Corriente
        </option>
        <option value="3">
          Empresa
        </option>
      </Select>

      <Alert :open="!form.typeAccount && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.numberAccount"
        type="email"
        class="mt-6"
        :danger="!form.numberAccount && send"
        gray
      >
        Numero de cuenta
      </c-input>

      <Alert :open="!form.numberAccount && send">
        Este campo es requerido
      </Alert>

      <Button @click="handleSend" class="mt-6" block yellow>
        Agregar Cuenta
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default'
})
export default class name extends Vue {
  scrollLeft: number = 0
  windowInnerWidth: number = 0
  form: any = {
    name: '',
    typeAccount: '',
    numberAccount: '',
    typeCurrency: 'Guarani'
  }

  send: boolean = false

  handleSend () {
    this.send = true
  }

  mounted () {
    this.windowInnerWidth = window.innerWidth
    const accounts = this.$refs.accounts
    accounts.addEventListener('scroll', (evt) => {
      this.scrollLeft = evt.target.scrollLeft
    })
  }
}
</script>
<style lang="sass" scoped>
.accounts
  width: 100%
  position: relative
  height: calc(var(--vh, 1vh) * 100)
  scroll-snap-align: center
  background: #fff
  // padding-top: 60px
  display: flex
  align-items: flex-start
  justify-content: flex-start
  box-sizing: border-box
  overflow: auto
  scroll-snap-type: x mandatory
  scroll-behavior: smooth
  background: -color(gray)
  h3
    width: 100%
    text-align: center
  .effect
    position: absolute
    pointer-events: none
  .btn-plus
    background: -color('color')
    width: 50px
    height: 50px
    border-radius: 20px
    border: 0px
    bottom: 130px
    position: absolute
    left: -40px
    transition: width .25s ease, height .25s ease, opacity .2s ease
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center
    &.hiddenPlus
      opacity: 0
      pointer-events: none
      border-radius: 50%
      width: 0px
    i
      font-size: 1.6rem
  .con-accounts
    width: 100%
    height: 100%
    min-width: 100%
    scroll-snap-align: center
    padding: 20px
    flex: 1
    position: relative
    overflow: hidden
    padding-bottom: 70px
    padding-top: 70px
    padding-right: 35px
  .con-create-account
    padding: 20px
    padding-bottom: 70px
    padding-top: 70px
    height: 100%
    width: 100%
    height: 100%
    min-width: 100%
    scroll-snap-align: center
    position: relative
    .bg
      content: ''
      background: -color('color',1)
      left: -12px
      bottom: 0px
      width: 100%
      height: 100%
      position: absolute
      z-index: 100
      filter: url('#effect2')
      transition: opacity .25s ease
      border-radius: 10% 0px 0px 0px
      &.hiddenPlus
        overflow: hidden
        opacity: 0
      // border-radius: 25% 0px 0px 95px
      // overflow: hidden
      // &:after
      //   content: ''
      //   background: -color('bg',1)
      //   right: 0px
      //   width: 100%
      //   height: 100%
      //   // border-radius: 25% 0px 0px 95px
      //   position: absolute
      //   transform: translate(20%)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
