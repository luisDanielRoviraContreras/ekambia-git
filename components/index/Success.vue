<template>
  <div class="success">
    <h3>
      Transacción exitosa!
    </h3>
    <img src="/success.png" alt="">
    <p>
      Puede disfrutar de su dinero en su cuenta, el cambio se efectuó satisfactoriamente
    </p>
    <Button @click="$router.push('/')" class="mt-6" block yellow>
      Aceptar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class success extends Vue {}
</script>
<style lang="sass" scoped>
.success
  position: absolute
  width: 100vw
  height: 100vh
  background: -color('bg')
  display: flex
  align-items: center
  justify-content: center
  z-index: 200
  flex-direction: column
  padding: 25px
  top: 0px
  left: 0px
  img
    width: 100%
    max-width: 280px
    margin-bottom: -30px
    margin-top: 20px
  p
    font-weight: 600
    text-align: center
    width: 100%
    font-size: .9rem
    max-width: 500px
  button
    max-width: 500px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
