<template>
  <div class="win">
    <header>
      <h3>
        ¡Gana con Ekambia!
      </h3>
      <p>
        Recibe 10.0 Guaranies por cada amigo que haga su primer cambio con tu código
      </p>
    </header>

    <div class="con-card-win">
      <h3>
        ¡Gana con nosotros!
      </h3>

      <div class="con-texts">
        <div class="text">
          <p>
            Recomendado
          </p>
          <span>
            1
          </span>
        </div>
        <div class="text">
          <p>
            Créditos
          </p>
          <span>
            10 Guaranies
          </span>
        </div>
      </div>
    </div>

    <div class="con-code">
      <h3>¡Código de recomendación!</h3>
      <p>
        Camparte tu código a todos tus amigos
      </p>

      <div class="share-code">
        <input type="text">
        <button>
          <i class='bx bx-copy' ></i>
        </button>
        <button>
          <i class='bx bxs-share-alt' ></i>
        </button>
      </div>

      <button class="terms-btn">Ver términos y condiciones</button>
    </div>

    <div class="footer">
      <h4>Créditos</h4>
      <span>
        20 Guaranies
      </span>
      <Button class="mt-6" block yellow>
        Compartir
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class win extends Vue {}
</script>
<style lang="sass" scoped>
.win
  header
    h3
      font-size: 1rem
    p
      font-size: .8rem
      opacity: .6
  .con-card-win
    padding: 15px
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,.05)
    border-radius: 25px
    margin-top: 20px
    h3
      font-size: 1rem
      text-align: center
      padding-bottom: 5px
    .con-texts
      display: flex
      align-items: center
      justify-content: space-between
      padding-top: 5px
      .text
        width: calc(50% - 10px)
        text-align: center
        p
          font-size: .8rem
          font-weight: bold
          text-align: center
          width: 100%
        span
          border: 2px solid -color('gray-2')
          background: -color('gray')
          border-radius: 20px
          min-height: 50px
          width: 100%
          display: flex
          align-items: center
          justify-content: center
          font-weight: bold
          font-size: .8rem
  .con-code
    padding-top: 30px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    p
      font-size: .8rem
      opacity: .6
    h3
      font-size: 1rem
    .share-code
      display: flex
      align-items: center
      justify-content: center
      border: 1px dashed -color('text', .15)
      border-radius: 20px
      margin-top: 10px
      input
        padding: 10px
        border: 0px
        background: transparent
      button
        width: 42px
        height: 42px
        background: transparent
        border: 0px
        display: flex
        align-items: center
        justify-content: center
        position: relative
        &:first-of-type
          &:after
            content: ''
            left: 0px
            position: absolute
            width: 1px
            height: 26px
            background: -color('text', .15)
        i
          font-size: 1.3rem
    .terms-btn
      background: transparent
      border: 0px
      font-weight: bold
      padding: 5px
      font-size: .7rem
  .footer
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    margin-top: 30px
    h4
      font-size: .9rem
    span
      width: 100%
      padding: 15px
      background: -color('gray')
      border-radius: 20px
      text-align: center
      font-weight: bold
      font-size: .9rem
      margin-top: 10px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
