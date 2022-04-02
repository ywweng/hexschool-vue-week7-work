<template>
  <div>
    <div class="list m-3 p-3">
      <h5>訂單管理</h5>
      <Loading :active="isLoading" loader="dots" />
      <div class="my-3 text-end">
        <button class="btn btn-danger px-3 py-2" @click="deleteOrder('所有')">
          刪除所有訂單
        </button>
      </div>
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th width="100">成立時間</th>
              <th width="200">訂購人</th>
              <th width="150">產品總數</th>
              <th width="100">訂單總計</th>
              <th width="150">訂單備註</th>
              <th width="100">付款狀態</th>
              <th width="100">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr class="align-middle" v-for="order in orderData" :key="order.id">
              <td>{{ order.local_create_at }}</td>
              <td class="text-start">
                <p>姓名：{{ order.user.name }}</p>
                <p>Email：{{ order.user.email }}</p>
                <p>電話：{{ order.user.tel }}</p>
                <p>地址：{{ order.user.address }}</p>
              </td>
              <td>
                <p>{{ order.totalQty }}</p>
                <button
                  type="button"
                  class="btn-main dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  查看訂單明細
                </button>
                <ul class="dropdown-menu">
                  <li v-for="product in order.products" :key="product.id">
                    <span class="dropdown-item"
                      >{{ product.product.title }} {{ product.qty }}
                      {{ product.product.unit }}</span
                    >
                  </li>
                </ul>
              </td>
              <td>
                {{ order.total }}
              </td>
              <td>
                <template v-if="order.message">{{ order.message }}</template>
                <template v-else> (無) </template>
              </td>
              <td>
                <span v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-main btn-sm me-3"
                    @click="openModal(order)"
                  >
                    更新
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteOrder(order.user.name, order.id)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AdminOrderModal
      ref="OrderModal"
      :init-order="tempOrder"
      @after-update="getOrders"
    />
    <Pagination
      class="d-flex justify-content-center"
      :pages="pagination"
      @emit-page="getOrders"
    />
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import Pagination from './../components/PaginationComp.vue'
import AdminOrderModal from './../components/AdminOrderModal.vue'
import { confirmAlert } from './../utils/helper'

export default {
  name: 'AdminOrderList',
  components: {
    Pagination,
    AdminOrderModal
  },
  data() {
    return {
      orderData: [],
      pagination: {},
      isLoading: false,
      tempOrder: {}
    }
  },
  methods: {
    async getOrders(page = 1) {
      try {
        this.isLoading = true
        const { orders, pagination } = await adminAPI.orders.getOrders(page)
        const arr = Object.values(orders)
        arr.forEach((order) => {
          // 陣列加入產品總數屬性
          order.totalQty = this.calcQty(order.products)
          // 轉換時間格式
          order.local_create_at = new Date(
            order.create_at * 1000
          ).toLocaleString()
        })
        this.orderData = orders
        this.pagination = pagination
        this.isLoading = false
      } catch (err) {}
    },
    calcQty(products) {
      let totalQty = 0
      Object.values(products).forEach(
        (product) => (totalQty += Number(product.qty))
      )
      return totalQty
    },
    async deleteOrder(status, id) {
      const result = await confirmAlert.fire({
        title: `確定刪除${status}的訂單 ？`
      })
      if (result.isConfirmed) {
        let res = ''
        if (status === '所有') {
          res = await adminAPI.orders.deleteOrderAll()
        } else {
          res = await adminAPI.orders.deleteOrder(id)
        }
        await this.$swal.fire({ icon: 'success', title: res.message })
        this.getOrders()
      }
    },
    openModal(order) {
      this.tempOrder = { ...order }
      this.$refs.OrderModal.openModal()
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
