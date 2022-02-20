import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

// Todo: auth controller, permission controller

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/user/:userId/setting',
    name: 'UserSetting',
    component: () => import('../views/UserSetting.vue')
  },
  {
    path: '/restaurant/:restaurantId', 
    name: 'Restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/group/:groupId',
    name: 'Group',
    component: () => import('../views/Group.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('../views/Groups.vue')
  },
  {
    path: '/orders',
    name: 'UserOrders',
    component: () => import('../views/UserOrders.vue')
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path:'/admin/group/:groupId',
    name:'AdminGroup',
    component: () => import('../views/AdminGroup.vue')
  },
  {
    path: '/admin/groups',
    name: 'AdminGroups',
    component: () => import('../views/AdminGroups.vue')
  },
  {
    path: '/admin/restaurant/:restaurantId',
    name: 'AdminRestaurant',
    component: () => import('../views/AdminRestaurant.vue')
  },
  {
    path: '/admin/restaurants',
    name: 'AdminRestaurants',
    component: () => import('../views/AdminRestaurants.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
