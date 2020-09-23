<template>
  <div class="name">
    <label class="mb-4" for="">
      Alerta cuando la compra este por encima de
    </label>
    <!-- <button @click="notifyMe">Notify me!</button> -->
    <div class="con-switch">
      <c-input v-model="form.alert1" type="number">
        Monto
      </c-input>
      <c-switch />
    </div>

    <label class="mt-6 mb-4" for="">
      Alerta cuando la venta este por encima debajo de
    </label>

    <div class="con-switch">
      <c-input v-model="form.alert2" type="number">
        Monto
      </c-input>
      <c-switch />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class name extends Vue {
  form: any = {
    alert1: '',
    alert2: ''
  }
  notifyMe() {
    navigator.serviceWorker.register('sw.js');
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Notification with ServiceWorker');
        });
      }
    });
  }
}
</script>
<style lang="sass" scoped>
label
  font-size: .7rem
  display: block
  padding-left: 5px
.con-switch
  display: flex
  align-items: center
  justify-content: space-between
  position: relative
  .switch
    position: absolute
    right: 15px
    z-index: 100
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
