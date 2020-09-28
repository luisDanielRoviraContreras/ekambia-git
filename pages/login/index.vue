<template>
  <div class="login scroll">
    <div v-if="$device.isDesktop" class="con-slide">
      <div class="con-images">
        <div class="con-image">
          <img src="/Ilustration_01.svg" alt="">
          <h2>
            Cotiza tu operación
          </h2>
          <p>
            Utiliza la calculadora para verificar el tipo de cambio en tiempo real
          </p>
        </div>
      </div>
    </div>
    <div class="content-login">
      <div class="con-login">
        <div class="con-logo">
          <img src="/logo2.png" alt="">
        </div>
        <h2 class="mt-3">
          Acceder
        </h2>
        <c-input
          v-model="form.numberEmail"
          class="mt-6"
          :danger="!form.numberEmail && send"
          @keypress.enter="handleSend"
          type="email"
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
        class="btn-create mt-6 mb-6"
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

  @State(state => state.bounce) bounce


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

      if (data.info.status_user_id == '1') {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$router.push({
              path: '/createAccount/step2',
              query: {
                check: true
              }
            })
          })
        }, 300)
      } else if (data.info.status_user_id == '2') {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$router.push({
              path: '/createAccount/step3',
              query: {
                check: true
              }
            })
          })
        }, 300)
      } else {
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
    console.log(this.$route.query.ref)
  }

  mounted () {
    this.$bounceClose()
    if (this.$route.query.ref) {
      this.handleRef()
    }
  }
}
</script>
<style lang="sass" scoped>
.login
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  overflow: auto
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
    height: calc(var(--vh, 1vh) * 100)
    padding: 20px
    padding-bottom: env(safe-area-inset-bottom)
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
      min-height: 127px
      img
        max-width: 120px
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
        .con-image
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
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
      min-width: 600px
      .con-login
        flex: none
      .btn-create
        margin-top: 40px
</style>
