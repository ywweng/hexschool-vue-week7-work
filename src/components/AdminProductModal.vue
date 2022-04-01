<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
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
            <div class="col-sm-4">
              <div class="form-group mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  v-model="initProduct.imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                />
                <img class="img-fluid" :src="initProduct.imageUrl" />
              </div>
              <div v-if="Array.isArray(initProduct.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, key) in initProduct.imagesUrl"
                  :key="key"
                >
                  <div class="form-group">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input
                      v-model="initProduct.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="
                    initProduct.imagesUrl.length <= 5 &&
                    (!initProduct.imagesUrl.length ||
                      initProduct.imagesUrl[initProduct.imagesUrl.length - 1])
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="initProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="initProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="initProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row mb-3">
                <div class="form-group col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="initProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="initProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="form-group col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    v-model.number="initProduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model.number="initProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  v-model="initProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  v-model="initProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="initProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
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
            @click="updateProduct"
            v-if="isNew"
            :disabled="isProcessing"
          >
            新增
          </button>
          <button
            type="button"
            class="btn btn-outline-main"
            @click="updateProduct"
            v-else
            :disabled="isProcessing"
          >
            確認更改
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
  name: 'AdminProductModal',
  props: ['init-product', 'is-new'],
  data() {
    return {
      modal: '',
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
    async updateProduct() {
      try {
        let res = ''
        this.isProcessing = true
        if (this.isNew === true) {
          res = await adminAPI.products.postProduct({
            data: this.initProduct
          })
        } else {
          res = await adminAPI.products.putProduct({
            id: this.initProduct.id,
            data: this.initProduct
          })
        }
        Toast.fire({ icon: 'success', title: res.message })
        this.isProcessing = false
        this.hideModal()
        this.$emit('after-update')
      } catch (err) {}
    },
    createImages() {
      this.initProduct.imagesUrl = []
      if (this.initProduct.imagesUrl.length === 5) return
      this.initProduct.imagesUrl.push('')
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
