import axios from 'axios'
import { message } from 'ant-design-vue'

const ContentType = {
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json',
  formData: 'multipart/form-data'
}

const baseURL = "http://localhost:8000/"

// const baseURL = "https://mt-whiteboard.azurewebsites.net/"

const axiosInstance = axios.create({
  baseURL,
  timeout: 3600 * 1000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = ContentType[config.data instanceof FormData ? 'formData' : 'json']
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data
    } else if (res.status === 401 || res.status === 403) {
      message.error('401')
      return false
    } else if (res.status === 500) {
      message.error('500')
      return false
    } else if (res.status === 406) {
      message.error('406')
      return false
    } else {
      return false
    }
    // return res
  },
  error => {
    console.log(error)
    const msg = error.message || error
    const result = error.response
    if (result) {
      const { data } = result
      message.error(data.errorMessage)
    } else if (msg) {
      if (msg === 'Network Error') {
        message.error('Network Error')
      } else {
        message.error(msg)
      }
    }
    return false
  }
)

export default axiosInstance
