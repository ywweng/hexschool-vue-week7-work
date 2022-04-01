<template>
  <div>
    <Loading :active="isLoading" loader="dots" />
    <h2>購物車</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
          <th style="width: 150px">小計</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData">
          <tr v-for="item in cartData" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteProduct(item.id, item.product.title)"
              >
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    v-model.number="item.qty"
                    @blur="updatedCart(item.id, item.qty)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td>
              {{ item.product.price }}
            </td>
            <td>
              <div style="width: 150px" class="text-center">
                {{ item.total }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end"><strong>總計</strong></td>
          <td>
            <strong>{{ grand_total }}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`

export default {
  data() {
    return {
      cartData: {},
      grand_total: 0,
      isLoading: false
    }
  },
  methods: {
    async getCarts() {
      try {
        this.isLoading = true
        const { data } = await this.$http.get(`${apiUrl}/cart`)
        this.cartData = data.data.carts
        this.isLoading = false
      } catch (err) {
        throw new Error(err.messages)
      }
    },
    async updatedCart(id, qty) {
      try {
        this.isLoading = true
        if (qty <= 0) {
          this.$swal.fire({ icon: 'error', title: '數量不可少於1' })
          this.getCarts()
          return
        }
        const data = {
          product_id: id,
          qty
        }
        const res = await this.$http.put(`${apiUrl}/cart/${id}`, {
          data
        })
        this.$swal.fire({ icon: 'success', title: res.data.message })
        this.getCarts()
        this.isLoading = false
      } catch (err) {
        throw new Error(err.messages)
      }
    },
    async deleteProduct(id, title) {
      try {
        const answer = confirm(`確定刪除 ${title} ？`)
        if (answer) {
          this.isLoading = true
          // eslint-disable-next-line
          const res = await this.$http.delete(`${apiUrl}/cart/${id}`)
          this.getCarts()
          this.isLoading = false
        } else {
          return
        }
      } catch (err) {
        throw new Error(err.message)
      }
    },
    calcGrandTotal() {
      const price = this.cartData.map((cart) => {
        return cart.total
      })
      let total = 0
      price.forEach((price) => (total += price))
      this.grand_total = total
    }
  },
  watch: {
    cartData() {
      this.calcGrandTotal()
    }
  },
  created() {
    this.getCarts()
  }
}
</script>
