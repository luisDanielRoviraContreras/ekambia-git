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
        <div v-if="active" class="con-items">
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
    <!-- <select
      :class="{'empty': !this.value}"
      :value="value"
      @change="change"
      name=""
    >
      <slot />
    </select> -->
    <i class='bx bxs-chevron-down'></i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Select extends Vue {
  @Prop({ type: Boolean }) block: boolean
  @Prop({ type: Boolean }) danger: boolean
  @Prop({ type: Boolean }) sticky: boolean
  @Prop({ type: Boolean }) stickyPrev: boolean
  @Prop({ type: Boolean }) load: boolean
  @Prop({ type: String }) placeholder: string
  @Prop({ }) data: any
  @Prop({}) value: any
  inputValue: any = ''
  active: boolean = false

  beforeEnter (el: any) {
    console.log(el)
    document.body.appendChild(el)
    // el.style.height = 0
  }

  enter (el: any, done: any) {
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
    console.log(obj)
    this.$emit('input', obj.value)
    this.$emit('change', obj.value)
    setTimeout(() => {
      this.active = false
    }, 200)
  }

  change(evt: any) {
    this.$emit('input', evt.target.value)
    this.$emit('change', evt.target.value)
  }

  setInputValue() {
    this.data.forEach(item => {
      if (item.id == this.value) {
        this.inputValue = item.alias
      }
    })
  }

  mounted() {
    if (this.data) {
      this.setInputValue()
    }
  }

  // get listeners () {
  //   return {
  //     ...this.$listeners,
  //     change: (evt: any) => {
  //       alert(evt.target.value)
  //       this.$emit('input', evt.target.value)
  //       this.$emit('change', evt.target.value)
  //     }
  //   }
  // }
}
</script>
<style lang="sass">
.select-enter-active, .select-leave-active
  transition: all .2s ease

.select-enter, .select-leave-to
  .shadow
    opacity: 0
  .items
    transform: translate(0, 100%)

.con-items
  position: fixed
  bottom: 0px
  width: 100%
  z-index: 3000
  height: 100vh
  .shadow
    background: rgba(0,0,0,.35)
    position: absolute
    top: 0px
    height: 100%
    width: 100%
    transition: all .25s ease
    z-index: 10
  .items
    z-index: 100
    border-radius: 34px 34px 0px 0px
    display: flex
    flex-direction: column
    max-height: 60vh
    background: #fff
    position: absolute
    bottom: 0px
    width: 100%
    overflow: hidden
    transition: all .3s ease
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
    &::placeholder
      color: -color('black', .3)
    &:focus
      color: -color('black', 1) !important
    &.empty
      color: -color('black', .25)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
