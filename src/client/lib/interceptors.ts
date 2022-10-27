import axios from 'axios'

const $authHost = axios.create({
  withCredentials: true,
})

$authHost.interceptors.request.use(
  (config) => {
    // @ts-ignore
    config.headers['Authorization'] = `${localStorage.getItem('access_token')}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export { $authHost }
