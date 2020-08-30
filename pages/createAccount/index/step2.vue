<template>
  <div class="con-create">
    <h2 class="mt-6">
      Crear tu cuenta
    </h2>
    <c-input
      v-model="$parent.form.firstName1"
      class="mt-6"
      :danger="!$parent.form.firstName1 && send"
    >
      Primer Nombre
    </c-input>
    <Alert :open="!$parent.form.firstName1 && send">
      Este campo es requerido
    </Alert>
    <c-input
      v-model="$parent.form.firstName2"
      class="mt-6"
      :danger="!$parent.form.firstName2 && send"
    >
      Segundo Nombre
    </c-input>
    <Alert :open="!$parent.form.firstName2 && send">
      Este campo es requerido
    </Alert>
    <c-input
      v-model="$parent.form.lastName1"
      class="mt-6"
      :danger="!$parent.form.lastName1 && send"
    >
      Apellido Paterno
    </c-input>
    <Alert :open="!$parent.form.lastName1 && send">
      Este campo es requerido
    </Alert>
    <c-input
      v-model="$parent.form.lastName2"
      class="mt-6"
      :danger="!$parent.form.lastName2 && send"
    >
      Apellido Materno
    </c-input>
    <Alert :open="!$parent.form.lastName2 && send">
      Este campo es requerido
    </Alert>
    <InputDate
      v-model="$parent.form.date"
      class="mt-6"
      :danger="$parent.form.date.split('-').includes('') && send"
      label-center
    >
      Ingrese su fecha de nacimiento
    </InputDate>
    <Alert :open="$parent.form.date.split('-').includes('') && send">
      Este campo es requerido
    </Alert>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class createAccount extends Vue {
  form: any = {
    date: ''
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
  width: 100%
  overflow: auto
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  height: 100vh
  h2
    font-weight: 500
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
