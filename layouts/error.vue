<template>
  <div class="error">
    <h3>
      Oops! Algo salio mal
    </h3>
    <img src="/404.png" alt="">
    <Button class="mt-6" yellow block @click="$router.push('/')">
      Volver
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class errorPage extends Vue {}
</script>
<style lang="sass" scoped>
.error
  position: fixed
  width: 100vw
  height: 100vh
  background: -color('bg')
  display: flex
  align-items: center
  justify-content: center
  z-index: 200000
  flex-direction: column
  padding: 25px
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
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
