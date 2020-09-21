<template>
  <div
    id="operations"
    class="operations"
    :class="{ open: scrollTop > 100}"
  >
    <header ref="header" @touchend="handleEnd" @touchstart="handleStart">
      <h2>
        Operaciones
      </h2>
      <i class='bx bxs-chevron-up'></i>
    </header>
    <div class="con-btns">
      <button
        :class="{ active : scrollLeft < windowInnerWidth - windowInnerWidth / 2 }"
        @click="handleClickBtn(0)"
      >
        Verificando
      </button>
      <button
        :class="{ active : scrollLeft < windowInnerWidth * 2 - windowInnerWidth / 2 && scrollLeft > windowInnerWidth - windowInnerWidth / 2 }"
        @click="handleClickBtn(windowInnerWidth)"
      >
        Pagando
      </button>
      <button
        :class="{ active : scrollLeft < windowInnerWidth * 3 - 20 && scrollLeft > windowInnerWidth * 2 - windowInnerWidth / 2 }"
        @click="handleClickBtn(windowInnerWidth * 2)"
      >
        Finalizando
      </button>
    </div>

    <div ref="infos" class="con-infos">
      <div class="parent-info-1 parent-info">
        <div
          v-for="(li, i) in filterOperations(1)"
          :key="i"
          @click="handleClickOperation(li)"
          class="info">
          <div class="data">
            <span>
              Fecha
            </span>
            <p>
              {{ `${li.datex.split('-')[2]}-${li.datex.split('-')[1]}-${li.datex.split('-')[0]}` }}
            </p>
          </div>
          <div class="data">
            <span>
              Enviado
            </span>
            <p>
              {{ li.send }}
            </p>
          </div>
          <div class="data">
            <span>
              Recibido
            </span>
            <p>
              {{ li.received }}
            </p>
          </div>
        </div>
      </div>
      <div class="parent-info-2 parent-info">
        <div
          v-for="(li, i) in filterOperations(2)"
          :key="i"
          class="info">
          <div class="data">
            <span>
              Fecha
            </span>
            <p>
              {{ `${li.datex.split('-')[2]}-${li.datex.split('-')[1]}-${li.datex.split('-')[0]}` }}
            </p>
          </div>
          <div class="data">
            <span>
              Enviado
            </span>
            <p>
              {{ li.send }}
            </p>
          </div>
          <div class="data">
            <span>
              Recibido
            </span>
            <p>
              {{ li.received }}
            </p>
          </div>
        </div>
      </div>
      <div class="parent-info-3 parent-info">
        <div
          v-for="(li, i) in filterOperations(3)"
          :key="i"
          class="info">
          <div class="data">
            <span>
              Fecha
            </span>
            <p>
              {{ `${li.datex.split('-')[2]}-${li.datex.split('-')[1]}-${li.datex.split('-')[0]}` }}
            </p>
          </div>
          <div class="data">
            <span>
              Enviado
            </span>
            <p>
              {{ li.send }}
            </p>
          </div>
          <div class="data">
            <span>
              Recibido
            </span>
            <p>
              {{ li.received }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import { State, Action, Mutation } from 'vuex-class'
@Component({
  fetch() {
    (this as any).getOperations()
  },
  fetchOnServer: false
})
export default class OperationsClass extends Vue {
  seg: number = 0
  secFun: any = null
  scrollLeft: number = 0
  windowInnerWidth: number = 0

  @Prop({}) scrollTop: number

  @State(state => state.operations.operations) operations

  @Action('operations/getOperations') getOperations

  @Mutation('steps/SET_DATA') setStepData

  handleClickOperation(operation) {
    this.setStepData(operation)
    this.$router.push({
      path: 'steps',
      query: {
        step: '3',
        id: operation.id
      }
    })
  }

  filterOperations(id) {
    return this.operations.filter((item) => {
      return item.status_operation_id == id
    })
  }

  handleSeg () {
    this.seg++
  }

  handleStart () {
    this.secFun = setInterval(this.handleSeg, 100)
  }

  handleEnd () {
    if (this.seg < 4) {
      this.$emit('touchend', this.$el)
    }
    clearInterval(this.secFun)
    this.seg = 0
  }

  handleClickBtn (left: number) {
    const infos: any = this.$refs.infos
    infos.scrollTo(left, 0)
  }

  mounted () {
    // this.getOperations()

    const infos: any = this.$refs.infos
    infos.addEventListener('scroll', (evt) => {
      this.scrollLeft = evt.target.scrollLeft
    })

    this.windowInnerWidth = window.innerWidth
  }
}
</script>
<style lang="sass" scoped>
.operations
  position: relative
  width: 100%
  scroll-snap-align: center
  background: #fff
  height: 80vh
  background: -color('gray')
  border-radius: 30px 30px 0px 0px
  padding-bottom: 75px
  min-height: 500px
  &.open
    header
      i
        transform: rotate(180deg)
  .con-infos
    display: flex
    align-items: flex-start
    justify-self: flex-start
    overflow: auto
    scroll-snap-type: x mandatory
    scroll-behavior: smooth
    .parent-info
      padding: 20px
      padding-bottom: 90px
      overflow: auto
      max-height: calc(80vh - 150px)
      min-width: 100%
      scroll-snap-align: center
    .info
      display: flex
      align-items: center
      justify-content: space-between
      background: -color('bg')
      border-radius: 20px
      margin-bottom: 10px
      padding: 0px 5px
      .data
        padding: 14px 15px
        font-size: .8rem
        display: flex
        align-items: flex-start
        justify-content: center
        flex-direction: column
        position: relative
        width: 33%
        &:first-child
          &:after
            content: ''
            position: absolute
            right: 0px
            width: 2px
            height: 25px
            background: -color('black', .05)
        &:last-child
          &:after
            content: ''
            position: absolute
            left: 0px
            width: 2px
            height: 25px
            background: -color('black', .05)
        span
          opacity: .5
          font-size: .7rem
        p
          font-weight: 500
  .con-btns
    display: flex
    align-items: center
    justify-content: space-between
    background: rgba(0,0,0,.03)
    border-radius: 18px
    width: calc(100%  - 30px)
    margin: 10px 15px
    padding: 5px
    margin-bottom: 0px
    position: relative
    z-index: 20
    // &:after
    //   content: ''
    //   position: absolute
    //   bottom: 0px
    //   width: 100%
    //   height: 35px
    //   background-image: linear-gradient(180deg, -color('gray') 0%, rgba(0,0,0,0.001) 100%)
    //   transform: translate(0,100%)

    button
      padding: 12px 20px
      border-radius: 18px
      border: 0px
      background: transparent
      transition: all .25s ease
      &.active
        background: -color('black')
        color: -color('bg')
  header
    border-radius: 30px 30px 0px 0px
    position: relative
    background: -color('gray')
    border-radius: 30px 30px 0px 0px
    display: flex
    align-items: center
    justify-content: space-between
    padding: 20px 30px
    h2
      font-size: 1rem
      font-weight: normal
    i
      transition: all .25s ease
      font-size: 1.1rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
