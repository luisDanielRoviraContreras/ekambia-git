<template>
  <div ref="page" class="index page">
    <nav-bar v-if="$device.isMobile" />
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
          v-model="operation.send"
          inputmode="none"
          identificador="send"
          @focus="inputFocus"
        >
          Tu envías
        </c-input>
        <c-input
          ref="receive"
          v-model="operation.receive"
          inputmode="none"
          class="mt-6 receive"
          identificador="receive"
          @focus="inputFocus"
        >
          Tu recibes
        </c-input>
        <invert @change="handleChange"/>
      </div>
      <Button @click="handleInitOperation" class="mt-6" yellow block>
        Iniciar Operación
      </Button>
    </div>

    <operations v-if="$device.isMobile" :scroll-top="scrollTop" ref="operations" @touchend="handleTouchend" />
    <transition name="fade-teclado">
      <teclado v-if="focus && $device.isMobile" @click="handleTeclado" />
    </transition>

    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import operations from '@/components/index/operations.vue'
import invert from '@/components/index/invert.vue'
import teclado from '@/components/common/teclado.vue'
import axios from '~/plugins/axios'
@Component({
  name: 'index',
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

  @State(state => state.change.operation) operation

  @Mutation('change/CHANGE_SEND') changeSend

  @Mutation('change/CHANGE_RECEIVE') changeReceive

  @Mutation('change/SET_SEND') setSend

  @Mutation('change/SET_RECEIVE') setReceive

  @Mutation('operation/SET_DATA') setDataOperation

  handleInitOperation() {
    this.$router.push({
      path: '/steps', query: {
        s: this.operation.send,
        r: this.operation.receive
      }
    })
  }

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

  getFirstOperation() {
    axios.get('/firstoperation').then(({ data }) => {
      console.log('data', data)

      // this.$guide()
      // if (data.accounts.length == 0) {
      //   this.$router.push('/accounts')
      // }
    })
  }

  mounted () {
    this.getFirstOperation()
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
    const oldForm = JSON.parse(JSON.stringify(this.operation))
    this.setSend(`${oldForm.receive}`)
    this.setReceive(`${oldForm.send}`)
    // this.form.send = oldForm.receive
    // this.form.receive = oldForm.send
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
      if (this.focus == 'send') {
        this.changeSend(`${val}`)
      } else {
        this.changeReceive(`${val}`)
      }
    } else {
      if (this.focus == 'send') {
        this.setSend(`${this.operation[this.focus].slice(0, -1)}`)
      } else {
        this.setReceive(`${this.operation[this.focus].slice(0, -1)}`)
      }
      // this.operation[this.focus] = this.form[this.focus].slice(0, -1)
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
  width: 100%
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
    max-width: 450px
    .con-img
      margin-bottom: -20px
      img
        max-width: 260px
        transition: all .25s ease
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

@media (max-height: 700px)
  .con-change
    .con-img
      img
        display: none
@media (min-width: 812px)
  .index
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
</style>
