<template>
  <div class="row row-cols-auto mx-auto">
    <Loading :active="isLoading" loader="dots" />
    <h2 class="col-12">產品列表</h2>
    <div
      class="col-6 col-sm-4 col-md-3"
      v-for="product in products"
      :key="product.id"
    >
      <div class="card my-2" style="border: none">
        <img
          :src="product.imageUrl"
          class="card-img-top"
          style="height: 15rem; object-fit: cover"
        />
        <div class="card-body">
          <h5 class="card-title">
            {{ product.title }}
          </h5>
          <div class="card-text">
            特價
            <strong class="text-danger">$ {{ product.price }} </strong> ／
            <s>$ {{ product.origin_price }}</s>
            <p class="text-secondary ms-auto">{{ product.content }}</p>
          </div>
          <div class="d-flex justify-content-evenly">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="openProductModal(product.id)"
            >
              More
            </button>
            <button
              type="button"
              class="btn btn-main"
              @click="addToCart(product.id, 1)"
            >
              ＋
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserProductModal
      ref="UserProductModal"
      :product="product"
      @after-add-cart="addToCart"
    />
    <template v-if="products.length === 0">
      <h5 class="col-12 mt-5">暫不供應</h5>
    </template>
  </div>
</template>

<script>
import UserProductModal from './../components/UserProductModal.vue'

const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`

export default {
  name: 'ProductList',
  components: {
    UserProductModal
  },
  data() {
    return {
      isLoading: false,
      products: {},
      product: {}
    }
  },
  methods: {
    async getProducts() {
      try {
        this.isLoading = true
        const res = await this.$http.get(`${apiUrl}/products`)
        this.products = res.data.products
        this.isLoading = false
      } catch (err) {
        throw new Error(err.message)
      }
    },
    async openProductModal(id) {
      try {
        this.isLoading = true
        const res = await this.$http.get(`${apiUrl}/product/${id}`)
        this.product = res.data.product
        this.$refs.UserProductModal.openModal()
        this.isLoading = false
      } catch (err) {
        throw new Error(err.message)
      }
    },
    async addToCart(id, qty) {
      try {
        if (qty <= 0) {
          this.$swal.fire({
            icon: 'warning',
            title: '數量不可少於1，請重新選購'
          })
          return
        }
        this.isLoading = true
        const data = {
          product_id: id,
          qty
        }
        const res = await this.$http.post(`${apiUrl}/cart`, { data })
        this.isLoading = false
        this.$swal.fire({
          icon: 'success',
          title: res.data.message
        })
      } catch (err) {
        throw new Error(err.message)
      }
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
