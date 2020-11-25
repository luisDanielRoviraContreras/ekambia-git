<template>
  <div class="success">
    <h3>
      Operación exitosa!
    </h3>
    <img src="/success.png" alt="">
    <p>
      Su operación se efectuó exitosamente, ya puede disfrutar de su cambio
    </p>
    <Button @click="$router.push('/')" class="mt-6" block yellow>
      Aceptar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class success extends Vue {
}
</script>
<style lang="sass" scoped>
.page-enter-active, .page-leave-active
  transition: all .2s ease

.success.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.success.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important

.success
  position: fixed
  width: 100vw
  height: 100vh
  background: -color('gray')
  display: flex
  align-items: center
  justify-content: center
  z-index: 20000
  flex-direction: column
  padding: 25px
  top: 0px
  left: 0px
  img
    width: 100%
    max-width: 280px
    margin-bottom: -30px
    margin-top: 20px
    min-height: 348px
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
