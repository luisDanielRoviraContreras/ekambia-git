<template>
  <div class="transfer-step1 transfer-step">
    <nav-bar :absolute="$device.isDesktop" back @click="$route.query.source == 'operations' ? $router.push('/?operations=true') : $router.push('/')" />

    <div class="content-step">
      <h3 class="mt-6">
        Seleccione cómo quiere recibir el dinero
      </h3>

      <template v-if="data && typesOperation">
        <Select child="name" class="mt-6" @change="handleChangeRecibe" :data="typesOperation" placeholder="Cómo quiero recibirlo" v-model="form.typeReceive" block>
          <Option :key="i" v-for="(option, i) in typesOperation" :value="option.id" :text="option.name" />
        </Select>
      </template>

      <template v-if="data && transferVisible">
        <template v-if="data.accounts.length > 0">
          <Select @change="handleChangeTransfer" :data="data.accounts" placeholder="Cuenta de destino" :danger="!form.destination_account_id && send" class="mt-6" v-model="form.destination_account_id" block>
            <template v-if="data">
              <Option :key="i" v-for="(option, i) in data.accounts" :value="option.id" :text="option.alias" />
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
    </div>

    <footer>
      <Button :disabled="isDisabled" @click="handleNextStep" yellow block>
        Siguiente
      </Button>
    </footer>

    <Map :directions="data.directions" :parent-address="form.direction" @click="handleClickMap" @close="mapVisible = false, form.typeReceive = 0" v-if="mapVisible && data" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class transferStep1 extends Vue {
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

  mapVisible: boolean = false
  transferVisible: boolean = false
  sucursalVisible: boolean = false

  typesOperation: any = []

  offices: any = []

  get isDisabled() {
    let disabled: boolean = true

    if (this.form.typeReceive && this.form.office) {
      disabled = false
    }

    if (this.form.typeReceive && this.form.destination_account_id) {
      disabled = false
    }

    return disabled
  }

  handleCreateAccount() {
    this.$router.push({
      path: '/accounts/create',
      query: {
        ...this.$route.query,
        step: '1'
      }
    })
  }

  handleNextStep() {
    this.$router.push({
      path: '/step1/step2',
      query: {
        ...this.$route.query,
        step1: btoa(JSON.stringify(this.form)),
        mapVisible: `${this.mapVisible}`,
        transferVisible: `${this.transferVisible}`,
        sucursalVisible: `${this.sucursalVisible}`
      }
    })
  }

  handleClickMap(direction, direction2, isNew) {
    this.form.direction = direction
    if (direction2) {
      this.form.direction += `| ${direction2}`
    }

    if (isNew) {
      this.$dialog({
        title: 'Quieres guardar esta dirección?',
        success: () => {
          this.$dialog({
            title: '¿Cuál es el nombre de esta nueva dirección?',
            input: true,
            success: (val) => {
              this.form.name_direction = val
              this.form.save_direction = true
              this.handleNextStep()
              // axios.post('/direction-store', {
              //   name: val,
              //   direction: this.form.direction
              // }).then(({ data }) => {
              //   this.form.name_direction = val
              //   this.form.save_direction = true
              //   this.handleNextStep()
              // }).catch((err) => {
              //   this.$notification({
              //     title: 'Oops! Algo salió mal',
              //     text: err.response.data.message.toString()
              //   })
              // })
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
      this.form = JSON.parse(step1)
      this.sucursalVisible = this.$route.query.sucursalVisible == 'true'
      this.transferVisible = this.$route.query.transferVisible == 'true'
      this.mapVisible = this.$route.query.mapVisible == 'true'
    }
  }

  mounted() {
    this.getData()
    this.setValues()
  }
}
</script>
<style lang="sass" scoped>
.transfer-step1
  width: 100%
  display: flex
  align-items: flex-start
  justify-content: center
  flex-direction: column
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  footer
    width: 100%
    padding: 15px

.content-step
  width: 100%
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  flex: 1
  padding: 15px
  h3
    font-size: 1rem
    text-align: center
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
