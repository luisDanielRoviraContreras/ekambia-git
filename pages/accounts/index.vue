<template>
  <div ref="accounts" class="accounts page">
    <nav-bar v-if="$device.isMobile" absolute />
    <button
      v-if="$device.isMobile"
      @click="scrollMove"
      class="btn-plus">
      <i class='bx bx-plus' ></i>
    </button>
    <div class="con-accounts">
      <h3>
        Mis cuentas
      </h3>

      <!-- <p v-if="$fetchState.pending">Fetching posts...</p> -->

      <AccountCard
        v-for="(account, i) in accounts"
        :key="i"
        class="mt-6"
        :banco="account.bank.name"
        :lastNumber="account.account_number"
        :currency="account.coin.coin"
        :account="account"
        ownAccount="si"
        />

      <Button v-if="!$device.isMobile" class="mt-6" @click="handleOpenAdd" yellow block>
        Agregar Cuenta
      </Button>

    </div>

    <div :class="{visible: visibleAdd}" class="con-create-account">
      <nav-bar back @click="scrollMoveBack" v-if="$device.isMobile" absolute/>
      <div class="con-create-account__content">
        <h3 v-if="!$route.query.edit">
          Nueva Cuenta Bancaria
        </h3>
        <h3 v-else>
          Editar Cuenta Bancaria
        </h3>

        <c-input
          v-model="form.alias"
          type="email"
          class="mt-6"
          :danger="!form.alias && send"
          gray
        >
          Alias
        </c-input>

        <Alert :open="!form.alias && send">
          Este campo es requerido
        </Alert>

        <Select v-if="data" class="mt-6" block v-model="form.bank_id" :danger="!form.bank_id && send">
          <option hidden value="">
            Banco
          </option>
          <option v-for="(option, index) in data.banks" :key="index" :value="option.id">
            {{
              option.name
            }} {{ option.id }}
          </option>
        </Select>

        <Alert :open="!form.bank_id && send">
          Este campo es requerido
        </Alert>

        <c-input
          v-model="form.account_number"
          type="email"
          class="mt-6"
          :danger="!form.account_number && send"
          gray
        >
          Numero de cuenta
        </c-input>

        <Alert :open="!form.account_number && send">
          Este campo es requerido
        </Alert>

        <Select v-if="data" class="mt-6" block v-model="form.account_type_id" :danger="!form.account_type_id && send">
          <option hidden value="">
            Tipo de cuenta
          </option>
          <option v-for="(option, index) in data.account_types" :key="index" :value="option.id">
            {{
              option.account_type
            }}
          </option>
        </Select>

        <Alert :open="!form.account_type_id && send">
          Este campo es requerido
        </Alert>

        <Select v-if="data" class="mt-6" block v-model="form.coin_id" :danger="!form.coin_id && send">
          <option hidden value="">
            Moneda
          </option>
          <option v-for="(option, index) in data.coins" :key="index" :value="option.id">
            {{
              option.coin
            }}
          </option>
        </Select>

        <Alert :open="!form.coin_id && send">
          Este campo es requerido
        </Alert>

        <footer class="mt-6">
          <Button v-if="!$device.isMobile" block @click="visibleAdd = false">
            Cancelar
          </Button>
          <Button v-if="!$route.query.edit" @click="handleSend" block yellow>
            Agregar Cuenta
          </Button>
          <Button v-else @click="handleUpdate" block yellow>
            Guardar Cambios
          </Button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import axios from '~/plugins/axios'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  fetch() {
    (this as any).getAccounts(this.$route.query.id)
  },
  fetchOnServer: false
})
export default class accountsBank extends Vue {
  visibleAdd: boolean = false
  @State(state => state.accounts.accounts) accounts

  @Action('accounts/getAccounts') getAccounts

  scrollLeft: number = 0
  windowInnerWidth: number = 0
  data: any = null
  form: any = {
    alias: '',
    account_type_id: '',
    account_number: '',
    coin_id: '',
    bank_id: ''
  }

  send: boolean = false

  handleSend () {
    this.send = true
    axios.post('/account-store', { ...this.form }).then((res) => {
      this.scrollMoveBack()
      this.getAccounts()
      this.$notification({
        title: 'Cuenta Creada',
        text: 'La cuenta ha sido creada exitosamente.'
      })
    })
  }

  handleUpdate () {
    this.send = true
    axios.post(`/account-update/${this.$route.query.id}`, { ...this.form }).then((res) => {
      this.getAccounts()
      this.$notification({
        title: 'Datos actualizados',
        text: 'Los cambios han sido actualizados con satisfactoriamente.'
      })
    })
  }

  handleOpenAdd() {
    this.visibleAdd = true
  }

  scrollMove() {
    (this.$refs.accounts as any).scrollLeft = window.innerWidth
    this.$router.push({
      path: '/accounts'
    })
  }
  scrollMoveBack() {
    (this.$refs.accounts as any).scrollLeft = 0
    this.$router.push({
      path: '/accounts'
    })
    setTimeout(() => {
      this.form = {
        alias: '',
        account_type_id: '',
        account_number: '',
        coin_id: '',
        bank_id: ''
      }
    }, 200);
  }

  handleTouch(evt) {
    console.dir(evt)
    evt.preventDefault()
  }

  edit(account) {
    this.form = {
      alias: account.alias,
      account_type_id: account.account_type_id,
      account_number: account.account_number,
      coin_id: account.coin_id,
      bank_id: account.bank_id
    }
    if (this.$device.isMobile) {
      this.scrollMove()
    } else {
      this.visibleAdd = true
    }
    this.$router.push({
      path: '/accounts',
      query: {
        edit: 'true',
        id: account.id
      }
    })
  }

  getDataCreate() {
    axios.get('/account-create').then((res) => {
      console.log(res.data)
      this.data = res.data
    })
  }

  mounted () {
    this.getDataCreate()
    this.windowInnerWidth = window.innerWidth
    const accounts: any = this.$refs.accounts
    accounts.addEventListener('scroll', (evt) => {
      this.scrollLeft = evt.target.scrollLeft
    })
  }
}
</script>
<style lang="sass" scoped>
.accounts
  width: 100%
  position: relative
  height: calc(var(--vh, 1vh) * 100)
  scroll-snap-align: center
  background: #fff
  // padding-top: 60px
  display: flex
  align-items: flex-start
  justify-content: flex-start
  box-sizing: border-box
  overflow: hidden
  scroll-snap-type: x mandatory
  scroll-behavior: smooth
  background: -color(gray)
  h3
    width: 100%
    text-align: center
  .effect
    position: absolute
    pointer-events: none
  .btn-plus
    background: -color('color')
    width: 60px
    height: 60px
    border-radius: 25px
    border: 0px
    bottom: 85px
    position: fixed
    right: 15px
    transition: width .25s ease, height .25s ease, opacity .2s ease
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center
    z-index: 1000
    box-shadow: 0px 5px 20px 0px -color('color', .3)
    &.hiddenPlus
      opacity: 0
      pointer-events: none
      border-radius: 50%
      width: 0px
    i
      font-size: 1.6rem
  .con-accounts
    width: 100%
    height: 100%
    min-width: 100%
    scroll-snap-align: center
    padding: 20px
    flex: 1
    position: relative
    overflow: auto
    overflow-x: hidden
    padding-bottom: 140px
    padding-top: 70px

  .con-create-account
    padding: 20px
    padding-bottom: 70px
    padding-top: 70px
    height: 100%
    width: 100%
    height: 100%
    min-width: 100%
    scroll-snap-align: center
    position: relative
    z-index: 1000
    overflow: auto
    padding-bottom: 110px
    footer
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      &.hiddenPlus
        overflow: hidden
        opacity: 0
      // border-radius: 25% 0px 0px 95px
      // overflow: hidden
      // &:after
      //   content: ''
      //   background: -color('bg',1)
      //   right: 0px
      //   width: 100%
      //   height: 100%
      //   // border-radius: 25% 0px 0px 95px
      //   position: absolute
      //   transform: translate(20%)

// responsive

@media (min-width: 812px)
  .accounts
    overflow: hidden
    display: flex
    align-items: flex-start
    justify-content: center
    .con-accounts
      min-width: auto
      max-width: 550px
      padding: 20px 60px
      padding-bottom: 20px
    .con-create-account
      position: absolute
      left: 0px
      background: -color('gray')
      transition: all .25s ease
      transform: translate(100%)
      display: flex
      align-items: flex-start
      justify-content: center
      .con-create-account__content
        max-width: 500px
        width: 100%
      &.visible
        transform: translate(0)
</style>
