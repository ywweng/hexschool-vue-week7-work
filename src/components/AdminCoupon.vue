<template>
  <div class="list m-3 p-3">
    <h5>優惠券管理</h5>
    <Loading :active="isLoading" loader="dots" />
    <div class="my-3 text-end">
      <button class="btn btn-main px-3 py-2" @click="openModal('new')">
        新增優惠券
      </button>
    </div>
    <div class="table-responsive-sm">
      <table class="table table-hover">
        <thead>
          <tr>
            <th width="150">優惠券名稱</th>
            <th width="150">優惠碼</th>
            <th width="150">可使用數量</th>
            <th width="150">折扣</th>
            <th width="200">到期日</th>
            <th width="200">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr class="align-middle" v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.is_enabled }}</td>
            <td>{{ coupon.percent }}</td>
            <td>{{ coupon.local_due_date }}</td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-main btn-sm me-3"
                  @click="openModal('edit', coupon)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCoupon(coupon.title, coupon.id)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CouponModal
      ref="couponModal"
      @after-update="getCoupons"
      :init-coupon="coupon"
      :is-new="isNew"
    />
    <Pagination
      class="d-flex justify-content-center"
      :pages="pagination"
      @emit-page="getCoupons"
    />
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import Pagination from './../components/PaginationComp.vue'
import CouponModal from './../components/CouponModal.vue'
import { confirmAlert } from './../utils/helper'

export default {
  name: 'AdminCoupon',
  components: {
    Pagination,
    CouponModal
  },
  data() {
    return {
      isLoading: false,
      coupons: [],
      pagination: {},
      coupon: {},
      isNew: false
    }
  },
  methods: {
    async getCoupons(page = 1) {
      try {
        this.isLoading = true
        const { coupons, pagination } = await adminAPI.coupons.getCoupons()
        const arr = Object.values(coupons)
        arr.forEach(
          (coupon) =>
            (coupon.local_due_date = new Date(coupon.due_date).toLocaleString())
        )
        this.coupons = coupons
        this.pagination = pagination
        this.isLoading = false
      } catch (err) {}
    },
    async deleteCoupon(title, id) {
      try {
        const result = await confirmAlert.fire({
          title: `確定刪除${title}優惠券 ？`
        })
        if (result.isConfirmed) {
          this.isLoading = true
          const res = await adminAPI.coupons.deleteCoupon(id)
          this.isLoading = false
          this.$swal.fire({
            title: `${res.message}`,
            icon: 'success'
          })
          this.getCoupons()
        }
      } catch (err) {}
    },
    openModal(status, coupon) {
      if (status === 'new') {
        this.coupon = {}
        this.isNew = true
      } else if (status === 'edit') {
        this.coupon = coupon
        this.isNew = false
      }
      this.$refs.couponModal.openModal()
    }
  },
  created() {
    this.getCoupons()
  }
}
</script>
