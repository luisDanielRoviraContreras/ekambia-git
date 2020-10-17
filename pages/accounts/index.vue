<template>
  <div ref="accounts" class="accounts page">
    <nav-bar v-if="$device.isMobile" absolute />
    <button
      v-if="$device.isMobile"
      @click="handleCreateAccount"
      class="btn-plus">
      <i class='bx bx-plus' ></i>
    </button>
    <div class="con-accounts">
      <h3>
        Mis cuentas
      </h3>

      <!-- <p v-if="$fetchState.pending">Fetching posts...</p> -->
      <template v-if="accounts">
        <AccountCard
          v-for="(account, i) in accounts"
          :key="i"
          class="mt-6"
          :banco="account.bank.name"
          :lastNumber="account.account_number"
          :currency="account.coin.coin"
          :account="account"
          ownAccount="si"
          :animate="i == 0"
          />
      </template>
      <template v-else>
        <load class="mt-6" height="118px" />
        <load class="mt-6" height="118px" />
        <load class="mt-6" height="118px" />
      </template>

      <Button v-if="!$device.isMobile" class="mt-6" @click="handleOpenAdd" yellow block>
        Agregar Cuenta
      </Button>

    </div>

    <nuxt-child />
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
  create: boolean = false

  @State(state => state.accounts.accounts) accounts
  @Action('accounts/getAccounts') getAccounts

  handleCreateAccount() {
    this.$router.push('/accounts/create/')
  }

  handleOpenAdd() {
    this.$router.push({
      path: '/accounts/create',
    })
  }

  edit(account) {
    this.$router.push({
      path: '/accounts/create',
      query: {
        edit: 'true',
        id: account.id
      }
    })
  }

  mounted () {
    setTimeout(() => {
      this.$cookies.set('anima', true)
    }, 3000);
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
    position: absolute
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
