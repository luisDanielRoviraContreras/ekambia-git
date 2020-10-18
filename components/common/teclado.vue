<template>
  <div
    @click="generateOnda"
    class="teclado">
    <div class="con-teclas">
      <button
        :key="number"
        v-for="number in 9"
        @click="handleClickBtn(number)"
      >
        <span>
          {{ number }}
        </span>
      </button>
      <button
        @click="handleClickBtn('.')"
      >
        <span>
          .
        </span>
      </button>
      <button
        @click="handleClickBtn(0)"
      >
        <span>
          0
        </span>
      </button>
      <button
        @click="handleClickBtn('back')"
      >
        <span>
          <i class='bx bx-arrow-back'></i>
        </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class teclado extends Vue {
  handleClickBtn (number: any) {
    this.$emit('click', number)
  }

  generateOnda (evt: any) {
    const x = evt.clientX
    const el = this.$el
    const y = evt.clientY - (window.innerHeight - el.scrollHeight)

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

  mounted() {
    setTimeout(() => {
      document.body.classList.add('open-teclado')
    }, 10);
  }

  destroyed() {
    document.body.classList.remove('open-teclado')
  }
}
</script>
<style lang="sass">
.fade-teclado-enter-active, .fade-teclado-leave-active
  transition: all .25s ease

.fade-teclado-enter, .fade-teclado-leave-to
  transform: translate(0,100%)

.open-teclado
  .con-change
    justify-content: flex-start !important
    .con-img
      min-height: 0px !important
      img
        max-width: 80px !important
        opacity: 0

.onda
  width: 40px
  height: 40px
  position: absolute
  left: 0px
  top: 0px
  box-shadow: inset 0px 0px 20px 0px -color('bg',.7), 0px 0px 35px 0px -color('bg',.7)
  transition: all .35s ease
  opacity: 0
  border-radius: 50%
  transform: translate(-50%, -50%)
  pointer-events: none
.teclado
  width: 100%
  height: auto
  position: fixed
  bottom: 0px
  left: 0px
  z-index: 3000
  background: -color('black')
  border-radius: 40px 40px 0px 0px
  padding: 20px
  transition: all .25s ease
  footer
    display: flex
    align-items: center
    justify-content: center
    background: transparent
    button
      color: -color('bg')
      font-size: 1rem
      background: transparent
      width: 100%
      padding: 10px 20px
  .con-teclas
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
    button
      padding: 20px
      min-width: 33%
      font-size: 1.4rem
      border: 0px
      background: transparent
      transition: all .25s ease
      color: -color('bg')
      border-radius: 15px
      touch-action: manipulation
      &:active
        background: -color('bg', .1)
        span
          transform: scale(.8)
      span
        display: block
        transition: all .25s ease
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
