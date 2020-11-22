<template>
  <div class="recover">
    <header>
      <nuxt-link to="/login/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <g id="Grupo_2221" data-name="Grupo 2221" transform="translate(-68 -85.773)">
            <rect id="Rectangle" width="2.571" height="18" rx="1.286" transform="translate(86 93.488) rotate(90)" opacity="0.3"/>
            <path id="Path-94" d="M2.195.377A1.286,1.286,0,0,0,.377,2.195L8.091,9.909a1.286,1.286,0,0,0,1.778.039l7.714-7.071a1.286,1.286,0,1,0-1.738-1.9L9.039,7.22Z" transform="translate(78.286 85.773) rotate(90)"/>
          </g>
        </svg>
      </nuxt-link>
    </header>
    <div class="con-recover">
      <div class="con-logo">
        <img src="/ekambia_logo.svg" alt="">
      </div>

      <h2 class="mt-6">
        Recuperar contraseña
      </h2>

      <p class="mt-2">
        Ingresa el email de tu cuenta y te enviaremos un correo electrónico con las instrucciones para recuperar tu contraseña
      </p>

      <c-input
        v-model="form.email"
        type="email"
        class="mt-6 mb-6"
        :danger="(!form.email || !emailValid) && send"
        lowercase
      >
        Ingrese su correo electrónico
      </c-input>

      <Alert :open="(form.email ? !emailValid : false) && send">
        Correo electrónico inválido
      </Alert>

      <Alert :open="!form.email && send">
        Este campo es requerido
      </Alert>
    </div>

    <Button
      :disabled="!form.email"
      class="btn-send"
      yellow
      block
      @click="handleSend"
    >
      Enviar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class recover extends Vue {
  send: boolean = false
  form: any = {
    email: ''
  }

  get emailValid() {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return emailRegex.test(this.form.email.trim())
  }

  handleSend () {
    this.send = true

    if (!this.form.email || !this.emailValid) {
      return
    }

    // this.$router.push('/login/sendEmail')
    console.log(this.form.email)
    axios.post('/email-resetpassword', {
      email: this.form.email
    }).then(() => {
      console.log('mensaje enviado')
      this.$router.push('/login/sendEmail')
    }).catch(() => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: 'Correo electrónico incorrecto.'
      })
    })
  }
}
</script>
<style lang="sass" scoped>
.page-enter-active, .page-leave-active
  transition: all .2s ease

.recover.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.recover.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important

.recover
  width: 100%
  height: 100vh
  // height: calc(var(--vh, 1vh) * 100)
  background: -color('bg')
  position: fixed
  left: 0px
  bottom: 0px
  z-index: 200
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 20px 30px
  padding-top: 60px
  .con-logo
      min-height: 38px
      img
        max-width: 200px
        display: block
  .btn-send
    justify-self: flex-end
    max-width: 400px
  header
    position: fixed
    top: 0px
    left: 0px
    a
      width: 50px
      height: 50px
      display: flex
      align-items: center
      justify-content: center
      margin: 10px
      svg
        width: 20px
  .con-recover
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    flex: 1
    max-width: 400px
    p
      opacity: .5
      font-size: .85rem
      text-align: center
    h2
      font-weight: 500
      font-size: 1.1rem
// responsive

@media (min-width: 812px), (pointer:cursor)
  .recover
    .con-recover
      flex: none
    .btn-send
      margin-top: 30px

</style>
