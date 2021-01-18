<template>
  <div class="transfer-step1 transfer-step">
    <nav-bar step="1" steps :absolute="$device.isDesktop" back @click="$route.query.source == 'operations' ? $router.push('/?operations=true') : $router.push('/')" />

    <div class="content-step">
      <steps v-if="$device.isDesktop" class="mb-6" numbers :value="1" :items="3" />
      <div class="card-texts">
        <div v-if="data" class="texts">
          <div class="text">
            <span>
              Tú envías
            </span>
            <p v-if="data">
              {{ getSend }} {{ coinSend[0].coin }}
            </p>
          </div>
          <div class="text">
            <span>
              Tú recibes
            </span>
            <p v-if="data">
              {{ getReceive }} {{ coinReceive[0].coin }}
            </p>
          </div>
        </div>
        <load v-else block height="67px" />
        <div class="textw">
          <span>
            Tipo de cambio utilizado
          </span>
          <p v-if="data">
            <!-- {{ data.exchange_purchase.price_purchase }} -->
            {{ getChangePrice }}
          </p>
          <load v-else width="60px" height="20px" />
        </div>
      </div>

      <h3 class="mt-6">
        Seleccione cómo quiere recibir el dinero
      </h3>

      <template v-if="data && typesOperation">
        <Select child="name" class="mt-3" @change="handleChangeRecibe" :data="typesOperation" placeholder="Cómo quiero recibirlo" v-model="form.typeReceive" block>
          <Option :key="i" v-for="(option, i) in typesOperation" :value="option.id" :text="option.name" />
        </Select>
      </template>

      <load v-else block height="60px" class="mt-6" />

      <template v-if="data && transferVisible">
        <template v-if="getAccountsFilter(data.accounts, $route.query.coinReceive).length > 0">
          <Select @change="handleChangeTransfer" :data="getAccountsFilter(data.accounts, $route.query.coinReceive)" placeholder="Cuenta de destino" :danger="!form.destination_account_id && send" class="mt-6" v-model="form.destination_account_id" block>
            <template v-if="data">
              <Option :key="i" v-for="(option, i) in getAccountsFilter(data.accounts, $route.query.coinReceive)" :value="option.id" :text="option.alias" />
            </template>
          </Select>
          <Alert :open="!form.destination_account_id && send">
            Este campo es requerido
          </Alert>
        </template>
        <template v-else>
          <Button @click="handleCreateAccount" class="mt-6" block>
            Crear cuenta bancaria
          </Button>
        </template>
      </template>

      <template v-if="data && sucursalVisible">
        <Select child="name" @change="handleChangeOffice" :data="data.office" placeholder="Seleccione una sucursal" :danger="!form.office && send" class="mt-6" v-model="form.office" block>
          <template v-if="data.office">
            <Option :key="i" v-for="(option, i) in data.office" :value="option.id" :text="option.name" />
          </template>
        </Select>
        <Alert :open="!form.office && send">
          Este campo es requerido
        </Alert>
      </template>

      <h3 class="mt-6">
        Seleccione cómo quiere entregar
      </h3>

      <template v-if="data && typesOperation">
        <Select child="name" class="mt-3" @change="handleChangeSend" :data="typesOperation" placeholder="Cómo entregar" v-model="formSend.typeReceive" block>
          <Option :key="i" v-for="(option, i) in typesOperation" :value="option.id" :text="option.name" />
        </Select>
      </template>

      <load v-else block height="60px" class="mt-6" />

      <template v-if="data && sucursalVisible2">
        <Select child="name" @change="handleChangeOffice2" :data="data.office" placeholder="Seleccione una sucursal" :danger="!formSend.office && send" class="mt-6" v-model="formSend.office" block>
          <template v-if="data.office">
            <Option :key="i" v-for="(option, i) in data.office" :value="option.id" :text="option.name" />
          </template>
        </Select>
        <Alert :open="!formSend.office && send">
          Este campo es requerido
        </Alert>
      </template>

      <template v-if="data">
        <c-input class="mt-6" v-model="source_funds">Origen de los fondos</c-input>
        <Alert :open="!source_funds && send">
          Este campo es requerido
        </Alert>
      </template>

      <load v-else block height="60px" class="mt-6" />
    </div>


    <footer>
      <Button :loading="loading" :disabled="isDisabled" @click="handleInitOperation" yellow block>
        Iniciar operación
      </Button>
    </footer>

    <Map :directions="data.directions" :parent-address="form.direction" @click="handleClickMap" @close="mapVisible = false, form.typeReceive = 0" v-if="mapVisible && data" />
    <Map :directions="data.directions"  :parent-address="formSend.direction" @click="handleClickMap" @close="mapVisible2 = false, formSend.typeReceive = 0" v-if="mapVisible2 && data" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import { Action } from 'vuex-class'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class transferStep1 extends Vue {
  getSend: any = null
  getReceive: any = null
  getChangePrice: any = null
  coins: any = []
  source_funds: any = null

  loading: boolean = false

  data: any = null
  send: boolean = false
  form: any = {
    typeReceive: 0,
    typeReceiveText: '',
    office: 0,
    officeText: '',
    destination_account_id: 0,
    destination_account_id__text: '',
    direction: null,
    name_direction: null,
    save_direction: false
  }
  formSend: any = {
    typeReceive: 0,
    typeReceiveText: '',
    office: 0,
    officeText: '',
    destination_account_id: 0,
    destination_account_id__text: '',
    direction: null,
    name_direction: null,
    save_direction: false
  }

  mapVisible: boolean = false
  mapVisible2: boolean = false
  transferVisible: boolean = false
  transferVisible2: boolean = false
  sucursalVisible: boolean = false
  sucursalVisible2: boolean = false

  typesOperation: any = []

  offices: any = []

  @Action('operations/getOperations') getOperations

  getAccountsFilter(accounts, id) {
    return accounts.filter(item => item.coin_id == id)
  }

  handleInitOperation() {
    this.send = true

    if (this.formSend.office) {

    }

    this.loading = true

    const obj = {
      send: this.getSend,
      received: this.getReceive,
      coin_send_id: this.coinSend[0].id,
      coin_received_id: this.coinReceive[0].id,
      exchange_type: this.getChangePrice,
      source_funds: this.source_funds,
      source_account_id: 0,
      destination_account_id: this.form.destination_account_id,
      type_operation_user_id: this.formSend.typeReceive,
      type_operation_ekambia_id: this.form.typeReceive,
      office_id_in: this.formSend.office,
      office_id_out: this.form.office,
      direction_in: this.formSend.direction,
      name_direction_in: this.formSend.name_direction ? this.formSend.name_direction : '',
      save_direction_in: this.formSend.save_direction ? 1 : 0,
      direction_out: this.form.direction,
      name_direction_out: this.form.name_direction ? this.form.name_direction : '',
      save_direction_out: this.form.save_direction ? 1 : 0
    }

    console.log(obj)

    axios.post('/operation-store', obj).then((res) => {
      this.getOperations()

      axios.get(`/operation-show/${res.data.info.operation_id}`).then(({data}: any) => {
        if (data.info.type_operation_user_id == 1) {
        this.$router.replace({
          path: '/step2/',
          query: {
            id: data.info.id
          }
        })
        } else if (data.info.type_operation_user_id == 2) {
          this.$router.replace({
            path: '/step2/office/',
            query: {
              id: data.info.id
            }
          })
        } else if (data.info.type_operation_user_id == 3) {
          this.$router.replace({
            path: '/step2/delivery/',
            query: {
              id: data.info.id
            }
          })
        }
        setTimeout(() => {
          this.loading = false
        }, 300);
      })

    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  get coinSend() {
    return this.coins.filter(coin => coin.id == this.$route.query.coinSend)
  }
  get coinReceive() {
    return this.coins.filter(coin => coin.id == this.$route.query.coinReceive)
  }

  get isDisabled() {
    let disabled: boolean = true

    if (this.form.typeReceive == 1 && !this.form.destination_account_id) {
      return true
    }
    if (this.form.typeReceive == 2 && !this.form.office) {
      return true
    }

    if (!this.source_funds) {
      return true
    }

    if (this.formSend.typeReceive == 2 && this.formSend.office) {
      disabled = false
    }

    if (this.formSend.typeReceive == 1) {
      disabled = false
    }

    return disabled
  }

  handleCreateAccount() {
    this.$router.replace({
      path: '/accounts/create',
      query: {
        ...this.$route.query,
        step: '1'
      }
    })
  }

  handleNextStep() {
    this.mapVisible = false
    this.mapVisible2 = false
  }

  handleClickMap(direction, direction2, isNew) {
    this.form.direction = direction
    if (direction2) {
      this.form.direction += `| ${direction2}`
    }

    if (isNew) {
      this.$dialog({
        title: '¿Quieres guardar esta dirección?',
        successText: 'Sí',
        cancelText: 'No',
        success: () => {
          this.$dialog({
            title: '¿Cuál es el nombre de esta nueva dirección?',
            input: true,
            success: (val) => {
              this.form.name_direction = val
              this.form.save_direction = true
              this.handleNextStep()
            }
          })
        },
        cancel: () => {
          this.handleNextStep()
        }
      })
    } else {
      this.handleNextStep()
    }
  }

  handleChangeOffice(val, text) {
    this.form.officeText = text
  }

  handleChangeTransfer(val, text) {
    this.form.destination_account_id__text = text
  }

  handleChangeOffice2(val, text) {
    this.formSend.officeText = text
  }

  handleChangeTransfer2(val, text) {
    this.formSend.destination_account_id__text = text
  }

  handleChangeRecibe(val, text) {
    this.form.typeReceiveText = text
    this.mapVisible = false
    this.transferVisible = false
    this.sucursalVisible = false
      if (val == 1) {
        this.transferVisible = true
      }
    if (val == 3) {
      this.mapVisible = true
    }
    if (val == 2) {
      this.sucursalVisible = true
    }

    this.form = {
      typeReceive: val,
      typeReceiveText: text,
      office: 0,
      officeText: '',
      destination_account_id: 0,
      destination_account_id__text: '',
      direction: null,
      name_direction: null,
      save_direction: false
    }
  }

  handleChangeSend(val, text) {
    this.formSend.typeReceiveText = text
    this.mapVisible2 = false
    this.transferVisible2 = false
    this.sucursalVisible2 = false
      if (val == 1) {
        this.transferVisible2 = true
      }
    if (val == 3) {
      this.mapVisible2 = true
    }
    if (val == 2) {
      this.sucursalVisible2 = true
    }

    this.formSend = {
      typeReceive: val,
      typeReceiveText: text,
      office: 0,
      officeText: '',
      destination_account_id: 0,
      destination_account_id__text: '',
      direction: null,
      name_direction: null,
      save_direction: false
    }
  }

  getData() {
    axios.get('/typeoperation').then(({ data }) => {
      this.typesOperation = data.info
    }).catch((err) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
    axios.get('/operation-create').then(({ data }) => {
      console.log(data)
      this.data = data.info
      this.coins = data.info.coins
      if (this.$route.query.transferActive) {
        this.form.typeReceive = 1
        this.transferVisible = true
        this.form.typeReceiveText = 'Transferencia'
      }
    }).catch((err) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  setValues() {
    if (this.$route.query.step1) {
      const step1 = atob((this.$route.query as any).step1)
      const step2 = atob((this.$route.query as any).step2)
      this.form = JSON.parse(step1)
      this.formSend = JSON.parse(step2)
      this.sucursalVisible = this.$route.query.sucursalVisible == 'true'
      this.transferVisible = this.$route.query.transferVisible == 'true'
      this.mapVisible = this.$route.query.mapVisible == 'true'
      this.sucursalVisible2 = this.$route.query.sucursalVisible2 == 'true'
      this.transferVisible2 = this.$route.query.transferVisible2 == 'true'
      this.mapVisible2 = this.$route.query.mapVisible2 == 'true'
    }
  }

  mounted() {
    this.getData()
    this.setValues()

    this.getSend = atob((this.$route.query as any).send)
    this.getReceive = atob((this.$route.query as any).receive)
    this.getChangePrice = atob((this.$route.query as any).cp)
  }
}
</script>
<style lang="sass" scoped>
.card-texts
  background: -color('gray-2')
  border-radius: 30px
  width: 100%
  .texts
    background: #fff
    border-radius: 30px
    display: flex
    align-items: center
    justify-content: center
    border: 2px solid -color('gray-2')
    .text
      width: 50%
      text-align: center
      padding: 15px 5px
  .textw
    width: 100%
    text-align: center
    padding: 10px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
  span
    opacity: .5
    font-size: .8rem
    font-weight: bold
  p
    font-size: .9rem
    font-weight: bold

.transfer-step1
  width: 100%
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: auto
  footer
    width: 100%
    padding: 15px

.content-step
  width: 100%
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  padding: 15px
  height: auto
  flex: 1
  &.flex
    flex: 1
  h3
    font-size: 1rem
    text-align: center
// responsive
// @media (min-width: 812px)
//   .transfer-step1
//     display: flex
//     align-items: center
//     justify-content: center
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
