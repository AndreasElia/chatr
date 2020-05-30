import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Rooms from '../views/rooms/Rooms.vue'
import RoomsIndex from '../views/rooms/RoomsIndex.vue'
import RoomsShow from '../views/rooms/RoomsShow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'RoomsIndex',
        component: RoomsIndex
      },
      {
        path: ':room',
        name: 'RoomsShow',
        component: RoomsShow,
        props: true
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.isConnected) {
    next('/')
  } else {
    next()
  }
})

export default router
