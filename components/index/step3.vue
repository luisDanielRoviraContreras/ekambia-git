<template>
  <div
    :class="{
      open,
      black
    }"
    class="step3"
    v-on="$listeners"
  >
    <header ref="header">
      <h3>
        <b>
          Paso 3
        </b>
        Verificación
      </h3>
    </header>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div ref="con" v-show="open" class="con">
        <div class="con-circle">
          <div class="circle">
            <img src="planeta.png" alt="">
          </div>
        </div>
        <p>
          Se esta verificando la transacción espere un momento...
        </p>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class step3 extends Vue {
  @Prop() open: boolean
  @Prop() black: boolean

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const header = document.querySelector('.navbar-mobile')
    const step1 = document.querySelector('.step1')
    const step2 = document.querySelector('.step2')
    const h = window.innerHeight - header.scrollHeight - step1.querySelector('header').scrollHeight - step2.querySelector('header').scrollHeight - this.$refs.header.scrollHeight
    el.style.height = h - 1 + 'px'
    step1.querySelector('.con').style.height = '0px'
    step2.querySelector('.con').style.height = '0px'
    done()
  }

  leave (el: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  mounted () {
    const header = document.querySelector('.navbar-mobile')
    const step2 = document.querySelector('.step2 header')
    const step1 = document.querySelector('.step1 header')
    const h = window.innerHeight - header.scrollHeight - step2.scrollHeight - step1.scrollHeight - this.$refs.header.scrollHeight
    this.$refs.con.style.height = h - 1 + 'px'
  }
}
</script>
<style lang="sass" scoped>
.step3
  background: -color('gray')
  width: 100%
  border-radius: 30px 30px 0px 0px
  transition: all .25s ease
  p
    padding: 20px
    text-align: center
  &.black
    background: -color('black')
    .con
      opacity: 0
    header
      color: -color('bg')
  &.open
    background: -color('gray')
    header
      color: -color('text')
  .con
    transition: all .25s ease
    overflow: auto
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
  header
    padding: 20px
    h3
      font-weight: 600
      font-size: 1rem
      b
        font-weight: bold
        font-size: 1.1rem
  .con-circle
    position: relative
    display: flex
    align-items: center
    justify-content: center
    .circle
      border-radius: 50%
      border: 2px dashed -color('black')
      width: 200px
      height: 200px
      display: flex
      align-items: center
      justify-content: center
  p
    font-weight: bold
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
