<template>
  <div class="container">
    <Loading :active="isLoading" loader="dots" />
    <div class="row justify-content-center pt-5">
      <h2 class="mb-5">後台登入</h2>
      <VForm ref="form" class="col-md-6" v-slot="{ errors }">
        <div class="form-floating mb-3">
          <VField
            name="email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="user.username"
            :class="{ 'is-invalid': errors['email'] }"
            rules="email|required"
          />
          <ErrorMessage name="email" class="invalid-feedback" />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <VField
            name="password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="user.password"
            :class="{ 'is-invalid': errors['password'] }"
            rules="required"
          />
          <ErrorMessage name="password" class="invalid-feedback" />
          <label for="floatingPassword">Password</label>
        </div>
        <button
          type="submit"
          class="btn btn-main w-100 my-4"
          @click.prevent="login"
        >
          登入
        </button>
      </VForm>
      <div><router-link to="/">回首頁</router-link></div>
    </div>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'

export default {
  name: 'AdminLogin',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true
        if (!this.user.username || !this.user.password) {
          this.$swal.fire({
            icon: 'error',
            title: '帳號或密碼不可空白'
          })
          this.isLoading = false
          return
        }
        const data = await adminAPI.login(this.user)
        const { token, expired } = data
        this.isLoading = false
        document.cookie = `hexToken=${token}; expired=${new Date(expired)}`
        this.$refs.form.resetForm()
        this.$router.push('/admin')
      } catch (error) {
        this.$refs.form.resetForm()
        this.isLoading = false
      }
    }
  }
}
</script>
