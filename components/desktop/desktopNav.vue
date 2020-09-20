<template>
  <div class="desktopNav">
    <div @click="openDrop=!openDrop" class="avatar">
      <img src="1.png" alt="">
      <i class='bx bxs-chevron-down'></i>
    </div>
    <div :class="{ openDrop }" class="con-dropdown">
      <Button @click="handleClickLogOut" block>
        Cerrar Sesión
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class desktopNav extends Vue {
  openDrop: boolean = false
  handleClickLogOut () {
    this.$dialog({
      title: 'Estas seguro de cerrar la sesión?',
      bounce: true,
      success: () => {
        axios.post('/logout').then(() => {
          this.$cookies.set('token', '')
          this.$cookies.set('authenticated', false)
          this.$nextTick(() => {
            this.$router.push('/login')
          })
        }).catch(() => {
          this.$notification({
            title: 'Oops! Algo salió mal',
            text: 'No se pudo cerrar la sesión por favor intentar de nuevo.'
          })
        })
      }
    })
  }
}
</script>
<style lang="sass" scoped>
.desktopNav
  position: fixed
  right: 0px
  top: 0px
  z-index: 1000
  padding: 20px
  .avatar
    cursor: pointer
    display: flex
    align-items: center
    justify-content: center
    img
      width: 50px
      height: 50px
  .con-dropdown
    position: absolute
    top: 0px
    padding: 10px
    width: 200px
    right: 0px
    transform: translate(0,90%)
    opacity: 0
    visibility: hidden
    transition: all .25s ease
    &.openDrop
      opacity: 1
      visibility: visible
      transform: translate(0,100%)
    button
      width: 100%
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
