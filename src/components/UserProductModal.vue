<template>
  <div
    class="modal fade"
    id="productModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{ product.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <div
                class="w-100 me-3"
                style="
                  width: 200px;
                  height: 300px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
            </div>
            <div class="col-sm-6 text-start">
              商品特色：
              <p class="text-start">{{ product.description }}</p>
              商品內容：
              <p>{{ product.content }}</p>
              <div class="h5">
                {{ product.price }} 元
                <del class="h6 ms-auto">原價 {{ product.origin_price }} 元</del>
              </div>
              <div class="input-group">
                <label for="qty">數量：</label>
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model.number="qty"
                  id="qty"
                />
              </div>
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
          <button type="button" class="btn btn-primary" @click="addToCart">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProductModal',
  props: ['product'],
  data() {
    return {
      modal: '',
      qty: 1
    }
  },
  methods: {
    openModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    addToCart() {
      if (this.qty < 0) {
        this.qty = 1
        this.$swal.fire({
          icon: 'warning',
          title: '數量不可為0，請重新選購'
        })
        return
      }
      this.$emit('after-add-cart', this.product.id, this.qty)
      this.hideModal()
    }
  },
  mounted() {
    const bootstrap = require('bootstrap')
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
