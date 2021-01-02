<template>
  <div class="login scroll">
    <div v-if="$device.isDesktop" class="con-slide">
      <div class="con-images">
        <transition name="fade">
          <div v-show="active == 1" class="con-image">
            <img :src="`/illus/01.svg`" alt="">
            <h2 >
              Cotiza tu operación
            </h2>
            <p>
              Utiliza la calculadora para verificar el tipo de cambio en tiempo real
            </p>
          </div>
        </transition>
        <transition name="fade">
          <div v-show="active == 2" class="con-image">
            <img :src="`/illus/02.svg`" alt="">
            <h2>
              Ahorra con cada intercambio
            </h2>
            <p>
              Vamos a darte una de las mejores tasas de cambio, así podrás ahorrar con cada intercambio.
            </p>
          </div>
        </transition>
        <transition name="fade">
          <div v-show="active == 3" class="con-image">
            <img :src="`/illus/03.svg`" alt="">
            <h2>
              Simple y poderoso
            </h2>
            <p>
              Simplicidad para ti, déjanos lo complejo a nosotros.
            </p>
          </div>
        </transition>
        <transition name="fade">
          <div v-show="active == 4" class="con-image">
            <img  :src="`/illus/04.svg`" alt="">
            <h2>
              Donde tu decidas
            </h2>
            <p>
              No necesitas ir a la oficina a recoger o entregar el dinero, ahora te lo llevamos hasta tu casa
            </p>
          </div>
        </transition>
      </div>

      <footer class="footer">
        <ul>
          <li :class="{active: active == 1}" @click="handleClick(1)">
          </li>
          <li :class="{active: active == 2}" @click="handleClick(2)">
          </li>
          <li :class="{active: active == 3}" @click="handleClick(3)">
          </li>
          <li :class="{active: active == 4}" @click="handleClick(4)">
          </li>
        </ul>
      </footer>
    </div>
    <div class="content-login">
      <div class="con-login">
        <div class="con-logo">
          <img src="/ekambia_logo.svg" alt="">
        </div>
        <h2 class="mt-6">
          Acceder
        </h2>
        <c-input
          v-model="form.numberEmail"
          class="mt-6"
          :danger="!form.numberEmail && send"
          @keypress.enter="handleSend"
          type="email"
          lowercase
        >
          Número de teléfono o correo
        </c-input>
        <Alert :open="!form.numberEmail && send">
          Este campo es requerido
        </Alert>
        <c-input
          v-model="form.password"
          class="mt-6"
          inputmode="password"
          type="password"
          :danger="!form.password && send"
          @keypress.enter="handleSend"
        >
          Contraseña
        </c-input>
        <Alert :open="!form.password && send">
          Este campo es requerido
        </Alert>
        <Button
          class="mt-6"
          yellow
          block
          :loading="loading"
          @click="handleSend"
        >
          Iniciar Sesión
        </Button>

        <nuxt-link
          to="/login/recover-password">
          ¿Olvidaste tu contraseña?
        </nuxt-link>
      </div>
      <Button
        class="btn-create mt-6"
        block
        @click="$router.push('/createAccount/')"
      >
        Crear una Cuenta
      </Button>
    </div>

    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import axios from '~/plugins/axios'
@Component({
  middleware: ['new', 'hasAuthenticated'],
  layout: 'clean'
})
export default class login extends Vue {
  // navigator.credentials
  send: boolean = false
  loading: boolean = false
  form: any = {
    numberEmail: '',
    password: ''
  }
  active: number = 1
  interval: any = null

  @State(state => state.bounce) bounce

  @Mutation('SET_STATUS_USER_ID') setStatusUserId

  handleClick(n) {
    this.active = n
    clearInterval(this.interval)
    this.initInterval()
  }


  handleSend (evt: any) {
    this.send = true
    if (!this.form.numberEmail || !this.form.password) {
      return
    }
    this.loading = true

    axios.post('/login', {
      email: this.form.numberEmail.toLowerCase(),
      password: this.form.password
    }).then(({ data }: any) => {
      console.log(data)

      this.$bounce({
        x: evt.pageX,
        y: evt.pageY
      })

      const token = data.info.token
      this.$cookies.set('token', token)
      this.$cookies.set('profile_id', data.info.profile_id)

      if (data.info.verified_tel == 0) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$router.push({
              path: '/createAccount/step2',
              query: {
                check: 'true'
              }
            })
          })
        }, 300)
      } else {
        console.log(data.info.status_user_id)
        this.setStatusUserId(data.info.status_user_id)
        this.$cookies.set('authenticated', true)
        setTimeout(() => {
          this.$nextTick(() => {
            this.$router.push('/')
          })
        }, 300)
      }
      this.loading = false

    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  handleRef() {
    this.$cookies.set('ref', this.$route.query.ref)
  }

  initInterval() {
    this.interval = setInterval(() => {
      if (this.active == 3) {
        this.active = 1
      } else {
        this.active += 1
      }
    }, 5000)
  }

  mounted () {
    this.initInterval()
    this.$bounceClose()
    if (this.$route.query.ref) {
      this.handleRef()
    }
  }
}
</script>
<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: all .25s ease

.fade-leave-to
  opacity: 0
  transform: translate(80px)
.fade-enter
  opacity: 0
  transform: translate(-80px)

.footer
  position: absolute
  bottom: 0px
  z-index: 500
  ul
    display: flex
    align-items: center
    justify-content: center
    margin-bottom: 20px
    li
      width: 40px
      height: 5px
      margin: 10px
      border-radius: 10px
      background: #000
      cursor: pointer
      opacity: .1
      &.active
        opacity: 1
.login
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  overflow: hidden
  width: 100%
  .button
    max-width: 400px
  .content-login
    width: 100%
    max-width: 400px
    display: flex
    align-items: center
    justify-content: flex-start
    flex-direction: column
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
    padding: 15px 10px
    overflow: hidden
  .con-login
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    width: 100%
    max-width: 400px
    flex: 1
    position: relative
    .con-logo
      min-height: 38px
      img
        max-width: 200px
        display: block
  h2
    font-weight: 600
  a
    color: -color('text')
    display: block
    font-size: 14px
    font-weight: 600
    margin-top: 20px
// responsive

@media (max-width: 812px)
  .login
    .con-slide
      display: none
@media (min-width: 812px)
   .login
    flex-direction: row
    .con-slide
      flex: 1
      display: flex
      align-items: center
      justify-content: center
      height: 100vh
      position: relative
      .con-images
        width: 100%
        max-width: 450px
        z-index: 100
        display: flex
        align-items: center
        justify-content: center
        .con-image
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          position: absolute
          width: 420px
          backface-visibility: visible
          h2
            padding: 20px
            font-weight: 700
          p
            text-align: center
            font-size: .9rem
            opacity: .7
          img
            width: 100%
      &:after
        background: #fcfdfd
        content: ''
        position: absolute
        right: 0px
        height: 200vh
        width: 100%
        border-radius: 0px 70% 70% 0px
        z-index: 10
        border: 2px solid -color(gray)
    .content-login
      display: flex
      align-items: center
      justify-content: center
      min-width: 700px
      .con-login
        flex: none
      .btn-create
        margin-top: 40px
</style>
