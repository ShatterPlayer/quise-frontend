import axios from 'axios'

export default axios.create({
  baseURL: 'https://quise-backend.glitch.me/',
  withCredentials: true,
})
