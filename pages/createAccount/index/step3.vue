<template>
  <div class="con-create">
    <h2 class="mb-6">
      Crear tu cuenta
    </h2>

    <input-file
      v-model="$parent.form.image1"
      :danger="!$parent.form.image1 && send"
    >
      Foto de tu DNI (frontal)
    </input-file>
    <Alert :open="!$parent.form.image1 && send">
      Este campo es requerido
    </Alert>
    <input-file
      v-model="$parent.form.image2"
      :danger="!$parent.form.image2 && send"
    >
      Foto de tu DNI (Posterior)
    </input-file>
    <Alert :open="!$parent.form.image2 && send">
      Este campo es requerido
    </Alert>
    <input-file
      v-model="$parent.form.image3"
      :danger="!$parent.form.image3 && send"
    >
      Tomate un selfie
    </input-file>
    <Alert :open="!$parent.form.image3 && send">
      Este campo es requerido
    </Alert>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class createAccount extends Vue {
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
