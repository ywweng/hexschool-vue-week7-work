import Swal from 'sweetalert2'
import axios from 'axios'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export const confirmAlert = Swal.mixin({
  text: '注意：此動作無法復原',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: '取消',
  confirmButtonText: '確定刪除'
})

// base setting
const base = `${process.env.VUE_APP_API}`
const axiosInstance = axios.create({
  baseURL: base
})

// request攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// response攔截器
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status !== 200) {
      Toast.fire({
        icon: 'error',
        title: err.response.data.message
      })
    }
    return Promise.reject(err)
  }
)

export const apiHelper = axiosInstance
