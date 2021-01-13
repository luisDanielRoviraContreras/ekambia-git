<template>
  <div class="verified">
    <nav-bar :absolute="$device.isDesktop" back @click="$router.push('/')" />

    <div :class="{ desktop: $device.isDesktop }" class="con-form">
      <h2>
        Verificación
      </h2>
      <c-input
        v-model="form.representative_name"
        class="mt-6"
        :danger="!form.representative_name && send"
      >
        Representante legal
      </c-input>
      <Alert :open="!form.representative_name && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.ruc"
        class="mt-6"
        :danger="!form.ruc && send"
      >
        RUC
      </c-input>
      <Alert :open="!form.ruc && send">
        Este campo es requerido
      </Alert>

      <input-file
        v-model="form.constitution"
        class="mt-6"
        :danger="!form.constitution && send"
      >
        Escritura de Constitución
      </input-file>
      <Alert :open="!form.constitution && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.object_of_the_operation"
        class="mt-6"
        :danger="!form.object_of_the_operation && send"
      >
        Objeto de la operación
      </c-input>
      <Alert :open="!form.object_of_the_operation && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.funds_source"
        class="mt-6"
        :danger="!form.funds_source && send"
      >
        Origen de los fondos
      </c-input>
      <Alert :open="!form.funds_source && send">
        Este campo es requerido
      </Alert>

      <footer class="footer">
        <Button :loading="loading" @click="handleSend" class="btn" block yellow>
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
    ruc: '',
    representative_name: '',
    constitution: '',
    object_of_the_operation: '',
    funds_source: ''
  }

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

    console.log(this.form)

    if (!this.form.ruc || !this.form.representative_name || !this.form.constitution || !this.form.object_of_the_operation || !this.form.funds_source) {
      return
    }

    this.loading = true

    var formData = new FormData()
    formData.append("ruc", this.form.ruc)
    formData.append("representative_name", this.form.representative_name)
    formData.append("constitution", this.form.constitution)
    formData.append("object_of_the_operation", this.form.object_of_the_operation)
    formData.append("funds_source", this.form.funds_source)

    axios.post('/verificate1-company', formData).then(({ data }) => {
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
}
</script>
<style lang="sass" scoped>
.footer
  position: fixed
  bottom: 0px
  width: 100%
  background: #fff
  z-index: 1200
  padding: 15px
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,.04)
  max-width: 450px

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
  z-index: 5000
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  overflow: auto
  height: calc(var(--vh, 1vh) * 100)

  .con-form
    width: 100%
    display: flex
    align-items: center
    justify-content: flex-start
    flex-direction: column
    max-width: 450px
    padding: 0px 15px
    padding-bottom: 15px
    padding-bottom: 120px
    margin: 0px auto
    &.desktop
      padding-top: 60px
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
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
