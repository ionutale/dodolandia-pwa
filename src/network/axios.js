import axios from 'axios'

const URL = {
  // dev: 'https://dodolandia-service-api.appspot.com/',
  dev: 'http://localhost:3100/',
  prod: 'https://dodolandia-service-api.appspot.com/'
}

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? URL.prod : URL.dev,
  timeout: 1000
})

export default instance