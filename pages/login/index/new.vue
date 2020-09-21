<template>
  <div
    ref="new"
    class="new"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div
      ref="slides"
      class="con-illustrations"
      @touchstart="focused = 'slides'"
    >
      <div
        class="illus-1 illus"
      >
        <img src="/Ilustration_01.svg" alt="">
      </div>
      <div class="illus-2 illus">
        <img src="/Ilustration_02.svg" alt="">
      </div>
      <div class="illus-3 illus">
        <img src="/Ilustration_03.svg" alt="">
      </div>
    </div>
    <div
      ref="infos"
      class="con-info">
      <div
        ref="texts"
        class="con-texts"
        @touchstart="focused = 'texts'"
      >
        <div class="text-1 text">
          <h2>Cotiza tu operación</h2>
          <p>
            Utiliza la calculadora para verificar el tipo de cambio en tiempo real
          </p>
        </div>
        <div class="text-2 text">
          <h2>Ahorra con cada intercambio</h2>
          <p>
            vamos a darte una de las mejores tasas de cambio con lo cual vas a ahorrar por cada intercambio
          </p>
        </div>
        <div class="text-3 text">
          <h2>Simple y poderoso</h2>
          <p>
            Simplicidad para ti, déjanos lo complejo a nosotros.
          </p>
        </div>
        <!-- <div class="text-4 text">
          <h2>Cotiza tu operación 4</h2>
          <p>
            utiliza la calculadora para verificar el tipo de cambio en tiempo real
          </p>
        </div> -->
      </div>

      <div
        ref="steps"
        class="steps-btns">
        <span :class="{ active: scrollLeft < windowInnerWidth - windowInnerWidth / 2 }" />
        <span :class="{ active : scrollLeft < windowInnerWidth * 2 - windowInnerWidth / 2 && scrollLeft > windowInnerWidth - windowInnerWidth / 2 }" />
        <!-- <span :class="{ active : scrollLeft < windowInnerWidth * 3 - windowInnerWidth / 2 && scrollLeft > windowInnerWidth * 2 - windowInnerWidth / 2 }" /> -->
        <span :class="{ active : scrollLeft < windowInnerWidth * 3 - 20 && scrollLeft > windowInnerWidth * 2 - windowInnerWidth / 2 }" />
      </div>

      <footer>
        <Button @click="handleClick" gray block>
          Ingresar
        </Button>
        <Button @click="handleClickCreate" yellow block>
          Crear cuenta
        </Button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class New extends Vue {
  focused: string = ''
  scrollLeft: number = 0
  windowInnerWidth: number = 0
  start: any = {
    x: 0,
    y: 0
  }

  scrollLeftFix: number = 0
  dx: number = 0
  step: number = 1
  scrollLeftOld: number = 0
  end: boolean = false

  onTouchMove () {
    // const dx = e.changedTouches[0].clientX - this.start.x
    // this.dx = dx
  }

  handleTouchEnd () {
    this.end = true
    const circles = document.querySelectorAll('.new .circle')
    circles.forEach((item: any) => {
      item.style.opacity = 0
      item.style.transition = 'all 1s ease'
      if (item.style.width.replace('px', '') < this.windowInnerWidth * 3) {
        item.style.width = `${this.windowInnerWidth * 4}px`
        item.style.height = `${this.windowInnerWidth * 4}px`
      }
    })
    setTimeout(() => {
      circles.forEach((item: any) => {
        item.remove()
        item.style.transition = 'opacity 1s ease'
      })
      this.scrollLeftOld = this.scrollLeft
    }, 1000)
  }

  handleTouchStart (evt: any) {
    this.end = false
    this.start.x = evt.touches[0].pageX
    this.start.y = evt.touches[0].pageY

    const circle = document.createElement('div')
    circle.className = 'circle'
    circle.style.left = `${this.start.x}px`
    circle.style.top = `${this.start.y}px`;

    (this.$refs.new as any).appendChild(circle)

    this.scrollLeftFix = (this.$refs.slides as any).scrollLeft
  }

  handleClickCreate () {
    this.$cookies.set('old', true)
    this.$router.push('/createAccount')
  }

  handleClick () {
    this.$cookies.set('old', true)
    this.$router.push('/login/')
  }

  mounted () {
    this.windowInnerWidth = window.innerWidth
    const texts: any = this.$refs.texts
    const slides: any = this.$refs.slides
    texts.addEventListener('scroll', (evt: any) => {
      if (this.focused === 'texts') {
        evt.target.classList.remove('not-scroll-animate')
        slides.classList.add('not-scroll-animate')
        slides.scrollLeft = evt.target.scrollLeft
        this.scrollLeft = evt.target.scrollLeft
      }
    })
    slides.addEventListener('scroll', (evt: any) => {
      const circle: any = document.querySelector('.new .circle')
      if (circle && !this.end) {
        circle.style.left = `${(this.scrollLeftFix - this.scrollLeft) + this.start.x}px`
        if (Math.sign(this.scrollLeft - this.scrollLeftOld) === 1) {
          circle.style.width = `${(this.scrollLeft - this.scrollLeftOld) * 5}px`
          circle.style.height = `${(this.scrollLeft - this.scrollLeftOld) * 5}px`
        } else {
          circle.style.width = `${-(this.scrollLeft - this.scrollLeftOld) * 5}px`
          circle.style.height = `${-(this.scrollLeft - this.scrollLeftOld) * 5}px`
        }
      }

      if (this.focused === 'slides') {
        evt.target.classList.remove('not-scroll-animate')
        texts.classList.add('not-scroll-animate')
        texts.scrollLeft = evt.target.scrollLeft
        this.scrollLeft = evt.target.scrollLeft
      }
    })
  }
}
</script>
<style lang="sass">
.page-enter-active, .page-leave-active
  transition: all .2s ease

.new.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.new.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important
.new
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  background: -color('gray')
  position: fixed
  left: 0px
  bottom: 0px
  z-index: 200
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  overflow: hidden
  .circle
    width: 0px
    height: 0px
    border-radius: 50%
    background: -color('color', 1)
    position: absolute
    transform: translate(-50%, -50%)
    pointer-events: none
    z-index: 10
    transition: opacity 1s ease
  .con-illustrations
    flex-grow: 2
    width: 100%
    overflow: auto
    scroll-snap-type: x mandatory
    scroll-behavior: smooth
    display: flex
    align-items: center
    justify-content: flex-start
    &.not-scroll-animate
      scroll-snap-type: none !important
      scroll-behavior: auto !important
    .illus
      min-width: 100%
      height: 100%
      position: relative
      scroll-snap-align: center
      display: flex
      align-items: center
      justify-content: center
      font-size: 5rem
      z-index: 20
      img
        width: calc(100% - 80px)
        pointer-events: none
  .con-info
    position: relative
    background: -color('bg')
    border-radius: 30px 30px 0px 0px
    text-align: center
    padding-top: 30px
    width: 100%
    z-index: 30
    .con-texts
      display: flex
      align-items: center
      justify-content: flex-start
      scroll-snap-type: x mandatory
      overflow: auto
      width: 100%
      scroll-behavior: smooth
      &.not-scroll-animate
        scroll-snap-type: none !important
        scroll-behavior: auto !important
      .text
        scroll-snap-align: center
        width: 50%
        // min-width: 100%
        flex: 0 0 100%
        // min-width: 100vw
        box-sizing: border-box
        position: relative
        p
          width: 100%
          box-sizing: border-box
          padding: 20px
    .steps-btns
      width: 100%
      display: flex
      align-items: center
      justify-content: center
      padding: 15px
      padding-bottom: 10px
      span
        display: block
        margin: 0px 5px
        height: 6px
        background: -color('black')
        border-radius: 10px
        width: 25px
        opacity: .15
        transition: all .25s ease
        &.active
          width: 50px
          opacity: 1
    h2
      font-size: 1.2rem
    p
      font-size: .9rem
      opacity: .7
      font-weight: 600
      padding: 10px 0px
    footer
      display: flex
      align-items: center
      justify-content: space-between
      padding: 20px
      padding-top: 20px
      button
        max-width: calc(50% - 5px)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
