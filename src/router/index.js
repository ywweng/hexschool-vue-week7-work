import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/IndexView.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductList.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/ShoppingCart.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('../views/AdminDashboard.vue'),
    redirect: '/admin/products',
    children: [
      {
        path: 'products',
        component: () => import('../components/AdminProductList.vue')
      },
      {
        path: 'orders',
        component: () => import('../components/AdminOrderList.vue')
      },
      {
        path: 'coupon',
        component: () => import('../components/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
