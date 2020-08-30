import https from 'https'
import axios from 'axios'
const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.API,
    headers: {
      'Content-Type': 'application/json'
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }
  // Create instance
  const instance = axios.create(defaultOptions)
  return instance
}

export default fetchClient()
