<template>
  <div class="transfer-step1">
    <nav-bar back @click="handleBack" />

    <div class="content-step">
      <h3 class="mt-6">
        Seleccione como quiere pagar
      </h3>

      <template v-if="data && typesOperation">
        <Select child="name" class="mt-6" @change="handleChangeRecibe" :data="typesOperation" placeholder="Como pagar" v-model="form.typeReceive" block>
          <Option :key="i" v-for="(option, i) in typesOperation" :value="option.id" :text="option.name" />
        </Select>
      </template>

      <template v-if="data && transferVisible2">
        <template v-if="data.accounts.length > 0">
          <Select @change="handleChangeTransfer" :data="data.accounts" placeholder="Cuenta de origen" :danger="!form.destination_account_id && send" class="mt-6" v-model="form.destination_account_id" block>
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

      <template v-if="data && sucursalVisible2">
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

    <Map :directions="data.directions"  :parent-address="form.direction" @click="handleClickMap" @close="mapVisible2 = false, form.typeReceive = 0" v-if="mapVisible2 && data" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class transferStep2 extends Vue {
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

  mapVisible2: boolean = false
  transferVisible2: boolean = false
  sucursalVisible2: boolean = false

  typesOperation: any = []

  offices: any = []

  handleBack() {
    this.$router.push({
      path: '/step1/step1',
      query: {
        ...this.$route.query
      }
    })
  }

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
        step: '2'
      }
    })
  }

  handleNextStep() {
    console.log(this.form)
    this.$router.push({
      path: '/step1/step3',
      query: {
        ...this.$route.query,
        step2: btoa(JSON.stringify(this.form)),
        mapVisible2: `${this.mapVisible2}`,
        transferVisible2: `${this.transferVisible2}`,
        sucursalVisible2: `${this.sucursalVisible2}`
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
            title: 'Cual es el nombre de esta nueva dirección?',
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

  handleChangeRecibe(val, text) {
    this.form.typeReceiveText = text
    this.mapVisible2 = false
    this.transferVisible2 = false
    this.sucursalVisible2 = false
    if (val == 1) {
      this.transferVisible2 = true
    }
    if (val == 3) {
      this.mapVisible2 = true
      const step1 = atob((this.$route.query as any).step1)
      const step1obj = JSON.parse(step1)
      if (step1obj.direction) {
        this.$dialog({
          title: 'Quieres usar la misma dirección de recibida?, para la entrega',
          success: () => {
            this.handleClickMap(step1obj.direction, null, false)
            this.handleNextStep()
          }
        })
      }
    }
    if (val == 2) {
      this.sucursalVisible2 = true
      const step1 = atob((this.$route.query as any).step1)
      const step1obj = JSON.parse(step1)
      if (step1obj.office) {
        this.$dialog({
          title: 'Quieres usar la misma sucursal de recibida? para la entrega',
          success: () => {
            this.form.office = step1obj.office
            this.form.officeText = step1obj.officeText
          }
        })
      }
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
        this.transferVisible2 = true
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
    if (this.$route.query.step2) {
      const step2 = atob((this.$route.query as any).step2)
      this.form = JSON.parse(step2)
      this.sucursalVisible2 = this.$route.query.sucursalVisible2 == 'true'
      this.transferVisible2 = this.$route.query.transferVisible2 == 'true'
      this.mapVisible2 = this.$route.query.mapVisible2 == 'true'
    }
  }

  mounted() {
    const step1 = atob((this.$route.query as any).step1)
    console.log(step1)
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
