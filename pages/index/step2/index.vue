<template>
  <div
    class="transfer">
    <nav-bar step="2" steps not-padding back @click="$route.query.source == 'operations' ? $router.push('/?operations=true') : $router.push('/')" />
    <div v-if="!transferred" class="con-data">
      <div class="card-texts">
        <div v-if="data" class="texts">
          <div class="text">
            <span>
              Tu envías
            </span>
            <p v-if="data">
              {{ data.send }} {{ data.coin_send.coin }}
            </p>
          </div>
          <div class="text">
            <span>
              Tu recibes
            </span>
            <p v-if="data">
              {{ data.received }} {{ data.coin_received.coin }}
            </p>
          </div>
        </div>
        <load v-else block height="67px" />
        <div class="textw">
          <span>
            Tipo de cambio utilizado
          </span>
          <p v-if="data">
            {{ data.exchange_type }}
          </p>
          <load v-else width="60px" height="20px" />
        </div>
      </div>

      <Select child="name" :data="ekambiaAccounts" @change="handleChange" placeholder="Selecciona la cuenta" class="mt-6" block>
        <template v-if="ekambiaAccounts">
          <Option :key="i" v-for="(option, i) in ekambiaAccounts" :value="option.id" :text="option.name" :obj="option" />
        </template>
      </Select>

      <div v-if="!account" class="con-text">
        <p>
          Selecciona la cuenta de ekambia a la que deseas transferir para mostrarte los datos bancarios
        </p>
      </div>

      <h2 v-if="account">
        Datos de cuenta bancaria
      </h2>
      <ul v-if="account">
        <li>
          <b>
            IBAN:
          </b>
          <p>
            {{ account.account_number }}
          </p>
        </li>
        <li>
          <b>
            Banco:
          </b>
          <p>
            {{ account.bank.name }}
          </p>
        </li>
        <li>
          <b>
            Nombre:
          </b>
          <p>
            {{ account.holder }}
          </p>
        </li>
      </ul>

      <div v-if="account" class="con-switch">
        <c-switch v-model="hasTransfer" /> <p>Listo! ya transferí</p>
      </div>

      <footer v-if="account">
        <Button :disabled="!hasTransfer" block yellow @click="transferred = true">
          Verificar transferencia
        </Button>
      </footer>
    </div>
    <div v-else class="boucher">
      <h2>
        Agregar comprobante
      </h2>
      <div class="con">
        <c-input
          v-model="form.ref"
          class="mt-6"
          type="number"
          :danger="!form.ref && send"
          maxlength="20"
        >
          Nro. de referencia (Obligatorio)
        </c-input>
        <Alert :open="!form.ref && send">
          Este campo es requerido
        </Alert>

        <input-file v-model="form.file">
          Comprobante transferencia (Opcional)

          <template #text>
            Tome o suba <br> imagen de comprobante
          </template>
        </input-file>

        <Button :loading="loading" @click="handleSend" class="mt-6" block yellow>
          Verificar
        </Button>
        <p>
          Con esta información vamos a verificar que la transferencia fue efectuada exitosamente en nuestra cuenta bancaria
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class transfer extends Vue {
  send: boolean = false
  loading: boolean = false
  transferred: boolean = false
  hasTransfer: boolean = false

  ekambiaAccounts: any = []
  account: any = null

  form: any = {
    file: null,
    ref: null,
  }

  data: any = null

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      console.log(data)
      this.data = data.info
    })
  }

  handleChange( val, text, {obj}) {
    this.account = obj
  }

  handleSend() {
    this.send = true
    if (!this.form.ref) {
      return
    }
    this.loading = true
    var formData = new FormData()
    if (this.form.file) {
      formData.append('voucher', this.form.file)
    }
    if (this.form.ref) {
      formData.append('num_reference', this.form.ref)
    }
    console.log(this.form)
    console.log(formData)
    axios.post(`/operation-voucherupdate/${this.$route.query.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
        console.log(data)
        this.loading = false
        if (data.info.type_operation_ekambia_id == 3) {
          this.$router.push({
            path: '/step3/delivery',
            query: {
              ...this.$route.query,
              checking: `${data.info.status_operation_id == 2 && data.info.type_operation_user_id == 1}`
            }
          })
        } else if (data.info.type_operation_ekambia_id == 2) {
          this.$router.push({
            path: '/step3/office',
            query: {
              ...this.$route.query,
              checking: `${data.info.status_operation_id == 2 && data.info.type_operation_user_id == 1}`
            }
          })
        } else {
          this.$router.push({
            path: '/step3/',
            query: {
              ...this.$route.query
            }
          })
        }
      })
    }).catch((err) => {
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }

  getAccounts() {

    axios.get(`/accountekambia`).then(({data}) => {
      this.ekambiaAccounts = data.info
    })
  }

  mounted() {
    this.getAccounts()
    this.getOperation()
  }
}
</script>
<style lang="sass" scoped>
.boucher
  p
    font-size: .8rem
    padding: 10px
    margin-top: 15px
    opacity: .7
    text-align: center
.con-text
  p
    font-size: .8rem
    padding: 10px
    opacity: .7
.con-switch
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 15px 10px
  p
    font-size: .85rem
    padding: 0px 10px
    font-weight: bold
.card-texts
  background: -color('gray-2')
  border-radius: 30px
  width: 100%
  margin-top: 20px
  .texts
    background: #fff
    border-radius: 30px
    display: flex
    align-items: center
    justify-content: center
    .text
      width: 50%
      text-align: center
      padding: 15px 10px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
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
.con-data
  ul
    width: 100%
    margin-bottom: 20px
    padding: 10px
    li
      display: flex
      align-items: center
      justify-content: flex-start
      width: 100%
      padding: 10px 0px
      p
        display: block
        margin-left: 10px
.transfer
  width: 100%
  padding: 15px
  h2
    font-size: 1.1rem
    text-align: center
    padding: 10px 0px
    margin-top: 10px

@media (min-width: 812px)
  .con-data
    max-width: 500px
    margin: 0px auto
  .boucher
    max-width: 500px
    margin: 0px auto
</style>
