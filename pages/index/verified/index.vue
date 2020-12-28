<template>
  <div class="verified ">
    <nav-bar :absolute="$device.isDesktop" back @click="$router.push('/')" />

    <div class="con-form">
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
        <Select :data="typeDocuments" placeholder="Tipo" sticky v-model="form.dniType" :danger="!form.dni && send">
          <Option :key="i" v-for="(item, i) in typeDocuments" :value="item.id" :text="item.alias" :sub-text="item.sub" />
        </Select>
        <c-input
          sticky-prev
          v-model="form.dni"
          class="ml-3"
          :danger="!form.dni && send"
        >
          {{ form.dniType == 1 ? 'Nro. Cédula de Identidad' : 'Nro. Pasaporte' }}
        </c-input>
      </div>
      <Alert :open="!form.dni && send">
        Este campo es requerido
      </Alert>

      <input-file
        ref="front"
        v-model="form.cedulaFile"
        :danger="!form.cedulaFile && send"
        :disabled="loading"
      >
        Fotografía de su CI de identidad o Pasaporte
      </input-file>
      <Alert :open="!form.cedulaFile && send">
        Este campo es requerido
      </Alert>

      <Select class="mt-6" block :data="country_list" placeholder="Nacionalidad" v-model="form.country" :danger="!form.country && send">
        <Option :key="i" v-for="(item, i) in country_list" :value="item" :text="item" />
      </Select>

      <Alert :open="!form.country && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.direction"
        class="mt-6"
        :danger="!form.direction && send"
      >
        Domicilio
      </c-input>
      <Alert :open="!form.direction && send">
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
        v-model="form.purposeOperation"
        class="mt-6"
        :danger="!form.purposeOperation && send"
      >
        Objeto de la operación
      </c-input>
      <Alert :open="!form.purposeOperation && send">
        Este campo es requerido
      </Alert>

      <c-input
        v-model="form.sourceFunds"
        class="mt-6"
        :danger="!form.sourceFunds && send"
      >
        Origen de los fondos
      </c-input>
      <Alert :open="!form.sourceFunds && send">
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
    nacionality_id: '',
    domicilie: '',
    occupation: '',
    cedulaFront: '',
    cedulaPost: '',
    purposeOperation: '',
    sourceFunds: '',
  }

  country_list: any = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];

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
    axios.post('/verificate1-user', {
      ...this.form
    }).then(({ data }) => {
      console.log('se verifico')
    })
    console.log('click')
  }

  mounted() {
    axios.get('/nationalities').then(({ data }) => {
      console.log(data)
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
    .footer
      position: fixed
      bottom: 0px
      width: 100%
      background: #fff
      z-index: 1200
      padding: 15px
      box-shadow: 0px 0px 20px 0px rgba(0,0,0,.04)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
