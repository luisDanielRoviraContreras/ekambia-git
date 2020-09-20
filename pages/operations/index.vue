<template>
  <div
    id="operations"
    class="operations"
  >
    <div class="con-operations">
      <div class="con-btns">
        <button
          :class="{ active : activeOperations == 1 }"
          @click="activeOperations = 1"
        >
          Verificando
        </button>
        <button
          :class="{ active : activeOperations == 2 }"
          @click="activeOperations = 2"
        >
          Pagando
        </button>
        <button
          :class="{ active : activeOperations == 3 }"
          @click="activeOperations = 3"
        >
          Finalizando
        </button>
      </div>
      <div ref="infos" class="con-infos">
        <div
          :class="{
            active: activeOperations == 1
          }"
          class="parent-info-1 parent-info">
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
                {{ li.datex }}
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
        <div
          :class="{
            active: activeOperations == 2
          }"
          class="parent-info-2 parent-info">
          <div
            v-for="(li, i) in filterOperations(2)"
            :key="i"
            class="info">
            <div class="data">
              <span>
                Fecha
              </span>
              <p>
                {{ li.date }}
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
                {{ li.receive }}
              </p>
            </div>
          </div>
        </div>
        <div
          :class="{
              active: activeOperations == 3
            }"
          class="parent-info-3 parent-info">
          <div
            v-for="(li, i) in filterOperations(3)"
            :key="i"
            class="info">
            <div class="data">
              <span>
                Fecha
              </span>
              <p>
                {{ li.date }}
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
                {{ li.receive }}
              </p>
            </div>
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
  name: 'operations',
  fetch() {
    (this as any).getOperations()
  },
  fetchOnServer: false
})
export default class OperationsClass extends Vue {
  activeOperations: number = 1
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
      path: '/steps',
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
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  .con-operations
    width: 100%
    max-width: 700px
    .con-btns
      width: 100%
      button
        border: 0px
        background: transparent
        border: 0px
        padding: 20px 30px
        font-weight: bold
        cursor: pointer
        opacity: .6
        transition: all .25s ease
        position: relative
        &:after
          content: ''
          width: 0px
          height: 3px
          background: -color('black')
          left: 30px
          border-radius: 10px
          position: absolute
          bottom: 0px
          transition: all .25s ease
        &.active
          opacity: 1
          &:after
            width: 30px
    .con-infos
      width: 100%
      height: 500px
      position: relative
      .parent-info
        visibility: hidden
        opacity: 0
        width: 100%
        height: 500px
        position: absolute
        left: 0px
        top: 0px
        transition: all .25s ease
        &.active
          opacity: 1
          visibility: visible
        .info
          width: 100%
          display: flex
          align-items: center
          justify-content: center
          margin: 15px
          background: -color(gray)
          border-radius: 30px
          .data
            width: 100%
            padding: 20px
            font-size: .9rem
            font-weight: 500
            span
              font-weight: 600

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>

