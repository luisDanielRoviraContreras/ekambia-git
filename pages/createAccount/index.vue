<template>
  <div class="createAccount">
    <header>
      <nuxt-link to="/login/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <g id="Grupo_2221" data-name="Grupo 2221" transform="translate(-68 -85.773)">
            <rect id="Rectangle" width="2.571" height="18" rx="1.286" transform="translate(86 93.488) rotate(90)" opacity="0.3" />
            <path id="Path-94" d="M2.195.377A1.286,1.286,0,0,0,.377,2.195L8.091,9.909a1.286,1.286,0,0,0,1.778.039l7.714-7.071a1.286,1.286,0,1,0-1.738-1.9L9.039,7.22Z" transform="translate(78.286 85.773) rotate(90)"/>
          </g>
        </svg>
      </nuxt-link>

      <steps :value="getNumberValue" :items="3" />
    </header>

    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  layout: 'clean'
})
export default class createAccount extends Vue {
  send: boolean = false
  // form: any = {
  //   email: '',
  //   password: '',
  //   dniType: 1,
  //   dni: '',
  //   tel: '',
  //   // two step
  //   firstName: '',
  //   lastName: '',
  //   date: '01-01-2020',
  //   // step 3
  //   image1: '',
  //   image2: '',
  //   image3: '',
  //   profileId: 1
  // }

  get getNumberValue () {
    if (this.$route.name === 'createAccound-index') {
      return 1
    } else if (this.$route.name === 'createAccound-index-step2') {
      return 2
    } else if (this.$route.name === 'createAccound-index-step3') {
      return 3
    }
  }
}
</script>
<style lang="sass" scoped>
// responsive
.createAccount
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  display: flex
  flex-direction: column
  padding: 0px 30px
  .con-create
    width: 100%
    overflow: auto
    flex: 1
    // display: flex
    // align-items: center
    // justify-content: flex-start
    // flex-direction: column
    h2
      font-weight: 600
  footer
    padding-bottom: 30px
  header
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    // padding-right: 30px
    z-index: 200
    background: -color('bg')
    a
      width: 50px
      height: 50px
      display: flex
      align-items: center
      justify-content: center
      // margin: 10px
      svg
        width: 20px
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
