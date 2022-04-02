import { apiHelper } from './../utils/helper'

// URL path
const adminURL = `/api/${process.env.VUE_APP_PATH}/admin`

export default {
  login(data) {
    return apiHelper.post('/admin/signin', data)
  },
  logout() {
    return apiHelper.post('/logout')
  },
  checkAdmin() {
    return apiHelper.post('/api/user/check')
  },
  products: {
    getProductsAll() {
      return apiHelper.get(`${adminURL}/products/all`)
    },
    getProducts(page, category) {
      return apiHelper.get(
        `${adminURL}/products?page=${page}&category=${category}`
      )
    },
    postProduct({ data }) {
      return apiHelper.post(`${adminURL}/product`, { data })
    },
    putProduct({ id, data }) {
      return apiHelper.put(`${adminURL}/product/${id}`, { data })
    },
    deleteProduct(id) {
      return apiHelper.delete(`${adminURL}/product/${id}`)
    }
  },
  orders: {
    getOrders(page) {
      return apiHelper.get(`${adminURL}/orders`, page)
    },
    putOrder({ id, data }) {
      return apiHelper.put(`${adminURL}/order/${id}`, { data })
    },
    deleteOrder(id) {
      return apiHelper.delete(`${adminURL}/order/${id}`)
    },
    deleteOrderAll() {
      return apiHelper.delete(`${adminURL}/orders/all`)
    }
  },
  coupons: {
    getCoupons(page) {
      return apiHelper.get(`${adminURL}/coupons`, page)
    },
    postCoupon({ data }) {
      return apiHelper.post(`${adminURL}/coupon`, { data })
    },
    putCoupon({ id, data }) {
      return apiHelper.put(`${adminURL}/coupon/${id}`, { data })
    },
    deleteCoupon(id) {
      return apiHelper.delete(`${adminURL}/coupon/${id}`)
    }
  }
}
