<template>
  <div class="step0">
    <h3>
      ¿Cómo deseas usar <img src="/ekambia_logo.svg" alt=""> ?
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
    <div @click="$router.push('/createAccount/step1b')" class="con-img-btn empresa mt-6">
      <img src="/empresa.png" alt="">
      <Button block>
        Empresarial
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class step0 extends Vue {}
</script>
<style lang="sass" scoped>
.step0
  flex: 1
  max-width: 460px
  overflow: auto
  max-height: calc(100vh - 60px)
  padding-bottom: 50px
  width: 100%
  position: relative
  padding: 0px 20px
  .con-img-btn
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    cursor: pointer
    &:hover
      img
        transform: scale(1.05)
      .button
        transform: translate(0, -5px)
    &.empresa
      margin-bottom: 50px
      img
        max-width: 260px
        min-height: 198px
    img
      margin-bottom: -15px
      width: 100%
      max-width: 180px
      min-height: 227px
      transition: all .25s ease
  h3
    text-align: center
    img
      width: 105px
      transform: translate(0,4px)
// responsive

@media (min-width: 812px), (pointer:cursor)
  .step0
    margin: auto
</style>
