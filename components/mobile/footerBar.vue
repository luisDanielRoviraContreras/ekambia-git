<template>
  <div
    ref="footer"
    @click="generateOnda"
    class="footer-bar"
    >
    <a
      to="/"
      class="link1"
      :class="{'nuxt-link-exact-active': this.$route.name === 'index' && this.$route.hash !== '#operations'}"
      @click="handleClickHome"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
        <g id="Stockholm-icons-_-Navigation-_-Up-down" data-name="Stockholm-icons-/-Navigation-/-Up-down" transform="translate(30) rotate(90)">
          <rect id="Rectangle" width="2.5" height="15" rx="1.25" transform="translate(8.75 21.25) rotate(180)" opacity="0.3"/>
          <path id="Path-104" d="M11.866,28.366a1.25,1.25,0,0,1,1.768,1.768l-3.75,3.75a1.25,1.25,0,0,1-1.768,0l-3.75-3.75a1.25,1.25,0,0,1,1.768-1.768L9,31.232Z" transform="translate(-1.5 -10.5)"/>
          <rect id="Rectangle-Copy" width="2.5" height="15" rx="1.25" transform="translate(23.75 23.75) rotate(180)" opacity="0.3"/>
          <path id="Path-104-Copy" d="M35.866-14.116a1.25,1.25,0,0,0,1.768,0,1.25,1.25,0,0,0,0-1.768l-3.75-3.75a1.25,1.25,0,0,0-1.768,0l-3.75,3.75a1.25,1.25,0,0,0,0,1.768,1.25,1.25,0,0,0,1.768,0L33-16.982Z" transform="translate(-10.5 26.25)"/>
        </g>
      </svg>
      <p>
        Cambiar
      </p>
    </a>
    <a
      href="#"
      class="link2"
      :class="{'nuxt-link-active': this.$route.name === 'index' && this.$route.hash == '#operations'}"
      @click="handleClickOperations"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.156 25.518">
        <g id="Grupo_2850" data-name="Grupo 2850" transform="translate(-237.844 -816.256)">
          <path id="Combined-Shape" d="M34,18h6a2,2,0,0,1,0,4H34a2,2,0,0,1,0-4Zm-4,8H40a2,2,0,0,1,0,4H30a2,2,0,0,1,0-4Zm0,8H40a2,2,0,0,1,0,4H30a2,2,0,0,1,0-4Z" transform="translate(232 803.774)" fill-rule="evenodd" opacity="0.3"/>
          <g id="ico_24_payment_money_vs" data-name="ico / 24 / payment / money_vs" transform="matrix(0.545, -0.839, 0.839, 0.545, 233.4, 832.528)">
            <path id="Icon_color" data-name="Icon color" d="M6.11,16H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H6.253A6.984,6.984,0,0,0,9.27,1.31L9.89,1a9.138,9.138,0,0,1,4-1H19a1,1,0,0,1,1,1V13a1,1,0,0,1-1,1H13.844a6.963,6.963,0,0,0-3.114.74l-.62.31A9.135,9.135,0,0,1,6.11,16ZM5,4A3,3,0,0,1,2,7v4a3,3,0,0,1,3,3H6.122A7.1,7.1,0,0,0,9.27,13.26l.62-.31a9.166,9.166,0,0,1,4-.95H15a3,3,0,0,1,3-3V5a3,3,0,0,1-3-3H13.779a7.106,7.106,0,0,0-3.049.691L10.11,3a9.149,9.149,0,0,1-4,1Zm5,7a3,3,0,1,1,3-3A3,3,0,0,1,10,11Z" transform="translate(2 4)"/>
          </g>
        </g>
      </svg>
      <p>
        Operaciones
      </p>
    </a>
    <nuxt-link
      to="/accounts"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 25">
        <g id="Grupo_2254" data-name="Grupo 2254" transform="translate(-196 -819)">
          <path id="Sustracción_1" data-name="Sustracción 1" d="M-5318.055-15h-18.334a.618.618,0,0,1-.611-.624v-2.5a.619.619,0,0,1,.611-.626h1.833V-27.5h-1.833a.619.619,0,0,1-.611-.625v-2.288a1.247,1.247,0,0,1,.758-1.149l7.822-3.251a2.39,2.39,0,0,1,.928-.188h.558a2.386,2.386,0,0,1,.933.188l7.8,3.251a1.247,1.247,0,0,1,.758,1.149v2.288a.619.619,0,0,1-.611.625h-1.834v8.749h1.834a.619.619,0,0,1,.611.626v2.5A.618.618,0,0,1-5318.055-15ZM-5326-27.5v8.749h3.667V-27.5Zm-6.11,0v8.749h3.667V-27.5Z" transform="translate(5534.223 854)"/>
          <path id="Path" d="M21.389,0H.611A.618.618,0,0,0,0,.625v1.25A.618.618,0,0,0,.611,2.5H21.389A.618.618,0,0,0,22,1.875V.625A.618.618,0,0,0,21.389,0Z" transform="translate(196 841.5)" opacity="0.3"/>
        </g>
      </svg>
      <p>
        Cuentas
      </p>
    </nuxt-link>
    <nuxt-link to="/user">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.998 23">
        <g id="Grupo_2255" data-name="Grupo 2255" transform="translate(-326.001 -821)">
          <path id="Path" d="M0,5.75A5.88,5.88,0,0,1,6,0a5.88,5.88,0,0,1,6,5.75A5.88,5.88,0,0,1,6,11.5,5.88,5.88,0,0,1,0,5.75Z" transform="translate(331.999 821)" opacity="0.3"/>
          <path id="Path-2" data-name="Path" d="M23.869,7.533,21.6,3.174A6.034,6.034,0,0,0,16.236,0H7.762A6.034,6.034,0,0,0,2.4,3.174L.128,7.533A1.108,1.108,0,0,0,.177,8.652,1.212,1.212,0,0,0,1.2,9.2H22.8a1.212,1.212,0,0,0,1.019-.548A1.108,1.108,0,0,0,23.869,7.533Z" transform="translate(326.001 834.8)"/>
        </g>
      </svg>
      <p>
        Perfil
      </p>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class footerBar extends Vue {
  handleClickHome () {
    if (this.$route.name === 'index') {
      this.$nextTick(() => {
        const page = document.querySelector('.index.page')
        page.scrollTo(0, 0)
      })
    } else {
      setTimeout(() => {
        const page = document.querySelector('.index.page')
        page.scrollTo(0, 0)
      }, 300)
    }

    this.$router.push('/')
  }

  handleClickOperations () {
    if (this.$route.name === 'index') {
      const page: any = document.querySelector('.index.page')
      const operations: any = page.querySelector('#operations')
      page.scrollTo(0, operations.scrollHeight)
    } else {
      setTimeout(() => {
        const page: any = document.querySelector('.index.page')
        const operations: any = page.querySelector('#operations')
        page.scrollTo(0, operations.scrollHeight)
      }, 300)
    }

    this.$router.push('/#operations')
  }

  generateOnda (evt: any) {
    const x = evt.clientX
    const y = evt.layerY
    const el = this.$el

    if (evt.target.nodeName !== 'A') {
      return
    }

    const onda: any = document.createElement('div')
    onda.className = 'onda'

    onda.style.left = `${x}px`
    onda.style.top = `${y}px`

    el.appendChild(onda)

    onda.style.opacity = 1

    setTimeout(() => {
      onda.style.width = `${130}px`
      onda.style.height = `${130}px`
      onda.style.opacity = 0
    }, 5)

    setTimeout(() => {
      onda.style.opacity = 0
      setTimeout(() => {
        el.removeChild(onda)
      }, 300)
    }, 300)
  }
}
</script>
<style lang="sass">
.footer-bar
  position: fixed
  bottom: 0px
  left: 0px
  width: 100%
  background: -color('black')
  padding-bottom: env(safe-area-inset-bottom)
  color: #fff
  display: flex
  align-items: center
  justify-content: space-evenly
  // padding: 0px 10px
  border-radius: 30px 30px 0px 0px
  overflow: hidden
  z-index: 2000
  .onda
    width: 40px
    height: 40px
    position: absolute
    left: 0px
    top: 0px
    box-shadow: inset 0px 0px 20px 0px -color('color',.7), 0px 0px 35px 0px -color('color',.7)
    transition: all .35s ease
    opacity: 0
    border-radius: 50%
    transform: translate(-50%, -50%)
    pointer-events: none
  a
    padding: 12px
    background: transparent
    color: #fff
    border: 0px
    min-width: 71px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    transition: all .25s ease
    &:active
      opacity: .5
      svg
        transform: scale(.8)
    &.nuxt-link-active:not(.link1)
      color: -color('color')
      svg
        fill: -color('color')
        animation: iconAnimate .4s linear 1
    &.nuxt-link-exact-active.link1
      color: -color('color')
      svg
        fill: -color('color')
        animation: iconAnimate .4s linear 1
    &.link2
      svg
        width: 30px
        height: 25px
    p
      font-size: .65rem
      padding-top: 4px
      pointer-events: none
    svg
      fill: #fff
      width: 25px
      pointer-events: none
      transition: all .25s ease

@keyframes iconAnimate
  0%
    transform: scale(1)
  50%
    transform: scale(.75)
  60%
    transform: scale(1.1)
  70%
    transform: scale(.9)
  100%
    transform: scale(1)
  // responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
