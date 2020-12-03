<template>
  <li :class="{ active: valueParent == value, disabled }" @click="handleClick" class="option">
    <i class='bx bx-check'></i>
    <div :class="{ subText }" class="text">
      <span>
        {{ text }}
      </span>
      <p v-if="subText">
        {{ subText }}
      </p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class optionItem extends Vue {
  @Prop({}) value: any
  @Prop({}) text: any
  @Prop({}) subText: any
  @Prop({}) obj: any
  @Prop({}) disabled: any

  get valueParent() {
    return (this.$parent as any).value
  }

  handleClick() {
    (this.$parent as any).clickItem({
      value: this.value,
      text: this.text,
      obj: this.obj
    })
  }
}
</script>
<style lang="sass" scoped>
.option
  padding: 16px 20px
  font-size: 1rem
  display: flex
  align-items: center
  justify-content: flex-start
  position: relative
  transition: all .2s ease
  border-radius: 15px
  cursor: pointer
  .text
    &.subText
      span
        font-weight: bold
        opacity: .8
    p
      font-size: .85rem
      opacity: .7
  &.disabled
    opacity: .4
    pointer-events: none
  i
    font-size: 1.4rem
    position: absolute
    left: 10px
    opacity: 0
    transition: all .2s ease
    transform: translate(-15px)
  &.active
    font-weight: bold
    background: -color(gray)
    padding-left: 40px
    i
      opacity: 1
      transform: translate(0px)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
