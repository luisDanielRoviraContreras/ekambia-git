<template>
  <div class="con-create">
    <div class="con-form">
      <h2 class="mb-6">
        Crear tu cuenta
      </h2>

      <input-file
        ref="front"
        v-model="form.cedulaFront"
        :danger="!form.cedulaFront && send"
      >
        Foto de tu DNI (frontal)
      </input-file>
      <Alert :open="!form.cedulaFront && send">
        Este campo es requerido
      </Alert>
      <input-file
        v-model="form.cedulaPost"
        :danger="!form.cedulaPost && send"
      >
        Foto de tu DNI (Posterior)
      </input-file>
      <Alert :open="!form.cedulaPost && send">
        Este campo es requerido
      </Alert>
      <input-file
        v-model="form.selfie"
        :danger="!form.selfie && send"
        user
      >
        Tomate un selfie
      </input-file>
      <Alert :open="!form.selfie && send">
        Este campo es requerido
      </Alert>
    </div>

    <Button @click="handleSend" class="mb-6 mt-6" block yellow>
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
    cedulaFront: '',
    cedulaPost: '',
    selfie: ''
  }

  handleSend() {
    var formData = new FormData()
    formData.append("cedulaFront", this.form.cedulaFront)
    formData.append("cedulaPost", this.form.cedulaPost)
    formData.append("selfie", this.form.selfie)
    console.log(this.form)
    axios.post('/update-userimages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      this.$router.push('/createAccount/step4')
    })
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
  overflow: hidden
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  h2
    font-weight: 500
    text-align: center
    width: 100%
.con-form
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  flex: 1
  width: 100%
  max-width: 400px
  overflow: auto
  max-height: calc(100vh - 110px)
  padding-bottom: 40px


@media (min-width: 812px)
  .con-create
    .button
      max-width: 400px
</style>
