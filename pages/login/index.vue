<template>
  <div class="login">
    <div class="con-login">
      <div class="con-logo">
        <img src="/logo2.png" alt="">
      </div>
      <h2 class="mt-6">
        Acceder
      </h2>
      <c-input
        v-model="form.numberEmail"
        class="mt-6"
        :danger="!form.numberEmail && send"
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
      class="btn-create"
      block
      @click="$router.push('/createAccount/')"
    >
      Crear una Cuenta
    </Button>

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
  form: any = {
    numberEmail: 'luisdanielrovira8@gmail.com',
    password: '12345678'
  }

  @State(state => state.bounce) bounce
  @Mutation('SET_BOUNCE') mutationBounce

  handleSend (evt: any) {
    this.send = true
    if (!this.form.numberEmail || !this.form.password) {
      return
    }
    axios.post('/login', {
      email: this.form.numberEmail,
      password: this.form.password
    }).then(({ data }: any) => {
      this.mutationBounce(this.$bounce)

      this.$bounce({
        x: evt.pageX,
        y: evt.pageY
      })

      const token = data.token

      this.$cookies.set('token', token)
      this.$cookies.set('authenticated', true)
      setTimeout(() => {
        this.$nextTick(() => {
          this.$router.push('/')
        })
      }, 300)
    }).catch(() => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: 'Numero de teléfono incorrecto, Correo electrónico incorrecto o contraseña incorrecta.'
      })
    })
  }

  mounted () {
    this.$bounceClose()
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
  padding: 20px 30px
  overflow: auto
  bottom: 0px
  padding-bottom: 30px
  position: relative
  overflow: auto
  padding-bottom: calc(30px + env(safe-area-inset-bottom))
  .con-login
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    width: 100%
    height: calc(100vh - 60px)
    overflow: auto
    .con-logo
      img
        max-width: 140px
  h2
    font-weight: 600
  a
    color: -color('text')
    display: block
    font-size: 14px
    font-weight: 600
    margin-top: 20px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
