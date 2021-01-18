<template>
  <div class="recovery">
    <nav-bar />
    <div class="con-recovery">
      <h2>
        Cambiar contraseña
      </h2>
      <c-input
        type="password"
        v-model="form.password"
        :danger="(!validatePassword && send) || send && (form.passwordConfirm !== form.password)"
        >
        Nueva contraseña
      </c-input>

      <Alert :open="!form.password && send">
        Este campo es requerido
      </Alert>
      <Alert :open="form.passwordConfirm !== form.password && validatePassword && send">
        Las contraseñas no coinciden
      </Alert>
      <Alert :open="form.password && send ? !validatePassword : false ">
        La contraseña debe contener al menos: <br>
        • 1 Mayúscula <br> • 1 Minúscula <br> • 1 Símbolo especial <br> • 1 Número
      </Alert>
      <c-input
        type="password"
        :danger="(!form.passwordConfirm && send) || send && form.passwordConfirm !== form.password"
        v-model="form.passwordConfirm" class="mt-6">
        Confirmación de Contraseña
      </c-input>
      <Alert :open="!form.passwordConfirm && send">
        Este campo es requerido
      </Alert>
      <Alert :open="form.passwordConfirm && send ? form.passwordConfirm !== form.password : false">
        Las contraseñas no coinciden
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
    passwordConfirm: ''
  }

  get validatePassword() {
    var regularExpression = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(this.form.password.trim())
  }

  handleClickSend() {
    this.send = true

    if (this.form.passwordConfirm !== this.form.password) {
      this.$notification({
        title: 'Las contraseñas no coinciden',
        text: 'Revisa los campos y vuelve a intentarlo'
      })
      return
    }

    if (!this.form.password || !this.form.passwordConfirm) {
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
  flex-direction: column
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
