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
          <div class="con-send con-icon">
            <div class="icon">
              <img src="/logo-dark.png" alt="">
            </div>
            <span v-if="this.$parent.operation">
              {{ this.$parent.operation.send }}
            </span>
          </div>
          <div class="con-receive con-icon">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 25">
                <g id="Grupo_2254" data-name="Grupo 2254" transform="translate(-196 -819)">
                  <path id="Sustracción_1" data-name="Sustracción 1" d="M-5318.055-15h-18.334a.618.618,0,0,1-.611-.624v-2.5a.619.619,0,0,1,.611-.626h1.833V-27.5h-1.833a.619.619,0,0,1-.611-.625v-2.288a1.247,1.247,0,0,1,.758-1.149l7.822-3.251a2.39,2.39,0,0,1,.928-.188h.558a2.386,2.386,0,0,1,.933.188l7.8,3.251a1.247,1.247,0,0,1,.758,1.149v2.288a.619.619,0,0,1-.611.625h-1.834v8.749h1.834a.619.619,0,0,1,.611.626v2.5A.618.618,0,0,1-5318.055-15ZM-5326-27.5v8.749h3.667V-27.5Zm-6.11,0v8.749h3.667V-27.5Z" transform="translate(5534.223 854)"/>
                  <path id="Path" d="M21.389,0H.611A.618.618,0,0,0,0,.625v1.25A.618.618,0,0,0,.611,2.5H21.389A.618.618,0,0,0,22,1.875V.625A.618.618,0,0,0,21.389,0Z" transform="translate(196 841.5)" opacity="0.3"/>
                </g>
              </svg>
            </div>
            <span v-if="this.$parent.operation">
              {{ this.$parent.operation.received }}
            </span>
          </div>
          <div class="circle">
          </div>
          <img src="planeta.png" alt="">
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
    const h: any = window.innerHeight - header.scrollHeight - step1.querySelector('header').scrollHeight - step2.querySelector('header').scrollHeight - (this.$refs.header as any).scrollHeight

    el.style.height = h - 1 + 'px';
    (step1.querySelector('.con') as any).style.height = '0px';
    (step2.querySelector('.con') as any).style.height = '0px'
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
    const h: any = window.innerHeight - header.scrollHeight - step2.scrollHeight - step1.scrollHeight - (this.$refs.header as any).scrollHeight;
    (this.$refs.con as any).style.height = h - 1 + 'px'
  }
}
</script>
<style lang="sass" scoped>
.step3
  background: -color('gray')
  width: 100%
  border-radius: 30px 30px 0px 0px
  // transition: all .25s ease
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
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
    // transition: all .25s ease
    overflow: auto
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    width: 100%
    max-width: 600px
  header
    padding: 20px
    width: 100%
    max-width: 600px
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
    width: 260px
    height: 260px
    margin-bottom: 50px
    z-index: 10
    .con-icon
      position: absolute
      z-index: 100
      display: flex
      align-items: center
      justify-content: center
      &.con-send
        top: -10px
        left: -10px
        z-index: 110
      &.con-receive
        right: -10px
        bottom: -10px
        z-index: 110
        span
          top: auto
          bottom: -15px
          transform: translate(0, 100%)
      span
        position: absolute
        top: -12px
        transform: translate(0,-100%)
        font-weight: bold
        font-size: .9rem
      .icon
        background: -color('color')
        width: 70px
        height: 70px
        border-radius: 24px
        display: flex
        align-items: center
        justify-content: center
        box-shadow: 0px 10px 20px 0px -color('color', .4)
        z-index: 110
        position: relative
        svg
          width: 30px
        img
          width: 40px
    img
      width: 140px
    .circle
      border-radius: 50%
      border: 2px dashed -color('black', .3)
      width: 260px
      height: 260px
      display: flex
      align-items: center
      justify-content: center
      animation: rotate 6s ease-out infinite
      position: absolute
      z-index: -10
      &:after
        content: ''
        position: absolute
        top: -7px
        left: calc(50% - 7px)
        width: 14px
        height: 14px
        background: -color('black')
        border-radius: 50%
      &:before
        content: ''
        position: absolute
        bottom: -7px
        left: calc(50% - 7px)
        width: 14px
        height: 14px
        background: -color('black')
        border-radius: 50%
  p
    font-weight: bold

@keyframes rotate
  0%
    transform: rotate(-43deg)
  100%
    transform: rotate(143deg)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
@media (min-width: 812px)
  .step3
    padding-bottom: 0px
    margin-bottom: 0px
    border-radius: 30px
    header
      border-radius: 30px
</style>
