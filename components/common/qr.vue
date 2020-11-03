<template>
  <div class="qr">
    <!-- <p class="error">{{ error }}</p> -->

    <!-- <p class="decode-result">Code: <b>{{ result }}</b></p> -->

    <div v-if="loading" class="loading">
      <div class="load" />
    </div>

    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
  </div>
</template>
<script lang="ts">
import { Action, State } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class qr extends Vue {
  result: string = ''
  error: string = ''
  camera: string = 'rear'
  noRearCamera: boolean = false
  noFrontCamera: boolean = false
  loading: boolean = false

  onDecode (result: any) {
    if (!result) {
      return
    }
    this.result = result
    this.$notification({
      title: 'Código QR Escaneado',
      text: 'Los campos para efectuar la transferencia se llenaron automáticamente con el QR escaneado',
      color: 'success'
    })
    setTimeout(() => {
      this.$router.push('/transfer')
      this.$emit('code')
    }, 300)
  }

  async onInit (promise: any) {
    this.loading = true
    try {
      await promise
    } catch (error) {
      const triedFrontCamera = this.camera === 'front'
      const triedRearCamera = this.camera === 'rear'

      const cameraMissingError = error.name === 'OverconstrainedError'

      if (triedRearCamera && cameraMissingError) {
        this.noRearCamera = true
      }

      if (triedFrontCamera && cameraMissingError) {
        this.noFrontCamera = true
      }
    } finally {
      this.loading = false
    }
  }
}
</script>
<style lang="sass" scoped>
// responsive
.loading
  position: absolute
  width: 100vw
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
.load
  display: block
  width: 40px
  height: 40px
  position: relative
  &:after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    border: 3px solid -color('color', 1)
    border-top: 3px solid -color('bg', 0)
    border-left: 3px solid -color('bg', 0)
    border-bottom: 3px solid -color('bg', 0)
    box-sizing: border-box
    transition: all .25s ease
    display: block
    box-shadow: 0px 0px 0px 0px -color('color',1)
    animation: loading .6s ease infinite
  &:before
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    border: 3px dashed -color('color',1)
    border-top: 3px solid -color('bg', 0)
    border-left: 3px solid -color('bg', 0)
    border-bottom: 3px solid -color('bg', 0)
    box-sizing: border-box
    transition: all .25s ease
    display: block
    box-shadow: 0px 0px 0px 0px -color('color',1)
    animation: loading .6s linear infinite
.qr
  position: fixed
  top: 0px
  height: 100vh
  width: 100%
  z-index: 10001
  background: -color('bg')
  header
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    z-index: 100
    display: flex
    align-items: center
    justify-content: space-between
    background: -color('color')
    color: -color('bg')
    border-radius: 0px 0px 0px 25px
    button
      min-width: 50px !important
      max-width: 50px !important
      max-height: 50px !important
      min-height: 50px !important
    p
      padding: 20px
      b
        font-weight: bold
  footer
    width: 100%
    padding: 15px
    position: fixed
    bottom: 0px
    display: flex
    align-items: center
    justify-content: center
    padding-bottom: 50px
    button
      min-width: 50px !important
      max-width: 50px !important
      max-height: 50px !important
      min-height: 50px !important
    svg
      min-width: 24px
      fill: #fff
  .decode-result
    position: absolute
    bottom: 0px
    padding: 20px
    background: -color('bg')
    width: 100%
    z-index: 100
    border-radius: 20px 20px 0px 0px
    b
      font-size: .8rem
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
