<template>
  <span class="points"><span class="s1">.</span><span class="s2">.</span><span class="s3">.</span></span>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class points extends Vue {}
</script>
<style lang="sass" scoped>
.s1
  animation: 1.8s loadPoint infinite .6s
  opacity: 0
.s2
  animation: 1.8s loadPoint infinite 1.2s
  opacity: 0
.s3
  animation: 1.8s loadPoint infinite 1.8s
  opacity: 0

@keyframes loadPoint
  0%
    opacity: 0
  50%
    opacity: 1
  100%
    opacity: 0

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
