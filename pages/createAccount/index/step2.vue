<template>
  <div class="con-create">
    <div
      :class="{hidden: step == 2}"
      class="con-get-number">
      <h2 class="mt-6">
        Verificación de teléfono
      </h2>
      <header>
        <p>
          Agrega tu número de teléfono celular con el prefijo de tu país  <b>Ejemplo: (+59512345678)</b>. Le enviaremos un código de verificación de 4 dígitos.
        </p>
      </header>

      <c-input tel :danger="!validateNumber && send" inputmode="tel" v-model="form.tel" class="mt-6" block>
        Número de teléfono
      </c-input>
      <Alert :open="!validateNumber && send">
        El número de teléfono es invalido
      </Alert>
    </div>
    <div
      :class="{visible: step == 2}"
      class="con-code">
      <h2 class="mt-6">
        Código de verificación
      </h2>
      <header>
        <p v-if="step == 2">
          Por favor ingresa el código que enviamos a tu número {{`*******${form.tel[form.tel.length - 2]}${form.tel[form.tel.length - 1]}`}}
        </p>
      </header>

      <div class="con-inputs">
        <div class="con-input">
          <input ref="input1" v-model="form.n1" @input="handleInput($event, 2)" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
        </div>
        <div class="con-input">
          <input ref="input2" v-model="form.n2" @input="handleInput($event, 3)" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
        </div>
        <div class="con-input">
          <input ref="input3" v-model="form.n3" @input="handleInput($event, 4)" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
        </div>
        <div class="con-input">
          <input @enter="handleSendVerificar" ref="input4" v-model="form.n4" @input="handleInput($event, null)" maxlength="1" pattern="\d*" type="text" inputmode="numeric" >
        </div>
      </div>

      <div @click="step = 1" class="re-send">
        Cambiar número
      </div>
      <divider>
        O
      </divider>
      <div @click="serverSendSMS" class="re-send">
        Volver a enviar el código
      </div>
    </div>
    <Button v-if="step == 1" :loading="loading" :disabled="hasNumber" @click="handleSendSMS" class="mb-6" block yellow>
      Enviar SMS
    </Button>
    <Button v-else :loading="loading" :disabled="hasCode" @click="handleSendVerificar" class="mb-6" block yellow>
      Verificar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class createAccount extends Vue {
  step: number = 1
  send: boolean = false
  loading: boolean = false
  form: any = {
    tel: '',
    n1: null,
    n2: null,
    n3: null,
    n4: null
  }

  get validateNumber() {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\+(?:[0-9]){10,14}$/i
    return regex.test(this.form.tel.replace(' ', '').trim())
  }

  get hasNumber() {
    return !this.form.tel
  }

  get hasCode() {
    return (!this.form.n1 || !this.form.n2 || !this.form.n3 || !this.form.n4)
  }

  handleSaveTel() {
    axios.post('/useraddtel', {
      tel: this.form.tel.replace(' ', '')
    }).then((res) => {
      this.$notification({
        title: 'Número celular verificado',
        text: 'Verificación de número celular exitosa'
      })
      this.loading = false
      this.$router.push('/createAccount/step4')
    })
  }

  handleSendVerificar() {
    const code = `${this.form.n1}${this.form.n2}${this.form.n3}${this.form.n4}`
    this.loading = true
    axios.post('/register-verifycode', {
      codex: code
    }).then((res) => {
      this.handleSaveTel()
    }).catch((err) => {
      this.loading = false
      this.step = 1
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
      this.form.n1 = null
      this.form.n2 = null
      this.form.n3 = null
      this.form.n4 = null
    })
  }

  serverSendSMS() {
    axios.post('/send-sms', {
      tel: this.form.tel
    }).then((res) => {
      this.loading = false
      this.step = 2
    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  handleSendSMS() {
    this.send = true
    if (!this.validateNumber) {
      return
    }

    this.send = false
    this.loading = true
    this.serverSendSMS()
  }

  handleInput(evt, number) {
    if(evt.target.value) {
      if (number) {
        (this.$refs[`input${number}`] as any).focus()
      } else {
        evt.target.blur()
      }
    }
  }

  mounted() {
    this.$bounceClose()

    // this.form.tel = this.$route.query.t

    if (this.$route.query.check) {
      setTimeout(() => {
        this.$notification({
          title: 'Bienvenido de nuevo',
          text: 'Para poder continuar necesitamos terminar de verificar tus datos'
        })
      }, 600);
    }
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
  max-width: 500px
  h2
    font-weight: 500
  .con-get-number
    flex: 1
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    &.hidden
      display: none
    .con-tel
      input
        padding: 20px
    p
      font-size: .9rem
      padding: 10px
      font-weight: 600
      opacity: .6
      text-align: center
  .con-code
    flex: 1
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    display: none
    &.visible
      display: flex
    .re-send
      width: 100%
      text-align: center
      font-size: .9rem
      padding: 10px
      padding-top: 15px
      opacity: 1
      font-weight: 600
    p
      font-size: .9rem
      padding: 10px
      font-weight: 600
      opacity: .6
  .con-inputs
    display: flex
    align-items: center
    justify-content: center
    padding-top: 20px
    .con-input
      padding: 10px
      input
        width: 60px
        height: 60px
        text-align: center
        font-size: 1.5rem
        font-weight: 600
        border: 0px
        background: -color('gray-2')
        border-radius: 15px

// @media (max-width: 812px), (pointer:pointer)

@media (min-width: 812px), (pointer:pointer)
  .con-create
    margin: auto
    .con-code
      max-width: 500px
      flex: none
      margin-bottom: 30px
      p
        text-align: center
    .con-get-number
      max-width: 400px
      flex: none
      margin-bottom: 30px
    .button
      max-width: 500px
</style>
