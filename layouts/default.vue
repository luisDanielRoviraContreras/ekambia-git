<template>
  <div class="default-app">
    <websocket />
    <desktop-nav />
    <sidebar />
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['index'] }" />
  </div>
</template>
<style lang="sass">
  .default-app
    display: flex
    align-items: center
    justify-content: center
    width: 100%
</style>
