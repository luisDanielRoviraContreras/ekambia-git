<template>
  <div class="create">
    <div class="con-create-account">
      <nav-bar back @click="handleBack" absolute />
      <div class="con-create-account__content">
        <h3 v-if="!$route.query.edit">
          Nueva Cuenta Bancaria
        </h3>
        <h3 v-else>
          Editar Cuenta Bancaria
        </h3>

        <c-input
          v-if="data"
          v-model="form.alias"
          type="text"
          class="mt-6"
          :danger="!form.alias && send"
          gray
          maxlength="30"
        >
          Alias
        </c-input>
        <load class="mt-6" v-else />

        <Alert :open="!form.alias && send">
          Este campo es requerido
        </Alert>

        <Select child="name" :data="data.banks" placeholder="Banco" v-if="data" class="mt-6" block v-model="form.bank_id" :danger="!form.bank_id && send">
          <Option :key="i" v-for="(option, i) in data.banks" :value="option.id" :text="option.name" />
        </Select>
        <load class="mt-6" v-else />

        <Alert :open="!form.bank_id && send">
          Este campo es requerido
        </Alert>

        <c-input
          v-if="data"
          v-model="form.account_number"
          type="text"
          class="mt-6"
          :danger="!form.account_number && send"
          gray
          maxlength="30"
        >
          Número de cuenta
        </c-input>
        <load class="mt-6" v-else />

        <Alert :open="!form.account_number && send">
          Este campo es requerido
        </Alert>

        <Select child="account_type" :data="data.account_types" placeholder="Tipo de cuenta" v-if="data" class="mt-6" block v-model="form.account_type_id" :danger="!form.account_type_id && send">
          <Option :key="i" v-for="(option, i) in data.account_types" :value="option.id" :text="option.account_type" />
        </Select>
        <load class="mt-6" v-else />

        <Alert :open="!form.account_type_id && send">
          Este campo es requerido
        </Alert>

        <Select child="coin" :data="data.coins" placeholder="Moneda" v-if="data" class="mt-6" block v-model="form.coin_id" :danger="!form.coin_id && send">
          <Option :key="i" v-for="(option, i) in data.coins" :value="option.id" :text="option.coin" />
        </Select>
        <load class="mt-6" v-else />

        <Alert :open="!form.coin_id && send">
          Este campo es requerido
        </Alert>

        <footer class="mt-6">
          <Button v-if="!$device.isMobile" block @click="handleBack">
            Cancelar
          </Button>
          <Button :disabled="!data" :loading="loading" v-if="!$route.query.edit" @click="handleSend" block yellow>
            Agregar Cuenta
          </Button>
          <Button :disabled="!data" v-else :loading="loading" @click="handleUpdate" block yellow>
            Guardar Cambios
          </Button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import { Action } from 'vuex-class'
@Component
export default class create extends Vue {
  send: boolean = false
  loading: boolean = false
  data: any = null
  form: any = {
    alias: '',
    account_type_id: '',
    account_number: '',
    coin_id: '',
    bank_id: ''
  }

  @Action('accounts/getAccounts') getAccounts

  handleBack() {
    this.$router.push('/accounts/')
  }

  handleSend () {
    this.send = true
    if (!this.form.alias || !this.form.account_type_id || !this.form.account_number || !this.form.coin_id || !this.form.bank_id) {
      return
    }
    this.loading = true
    axios.post('/account-store', { ...this.form }).then((res) => {
      this.loading = false
      this.send = false
      if (this.$route.query.send) {
        this.$dialog({
          title: 'Cuenta Creada',
          text: '¿Quieres crear otra cuenta bancaria o volver a la operación?',
          textCancel: 'Crear cuenta',
          textSuccess: 'Volver',
          success: () => {
            this.$router.push({
              path: `/step1/step${(this.$route.query.step as any) == 2 ? 2 : 1}`,
              query: {
                ...this.$route.query,
                transferActive: 'true'
              }
            })
          },
          cancel: () => {
            this.form = {
              alias: '',
              account_type_id: '',
              account_number: '',
              coin_id: '',
              bank_id: ''
            }
          }
        })
      } else {
        this.$notification({
          title: 'Cuenta Creada',
          text: 'La cuenta ha sido creada exitosamente.'
        })
        this.getAccounts()
        this.handleBack()
      }

    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  handleUpdate () {
    this.send = true
    if (!this.form.alias || !this.form.account_type_id || !this.form.account_number || !this.form.coin_id || !this.form.bank_id) {
      return
    }
    this.loading = true
    axios.post(`/account-update/${this.$route.query.id}`, { ...this.form }).then((res) => {
      this.getAccounts()
      this.handleBack()
      this.$notification({
        title: 'Datos actualizados',
        text: 'Los cambios han sido actualizados satisfactoriamente.'
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

  getDataCreate() {
    axios.get('/account-create').then(({ data }) => {
      this.data = data.info
    })
    if (this.$route.query.edit) {
      axios.get(`/account-show/${this.$route.query.id}`).then(({ data }) => {
        console.log(data.info)
        this.form = data.info
      })
    }
  }

  mounted() {
    this.getDataCreate()
  }
}
</script>
<style lang="sass" scoped>
.page-enter-active, .page-leave-active
  transition: all .2s ease
.create.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.create.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important
.create
  transition: all .25s ease
  padding-top: 70px
  height: 100%
  width: 100%
  left: 0px
  top: 0px
  background: -color(gray)
  position: fixed
  z-index: 1000
  overflow: auto
  transition: all .25 ease
  padding-bottom: 90px
  .con-create-account__content
    padding: 0px 20px
  footer
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    &.hiddenPlus
      overflow: hidden
      opacity: 0
// responsive

@media (min-width: 812px)
  .create
    display: flex
    align-items: flex-start
    justify-content: center
    footer
      justify-content: space-between
      .button
        width: calc(50% - 5px)
    .con-create-account
      max-width: 500px
      width: 100%
      &__content
        width: 100%
</style>
