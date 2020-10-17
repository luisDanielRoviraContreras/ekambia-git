<template>
  <div class="personal-data">
    <c-input
      :value="form.email"
      @input="handleUpdateValue('email', $event)"
      class="mt-6"
      :readonly="!edit"
      :danger="!form.email && send"
    >
      Correo electrónico
    </c-input>
    <Alert :open="!form.email && send">
      Este campo es requerido
    </Alert>

    <c-input
      :value="form.tel"
      @input="handleUpdateValue('tel', $event)"
      class="mt-6"
      :readonly="!edit"
      :danger="!form.tel && send"
    >
      Teléfono
    </c-input>
    <Alert :open="!form.tel && send">
      Este campo es requerido
    </Alert>

    <c-input
      :value="form.firstName"
      @input="handleUpdateValue('firstName', $event)"
      class="mt-6"
      :readonly="!edit"
      :danger="!form.firstName && send"
    >
      Nombres
    </c-input>
    <Alert :open="!form.firstName && send">
      Este campo es requerido
    </Alert>

    <c-input
      :value="form.lastName"
      @input="handleUpdateValue('lastName', $event)"
      class="mt-6"
      :readonly="!edit"
      :danger="!form.lastName && send"
    >
      Apellidos
    </c-input>
    <Alert :open="!form.lastName && send">
      Este campo es requerido
    </Alert>

    <c-input
      :value="form.date_of_birth"
      @input="handleUpdateValue('date_of_birth', $event)"
      class="mt-6"
      :readonly="!edit"
      :danger="!form.date_of_birth && send"
    >
      Fecha de nacimiento
    </c-input>
    <Alert :open="!form.date_of_birth && send">
      Este campo es requerido
    </Alert>

    <c-input
      :value="form.dni"
      @input="handleUpdateValue('dni', $event)"
      class="mt-6"
      :readonly="!edit"
      :danger="!form.dni && send"
    >
      DNI
    </c-input>
    <Alert :open="!form.dni && send">
      Este campo es requerido
    </Alert>

    <Button v-if="!edit" @click="edit = true" class="mb-6 mt-6" block yellow>
      Editar usuario
    </Button>
    <footer class="con-btns" v-else>
      <Button @click="edit = false, send = false, handleCancel()" class="mr-3">
        Cancelar
      </Button>
      <Button :loading="loading" @click="handleSend" class="mb-6 mt-6" block yellow>
        Guardar cambios
      </Button>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import { Action } from 'vuex-class'
@Component
export default class personalData extends Vue {
  edit: boolean = false
  send: boolean = false
  loading: boolean = false
  get form() {
    return (this.$parent as any).data
  }

  handleCancel() {
    this.$emit('cancel')
  }

  @Action('user/updateValue') updateValue

  handleUpdateValue(prop, val) {
    this.updateValue({ prop, val })
  }

  handleSend() {
    this.send = true

    if (!this.form.dni || !this.form.date_of_birth || !this.form.lastName || !this.form.firstName || !this.form.tel || !this.form.email) {
      return
    }

    this.loading = true

    // axios.post('/update-emailandtel', {
    //   tel: this.form.tel,
    //   email: this.form.email
    // }).then((res: any) => {
    //   this.edit = false
    //   this.loading = false

    //   this.$notification({
    //     title: 'Datos Guardados',
    //     text: 'Los datos personales han sido guardados con éxito'
    //   })
    // }).catch((err) => {
    //   this.edit = false
    //   this.loading = false
    //   this.$notification({
    //     title: 'Oops! Algo salió mal',
    //     text: err.response.data.message.toString()
    //   })
    // })
    axios.post(`/user-update/${this.form.id}`, {
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      document_type_id: this.form.document_type_id,
      dni: this.form.dni,
      declare_id: 1,
      date_of_birth: this.form.date_of_birth
    }).then((res: any) => {
      this.edit = false
      this.loading = false

      this.$notification({
        title: 'Datos Guardados',
        text: 'Los datos personales han sido guardados con éxito'
      })
    }).catch((err) => {
      this.edit = false
      this.loading = false
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
    })
  }
}
</script>
<style lang="sass" scoped>
.con-btns
  display: flex
  align-items: center
  justify-content: space-between
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
