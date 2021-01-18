<template>
  <div class="con-create con-create-scroll">
    <c-terms v-model="activeTerms" @click="activeTerms = false, accept = true" />
    <div class="con-form">
      <h2>
        Crear cuenta personal
      </h2>

      <c-input
        v-model="form.firstName"
        class="mt-6"
        :danger="!form.firstName && send"
      >
        Nombre
      </c-input>
      <Alert :open="!form.firstName && send">
        Este campo es requerido
      </Alert>

      <!-- <c-input :danger="!validateNumber && send" inputmode="tel" v-model="form.tel" class="mt-6" block>
        Número de teléfono
      </c-input>
      <Alert :open="!validateNumber && send">
        El número de teléfono es invalido
      </Alert> -->

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
      <!-- <div
        class="con-select-input mt-6"
      >
        <Select :data="typeDocuments" placeholder="Tipo" sticky v-model="form.dniType" :danger="!form.dni && send">
          <Option :key="i" v-for="(item, i) in typeDocuments" :value="item.id" :text="item.alias" :sub-text="item.sub" />
        </Select>
        <c-input
          sticky-prev
          v-model="form.dni"
          class="ml-3"
          :danger="!form.dni && send"
        >
          {{ form.dniType == 1 ? 'Nro. Cédula de Identidad' : 'Nro. Pasaporte' }}
        </c-input>
      </div> -->
      <!-- <Alert :open="!form.dni && send">
        Este campo es requerido
      </Alert> -->

      <!-- <c-input
        v-model="form.lastName"
        class="mt-6"
        :danger="!form.lastName && send"
      >
        Apellido
      </c-input>
      <Alert :open="!form.lastName && send">
        Este campo es requerido
      </Alert> -->
      <!-- <InputDate
        v-model="form.date"
        class="mt-3"
        :danger="(form.date.split('-').includes('') || form.date.split('-')[0] > 2002) && send"
        label-center
      >
        Ingrese su fecha de nacimiento
      </InputDate>
      <Alert :open="form.date.split('-').includes('') && send">
        Este campo es requerido
      </Alert>
      <Alert :open="form.date.split('-')[0] > 2002 && send">
        La fecha de nacimiento es invalida (tienes que ser mayor de 18 años)
      </Alert> -->

      <!-- (!form.password && send) || form.password && passwordConfirm ? (passwordConfirm !== form.password) || !validatePassword : false -->

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
      <Alert :open="passwordConfirm !== form.password && validatePassword && send">
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

      <div @click="activeTerms = true, accept = false" class="con-check">
        <checkbox :danger="!accept && send" class="mt-3" v-model="accept">
          Acepto los términos y condiciones
        </checkbox>
      </div>

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
  activeTerms: boolean = false
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
      profile_id: this.form.profileId,
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
  // display: flex
  // align-items: center
  // justify-content: center
  // flex-direction: column
  flex: 1
  width: 100%
  max-width: 450px
  // max-height: calc(100vh - 110px)
  // overflow: auto
  // padding-bottom: 50px

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
