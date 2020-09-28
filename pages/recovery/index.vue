<template>
  <div class="recovery">
    <nav-bar v-if="$device.isMobile" absolute />
    <div class="con-recovery">
      <h2>
        Cambiar contraseña
      </h2>
      <c-input
        type="password"
        v-model="form.password"
        :danger="!form.password && send"
        >
        Nueva contraseña
      </c-input>
      <Alert :open="!form.password && send">
        Este campo es requerido
      </Alert>
      <c-input
        type="password"
        :danger="!form.confirmPassword && send"
        v-model="form.confirmPassword" class="mt-6">
        Repetir contraseña
      </c-input>
      <Alert :open="!form.confirmPassword && send">
        Este campo es requerido
      </Alert>
      <Button class="mt-6" yellow block @click="handleClickSend">
        Actualizar
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  middleware: ['hasAuthenticated'],
  layout: 'clean'
})
export default class recovery extends Vue {
  send: boolean = false
  form: any = {
    password: '',
    confirmPassword: ''
  }

  handleClickSend() {
    this.send = true


    if (this.form.confirmPassword !== this.form.password) {
      this.$notification({
        title: 'Las contraseñas no coinciden',
        text: 'Revisa los campos y vuelve a intentarlo'
      })
      return
    }

    if (!this.form.password || !this.form.confirmPassword) {
      return
    }

    console.log(this.form.password.length)
    if (this.form.password.length <= 7) {
      this.$notification({
        title: 'Contraseña invalida',
        text: 'La contraseña debe tener mínimo 8 caracteres'
      })
      return
    }


    const token = this.$route.query.t
    axios.post('/resetpassword', {
      email: this.$route.query.email,
      token: token,
      password: this.form.password
    }).then(() => {
      this.$notification({
        title: 'Contraseña Actualizada',
        text: 'Tu contraseña ha sido actualizada con éxito'
      })
      this.$router.push('/login')
    }).catch(() => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: 'No se logro actualizar la contraseña por favor intentar de nuevo en unos minutos.'
      })
    })
  }
}
</script>
<style lang="sass" scoped>
.recovery
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  padding: 20px
  .con-recovery
    width: 100%
    max-width: 400px
    h2
      text-align: center
      padding: 20px
      font-size: 1.3rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
