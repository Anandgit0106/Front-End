import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomeView from '../views/HomeView.vue'
import Product from  '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import Signup from '../views/Signup.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import Success from '@/views/Success.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  
  {
    path: '/sign-up',
    name: 'SignUp',
    component: Signup
  },

  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },

  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  },

  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requireLogin: true
    }
  },

  {
    path:'/:category_slug/:product_slug',
    name: 'Product',
    component: Product
  },
  {
    path:'/:category_slug',
    name: 'Category',
    component: Category
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next({ name: 'LogIn',query: {to: to.path}});
  }else{
    next()
  }
})

export default router
