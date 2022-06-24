import httpAPI from '@/libs/axios'
import { fetchData } from '@/helpers/axios'

const ENDPOINT = '/users'

// Variable inicial de la biblioteca
export const stateInitialBibliotec = {
  id: 0,
  name: '',
  company: {
    catchPhrase: ''
  },
  username: '',
  website: ''
}

/**
 * Función para Obtener listas de las bibliotecas de la API
 * 
 * @param serverParams object
 * @param headers object
 * @param abortController AbortController
 *
 * @return object
*/
export const getAllBibliotecs = async (serverParams = {}, headers = {}, abortController = null) => {

  // Realizar la petición
  const resp = await fetchData(httpAPI, ENDPOINT, serverParams, 'GET', headers, abortController)

  // Retornar respuesta
  return resp

}

/**
 * Función para registrar una biblioteca
 * 
 * @param id string|number
 * @param abortController AbortController
 *
 * @return object
 */
export const getBibliotecById = async (id, abortController = null) => {

  // Realizar la petición
  const resp = await fetchData(httpAPI, `${ENDPOINT}/${id}`, {}, 'GET', {}, abortController)

  // Retornar respuesta
  return resp

}

  
/**
 * Función para registrar una biblioteca
 * 
 * @param data object
 * @param abortController AbortController
 *
 * @return object
 */
 export const postBibliotec = async (data = {}, abortController = null) => {

  // Realizar la petición
  const resp = await fetchData(httpAPI, ENDPOINT, {}, 'POST', {}, abortController, data)

  // Retornar respuesta
  return resp

}

/**
 * Función para actualizar una biblioteca
 * 
 * @param id string|number
 * @param data object
 * @param abortController AbortController
 *
 * @return object
 */
 export const putBibliotec = async (id, data, abortController = null) => {

  // Realizar la petición
  const resp = await fetchData(httpAPI, `${ENDPOINT}/${id}`, {}, 'PUT', {}, abortController, data)

  // Retornar respuesta
  return resp

}

/**
 * Función para eliminar una biblioteca
 * 
 * @param id string|number
 * @param abortController AbortController
 *
 * @return object
 */
 export const deleteBibliotec = async (id, abortController = null) => {

  // Realizar la petición
  const resp = await fetchData(httpAPI, `${ENDPOINT}/${id}`, {}, 'DELETE', {}, abortController)

  // Retornar respuesta
  return resp

}
