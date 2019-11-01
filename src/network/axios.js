import axios from 'axios'
const URL = {
  dev: 'https://dodolandia.herokuapp.com/',
  prod: 'https://dodolandia.herokuapp.com/'
}
// const token = localStorage.getItem('token')
// const xUserId = localStorage.getItem('xUserId')

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? URL.prod : URL.dev,
  headers: {
    common: {
      // Authorization: `Bearer ${token}`,
      // 'x-userid': xUserId
    }
  }
})

export default instance