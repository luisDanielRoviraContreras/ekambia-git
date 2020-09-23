<template>
  <div
    :class="{ danger, disabled }"
    class="con-input-file"
  >
    <label v-if="$slots.default" :for="_uid">
      <slot />
    </label>
    <div class="con-file">
      <div v-if="user" v-show="!src" class="con-text">
        <img src="/user.png" alt="">
      </div>
      <div v-else class="con-text">
        <i v-if="src" class="bx bx-revision reload" />
        <i v-else class="bx bx-image-add" />
        <p>
          <slot name="text"></slot>
        </p>
      </div>
      <input
        :id="_uid"
        :class="{ hasValue: value }"
        type="file"
        @change="processFile($event)"
      >

      <img v-if="src" :src="src" class="img" alt="file-image">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  inheritAttrs: false
})
export default class InputComponent extends Vue {
  @Prop({}) value!: any
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: Boolean }) danger!: boolean
  @Prop({ type: Boolean }) user!: boolean
  @Prop({ type: Boolean }) disabled!: boolean

  src: any = ''

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const h = el.scrollHeight
    el.style.height = h - 1 + 'px'
    done()
  }

  leave (el: any, done: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  processFile (event: any) {
    const _this = this
    function getBase64 (file: any) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        _this.src = reader.result
        _this.$emit('change', file)
        _this.$emit('input', file)
      }
    }

    const file = event.target.files[0]
    getBase64(file)
  }
}
</script>
<style lang="sass" scoped>
.con-input-file
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  margin-top: 10px
  width: 100%
  &.disabled
    opacity: .5
    pointer-events: none
  &.danger
    color: -color('color-2', 1)
    .con-file
      transition: all .25s ease, border-radius .15s ease 0s !important
      border-radius: 18px 18px 0px 0px
      background: rgba(255,54,95, .1) !important
      color: rgba(255,54,95, 1)
  .con-file
    display: flex
    align-items: center
    justify-content: center
    border-radius: 15px
    transition: all .25s ease
    width: 100%
    background: -color('gray-2', 1)
    cursor: pointer
    position: relative
    .con-text
      width: 100%
      height: 100%
      position: absolute
      left: 0px
      top: 0px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      img
        height: 70%
      p
        font-size: .8rem
        text-align: center
        margin-top: 8px
    &:hover
      img.img
        opacity: .5
      .reload
        z-index: 20
        opacity: 1
      i
        opacity: .6
    i
      position: relative
      font-size: 1.8rem
      transition: all .25s ease
      margin-top: 3px
      pointer-events: none
  .reload
    opacity: 1 !important
    background: -color('bg')
    border-radius: 20px
    width: 50px
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1)
    font-size: 1.6rem !important
  .alert
    width: 100%
    position: relative
    font-size: .65rem
    padding: 3px 6px
  label
    font-size: .9rem
    padding: 5px 0px
    font-weight: 600
  img.img
    max-width: 100%
    max-height: 100%
    left: 0px
    top: 0px
    right: 0px
    bottom: 0px
    position: absolute
    margin: auto
    z-index: 1
    transition: all .25s ease
  input
    z-index: 5
    padding: 10px
    width: 100%
    box-sizing: border-box
    font-size: .75rem
    background: transparent
    height: 150px
    opacity: 0
    cursor: pointer
    &.hasValue
      height: 200px
    &:read-only
     background: -color('bg-2')
     font-weight: bold
     border: 2px solid -color('color', 0)
    &:focus
      border: 2px solid -color('color', 1)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
