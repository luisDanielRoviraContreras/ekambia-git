<template>
  <div ref="page" class="index page">
    <nav-bar />
    <div id="change" class="con-change">
      <div class="con-img">
        <img src="home.png" alt="">
      </div>
      <div class="con-prices">
        <div class="price-1 price">
          Compra: 3483
        </div>
        <div class="price-2 price">
          Venta: 3.517
        </div>
      </div>
      <div class="con-inputs mt-6">
        <c-input
          ref="send"
          v-model="form.send"
          inputmode="none"
          identificador="send"
          @focus="inputFocus"
        >
          Tu enviás
        </c-input>
        <c-input
          ref="receive"
          v-model="form.receive"
          inputmode="none"
          class="mt-6"
          identificador="receive"
          @focus="inputFocus"
        >
          Tu recibes
        </c-input>
        <invert @change="handleChange"/>
      </div>
      <Button @click="$router.push('/steps')" class="mt-6" yellow block>
        Iniciar Operación
      </Button>
    </div>

    <operations :scroll-top="scrollTop" ref="operations" @touchend="handleTouchend" />
    <transition name="fade-teclado">
      <teclado v-if="focus" @click="handleTeclado" />
    </transition>

    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import operations from '@/components/index/operations.vue'
import invert from '@/components/index/invert.vue'
import teclado from '@/components/common/teclado.vue'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    operations,
    invert,
    teclado
  }
})
export default class name extends Vue {
  scrollTop: number = 0
  focus: any = null

  form: any = {
    send: '',
    receive: ''
  }

  @State('bounce') bounce

  @Watch('$route.hash')
  handleRoute (val) {
    const page: any = this.$refs.page
    if (val === '#operations' && this.$route.query.c === 'y') {
      this.$nextTick(() => {
        page.scrollTo(0, (this.$refs.operations as any).$el.scrollHeight)
      })
    } else if (this.$route.query.c === 'y') {
      page.scrollTo(0, 0)
    }
  }

  mounted () {
    const page: any = this.$refs.page
    page.addEventListener('scroll', (evt) => {
      this.scrollTop = evt.target.scrollTop

      if (this.scrollTop > window.innerHeight / 2) {
        if (this.$route.hash !== '#operations') {
          this.$router.push('/#operations')
        }
      } else if (this.$route.hash === '#operations') {
        this.$router.push('/')
      }
    })

    this.handleRoute(this.$route.hash)
    this.$bounceClose()
  }

  handleChange () {
    const oldForm = JSON.parse(JSON.stringify(this.form))
    this.form.send = oldForm.receive
    this.form.receive = oldForm.send
  }

  inputFocus (evt: any) {
    this.focus = evt.target

    window.addEventListener('click', (evt: any) => {
      if (evt.target.closest('.teclado')) {
        return
      }
      if (evt.target.closest('.con-input')) {
        return
      }

      this.focus = null
    })

    if (evt.target.classList.contains('send')) {
      this.focus = 'send';
      (this.$refs.send as any).$el.querySelector('.send').focus()
    } else if (evt.target.classList.contains('receive')) {
      this.focus = 'receive';
      (this.$refs.receive as any).$el.querySelector('.receive').focus()
    }
  }

  handleTeclado (val: any) {
    if (val !== 'back') {
      this.form[this.focus] += `${val}`
    } else {
      this.form[this.focus] = this.form[this.focus].slice(0, -1)
    }
    if (this.focus) {
      (this.$refs[this.focus] as any).$el.querySelector(`.${this.focus}`).focus()
    }
  }

  handleTouchend (el: any) {
    const page: any = this.$refs.page
    if (page.scrollTop > 100) {
      this.$router.push('/')
      page.scrollTo(0, 0)
    } else {
      this.$router.push('/#operations')
      page.scrollTo(0, el.scrollHeight)
    }
  }
}
</script>
<style lang="sass" scoped>
.index
  height: 100vh
  overflow: auto
  scroll-snap-type: y mandatory
  position: relative
  height: calc(var(--vh, 1vh) * 100)
  scroll-behavior: smooth
  .con-change
    width: 100%
    padding: 20px 30px
    position: relative
    height: calc(var(--vh, 1vh) * 100 - 175px)
    scroll-snap-align: center
    background: #fff
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    box-sizing: border-box
    .con-img
      margin-bottom: -20px
      img
        max-width: 260px
.con-inputs
  position: relative
  width: 100%
.con-prices
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  background: -color('black')
  border-radius: 20px
  color: #fff
  .price
    width: 50%
    text-align: center
    padding: 14px 10px
    position: relative
    display: flex
    align-items: center
    justify-content: center
    &:last-child
     &:after
       content: ''
       position: absolute
       left: 0px
       width: 2px
       background: -color('black', .1)
       height: 26px
.change
  flex-wrap: wrap
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
