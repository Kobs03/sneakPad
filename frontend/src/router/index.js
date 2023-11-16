import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddListingView from '../views/AddListingView.vue'
import ShowProducts from '../views/showProducts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/products',
      name: 'showProducts',
      component: ShowProducts
    },

    {
      path: '/products/addProducts',
      name: 'addProducts',
      component: AddListingView
    },

  ]
})

export default router
