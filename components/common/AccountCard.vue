<template>
  <div
    @touchstart="handleStart"
    @touchmove="handleTouch"
    @touchend="handleEnd"
    class="account-card"
    :class="{ animate: anima }"
    >
    <div
      @click="handleClickRemove"
      ref="remove"
      class="remove">
      <i class='bx bxs-trash-alt'></i>
    </div>
    <div
      @click="handleClickEdit"
      ref="edit"
      class="edit">
      <i class='bx bxs-edit-alt' ></i>
    </div>
      <!-- :style="{
        transform: `translate(${-move}px)`
      }" -->
    <div
      ref="condiv"
      @click="handleClickEdit"
      class="con-div">
      <div class="div-1">
        <div class="con-icon">
          <i class='bx bxs-bank' ></i>
        </div>
        <div class="con-text">
          <p>
            {{ account.alias }} <br>
            <span>
              {{ banco }}
            </span>
          </p>
          <p class="lastNumber">
            ****{{ lastNumber.substr(lastNumber.length - 4) }}
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import anime from 'animejs/lib/anime.min.js';
import axios from '~/plugins/axios'
@Component
export default class cardAccount extends Vue {
  @Prop({}) banco: string
  @Prop({}) lastNumber: string
  @Prop({}) currency: string
  @Prop({}) ownAccount: string
  @Prop({}) account: any
  @Prop({}) animate: boolean

  anima: boolean = false

  x: number = 0
  move: number = 0

  handleStart(evt) {
    this.x = evt.touches[0].pageX + this.move
  }

  handleTouch(evt) {
    let move = this.x - evt.touches[0].pageX
    if (move > 110) {
      move = 110
    }
    if (move < -110) {
      move = -110
    }
    this.move = move
    anime({
      targets: this.$refs.condiv,
      translateX: -move,
      duration: 600
    })
    // evt.preventDefault()
  }


  handleEnd(evt) {
    if (evt.target.closest('.remove') || evt.target.closest('.edit')) {
      return
    }
    if (this.move > 80) {
      this.move = 80
    } else if (this.move < -80) {
      this.move = -80
    } else {
      this.move = 0
    }

    if (this.move !== 0) {
      (this.$refs.condiv as any).classList.add('swipe')
    }

    const swipes = document.querySelectorAll('.swipe') || []

    swipes.forEach((item) => {
      if (item === this.$refs.condiv) {
        return
      }
      anime({
        targets: item,
        translateX: 0
      })
    })

    this.$nextTick(() => {
      anime({
        targets: this.$refs.condiv,
        translateX: -this.move
      })
    })
  }

  handleClickEdit() {
    (this.$parent as any).edit(this.account)
    this.resetSwipe()
  }

  resetSwipe() {
    const swipes = document.querySelectorAll('.swipe') || []
    swipes.forEach((item) => {
      anime({
        targets: item,
        translateX: 0
      })
    })
  }

  handleClickRemove() {
    this.$dialog({
      title: 'Estas seguro de eliminar esta cuenta bancaria?',
      bounce: false,
      success: () => {
        axios.post(`/account-delete/${this.account.id}`).then(() => {
          this.$notification({
            title: 'Cuenta eliminada',
            text: 'La cuenta ha sido eliminada exitosamente.'
          })

          this.resetSwipe()
          this.$nextTick(() => {
            (this.$parent as any).getAccounts()
          })
        }).catch(() => {
          this.$notification({
            title: 'Oops! Algo salió mal',
            text: 'No se pudo eliminar la cuenta.'
          })
        })
      },
      cancel: () => {
        this.resetSwipe()
      }
    })
  }

  mounted() {
    if (this.animate && !this.$cookies.get('anima')) {
      this.anima = true
    }
  }
}
</script>
<style lang="sass" scoped>
@keyframes guide
  0%
    transform: translate(0px)
  33%
    transform: translate(80px)
  66%
    transform: translate(-80px)
  100%
    transform: translate(0px)

.animate
  .con-div
    animation: guide 3s ease 1 1s
.account-card
  width: 100%
  position: relative
  .remove
    position: absolute
    right: 4px
    width: 140px
    height: calc(100% - 8px)
    top: 4px
    background: -color('black')
    border-radius: 25px
    display: flex
    align-items: center
    justify-content: center
    padding-left: 60px
    i
      color: -color('bg')
      font-size: 1.5rem
  .edit
    position: absolute
    left: 4px
    width: 140px
    height: calc(100% - 8px)
    top: 4px
    background: -color('color')
    border-radius: 25px
    display: flex
    align-items: center
    justify-content: center
    padding-right: 60px
    i
      color: -color('black')
      font-size: 1.6rem
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
      p
        span
          font-size: .6rem
          font-weight: normal
      p:first-child
        max-width: 150px

// responsive

@media (min-width: 812px)
  .account-card
    &:hover
      .lastNumber
        opacity: 0
      .edit
        opacity: 1
        visibility: visible
        right: 70px
      .remove
        opacity: 1
        visibility: visible
        right: 10px
    .edit
      left: auto
      right: -20px
      width: 50px
      height: 50px
      border-radius: 20px
      display: flex
      align-items: center
      justify-content: center
      padding-right: 0px
      top: 10px
      opacity: 0
      visibility: hidden
      transition: all .25s ease
      z-index: 200
      cursor: pointer
      i
        font-size: 1.2rem
    .remove
      cursor: pointer
      left: auto
      top: 10px
      right: -20px
      width: 50px
      height: 50px
      border-radius: 20px
      display: flex
      align-items: center
      justify-content: center
      padding-left: 0px
      opacity: 0
      visibility: hidden
      transition: all .25s ease
      z-index: 200
      i
        font-size: 1rem
</style>
