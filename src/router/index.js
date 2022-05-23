import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/detail',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
  },
]

const router = new VueRouter({
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   return { top: 0 }
  // },
})

router.afterEach((to, from) => {
  // console.log('after')
  window.scrollTo(0, 0)
})

export default router
