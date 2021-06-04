<template>
    <div class="beta">
        Este sitio web se encuentra en estado <b>(Beta)</b> , los datos y funcionalidades de operaciones de arbitrajes no son reales y constituyen solo procesos de prueba. La fecha de apertura oficial de este servicio se estará comunicando por este medio.
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class footerx extends Vue {
  
}
</script>
<style lang="sass">
.beta
    position: fixed
    bottom: 0px
    z-index: 9000000
    width: 100%
    padding: 20px
    background: rgba(var(--color), 1)
    color: #000
    font-size: .85rem
</style>