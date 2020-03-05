import axios from 'axios'
import { DEFAULT_API_URLS } from './enum'

const { stringify, parse } = JSON
export const parseNetworkError = error => parse(stringify(error))

const withBaseURLContext = () =>
  process.env.NODE_ENV ? DEFAULT_API_URLS[process.env.NODE_ENV.toUpperCase()] : DEFAULT_API_URLS.development

const HTTPClient = axios.create({
  baseURL: withBaseURLContext(),
  headers: {}
})

// HTTPClient.interceptors.request.use(
//   config => {
//     store.commit(SET_API_CALL_IN_PROGRESS, true)

//     const token = getStorage('token')
//     if (token) {
//       config.headers.common.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   response => Promise.reject(response)
// )

// HTTPClient.interceptors.response.use(
//   response => {
//     store.commit(SET_API_CALL_IN_PROGRESS, false)
//     return response
//   },
//   error => Promise.reject(error)
// )

export { HTTPClient }
