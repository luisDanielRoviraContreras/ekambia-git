<template>
  <div class="offLine">
    <i class='bx bx-error' ></i>
    No hay acceso a internet
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class offLine extends Vue {}
</script>
<style lang="sass" scoped>
.offLine
  position: fixed
  top: 0px
  left: 0px
  z-index: 2000
  background: -color('color')
  width: 100%
  padding: 14px
  text-align: center
  font-weight: bold
  border-radius: 0px 0px 30px 30px
  display: flex
  align-items: center
  justify-content: center
  i
    font-size: 1.6rem
    margin-right: 10px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
