<template>
  <transition name="fade-dialog">
    <div v-if="isVisible" class="dialog">
      <div @click="isVisible = false" class="bg"></div>
      <div class="con-dialog">
        <h5 v-if="title">
          {{ title }}
        </h5>
        <p v-if="text">
          {{ text }}
        </p>
        <div class="content-input">
          <c-input yellow class="mt-3" v-if="input" v-model="inputValue" type="text">
            Nombre
          </c-input>
        </div>
        <footer>
          <Button yellow @click="handleCancel">{{ textCancel }}</Button>
          <Button @click="handleSuccess">{{ textSuccess }}</Button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class dialogBase extends Vue {
  title: any = 'Estas seguro de hacer esto?'
  text: any = null
  isVisible: boolean = false
  success: any = null
  cancel: any = null
  bounce: boolean = false
  textCancel: string = 'Cancelar'
  textSuccess: string = 'Aceptar'
  input: boolean = false
  inputValue: any = ''

  handleSuccess (evt) {
    if (this.success) {
      this.success(this.inputValue)
    }
    if (this.bounce) {
      this.$bounce({
        x: evt.pageX,
        y: evt.pageY
      })
    }
    this.isVisible = false
  }

  handleCancel () {
    if (this.cancel) {
      this.cancel()
    }
    this.isVisible = false
  }
}
</script>
<style lang="sass" scoped>
.fade-dialog-enter-active, .fade-dialog-leave-active
  transition: all .25s ease
.fade-dialog-enter, .fade-dialog-leave-to
  .bg
    opacity: 0
  .con-dialog
    transform: translate(0,100%)

.dialog
  position: fixed
  width: 100%
  height: 100vh
  z-index: 100000
  bottom: 0px
  left: 0px
  .bg
    transition: all .25s ease
    background: -color('black', .2)
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
  .con-dialog
    border-radius: 30px 30px 0px 0px
    bottom: 0px
    padding: 20px
    background: -color('color')
    width: 100%
    height: auto
    position: absolute
    transition: all .25s ease
    max-width: 500px
    footer
      display: flex
      align-items: center
      justify-content: center
      padding-top: 20px
      button
        width: 100%
  h5
    font-size: 1rem
    text-align: center
    width: 100%
  p
    font-weight: 600
    font-size: .85rem
    padding-top: 5px
// responsive

@media (min-width: 812px)
  .dialog
    display: flex
    align-items: center
    justify-content: center
</style>
