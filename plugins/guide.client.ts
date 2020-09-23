import Vue from 'vue'
import guideBase from '@/components/mobile/guide.vue'

const guideConstructor = Vue.extend(guideBase)

guideConstructor.prototype.close = function () {
  this.isVisible = false
}

const guide: any = (params: any = {}) => {
  // eslint-disable-next-line new-cap
  const instance = new guideConstructor()
  instance.$data._this = params.this
  // instance.$data.x = !params.x ? window.outerWidth / 2 : params.x
  // instance.$data.y = !params.y ? window.outerHeight / 2 : params.y
  // params.color && (instance.$data.color = params.color)

  document.body.appendChild(instance.$mount().$el)

  Vue.nextTick(() => {
    instance.$data.isVisible = true
  })

  console.log('guide active', params.this)

}


Vue.prototype.$guide = guide
