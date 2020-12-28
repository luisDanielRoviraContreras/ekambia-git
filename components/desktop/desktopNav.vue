<template>
  <div class="desktopNav">
    <div @click="openDrop=!openDrop" class="avatar">
      <!-- <img src="1.png" alt=""> -->
      <i class='bx bx-user'></i>
      <i class='bx bxs-chevron-down'></i>
    </div>
    <div :class="{ openDrop }" class="con-dropdown">
      <button class="salir" @click="handleClickLogOut" block>
        <span>
          Cerrar Sesión
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
          <g id="Iconly_Light-outline_Upload" data-name="Iconly/Light-outline/Upload" transform="translate(26) rotate(90)">
            <g id="Upload" transform="translate(2.19 23.809) rotate(-90)">
              <path id="Upload-2" data-name="Upload" d="M4.8,21.666A4.8,4.8,0,0,1,0,17.088l0-.226V4.8A4.806,4.806,0,0,1,4.578,0L4.8,0h5.281a4.805,4.805,0,0,1,4.8,4.579l0,.226v1.01a.813.813,0,0,1-1.618.111l-.008-.111V4.8A3.179,3.179,0,0,0,10.272,1.63l-.187,0H4.8A3.18,3.18,0,0,0,1.63,4.618l0,.187V16.862a3.179,3.179,0,0,0,2.991,3.175l.187.006H10.1a3.169,3.169,0,0,0,3.164-2.982l0-.186V15.853a.813.813,0,0,1,1.619-.11l.007.11v1.022a4.8,4.8,0,0,1-4.561,4.787l-.233,0Zm12.885-7.1a.812.812,0,0,1-.076-1.058l.078-.092,1.777-1.771H8.392a.813.813,0,0,1-.11-1.618l.11-.007H19.47l-1.778-1.77a.813.813,0,0,1-.082-1.058l.079-.092a.814.814,0,0,1,1.058-.081l.091.078,3.173,3.158a.809.809,0,0,1,.232.472h0l0,.018v0l0,.019h0q0,.031,0,.062h0v0c0,.005,0,.011,0,.016v0s0,.009,0,.013v.051a.808.808,0,0,1-.079.273v0l-.007.014-.006.011,0,0-.008.015h0l-.008.014h0l-.009.015h0l-.009.013v0L22.1,11.3l0,0-.007.01,0,0,0,0h0a.817.817,0,0,1-.1.109l-3.153,3.14a.812.812,0,0,1-1.149,0Z" stroke="#000" stroke-width="0.2"/>
            </g>
          </g>
        </svg>
      </button>
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
    .bx-user
      font-size: 1.5rem
    img
      width: 50px
      height: 50px
  .con-dropdown
    position: absolute
    top: 0px
    padding: 0px 10px
    width: 200px
    right: 0px
    transform: translate(0,90%)
    opacity: 0
    visibility: hidden
    transition: all .25s ease
    padding-top: 4px
    .salir
      padding: 10px
      border: 0px
      background: -color(gray)
      border-radius: 20px
      display: flex
      align-items: center
      justify-content: center
      transition: all .25s ease
      &:hover
        background: #000
        color: #fff
        svg
          fill: #fff
      span
        font-weight: 600
        font-size: .9rem
        margin-right: 10px
    &.openDrop
      opacity: 1
      visibility: visible
      transform: translate(0,100%)
    button
      width: 100%
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
