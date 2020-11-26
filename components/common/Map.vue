<template>
  <div class="con-google-maps">
    <nav-bar absolute back @click="$emit('close')" />
    <GmapMap
      :center="center"
      :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
          styles: [
            {
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#f5f5f5'
                }
              ]
            },
            {
              'elementType': 'labels.icon',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#616161'
                }
              ]
            },
            {
              'elementType': 'labels.text.stroke',
              'stylers': [
                {
                  'color': '#f5f5f5'
                }
              ]
            },
            {
              'featureType': 'administrative.land_parcel',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#bdbdbd'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#eeeeee'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#757575'
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#e5e5e5'
                }
              ]
            },
            {
              'featureType': 'poi.park',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#9e9e9e'
                }
              ]
            },
            {
              'featureType': 'road',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#ffffff'
                }
              ]
            },
            {
              'featureType': 'road.arterial',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#757575'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#dadada'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#616161'
                }
              ]
            },
            {
              'featureType': 'road.local',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#9e9e9e'
                }
              ]
            },
            {
              'featureType': 'transit.line',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#e5e5e5'
                }
              ]
            },
            {
              'featureType': 'transit.station',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#eeeeee'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': [
                {
                  'color': '#c9c9c9'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'labels.text.fill',
              'stylers': [
                {
                  'color': '#9e9e9e'
                }
              ]
            }
          ]
        }"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 100%"
      @click="dblclick"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"

        :draggable="true"
        @click="center=m.position, positionx = center"
        @dragend="dragend"
      />
    </GmapMap>


    <div class="con-info">
      <div class="tip" v-if="!address">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2C7.589,2,4,5.589,4,9.995C3.971,16.44,11.696,21.784,12,22c0,0,8.029-5.56,8-12C20,5.589,16.411,2,12,2z M12,14 c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4S14.21,14,12,14z" /></svg>
        <br>
        Arrastra o haz click sobre el punto de entrega
      </div>

      <divider v-if="!address">
        O
      </divider>

      <div class="con-directions">
        <Select uid="direction" child="name" @change="handleClickDirection" :data="directions" v-model="address" placeholder="Seleccione una de tus direcciones" class="mt-6" block>
          <template v-if="directions">
            <Option :key="i" v-for="(option, i) in directions" :value="option.direction" :text="option.name" :sub-text="option.direction" :obj="option" />
          </template>
        </Select>
      </div>

      <div v-if="address" class="con-adress">
        <c-input
          v-model="address"
          type="text"
        >
          Dirección
        </c-input>
        <c-input
          v-model="address2"
          type="text"
          class="mt-6"
        >
          Portal/Escalera/Piso
        </c-input>
        <Button yellow @click="handleEmit" class="mt-6" block>
          Enviar a esta dirección
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { gmapApi } from 'gmap-vue';
import { warn } from 'vue-class-component/lib/util';
import axios from '~/plugins/axios'

@Component
export default class GoogleMap extends Vue {
  positionx: any = ''

  place: any = null

  @Prop() city: string

  @Prop() position: any

  @Prop() parentAddress: any

  @Prop() directions: any

  center: any = {
    lat: 10.500000,
    lng: -66.916664
  }

  markers: any = [{
    position: {
      lat: 10.500000,
      lng: -66.916664
    }
  }]

  address: any = null
  address2: any = ''
  listAddress: any = []

  handleEmit() {
    const getDirectionEqual = this.directions.filter((item) => {
      return item.direction == this.address
    })
    const isNew = getDirectionEqual.length == 0

    this.$emit('click', this.address, this.address2, isNew)
  }

  handleClickDirection(address, text, {obj}) {
    this.address = obj.direction
  }

  setPlace(place) {
    if (place) {
      this.center.lat = place.geometry.location.lat()
      this.center.lng = place.geometry.location.lng()

      this.markers[0].position.lat = place.geometry.location.lat()
      this.markers[0].position.lng = place.geometry.location.lng()
      this.getDirection({
        latLng: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }
      })
    }
  }

  dblclick(data) {
    this.markers[0].position.lat = data.latLng.lat()
    this.markers[0].position.lng = data.latLng.lng()

    this.getDirection(data)
  }

  dragend(data) {
    this.getDirection(data)
  }

  getDirection(data) {
    this.$gmapApiPromiseLazy().then(() => {
      const lat = data.latLng.lat()
      const lng = data.latLng.lng()
      const google = gmapApi()
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK') {
          this.address = results[0].formatted_address
        }
      })
    })
  }

  funcionInit() {
    const onUbicacionConcedida = ubicacion => {
      this.markers[0].position.lat = ubicacion.coords.latitude
      this.markers[0].position.lng = ubicacion.coords.longitude
      this.center.lat = ubicacion.coords.latitude
      this.center.lng = ubicacion.coords.longitude
    }

    const onErrorDeUbicacion = err => {
      console.log("Error obteniendo ubicación: ", err);
    }

    const opcionesDeSolicitud = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
      timeout: 5000 // Esperar solo 5 segundos
    };
    // Solicitar
    (navigator as any).geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);

  }

  // @Watch('parentAddress')
  handleAdress(val) {
    if (val) {
      this.address = val.split('|')[0].trim()
      this.address2 = val.split('|')[1]
    }
  }

  mounted() {
    this.funcionInit()
    this.handleAdress(this.parentAddress)
  }

  @Watch('position')
  async setCenterAndMarker() {
    if (this.position) {
      const position = { lng: Number(this.position.lng), lat: Number(this.position.lat) }
      this.center = position
      this.markers[0].position = position
    } else {
      const coordinates: any = await this.getCityCoordinates()
      if (coordinates) {
        this.center = coordinates
      }
    }
  }

  async getCityCoordinates() {
    // const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${'caracas'},Venezuela&key=${'AIzaSyCO5hzxurIlhfRdWLwxIWMBSwYCZdEMvZo'}`)
    // if (data.status === 'OK') {
    //   return data.results[0].geometry.location
    // }
  }
}
</script>
<style lang="sass">
.con-google-maps
  .divider
    margin-top: 0px !important
  .navbar-mobile
    padding-right: 10px
    .right
      background: #fff
      height: 45px
      padding: 0px 10px
      margin-top: 10px
      border-radius: 10px
      box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
      img
        height: 20px

    .back-btn
      background: #fff
      border-radius: 10px
      width: 45px
      height: 45px
      margin-top: 10px
      box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
      svg
        width: 22px
</style>
<style lang="sass" scoped>
.con-directions
  padding: 0px 15px
  /deep/.select
    margin-top: 0px
  ul
    max-height:
    li
      padding: 10px 10px
      background: -color(gray)
      margin: 10px
      border-radius: 20px
      width: calc(100% - 20px)
      display: flex
      align-items: center
      justify-content: flex-start
      transition: all .25s ease
      &.active
        background: #000
        color: #fff
        i
          transform: scale(1.3)
      .text
        padding-left: 10px
      i
        font-size: 1.4rem
        transition: transform .25s ease
      h6
        font-size: .95rem
      p
        font-size: .8rem
.con-info
  position: relative
  z-index: 100
  bottom: 0px
  background: #fff
  width: 100%
  padding-bottom: 15px
  padding-top: 15px
  .tip
    padding: 15px 20px
    font-weight: bold
    text-align: center
    font-size: .8rem
    padding-top: 0px
  .con-adress
    padding: 20px 15px
    padding-top: 25px
    padding-bottom: 0px
.con-google-maps
  position: fixed
  z-index: 2000
  left: 0px
  bottom: 0px
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  background: #fff
  /deep/.navbar-mobile
    background: transparent
  /deep/.vue-map
    border-radius: 0px 0px 30px 30px !important
  /deep/.gmnoprint
    display: none !important
// responsive

@media (min-width: 812px)
  .con-google-maps
    flex-direction: row
  .con-info
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    max-width: 500px
    .con-directions
      width: 100%
      max-width: 500px
    .con-adress
      width: 100%
      max-width: 500px
</style>
