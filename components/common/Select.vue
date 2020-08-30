<template>
  <div
    :class="{ block, danger }"
    class="select"
  >
    <select
      v-on="listeners"
      name=""
    >
      <slot />
    </select>

    <i class='bx bxs-chevron-down'></i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Select extends Vue {
  @Prop({ type: Boolean }) block: boolean
  @Prop({ type: Boolean }) danger: boolean

  get listeners () {
    return {
      ...this.$listeners,
      change: (evt: any) => {
        this.$emit('input', evt.target.value)
        this.$emit('change', evt.target.value)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.select
  display: flex
  align-items: center
  justify-content: center
  position: relative
  &.danger
    select
      color: rgba(255,54,95, 1) !important
      border-radius: 24px 24px 0px 0px
      border: 2px solid rgba(255,54,95, .2) !important
    i
      color: rgba(255,54,95, 1) !important
  &.block
    width: 100%
    select
      width: 100%
  i
    position: absolute
    right: 12px
    pointer-events: none
    font-size: 1.2rem
  select
    border: 2px solid -color('black', .1)
    border-radius: 24px
    padding: 19px 15px
    padding-right: 50px
    -webkit-appearance: none
    -moz-appearance: none
    text-indent: 1px
    text-overflow: ''
    background: transparent

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
