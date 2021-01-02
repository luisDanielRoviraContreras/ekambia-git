<template>
  <div class="con-create con-create-scroll">
    <div class="con-form">
      <h2>
        Crear cuenta empresarial
      </h2>

      <c-input
        v-model="form.firstName"
        class="mt-6"
        :danger="!form.firstName && send"
      >
        Nombre de la empresa
      </c-input>
      <Alert :open="!form.firstName && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.email"
        class="mt-6"
        inputmode="email"
        :danger="(!form.email || !emailValid) && send"
        lowercase
      >
        E-mail
      </c-input>
      <Alert v-if="form.email" :open="!emailValid && send">
        Correo electrónico inválido
      </Alert>
      <Alert :open="!form.email && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.password"
        class="mt-6"
        inputmode="password"
        type="password"
        :danger="(!validatePassword && send) || send && (passwordConfirm !== form.password)"
      >
        Contraseña
      </c-input>
      <Alert :open="!form.password && send">
        Este campo es requerido
      </Alert>
      <Alert :open="passwordConfirm !== form.password && validatePassword">
        Las contraseñas no coinciden
      </Alert>
      <Alert :open="form.password && send ? !validatePassword : false ">
        La contraseña debe contener al menos: <br>
        • 1 Mayúscula <br> • 1 Minúscula <br> • 1 Símbolo especial <br> • 1 Número
      </Alert>
      <c-input
        v-model="passwordConfirm"
        class="mt-6"
        inputmode="password"
        type="password"
        :danger="(!passwordConfirm && send) || send && passwordConfirm !== form.password"
      >
        Confirmación de Contraseña
      </c-input>
      <Alert :open="!passwordConfirm && send">
        Este campo es requerido
      </Alert>
      <Alert :open="passwordConfirm && send ? passwordConfirm !== form.password : false">
        Las contraseñas no coinciden
      </Alert>

      <checkbox :danger="!accept && send" class="mt-3" v-model="accept">
        Acepto los términos y condiciones
      </checkbox>

      <Button :disabled="!accept" :loading="loading" @click="handleSend" class="mb-6 mt-6" block yellow>
        Siguiente
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class createAccount extends Vue {
  accept: boolean = false
  send: boolean = false
  loading: boolean = false
  passwordConfirm: any = null
  form: any = {
    email: '',
    password: '',
    tel: '',
    profileId: 1,
    firstName: '',
  }

  get validateNumber() {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/i
    return regex.test(this.form.tel.trim())
  }

  get validatePassword() {
    var regularExpression = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(this.form.password.trim())
  }

  handleSend() {
    this.send = true

    if (!this.validatePassword) {
      return
    }

    if (this.passwordConfirm !== this.form.password) {
      return
    }

    if (!this.form.email || !this.emailValid || !this.form.password || !this.form.firstName) {
      return
    }

    // if (this.form.date.split('-')[0] > 2002) {
    //   return
    // }



    this.loading = true

    this.serverSend()
  }

  serverSend() {
    axios.post('/register-simple', {
      email: this.form.email.toLowerCase(),
      password: this.form.password,
      profile_id: 2,
      firstName: this.form.firstName,
      referred: this.$cookies.get('ref')
    }).then(({data}) => {
      const token = data.info.token
      this.$cookies.set('token', token)
      this.$notification({
        title: 'Usuario registrado',
        text: 'Complete los siguientes pasos para poder hacer operaciones en Ekambia'
      })
      this.$router.push({
        path: '/createAccount/step2',
        query: {
          t: this.form.tel
        }
      })
      this.loading = false
    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  get emailValid() {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return emailRegex.test(this.form.email.trim())
  }
}
</script>
<style lang="sass">
// responsive
.con-select-input
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  .select
    max-width: 100px
    input
      width: 100%
.con-create
  display: flex
  flex-direction: column
  .con-form
    display: flex
    flex-direction: column
  .button
    max-width: 450px
    align-self: flex-end
    margin-top: auto
  h2
    font-weight: 500
    text-align: center
    width: 100%
.con-form
  flex: 1
  width: 100%
  max-width: 450px
@media (min-width: 812px), (pointer:cursor)
  .con-select-input
    .select
      max-width: 140px
      input
        width: 100%
  .con-create
    display: flex
    align-items: center
    justify-content: center
    .button
      margin-top: 1.5rem
  .con-form
    flex: none
    margin-bottom: 30px
    overflow: hidden
</style>
