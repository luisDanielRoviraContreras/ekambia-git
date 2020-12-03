<template>
  <div class="success">
    <h3>
      Operación finalizada!
    </h3>
    <img src="/success.png" alt="">
    <div v-if="data" class="con-infos">
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
    <p class="p">
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
      console.log(data.info)
      this.data = data.info
    })
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
  background: -color('gray')
  display: flex
  align-items: center
  justify-content: center
  z-index: 20000
  flex-direction: column
  padding: 25px
  top: 0px
  left: 0px
  overflow: auto
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
