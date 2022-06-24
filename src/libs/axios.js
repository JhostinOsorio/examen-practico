import Vue from 'vue'
import axios from 'axios'

// Creación de la configuración inicial para usar axios
const httpAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-type': 'application/json',
  },
})

// Añadir al prototipo de Vue el uso de la configuracion
Vue.prototype.$httpAPI = httpAPI

export default httpAPI