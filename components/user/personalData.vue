<template>
  <div class="personal-data">
    <c-input
      :value="form.email"
      @input="handleUpdateValue('email', $event)"
      class="mt-6"
      :readonly="!edit"
    >
      Correo electrónico
    </c-input>
    <c-input
      :value="form.tel"
      @input="handleUpdateValue('tel', $event)"
      class="mt-6"
      :readonly="!edit"
    >
      Teléfono
    </c-input>
    <c-input
      :value="form.firstName"
      @input="handleUpdateValue('firstName', $event)"
      class="mt-6"
      :readonly="!edit"
    >
      Nombres
    </c-input>
    <c-input
      :value="form.lastName"
      @input="handleUpdateValue('lastName', $event)"
      class="mt-6"
      :readonly="!edit"
    >
      Apellidos
    </c-input>
    <c-input
      :value="form.date_of_birth"
      @input="handleUpdateValue('date_of_birth', $event)"
      class="mt-6"
      :readonly="!edit"
    >
      Fecha de nacimiento
    </c-input>
    <c-input
      :value="form.dni"
      @input="handleUpdateValue('dni', $event)"
      class="mt-6"
      :readonly="!edit"
    >
      DNI
    </c-input>

    <Button v-if="!edit" @click="edit = true" class="mb-6 mt-6" block yellow>
      Editar usuario
    </Button>
    <footer class="con-btns" v-else>
      <Button @click="edit = false" class="mr-3">
        Cancelar
      </Button>
      <Button @click="send" class="mb-6 mt-6" block yellow>
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
  get form() {
    return (this.$parent as any).data
  }

  @Action('user/updateValue') updateValue

  handleUpdateValue(prop, val) {
    this.updateValue({ prop, val })
  }

  send() {
    axios.post('/update-emailandtel', {
      tel: this.form.tel,
      email: this.form.email
    }).then((res: any) => {
      this.edit = false

      this.$notification({
        title: 'Datos Guardados',
        text: 'Los datos personales han sido guardados con éxito'
      })
    })
    // axios.post(`/user-update/${this.form.id}`, {
    //   firstName: this.form.firstName,
    //   lastName: this.form.lastName,
    //   document_type_id: this.form.document_type_id,
    //   dni: this.form.dni,
    //   declare_id: 1,
    //   date_of_birth: this.form.date_of_birth
    // }).then((res: any) => {
    //   this.edit = false

    //   this.$notification({
    //     title: 'Datos Guardados',
    //     text: 'Los datos personales han sido guardados con éxito'
    //   })
    // })
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
