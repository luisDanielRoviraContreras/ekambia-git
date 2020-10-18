<template>
  <li :class="{ active: valueParent == value }" @click="handleClick" class="option">
    <i class='bx bx-check'></i>
    <span>
      {{ text }}
    </span>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class optionItem extends Vue {
  @Prop({}) value: any
  @Prop({}) text: any

  get valueParent() {
    return (this.$parent as any).value
  }

  handleClick() {
    (this.$parent as any).clickItem({
      value: this.value,
      text: this.text
    })
  }
}
</script>
<style lang="sass" scoped>
.option
  padding: 16px 20px
  font-size: 1rem
  display: flex
  align-content: center
  justify-content: flex-start
  position: relative
  transition: all .2s ease
  border-radius: 15px
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
