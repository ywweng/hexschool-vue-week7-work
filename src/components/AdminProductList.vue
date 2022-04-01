<template>
  <div>
    <div class="list m-3 p-3">
      <h5>產品管理</h5>
      <Loading :active="isLoading" loader="dots" />
      <div class="my-3 text-end">
        <button class="btn-main px-3 py-2" @click="openModal('new')">
          建立新產品
        </button>
      </div>
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th width="100">
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    分類
                  </a>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li v-for="(category, index) in categories" :key="index">
                      <a
                        class="dropdown-item"
                        @click="getProducts(1, category)"
                        >{{ category }}</a
                      >
                    </li>
                  </ul>
                </div>
              </th>
              <th width="150">產品名稱</th>
              <th width="100">原價</th>
              <th width="100">售價</th>
              <th width="100">是否啟用</th>
              <th width="200">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr class="align-middle" v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>
                {{ item.origin_price }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-main btn-sm me-3"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', item)"
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
    <AdminProductModal
      ref="AdminProductModal"
      :init-product="tempProduct"
      :is-new="isNew"
      @after-update="getProducts"
    />
    <Pagination
      class="d-flex justify-content-center"
      :pages="pagination"
      @emit-page="getProducts"
    />
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import Pagination from './../components/PaginationComp.vue'
import AdminProductModal from './../components/AdminProductModal.vue'
import { confirmAlert } from './../utils/helper'

export default {
  name: 'AdminProductList',
  components: {
    Pagination,
    AdminProductModal
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      isLoading: false,
      categories: []
    }
  },
  methods: {
    async getProducts(page = 1, category = '') {
      try {
        this.isLoading = true
        if (category === '全部') {
          category = ''
        }
        const { products, pagination } = await adminAPI.products.getProducts(
          page,
          category
        )
        this.products = products
        this.pagination = pagination
        this.isLoading = false
      } catch (err) {}
    },
    async deleteProduct(id) {
      try {
        this.isLoading = true
        const res = await adminAPI.products.deleteProduct(id)
        this.isLoading = false
        this.$swal.fire({
          title: `${res.message}`,
          icon: 'success'
        })
        this.getProducts()
      } catch (err) {}
    },
    openModal(status, product) {
      if (status === 'new') {
        this.isNew = true
        this.tempProduct = { imagesUrl: [] }
        this.$refs.AdminProductModal.openModal()
      } else if (status === 'edit') {
        this.isNew = false
        this.tempProduct = { ...product }
        this.$refs.AdminProductModal.openModal()
      } else if (status === 'delete') {
        this.isNew = false
        confirmAlert
          .fire({
            title: `確定刪除 ${product.title} ？`
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.deleteProduct(product.id)
            }
          })
      }
    },
    async getCategory() {
      try {
        const { products } = await adminAPI.products.getProductsAll()
        const categories = Object.values(products).map(
          (product) => product.category
        )
        const result = ['全部', ...new Set(categories)]
        this.categories = result
      } catch (err) {}
    }
  },
  created() {
    this.getProducts()
    this.getCategory()
  }
}
</script>
