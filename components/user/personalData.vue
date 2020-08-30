<template>
  <div class="personal-data">
    <c-input
      v-model="form.email"
      class="mt-6"
      readonly
    >
      Correo electrónico
    </c-input>
    <c-input
      v-model="form.country"
      class="mt-6"
      readonly
    >
      País
    </c-input>
    <c-input
      v-model="form.firstName"
      class="mt-6"
      readonly
    >
      Nombres
    </c-input>
    <c-input
      v-model="form.lastName"
      class="mt-6"
      readonly
    >
      Apellidos
    </c-input>
    <c-input
      v-model="form.date"
      class="mt-6"
      readonly
    >
      Fecha de nacimiento
    </c-input>
    <c-input
      v-model="form.dni"
      class="mt-6 mb-6"
      readonly
    >
      DNI
    </c-input>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class personalData extends Vue {
  form: any = {
    email: 'luis@x.com',
    country: 'Colombia',
    firstName: 'Luis Daniel',
    lastName: 'Rovira Contreras',
    date: '1976 - 11 - 26',
    dni: '05501230'
  }
}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
