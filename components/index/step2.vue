<template>
  <div
    v-on="$listeners"
    :class="{
      open,
      ready
    }"
    class="step2">
    <header ref="header">
      <h3>
        <b>
          Paso 2
        </b>
        Agregar comprobante
      </h3>
    </header>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div ref="con" v-show="open" class="con">
        <input-file>
          Comprobante transferencia bancaria

          <template #text>
            Tome o suba <br> imagen de comprobante
          </template>
        </input-file>
        <divider>
          O
        </divider>
        <c-input
          class="mt-6"
          inputmode="number"
          gray
        >
          Nro de referencia
        </c-input>
        <Button class="mt-6" block yellow>
          Verificar
        </Button>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class step2 extends Vue {
  @Prop() open: boolean
  @Prop() ready: boolean

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const header = document.querySelector('.navbar-mobile')
    const step1 = document.querySelector('.step1')
    const step3 = document.querySelector('.step3')
    const h = window.innerHeight - header.scrollHeight - step1.querySelector('header').scrollHeight - step3.querySelector('header').scrollHeight - (this.$refs.header as any).scrollHeight

    el.style.height = h - 1 + 'px';
    (step1.querySelector('.con') as any).style.height = '0px';
    (step3.querySelector('.con') as any).style.height = '0px'
    done()
  }

  leave (el: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  mounted () {
    const header = document.querySelector('.navbar-mobile')
    const step1 = document.querySelector('.step1 header')
    const step3 = document.querySelector('.step3 header')
    const h = window.innerHeight - header.scrollHeight - step1.scrollHeight - step3.scrollHeight - (this.$refs.header as any).scrollHeight;
    (this.$refs.con as any).style.height = h - 1 + 'px'
  }
}
</script>
<style lang="sass" scoped>
.step2
  background: -color('black')
  width: 100%
  border-radius: 30px 30px 0px 0px
  transition: all .25s ease
  padding-bottom: 30px
  margin-bottom: -30px
  border: 0px solid transparent
  border-top: 2px solid transparent
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  &.ready
    background: -color('black')
    border: 0px solid -color('bg')
    border-top: 2px solid -color('bg')
    .con
      opacity: 0
  &.open
    background: -color('gray')
    header
      color: -color('text')
  .con
    transition: all .25s ease
    overflow: auto
    padding: 0px 20px
    max-width: 600px
    width: 100%
  header
    padding: 20px
    color: -color('bg')
    width: 100%
    max-width: 600px
    h3
      font-weight: 600
      font-size: 1rem
      b
        font-weight: bold
        font-size: 1.1rem
// responsive

@media (min-width: 812px)
  .step2
    padding-bottom: 0px
    margin-bottom: 0px
    border-radius: 30px
    header
      border-radius: 30px
</style>
