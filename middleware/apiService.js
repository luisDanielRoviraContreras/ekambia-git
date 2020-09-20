import axios from 'axios'
import { Service } from 'axios-middleware'

const service = new Service(axios)
const addTokenHeader = (requestData) => {
  const token = window.$nuxt.$cookies.get('token')
  if (token) {
    requestData.headers.Authorization = `Bearer ${token}`
  }
  return requestData
}

service.register({
  onRequest (config) {
    return addTokenHeader(config)
  },
  onSync (promise) {
    return promise
  },
  onResponse (promise) {
    return promise
  },
  onResponseError(error) {
    window.$nuxt.$cookies.remove('authenticated')
  }
})
