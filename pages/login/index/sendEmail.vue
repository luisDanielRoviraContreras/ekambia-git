<template>
  <div class="step4">
    <img src="/email.png" alt="">
    <h3 class="mt-6">
      Correo de recuperación enviado
    </h3>
    <p class="mt-6">
      Por favor verifica tu correo electrónico para recuperar tus datos
    </p>
    <Button class="mt-6" yellow block @click="$router.push('/')">
      Aceptar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class step4 extends Vue {}
</script>
<style lang="sass" scoped>
.step4
  position: fixed
  width: 100vw
  height: 100vh
  background: -color('bg')
  display: flex
  align-items: center
  justify-content: center
  z-index: 200
  flex-direction: column
  padding: 25px
  left: 0px
  *
    max-width: 400px
  img
    width: 100%
    max-width: 330px
    margin-top: 20px
  h3
    text-align: center
    width: 100%
  p
    font-weight: 600
    text-align: center
    width: 100%
    font-size: .9rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
