<template>
  <div class="account-card">
    <div class="div-1">
      <div class="con-icon">
        <i class='bx bxs-bank' ></i>
      </div>
      <div class="con-text">
        <p>
          {{ banco }}
        </p>
        <p>
          {{ lastNumber }}
        </p>
      </div>
    </div>
    <div class="div-2">
      <div class="sub">
        <p>
          Cuenta propia: <b>{{ ownAccount }}</b>
        </p>
      </div>
      <div class="sub">
        Moneda: <b>{{ currency }}</b>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class name extends Vue {
  @Prop({}) banco: string
  @Prop({}) lastNumber: string
  @Prop({}) currency: string
  @Prop({}) ownAccount: string
}
</script>
<style lang="sass" scoped>
.account-card
  width: 100%
  .div-2
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    background: -color(gray-2)
    border-radius: 0px 0px 20px 20px
    padding-top: 30px
    margin-top: -30px
    z-index: 1
    position: relative
    .sub
      width: 50%
      display: flex
      align-items: center
      justify-content: center
      padding: 15px 10px
      font-size: .8rem
  .div-1
    width: 100%
    background: -color(bg)
    border-radius: 20px
    display: flex
    align-items: center
    justify-content: center
    padding: 10px
    z-index: 2
    position: relative
    .con-icon
      width: 50px
      height: 50px
      display: flex
      align-items: center
      justify-content: center
      background: -color(gray)
      border-radius: 20px
    .con-text
      flex: 1
      display: flex
      align-items: center
      justify-content: space-between
      padding-left: 10px
      font-weight: bold
      font-size: .8rem
      p:first-child
        max-width: 150px

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
