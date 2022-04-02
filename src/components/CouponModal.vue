<template>
  <div
    class="modal fade"
    ref="modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <label for="title" class="col-sm-4 col-form-label"
              >優惠券名稱</label
            >
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="coupon.title"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="code" class="col-sm-4 col-form-label">優惠碼</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="code"
                v-model="coupon.code"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="is_enabled" class="col-sm-4 col-form-label"
              >可使用數量</label
            >
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="is_enabled"
                v-model.number="coupon.is_enabled"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="percent" class="col-sm-4 col-form-label">折扣</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="percent"
                v-model.number="coupon.percent"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="due_date" class="col-sm-4 col-form-label">到期日</label>
            <div class="col-sm-8">
              <input
                type="datetime-local"
                class="form-control"
                id="due_date"
                v-model="coupon.local_due_date"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-outline-main"
            @click="updateCoupon"
            v-if="isNew"
            :disabled="isProcessing"
          >
            新增
          </button>
          <button
            type="button"
            class="btn btn-outline-main"
            @click="updateCoupon"
            v-else
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
  name: 'CouponModal',
  props: ['init-coupon', 'is-new'],
  data() {
    return {
      modal: '',
      coupon: {},
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
    async updateCoupon(coupon) {
      try {
        let res = ''
        this.coupon.due_date = new Date(this.coupon.local_due_date).getTime()
        this.isProcessing = true
        if (this.isNew === true) {
          res = await adminAPI.coupons.postCoupon({
            data: this.coupon
          })
        } else {
          res = await adminAPI.coupons.putCoupon({
            id: this.coupon.id,
            data: this.coupon
          })
        }
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
    initCoupon() {
      this.coupon = this.initCoupon
    }
  }
}
</script>
