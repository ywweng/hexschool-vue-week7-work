<template>
  <div
    id="orderModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            更新 {{ order.id }} 訂單
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-3">訂單成立</div>
            <div class="col-9 text-start">{{ order.local_create_at }}</div>
          </div>
          <div class="row mb-3">
            <div class="col-3">付款狀況</div>
            <div class="col-9 text-start">
              <input type="checkbox" id="checkbox" v-model="order.is_paid" />
              <label for="checkbox" v-if="order.is_paid">已付款</label>
              <label class="text-danger" for="checkbox" v-else>未付款</label>
            </div>
          </div>
          <div class="row mb-3">
            <h5>訂購人</h5>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="username" class="form-label">姓名</label>
                <input
                  id="username"
                  v-model="order.user.name"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="order.user.email"
                  type="email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group mb-3">
                <label for="tel" class="form-label">電話</label>
                <input
                  id="tel"
                  v-model="order.user.tel"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="form-group mb-3">
                <label for="address" class="form-label">住址</label>
                <input
                  id="address"
                  v-model="order.user.address"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <h5>訂單明細</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">產品內容</th>
                  <th scope="col">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in order.products" :key="product.id">
                  <td>{{ product.product.title }}</td>
                  <td>{{ product.product.content }}</td>
                  <td>
                    <input
                      id="qty"
                      v-model="product.qty"
                      type="text"
                      class="form-control col-3"
                      @blur="updateTotal(product)"
                    />
                  </td>
                  <td>{{ product.product.price }}</td>
                  <td>
                    <input
                      id="qty"
                      v-model="product.final_total"
                      type="text"
                      class="form-control col-3"
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>總計</td>
                  <td>{{ order.totalQty }}</td>
                  <td></td>
                  <td>{{ order.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row m-3">
            <label for="message" class="form-label">訂單留言</label>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              v-model="order.message"
            >
            </textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-main"
            @click="updateOrder"
            :disabled="isProcessing"
          >
            更新
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helper'

export default {
  name: 'OrderModal',
  props: ['init-order'],
  data() {
    return {
      modal: '',
      order: { products: {}, user: {} },
      isProcessing: false
    }
  },
  methods: {
    openModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    updateTotal(product) {
      product.final_total = product.qty * product.product.price
      let total = 0
      Object.values(this.order.products).map(
        (product) => (total += product.final_total)
      )
      this.order.total = total
    },
    async updateOrder() {
      try {
        this.isProcessing = true
        const res = await adminAPI.orders.putOrder({
          id: this.order.id,
          data: this.order
        })
        Toast.fire({ icon: 'success', title: res.message })
        this.isProcessing = false
        this.hideModal()
        this.$emit('after-update')
      } catch (err) {}
    }
  },
  mounted() {
    const bootstrap = require('bootstrap')
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  watch: {
    initOrder() {
      this.order = this.initOrder
    }
  }
}
</script>
