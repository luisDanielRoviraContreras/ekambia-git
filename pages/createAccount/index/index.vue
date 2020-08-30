<template>
  <div class="con-create con-create-scroll">
    <h2 class="mt-6">
      Crear tu cuenta
    </h2>

    <c-input
      v-model="$parent.form.email"
      class="mt-6"
      inputmode="email"
      :danger="!$parent.form.email && send"
    >
      Email
    </c-input>
    <Alert :open="!$parent.form.email && send">
      Este campo es requerido
    </Alert>
    <c-input
      v-model="$parent.form.emailConfirm"
      class="mt-6"
      inputmode="email"
      :danger="!$parent.form.emailConfirm && send"
    >
      Confirmar Email
    </c-input>
    <Alert :open="!$parent.form.emailConfirm && send">
      Este campo es requerido
    </Alert>
    <c-input
      v-model="$parent.form.password"
      class="mt-6"
      inputmode="password"
      type="password"
      :danger="!$parent.form.password && send"
    >
      Contraseña
    </c-input>
    <Alert :open="!$parent.form.password && send">
      Este campo es requerido
    </Alert>
    <c-input
      class="mt-6"
      v-model="$parent.form.passwordConfirm"
      inputmode="password"
      type="password"
      :danger="!$parent.form.passwordConfirm && send"
    >
      Repetir Contraseña
    </c-input>
    <Alert :open="!$parent.form.passwordConfirm && send">
      Este campo es requerido
    </Alert>
    <div
      class="con-select-input mt-6"
    >
      <Select v-model="$parent.form.dniType" :danger="!$parent.form.dni && send">
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
        v-model="$parent.form.dni"
        class="ml-3"
        :danger="!$parent.form.dni && send"
      >
        Número
      </c-input>
    </div>
    <Alert :open="!$parent.form.dni && send">
      Este campo es requerido
    </Alert>
    <c-input
      v-model="$parent.form.tel"
      class="mt-6"
      inputmode="tel"
      :danger="!$parent.form.tel && send"
    >
      Número de teléfono
    </c-input>
    <Alert :open="!$parent.form.tel && send">
      Este campo es requerido
    </Alert>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class createAccount extends Vue {
  form: any = {
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    dni: '',
    tel: ''
  }

  get send () {
    return (this.$parent as any).send
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
  h2
    font-weight: 500
    text-align: center
    width: 100%
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
