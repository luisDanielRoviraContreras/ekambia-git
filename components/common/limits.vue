<template>
  <div class="limits">
    <header>
      <h3>
        límites
      </h3>
    </header>
    <div class="con-limits">
      <div class="limit">
        <div class="text">
          <h4>
            Operaciones al año
          </h4>
          <span>
            12 de 50
          </span>
        </div>

        <div class="progress">
          <span class="bar"></span>
        </div>
      </div>
      <div class="limit">
        <div class="text">
          <h4>
            Total por trimestre
          </h4>
          <span>
            Gs. 4.077.034 de Gs. 13.157.034
          </span>
        </div>

        <div class="progress">
          <span class="bar bar2"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class limits extends Vue {

}
</script>
<style lang="sass" scoped>
.limits
  width: 100%
  padding-top: 20px
  header
    h3
      text-align: left
      width: 100%
      font-size: 1rem
      padding-left: 5px
      // font-weight: normal
  .limit
    padding: 8px 0px
    .text
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0px 5px
      padding-bottom: 3px
      h4
        font-weight: normal
        font-size: .8rem
      span
        font-weight: normal
        font-size: .8rem
    .progress
      width: 100%
      background: -color(gray-2)
      height: 6px
      border-radius: 10px
      display: flex
      align-items: center
      justify-content: flex-start
      .bar2
        width: 55% !important
      .bar
        width: 30%
        height: 6px
        background: -color(color)
        position: relative
        left: 0px
        border-radius: 10px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
