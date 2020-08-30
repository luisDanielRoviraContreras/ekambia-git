import Vue from 'vue'
import bounceBase from '@/components/common/bounce.vue'

const bounceConstructor = Vue.extend(bounceBase)

bounceConstructor.prototype.close = function () {
  this.isVisible = false
}

const bounce: any = (params: any = {}) => {
  // eslint-disable-next-line new-cap
  const instance = new bounceConstructor()
  params.x && (instance.$data.x = params.x)
  params.y && (instance.$data.y = params.y)
  params.color && (instance.$data.color = params.color)

  document.body.appendChild(instance.$mount().$el)

  Vue.nextTick(() => {
    instance.$data.isVisible = true
  })

  // setTimeout(() => {
  //   (instance as any).close()
  // }, 3000)
}

const bounceClose: any = () => {
  setTimeout(() => {
    const bounce: any = document.querySelector('.bounce')
    if (!bounce) {
      return
    }
    bounce.style.opacity = 0
    setTimeout(() => {
      bounce.remove()
    }, 250)
  }, 600)
}

Vue.prototype.$bounce = bounce
Vue.prototype.$bounceClose = bounceClose
