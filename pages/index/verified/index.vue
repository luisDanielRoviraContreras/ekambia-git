<template>
  <div class="verified ">
    <nav-bar back @click="$router.push('/')" />

    <div class="con-form">
      <h2>
        Verificación
      </h2>
      <c-input
        v-model="form.lastName"
        class="mt-6"
        :danger="!form.lastName && send"
      >
        Apellido
      </c-input>
      <Alert :open="!form.lastName && send">
        Este campo es requerido
      </Alert>
      <div
        class="con-select-input mt-6"
      >
        <Select :data="typeDocuments" placeholder="Tipo" sticky v-model="form.document_type_id" :danger="!form.dni && send">
          <Option :key="i" v-for="(item, i) in typeDocuments" :value="item.id" :text="item.alias" :sub-text="item.sub" />
        </Select>
        <c-input
          sticky-prev
          v-model="form.dni"
          class="ml-3"
          :danger="!form.dni && send"
        >
          {{ form.document_type_id == 1 ? 'Nro. Cédula de Identidad' : 'Nro. Pasaporte' }}
        </c-input>
      </div>
      <Alert :open="!form.dni && send">
        Este campo es requerido
      </Alert>

      <input-file
        ref="front"
        v-model="form.cedulaFront"
        :danger="!form.cedulaFront && send"
        :disabled="loading"
      >
        Fotografía de su CI de identidad o Pasaporte
      </input-file>
      <Alert :open="!form.cedulaFront && send">
        Este campo es requerido
      </Alert>
      <!-- <template v-if="country_list">
        <Select alias="name" uid="id" class="mt-6" block :data="country_list" placeholder="Nacionalidad" v-model="form.nacionality_id" :danger="!form.nacionality_id && send">
          <Option :key="i" v-for="(item, i) in country_list" :value="item.id" :text="item.name" />
        </Select>
      </template> -->

      <template v-if="country_list">
        <Select search child="name" class="mt-6" :data="country_list" placeholder="Nacionalidad" v-model="form.nacionality_id" block>
          <Option :key="i" v-for="(option, i) in country_list" :value="option.id" :text="option.name" />
        </Select>
      </template>

      <load v-else block height="60px" class="mt-6" />



      <Alert :open="!form.nacionality_id && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.domicilie"
        class="mt-6"
        :danger="!form.domicilie && send"
      >
        Domicilio
      </c-input>
      <Alert :open="!form.domicilie && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.occupation"
        class="mt-6"
        :danger="!form.occupation && send"
      >
        Ocupación
      </c-input>
      <Alert :open="!form.occupation && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.obj_operation"
        class="mt-6"
        :danger="!form.obj_operation && send"
      >
        Objeto de la operación
      </c-input>
      <Alert :open="!form.obj_operation && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.source_founds"
        class="mt-6"
        :danger="!form.source_founds && send"
      >
        Origen de los fondos
      </c-input>
      <Alert :open="!form.source_founds && send">
        Este campo es requerido
      </Alert>

      <footer class="footer">
        <Button :loading="loading" @click="handleSend" block yellow>
          Enviar
        </Button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class verified extends Vue {
  send: boolean = false
  loading: boolean = false

  form: any = {
    lastName: '',
    document_type_id: 1,
    dni: '',
    cedulaFront: '',
    nacionality_id: '',
    domicilie: '',
    occupation: '',
    obj_operation: '',
    source_founds: '',
  }

  country_list: any = null

  typeDocuments: any = [
    {
      id: 1,
      alias: 'C. I.',
      sub: 'Cédula de Identidad'
    },
    {
      id: 2,
      alias: 'PAS',
      sub: 'Pasaporte'
    }
  ]

  handleSend() {
    this.send = true

    if (!this.form.lastName || !this.form.document_type_id || !this.form.dni || !this.form.cedulaFront || !this.form.nacionality_id || !this.form.domicilie || !this.form.occupation || !this.form.obj_operation || !this.form.source_founds) {
      return
    }

    this.loading = true

    var formData = new FormData()
    formData.append("lastName", this.form.lastName)
    formData.append("document_type_id", this.form.document_type_id)
    formData.append("dni", this.form.dni)
    formData.append("cedulaFront", this.form.cedulaFront)
    formData.append("nacionality_id", this.form.nacionality_id)
    formData.append("domicilie", this.form.domicilie)
    formData.append("occupation", this.form.occupation)
    formData.append("obj_operation", this.form.obj_operation)
    formData.append("source_founds", this.form.source_founds)

    axios.post('/verificate1-user', formData).then(({ data }) => {
      console.log('se verifico')
      this.loading = false
      this.$router.push({
        path: '/step1/step1',
        query: {
          ...this.$route.query
        }
      })
    })
  }

  mounted() {
    axios.get('/nationalities').then(({ data }) => {
      console.log(data)
      this.country_list = data.info
    })
  }
}
</script>
<style lang="sass" scoped>
.page-enter-active, .page-leave-active
  transition: all .2s ease

.verified.page-enter
  transform: translate(100%) !important
  opacity: 1 !important
.verified.page-leave-to
  transform: translate(100%) !important
  opacity: 1 !important

.con-select-input
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  /deep/.select
    max-width: 100px
    input
      width: 100%
.verified
  position: fixed
  width: 100%
  height: 100vh
  background: -color('bg')
  top: 0px
  left: 0px
  z-index: 4000
  // display: flex
  // align-items: flex-start
  // justify-content: flex-start
  // flex-direction: column
  overflow: auto
  height: calc(var(--vh, 1vh) * 100)
  .con-form
    margin: auto
    width: 100%
    display: flex
    align-items: center
    justify-content: flex-start
    flex-direction: column
    max-width: 450px
    padding: 0px 15px
    padding-bottom: 15px
    padding-bottom: 120px
    .footer
      position: fixed
      bottom: 0px
      width: 100%
      background: #fff
      z-index: 1200
      padding: 15px
      box-shadow: 0px 0px 20px 0px rgba(0,0,0,.04)
      max-width: 450px
// responsive

@media (min-width: 812px)
  .verified
    align-items: center
    .con-form
      .footer
        position: relative
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,.04)
        padding: 0px
        margin-top: 1.5rem
</style>
