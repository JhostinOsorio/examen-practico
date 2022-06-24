/**
 * Función para realizar peticiones
 * 
 * @param apiConfig string
 * @param url string
 * @param serverParams object
 * @param method string
 * @param headers object
 * @param abortController AbortController
 * @param body object
 *
 * @return object
 */
 export const fetchData = async (apiConfig = null, url = '', serverParams = {}, method = 'GET', headers = {}, abortController = null, body = {}
 ) => {
 
   // Crear variable para almacenar la respuesta
   const response = {
     success: true,
     data: null,
     error: null,
   }
 
   // Crear configuracion para las peticiones
   const config = {
     headers: {
       'Content-Type': 'application/json',
       ...headers,
     },
     signal: abortController?.signal,
   }
 
   try {
 
     if (method === 'GET') {
       
       // Petición GET
 
       const resp = await apiConfig.get(url, {
         ...config,
         params: serverParams,
       })
 
       // Verificar si el estado es 200
       if (resp.status === 200) {
         response.data = resp.data
       } else {
         throw new Error(`Ocurrio un error en el servidor... (${ resp.status })`)
       }
       
     } else if (method === 'POST') {
 
       // Petición POST
       
       const resp = await apiConfig.post(url, body, config)
       
       // Verificar si el estado es 200 o 201
       if (resp.status === 200 || resp.status === 201) {
         response.data = resp.data
       } else {
         throw new Error(`Ocurrio un error en el servidor... (${ resp.status })`)
       }
 
     } else if (method === 'PUT') {
 
       // Petición PUT
 
       const resp = await apiConfig.put(url, body, config)
 
       // Verificar si el estado es 200
       if (resp.status === 200) {
         response.data = resp.data
       } else {
         throw new Error(`Ocurrio un error en el servidor... (${ resp.status })`)
       }
 
     } else if (method === 'DELETE') {
 
       // Petición DELETE
 
       const resp = await apiConfig.delete(url, config)
 
       // Verificar si el estado es 200
       if (resp.status === 200) {
         response.data = resp.data
       } else {
         throw new Error(`Ocurrio un error en el servidor... (${ resp.status })`)
       }
 
     }
 
   } catch (error) {
 
     // Capturar Errores
 
     if (abortController?.signal?.aborted) {
 
       // La petición ha sido cancelada (Abortada)
       response.success = false
       response.data = null,
       response.error = null
 
     } else if (error?.response?.status === 401) {
 
       response.success = false
       response.data = null
       response.error = null
 
     } else if (error?.response?.status === 400) {
 
       response.success = false
       response.data = null
       response.error = error?.response?.data?.errors || 'Ocurrio un error en el servidor... (400)'
 
     } else if (error?.response?.status === 404) {
       response.success = false
       response.data = null
       response.error = 'Ocurrio un error en el servidor... (404)'
 
     } else {
 
       response.success = false
       response.data = null
       response.error = error?.response || error?.message || 'Ocurrio un error en el servidor...'
 
     }
 
   }
 
   // Retornar respuesta
   return response
 
 }
