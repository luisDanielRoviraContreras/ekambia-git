<template>
  <div class="step4">
    <h3 class="mt-6">
      Felicidades ya eres parte de Ekambia!
    </h3>
    <img src="/register.png" alt="">
    <p>
      Ya puedes disfrutar de las mejores tasas de cambio y de una experiencia innovadora para cambiar divisas.
    </p>
    <Button class="mt-6 btn" yellow block @click="$router.push('/login/')">
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
  padding: 0px 15px
  left: 0px
  overflow: auto
  .btn
    z-index: 500
    position: relative
    max-width: 400px
  img
    width: 100%
    max-width: 330px
    margin-bottom: -30px
    margin-top: 20px
    max-width: 400px
  h3
    text-align: center
    width: 100%
    max-width: 400px
  p
    font-weight: 600
    text-align: center
    width: 100%
    font-size: .9rem
    margin-top: 60px
    max-width: 400px
// responsive

@media (max-width: 812px)
  .step4
    padding-bottom: 100px
    .btn
      z-index: 500
      position: fixed
      bottom: 0px
      border-radius: 0px
      max-width: none
</style>

