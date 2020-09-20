<template>
  <div class="con-create con-create-scroll">
    <div class="con-form">
      <h2 class="mt-6">
        Crear tu cuenta
      </h2>

      <c-input
        v-model="form.email"
        class="mt-6"
        inputmode="email"
        :danger="(!form.email || !emailValid) && send"
      >
        Email
      </c-input>
      <Alert v-if="form.email" :open="!emailValid && send">
        Correo electrónico Invalido
      </Alert>
      <Alert :open="!form.email && send">
        Este campo es requerido
      </Alert>
      <div
        class="con-select-input mt-6"
      >
        <Select v-model="form.dniType" :danger="!form.dni && send">
          <option value="1">
            DNI
          </option>
          <option value="2">
            PAS
          </option>
          <option value="3">
            NIE
          </option>
        </Select>
        <c-input
          v-model="form.dni"
          class="ml-3"
          :danger="!form.dni && send"
        >
          Número
        </c-input>
      </div>
      <Alert :open="!form.dni && send">
        Este campo es requerido
      </Alert>
      <c-input
        v-model="form.firstName"
        class="mt-6"
        :danger="!form.firstName && send"
      >
        Nombres
      </c-input>
      <Alert :open="!form.firstName && send">
        Este campo es requerido
      </Alert>
      <c-input
        v-model="form.lastName"
        class="mt-6"
        :danger="!form.lastName && send"
      >
        Apellidos
      </c-input>
      <Alert :open="!form.lastName && send">
        Este campo es requerido
      </Alert>
      <InputDate
        v-model="form.date"
        class="mt-3"
        :danger="form.date.split('-').includes('') && send"
        label-center
      >
        Ingrese su fecha de nacimiento
      </InputDate>
      <Alert :open="form.date.split('-').includes('') && send">
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
    </div>
    <Button @click="handleSend" class="mb-6" block yellow>
      Siguiente
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class createAccount extends Vue {
  send: boolean = false
  form: any = {
    email: '',
    password: '',
    dni: '',
    date: '',
    dniType: 1,
    profileId: 1,
    firstName: '',
    lastName: ''
  }

  handleSend() {
    this.send = true

    if (!this.form.email || !this.emailValid || !this.form.password || !this.form.dni || !this.form.firstName || !this.form.lastName) {
      console.log('paso')
      return
    }

    this.serverSend()
  }

  serverSend() {
    axios.post('/register', {
      email: this.form.email,
      password: this.form.password,
      profile_id: this.form.profileId,
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      document_type_id: this.form.dniType,
      dni: this.form.dni,
      date_of_birth: this.form.date,
      referred: this.$cookies.get('ref')
    }).then(({data}) => {
      const token = data.token
      this.$cookies.set('token', token)
      this.$router.push('/createAccount/step2')
    }).catch((error) => {
      console.log(error)
    })
  }

  get emailValid() {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return emailRegex.test(this.form.email.trim())
  }
}
</script>
<style lang="sass" scoped>
// responsive
.con-select-input
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
.con-create
  display: flex
  flex-direction: column
  .button
    max-width: 400px
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
  max-width: 400px
  max-height: calc(100vh - 110px)
  overflow: auto
  padding-bottom: 50px

@media (min-width: 812px), (pointer:cursor)
  .con-create
    display: flex
    align-items: center
    justify-content: center
  .con-form
    flex: none
    margin-bottom: 30px
    overflow: hidden
</style>
