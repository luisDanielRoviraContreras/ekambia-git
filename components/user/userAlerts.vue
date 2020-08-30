<template>
  <div class="name">
    <label class="mb-4" for="">
      Alerta cuando la compra este por encima de
    </label>
    <div class="con-switch">
      <c-input type="number">
        Monto
      </c-input>
      <c-switch />
    </div>

    <label class="mt-6 mb-4" for="">
      Alerta cuando la venta este por encima debajo de
    </label>

    <div class="con-switch">
      <c-input type="number">
        Monto
      </c-input>
      <c-switch />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class name extends Vue {}
</script>
<style lang="sass" scoped>
label
  font-size: .7rem
  display: block
  padding-left: 5px
.con-switch
  display: flex
  align-items: center
  justify-content: space-between
  position: relative
  .switch
    position: absolute
    right: 15px
    z-index: 100
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
