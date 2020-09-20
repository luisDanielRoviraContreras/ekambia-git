<template>
  <div
    :class="{ center, notMargin, labelCenter, marginTop, icon: $slots.icon, danger, disabled }"
    class="con-input-date"
  >
    <label v-if="$slots.default" :for="_uid">
      <slot />
      <span v-if="$slots.right">
        <slot name="right" />
      </span>
    </label>
    <div class="content-input">
      <Select
        v-model="date.day"
        label="Día"
        center
        block
        @change="handleChange"
      >
        <option
          v-for="(day, index) in 31"
          :key="index"
          :value="day < 9 ? '0' + day : day"
        >
          {{ day }}
        </option>
      </Select>
      <Select
        v-model="date.month"
        label="Mes"
        center
        value="Enero"
        block
        @change="handleChange"
      >
        <option
          v-for="(month, index) in months"
          :key="index"
          :value="index < 9 ? '0' + (index + 1) : (index + 1)"
        >
          {{ month }}
        </option>
      </Select>
      <Select
        v-model="date.year"
        label="Año"
        center
        value="2010"
        block
        @change="handleChange"
      >
        <option
          v-for="(year, index) in getYears"
          :key="index"
          :value="year"
        >
          {{ year }}
        </option>
      </Select>
      <!-- <div class="bg" /> -->
    </div>
    <!-- <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="danger" class="danger">
        <p v-if="$slots.danger">
          <slot name="danger" />
        </p>

        <p v-else>
          Este campo es requerido
        </p>
      </div>
    </transition> -->
    <!-- <p v-if="$slots.alert" class="alert">
      <slot name="alert" />
    </p> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Select from '@/components/common/Select.vue'
@Component({
  inheritAttrs: false,
  components: {
    Select
  }
})
export default class InputDate extends Vue {
  months: object = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  passwordVisible: boolean = false
  @Prop({}) value: any
  @Prop({ type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) labelCenter!: boolean
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: Boolean }) marginTop!: boolean
  @Prop({ type: Boolean }) danger!: boolean
  @Prop({ type: Boolean }) disabled!: boolean

  date: any = {
    day: '',
    month: '',
    year: ''
  }

  mounted () {
    const value = this.value.split('-')
    this.date.day = value[0]
    this.date.month = value[1]
    this.date.year = value[2]
  }

  get getYears () {
    const year: any = new Date().getFullYear() - 10
    const years: any[] = []
    for (let index = 0; index < 82; index++) {
      years.push(year - (index as any))
    }
    return years
  }

  get getValue () {
    return `${this.date.year}-${this.date.month}-${this.date.day}`
  }

  handleChange () {
    // const value = evt.target.value
    console.log('paso')
    this.$nextTick(() => {
      this.$emit('input', this.getValue)
    })
  }

  get listeners () {
    return {
      ...this.$listeners,
      input: (evt: any) => {
        this.$emit('input', evt.target.value)
      }
    }
  }

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const h = el.scrollHeight
    el.style.height = h - 1 + 'px'
    done()
  }

  leave (el: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  focusInput () {
    (this.$refs.input as HTMLElement).focus()
  }
}
</script>
<style lang="sass">

.input-enter-active, .input-leave-active
  transition: all .25s ease

.input-enter, .input-leave-to
  height: 0px

.con-input-date
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  width: 100%
  border-radius: 18px
  color: -color('text')
  z-index: 10
  position: relative
  &.disabled
    pointer-events: none
    .con-select
      select
        background: -color('bg-4')
  .con-select
    margin: 0px 5px
    &:first-child
      margin-left: 0px
    &:last-child
      margin-right: 0px
  &:hover
    .bg
      background: -color('bg-3', 1) !important
  &.danger
    color: rgba(255,54,95, 1)
    .content-input
      .select
        &:nth-child(1)
          select
            border-radius: 18px 0px 0px 0px !important
        &:nth-child(2)
          select
            border-radius: 0px !important
            border-left: 0px
            border-right: 0px
        &:nth-child(3)
          select
            border-radius: 0px 18px 0px 0px !important
        select
          color: rgba(255,54,95, 1) !important
          border-radius: 24px 24px 0px 0px
          border: 2px solid rgba(255,54,95, .2)
        i
          color: rgba(255,54,95, 1) !important
  .danger
    width: 100%
    position: relative
    background: -color('color-2', .15)
    color: -color('color-2', 1)
    padding: 0px 10px
    font-size: .75rem
    font-weight: bold
    border-radius: 0px 0px 10px 10px
    overflow: hidden
    transition: all .25s ease
    p
      padding: 5px
  &.icon
    input
      padding-left: 0px !important
      &:focus
        padding-left: 8px !important
  .info
    display: flex
    align-items: center
    justify-content: center
    font-weight: bold
    font-size: .85rem
    p
      opacity: .4
      padding-right: 7px
  &.marginTop
    margin-top: 20px
  &.notMargin
    margin-top: 0px
  .alert
    width: 100%
    position: relative
    font-size: .65rem
    padding: 3px 6px
  &.labelCenter
    label
      text-align: center
  &.center
    input
      text-align: center
  label
    font-weight: 600
    font-size: .9rem
    padding: 5px 0px
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    display: block
    span
      display: flex
      align-items: center
      justify-content: center
  .content-input
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    position: relative
    border-radius: inherit
    color: inherit
    .select
      &:nth-child(1)
        select
          border-radius: 18px 0px 0px 18px !important
      &:nth-child(2)
        select
          border-radius: 0px !important
          border-left: 0px
          border-right: 0px
      &:nth-child(3)
        select
          border-radius: 0px 18px 18px 0px !important
    .con-password
      min-width: 46px
      min-height: 46px
      border-radius: inherit
      display: flex
      align-items: center
      justify-content: center
      margin-left: 4px
      transition: all .25s ease
      cursor: pointer
      z-index: 10
      &:hover
        opacity: .6
      i
        font-size: 1.2rem
    .bg
      width: 100%
      height: 100%
      position: absolute
      left: 0px
      top: 0px
      border-radius: inherit
      background: -color('bg-2')
      z-index: -1
      border: 2px solid -color('color', 0)
      transition: all .25s ease, border-radius .15s ease .15s
    .con-icon
      order: -1
      min-width: 46px
      min-height: 46px
      border-radius: 18px
      display: flex
      align-items: center
      justify-content: center
      margin-left: 4px
      transition: all .25s ease
      i
        font-size: 1.3rem
    input
      padding: 11px 15px
      transition: all .25s ease
      border-radius: inherit
      width: 100%
      box-sizing: border-box
      font-size: .85rem
      background: transparent
      width: 100%
      display: block
      border: 2px solid -color('color', 0)
      color: inherit
      &::placeholder
        color: inherit
        opacity: .6
      &:read-only
        background: -color('bg-2')
        font-weight: bold
        border: 2px solid -color('color', 0)
      &:focus
        ~ .bg
          border: 2px solid -color('color', 1)
        ~ .con-icon
          background: -color('bg')
          box-shadow: 0px 4px 20px 0px rgba(0,0,0,.08)
          transform: translate(0, -10px)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
