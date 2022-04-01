<template>
  <div id="home">
    <nav class="navbar navbar-expand-lg navbar-light px-5">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Abbie Tea Co.</router-link>
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
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Abbie Tea co.
            </h5>
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
                <router-link class="nav-link" to="/products">
                  產品列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/cart"> 購物車 </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">
                  後台登入
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
export default {
  name: 'HomeView',
  components: {}
}
</script>
