<template>
  <div v-if="isVisible" class="guide">
    <div class="ref">

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class guide extends Vue {
  isVisible: boolean = false
  guide: any = [
    {
      url: '/accounts'
    }
  ]

  createStep(step) {
    const url = this.guide[step].url
    if (url) {
      this.$router.push(url)
    }
  }

  mounted() {
    this.$nextTick(() => {
      console.log(this)
    })
    // this.createStep(0)
  }
}
</script>
<style lang="sass" scoped>
// responsive
.guide
  position: fixed
  width: 100%
  height: 100%
  z-index: 100000
  background: rgba(0,0,0, .5)
  top: 0px
  left: 0px
  // mix-blend-mode: exclusion

</style>
