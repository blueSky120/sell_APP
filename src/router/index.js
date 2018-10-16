import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/Goods'
import Seller from '@/components/seller/Seller'
import Ratings from '@/components/ratings/Ratings'
Vue.use(Router)
export default new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    redirect: {
      name: 'Goods'
    }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
  ]
})
