<template>
  <div v-if="value" class="guide">
    <svg class="circle" xmlns="http://www.w3.org/2000/svg" :width="h" :height="h" viewBox="0 0 400 400">
      <g id="Ellipse_1" data-name="Ellipse 1" fill="none" stroke="#000" stroke-width="250">
        <circle cx="200" cy="200" r="200" stroke="none"/>
        <circle cx="200" cy="200" r="153.5" fill="none"/>
      </g>
    </svg>
    <div :style="{
      bottom: guide[step].bottom
    }" class="ref">
      <h3>
        {{ guide[step].title }}
      </h3>
      <p>
        {{ guide[step].text }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class guide extends Vue {
  @Prop({}) value: boolean
  isVisible: boolean = false
  step: number = 0
  h: number = 0
  guide: any = [
    {
      url: '/accounts',
      id: '.btn-plus',
      title: 'Agrega una nueva cuenta',
      text: 'Crea una nueva cuenta bancaria a la cual le vamos a enviar los fondos',
      w: '100px',
      h: '100px',
      bottom: '230px'
    }
  ]

  createStep(step) {
    document.body.classList.add('guide-body')
    this.step = step
    const url = this.guide[step].url
    const elId = this.guide[step].id
    if (url) {
      this.$router.push(url, () => {
        setTimeout(() => {
          const ref = document.querySelector(elId)
          const refEl = document.createElement('div')
          refEl.className = 'refx'
          // refEl.style.width = this.guide[step].w
          // refEl.style.height = this.guide[step].h
          if (ref) {
            // document.body.appendChild(refEl)
          }
        }, 100)
      })
    }
  }

  mounted() {
    this.createStep(0)
    this.h = window.innerHeight * 2
  }
}
</script>
<style lang="sass">
.refx
  position: fixed
  z-index: 100000
  bottom: 0px
  right: -100px
  border-radius: 50%
  width: 400px
  height: 400px
  background: #0f0
  background: transparent
  width: 300px
  height: 300px
  border: 50px solid rgba(0,0,0,1)
  position: absolute

  // box-sizing: content-box
    // pointer-events: none

// @keyframes ondas
//   0%
//     border: 100px solid #000
//   50%
//     border: 150px solid #000
//   100%
//     border: 100px solid #000

</style>
<style lang="sass" scoped>
// responsive
.circle
  position: absolute
  transform: translate(100px, 250px)
.guide
  position: fixed
  width: 100%
  height: 100%
  z-index: 100000
  top: 0px
  left: 0px
  display: flex
  align-items: center
  justify-content: center
  .ref
    background: -color('black')
    color: #fff
    padding: 20px
    border-radius: 25px
    max-width: calc(100% - 30px)
    position: absolute
    h3
      font-size: 1.1rem
      padding: 5px 0px
    p
      font-size: .9rem
      padding: 5px 0px
  // mix-blend-mode: exclusion

</style>
