<template>
  <div class="con-google-maps">
    <!-- <label for="">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2C7.589,2,4,5.589,4,9.995C3.971,16.44,11.696,21.784,12,22c0,0,8.029-5.56,8-12C20,5.589,16.411,2,12,2z M12,14 c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4S14.21,14,12,14z" /></svg>
      Arrastra el cursor o has click sobre el punto de entrega
    </label> -->
    <!-- 7b6dee503e0b4a5 -->
    <template
      >
      <GmapMap
        ref="map"
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
      >
      </GmapMap>
    </template>


    <div class="con-text">
      <slot></slot>
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

  @Prop() from: any

  @Prop() to: any

  @Prop() transit: any

  @Prop() ll: any

  @Prop() lat: any

  @Prop() lng: any

  center: any = {
    lat: 0,
    lng: 0
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

  start: any = {
    lat: null,
    lng: null
  }

  end: any = {
    lat: null,
    lng: null
  }

  directionsRenderer: any = null
  directionsService: any = null
  marker: any = null
  marker2: any = null

  google: any = null
  geocoder: any = null

  @Watch('lat')
  handleUpdatePosition() {
    // console.log('paso por update ')
    // this.directionsRenderer.setMap(null)
    // this.marker.setMap(null)
    // this.marker2.setMap(null)
    // this.init()
    if (this.ll) {
      this.geocoder.geocode({'address': this.to}, ([results], status) => {
        this.calcRoute({ lat: Number(this.lat), lng: Number(this.lng) }, results.geometry.location)
      })
    }
  }

  @Watch('transit')
  handleTransit() {
    this.directionsRenderer.setMap(null)
    this.marker.setMap(null)
    this.marker2.setMap(null)
    this.init()
  }

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

  init() {
    const onUbicacionConcedida = ubicacion => {
      this.$gmapApiPromiseLazy().then(() => {
        const lat = ubicacion.coords.latitude
        const lng = ubicacion.coords.longitude
        this.google = gmapApi()
        this.geocoder = new google.maps.Geocoder()
        this.directionsService = new this.google.maps.DirectionsService();
        this.directionsRenderer = new this.google.maps.DirectionsRenderer
        this.directionsRenderer.setMap((this.$refs.map as any).$mapObject)


        this.geocoder.geocode({'address': this.from}, ([results1], status) => {
          this.geocoder.geocode({'address': this.to}, ([results2], status) => {
            this.calcRoute(results1.geometry.location, results2.geometry.location, true)
          })
        })


        this.geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK') {
            this.address = results[0].formatted_address
          }
        })
      })
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
    this.init()
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

  calcRoute(start, end, n) {
    this.directionsRenderer.setOptions({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: this.transit ? "rgba(255, 218, 26, 1)" : "rgba(0, 0, 0, 1)",
        strokeWeight: 5,
        icons:[{ icon: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW }]
      },
    });
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
    };



    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        var route = result.routes[0].legs[0]

        var icon1 = {
            url: this.transit ? '/start.png' : '/start-b.png',
            scaledSize: new google.maps.Size(35, 35), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(10, 15) // anchor
        }

        this.marker = new google.maps.Marker({
          map: (this.$refs.map as any).$mapObject,
          position: route.start_location,
          visible: true,
          icon: icon1,
        });

        var icon2 = {
            url: this.transit ? '/house.png' : '/house-b.png',
            scaledSize: new google.maps.Size(35, 35), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(10, 15) // anchor
        }

        this.marker2 = new google.maps.Marker({
          map: (this.$refs.map as any).$mapObject,
          position: route.end_location,
          visible: true,
          icon: icon2,
        });

        if (n) {
          var infowindow = new google.maps.InfoWindow({
            content: `
              <h4>Dirección de entrega</h4>
              <p>${route.end_address}</p>
            `
          });

          infowindow.open((this.$refs.map as any).$mapObject,this.marker2);
        }



        this.directionsRenderer.setDirections(result);
      }
    });


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
.gm-style-iw-t
  margin-bottom: 10px
  &::after
    box-shadow: 0px 20px 20px 0px rgba(0,0,0,.1) !important
.gm-style-iw
  padding: 16px !important
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,.1) !important
  border-radius: 16px !important
  .gm-ui-hover-effect
    margin: 6px !important
  h4
    font-size: .9rem
    padding-bottom: 5px
  p
    opacity: .5
    font-size: .7rem
    font-weight: bold
.con-text
  position: relative
  padding: 10px 10px
  padding-bottom: 20px
  width: 100%
  h3
    font-size: 1rm
    padding: 10px
    text-align: center
    // border-bottom: 1px solid -color(gray)
    // margin-bottom: 10px
  p
    text-align: center
    padding: 4px
    font-size: .8rem
</style>
<style lang="sass" scoped>
.con-google-maps
  position: fixed
  z-index: 900
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

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
