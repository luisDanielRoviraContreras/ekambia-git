import Vue from 'vue'
import notificationBase from '@/components/common/notification.vue'

const notificationConstructor = Vue.extend(notificationBase)

notificationConstructor.prototype.close = function () {
  this.isVisible = false
}

const notification: any = (params: any) => {
  // eslint-disable-next-line new-cap
  const instance = new notificationConstructor()
  instance.$data.title = params.title
  instance.$data.text = params.text
  instance.$data.click = params.click

  document.body.appendChild(instance.$mount().$el)

  Vue.nextTick(() => {
    instance.$data.isVisible = true
  })

  setTimeout(() => {
    (instance as any).close()
  }, params.time ? params.time : 4000)
}

Vue.prototype.$notification = notification
