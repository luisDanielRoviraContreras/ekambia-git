<template>
  <div class="step4">
    <h3>
      Como deseas registrarte para usar Ekambia?
    </h3>
    <div @click="$router.push('/createAccount/step1')" class="con-img-btn mt-6">
      <img src="/personal.svg" alt="">
      <Button block>
        Personal
      </Button>
    </div>
    <divider>
      O
    </divider>
    <div @click="$router.push('/createAccount/step1')" class="con-img-btn empresa mt-6">
      <img src="/empresa.png" alt="">
      <Button block>
        Empresa
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class step4 extends Vue {}
</script>
<style lang="sass" scoped>
.step4
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  flex: 1
  max-width: 400px
  .con-img-btn
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    &.empresa
      img
        max-width: 260px
    img
      margin-bottom: -15px
      width: 100%
      max-width: 180px
  h3
    text-align: center
// responsive

@media (min-width: 812px), (pointer:cursor)
  .step4
    margin: auto
</style>
