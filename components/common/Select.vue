<template>
  <div
    :class="{ block, danger, sticky, stickyPrev }"
    class="select"
  >
      <!-- v-bind="$attrs" -->
      <input :placeholder="placeholder" @focus="handleFocus" v-model="inputValue" readonly type="text" inputmode="none">

      <transition
        name="select"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-if="active" :class="{ isMobile: $device.isMobile, isDesktop: $device.isDesktop }" class="con-items">
          <div class="shadow" @click="handleClickShadow"></div>
          <div class="items">
            <header>
              <h5>
                {{ placeholder }}
              </h5>
            </header>
            <ul ref="ul">
              <slot></slot>
            </ul>
          </div>
        </div>
      </transition>
    <i class='bx bxs-chevron-down'></i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component
export default class Select extends Vue {
  @Prop({ type: Boolean }) block: boolean
  @Prop({ type: Boolean }) danger: boolean
  @Prop({ type: Boolean }) sticky: boolean
  @Prop({ type: Boolean }) stickyPrev: boolean
  @Prop({ type: Boolean }) load: boolean
  @Prop({ type: String }) placeholder: string
  @Prop({ type: String, default: 'alias' }) child: string
  @Prop({ type: String, default: 'id' }) uid: string
  @Prop({ }) data: any
  @Prop({}) value: any
  inputValue: any = ''
  active: boolean = false
  click: boolean = false

  beforeEnter (el: any) {
    // document.body.appendChild(el)
    // el.style.height = 0
  }

  enter (el: any, done: any) {

    if (this.$device.isDesktop) {
      let coords = this.$el.getBoundingClientRect()
      el.querySelector('.items').style.top = `${coords.top}px`
      el.querySelector('.items').style.left = `${coords.left}px`
      el.querySelector('.items').style.width = `${coords.width}px`

      if (coords.top + el.querySelector('.items').clientHeight > window.innerHeight) {
        el.querySelector('.items').style.transform = 'translate(0,-100%)'
      }
    }

    document.body.appendChild(el)
    // const h = el.scrollHeight
    // el.style.height = h - 1 + 'px'
    done()
  }

  leave (el: any, done: any) {
    setTimeout(() => {
      document.body.removeChild(el)
      done()
    }, 250);
  }

  handleFocus() {
    this.active = true
    setTimeout(() => {
      const activeItem: any = (this.$refs.ul as any).querySelector('li.active')
      if (!activeItem) return
      (this.$refs.ul as any).scrollTo(0, activeItem.offsetTop - (this.$refs.ul as any).clientHeight / 2)
    }, 10);
  }
  handleClickShadow() {
    this.active = false
  }

  clickItem(obj) {
    this.inputValue = obj.text
    this.$emit('input', obj.value, obj.text, obj)
    this.$emit('change', obj.value, obj.text, obj)
    this.click = true
    setTimeout(() => {
      this.active = false
      this.click = false
    }, 200)
  }


  setInputValue() {
    if (!this.value) {
      this.inputValue = ''
    }

    if (this.data) {
      this.$nextTick(() => {
        const getVal = this.data.filter((item) => {
          return item[this.uid] == this.value
        })

        if (getVal.length > 0) {
          this.inputValue = getVal[0][this.child]
        }

        if (getVal.length == 0 && !this.click) {
          this.inputValue = ''
        }
      })
    }
  }

  @Watch('value')
  handleValue() {
    this.setInputValue()
  }

  @Watch('data')
  handleData() {
    this.setInputValue()
  }

  mounted() {
    this.setInputValue()
  }
}
</script>
<style lang="sass">
.select-enter-active, .select-leave-active
  transition: all .2s ease

.select-enter, .select-leave-to
  &.isMobile
    .shadow
      opacity: 0
    .items
      transform: translate(0, 100%)

.select-enter, .select-leave-to
  &.isDesktop
    .shadow
      opacity: 0
    .items
      transform: scaleY(.85)
      opacity: 0

.con-items
  &.isDesktop
    position: absolute
    z-index: 6000
    width: 100%
    height: 100%
    top: 0px
    left: 0px
    header
      display: none
    .shadow
      background: rgba(0,0,0,0)
      position: absolute
      top: 0px
      height: 100%
      width: 100%
      transition: all .25s ease
      z-index: 10
    .items
      background: #fff
      border-radius: 24px
      position: absolute
      z-index: 20
      padding: 15px
      transform-origin: top
      transition: all .25s ease
      box-shadow: 0px 10px 30px 0px rgba(0,0,0,.04)
    ul
      max-height: 300px
      overflow: auto
  &.isMobile
    bottom: 0px
    width: 100%
    z-index: 10000
    height: 100vh
    position: fixed
    .items
      max-height: 60vh
      position: absolute
    .shadow
      background: rgba(0,0,0,.35)
      position: absolute
      top: 0px
      height: 100%
      width: 100%
      transition: all .25s ease
      z-index: 10
    header
      padding: 15px
      background: -color(gray)
      h5
        text-align: center
        font-size: 1rem
    ul
      overflow: auto
      flex: 1
      padding: 15px
      padding-top: 10px
    .items
      z-index: 100
      border-radius: 34px 34px 0px 0px
      display: flex
      flex-direction: column
      background: #fff
      position: absolute
      bottom: 0px
      width: 100%
      overflow: hidden
      transition: all .3s ease
</style>
<style lang="sass" scoped>
.select
  display: flex
  align-items: center
  justify-content: center
  position: relative
  &.sticky
    input
      border-radius: 24px 0px 0px 24px
      border-top-right-radius: 0px !important
  &.stickyPrev
    input
      border-radius: 0px 24px 24px 0px
  &.danger
    input
      color: rgba(255,54,95, 1) !important
      border-radius: 24px 24px 0px 0px
      border: 2px solid rgba(255,54,95, .2) !important
    i
      color: rgba(255,54,95, 1) !important
  &.block
    width: 100%
    input
      width: 100%
  i
    position: absolute
    right: 20px
    pointer-events: none
    font-size: 1.2rem
  input
    border: 2px solid -color('black', .1)
    border-radius: 24px
    padding: 17px 15px
    padding-right: 40px
    -webkit-appearance: none
    -moz-appearance: none
    text-indent: 1px
    text-overflow: ''
    background: transparent
    transition: all .25s ease
    font-weight: 600
    font-size: 16px
    display: block
    cursor: pointer
    &::placeholder
      color: -color('black', .3)
    &:focus
      color: -color('black', 1) !important
    &.empty
      color: -color('black', .25)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
