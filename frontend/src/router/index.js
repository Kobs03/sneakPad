import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddListingView from '../views/AddItems.vue'
import ShowProducts from '../views/ShowItems.vue'
import getProduct from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Home route

    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    // Show all products route

    {
      path: '/products',
      name: 'showProducts',
      component: ShowProducts
    },

    // Show specific product route

    {
      path: '/products/:id',
      name: 'getProduct',
      component: getProduct
    },

    // Add products route

    {
      path: '/products/addProducts',
      name: 'addProducts',
      component: AddListingView
    },

  ]
})

export default router
