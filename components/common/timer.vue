<template>
  <div class="timer"></div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class timer extends Vue {
  time: any = 0
  interval: any = null

  handleClickLogOut () {
    this.$dialog({
      title: '¿Estas hay?, ¿Quieres cerrar la sesión de tu cuenta?',
      bounce: true,
      success: () => {
        axios.post('/logout').then(() => {
          this.$cookies.set('token', '')
          this.$cookies.set('authenticated', false)
          this.$nextTick(() => {
            this.$router.push('/login')
          })
        }).catch((err) => {
          this.$cookies.set('token', '')
          this.$cookies.set('authenticated', false)
          this.$nextTick(() => {
            this.$router.push('/login')
          })
          this.$notification({
            title: 'Oops! Algo salió mal',
            text: err.response.data.message.toString()
          })
        })
      },
      cancel:() => {
        this.time = 0
      }
    })

    setInterval(() => {
      if (this.time > 236) {
        this.$cookies.set('token', '')
        this.$cookies.set('authenticated', false)
        this.$nextTick(() => {
          this.$router.push('/login');
          (this.$router as any).go()
        })
      }
    }, 60000)
  }

  mounted() {
    window.addEventListener('click', () => {
      this.time = 0
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        if (this.time > 178) {
          this.handleClickLogOut()
        }
      }, 180000)
    })

    setInterval(() => {
      this.time++
    }, 1000)

    this.interval = setInterval(() => {
      if (this.time > 178) {
        this.handleClickLogOut()
      }
    }, 180000)
    // }, 180000)
  }
}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
