<template>
  <div class="success">
    <canvas v-if="data" v-show="data.status_operation_id == 4" id="my-custom-canvas" />
    <div v-if="data" class="con-infos">
      <h3 v-if="data.status_operation_id == 4">
        Operación finalizada!
      </h3>
      <h3 class="mb-6" v-else>
        Operación rechazada!
      </h3>
      <img v-if="data.status_operation_id == 4" src="/success.png" alt="">
      <div class="info">
        <p>
          Fecha:
        </p>
        <p>
          {{ data.datex.split('-')[2] }}-{{ data.datex.split('-')[1] }}-{{ data.datex.split('-')[0] }}
        </p>
      </div>
      <div class="info">
        <p>
          Tipo de cambio:
        </p>
        <p>
          {{ data.exchange_type }}
        </p>
      </div>
      <div class="info">
        <p>
          Enviado:
        </p>
        <p>
          {{ data.send }} {{ data.coin_send.coin }}
        </p>
      </div>
      <div class="info">
        <p>
          Recibido:
        </p>
        <p>
          {{ data.received }} {{ data.coin_received.coin }}
        </p>
      </div>
      <div class="info">
        <p>
          Estatus:
        </p>
        <p>
          {{ data.status_operation_id == 4 ? 'Exitosa' : 'Rechazada' }}
        </p>
      </div>
      <div class="info title mt-3">
        <p>
          Tipo de operación:
        </p>
        <p>
          {{ getTypeOperation(data.type_operation_user_id) }} - {{ getTypeOperation(data.type_operation_ekambia_id) }}
        </p>
      </div>
    </div>
    <template v-else>
      <load block height="25px" />
      <load block height="25px" />
      <load block height="25px" />
      <load block height="25px" />
      <load block height="25px" />
      <load block height="44px" class="mt-3" />
    </template>
    <p v-if="data" v-show="data.status_operation_id == 4" class="p">
      Su operación se efectuó exitosamente, ya puede disfrutar de su cambio
    </p>
    <Button @click="$router.push('/')" class="mt-6" block yellow>
      Aceptar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class success extends Vue {
  data: any = null
  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      this.generateCanvas()
    })
  }

  generateCanvas() {
    if (this.data.status_operation_id == 5) {
      return
    }
    var ctx = (document.querySelector('#my-custom-canvas') as any).getContext('2d')
    ctx.canvas.width  = window.innerWidth
    ctx.canvas.height = window.innerHeight

    this.$confetti.start({
      canvasElement: document.querySelector('#my-custom-canvas'),
      particles: [
        {
          type: 'rect',
          size: 4,
          dropRate: 3,
        }
      ],
      particlesPerFrame: 0.5,
      defaultColors: [
        'black',
        '#ffda1a',
        '#f5f7f8',
      ],
    });
  }

  getTypeOperation(id) {
    let type = 'Transferencia'
    if (id == 2) {
      type = 'Oficina'
    } else if (id == 3) {
      type = 'Delivery'
    }

    return type
  }

  mounted() {
    this.getOperation()
  }
}
</script>
<style lang="sass" scoped>
#my-custom-canvas
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%

.page-enter-active, .page-leave-active
  transition: all .2s ease

.success.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.success.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important
/deep/.load
  margin-top: 9px
.con-infos
  width: 100%
  padding: 20px 0px
  max-width: 500px
  display: flex
  align-items: center
  flex-direction: column
  .info
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 4px
    &.title
      flex-direction: column
    p
      font-size: .9rem
      font-weight: bold
      &:last-child
        font-weight: normal

.success
  position: fixed
  width: 100vw
  height: 100vh
  background: #fff
  display: flex
  align-items: center
  justify-content: center
  z-index: 20000
  flex-direction: column
  padding: 25px
  top: 0px
  left: 0px
  overflow: auto
  /deep/
    .load
      max-width: 500px
  img
    width: 100%
    max-width: 240px
    margin-bottom: -30px
    margin-top: 20px
  .p
    font-weight: 600
    text-align: center
    width: 100%
    font-size: .9rem
    max-width: 500px
    margin-top: 20px
  button
    max-width: 500px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
