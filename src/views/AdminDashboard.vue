<template>
  <div id="dashboard">
    <nav class="navbar navbar-expand-lg navbar-light px-5">
      <div class="container-fluid">
        <div class="navbar-brand"><h2>後台</h2></div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">後台</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link
                  class="nav-link fs-6 fw-bolder"
                  to="/admin/products"
                  @click.prevent="closeNav"
                >
                  產品管理
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link fs-6 fw-bolder"
                  to="/admin/orders"
                  @click.prevent="closeNav"
                >
                  訂單管理
                </router-link>
              </li>
              <li class="nav-item fs-6 fw-bolder">
                <router-link
                  class="nav-link"
                  to="/admin/coupon"
                  @click.prevent="closeNav"
                >
                  優惠券管理
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-6 fw-bolder" to="/login" @click="logout">
                  登出
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'

export default {
  methods: {
    closeNav() {
      const menuToggle = document.getElementById('offcanvasNavbar')
      const backdrop = document.querySelector('.offcanvas-backdrop')
      if (menuToggle.classList.contains('show')) {
        menuToggle.classList.remove('show')
        backdrop.classList.remove('show')
      }
    },
    async checkAdmin() {
      try {
        // eslint-disable-next-line
        const res = await adminAPI.checkAdmin()
      } catch (err) {
        this.$router.push('/login')
      }
    },
    async logout() {
      try {
        const res = await adminAPI.logout()
        document.cookie = 'hexToken=;expires=;'
        this.$router.push('/login')
        this.$swal.fire({
          icon: 'success',
          title: res.message
        })
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: '登出失敗'
        })
      }
    }
  },
  mounted() {
    this.checkAdmin()
  }
}
</script>
