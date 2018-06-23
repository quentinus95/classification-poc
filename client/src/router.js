import Vue from 'vue'
import VueRouter from 'vue-router'
import PageHome from '../components/PageHome'
import PageLogin from '../components/PageLogin'
import store from './store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome
    },
    {
      path: '/login',
      name: 'login',
      component: PageLogin
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.user && to.name !== 'login') {
    return next({ name: 'login' })
  }

  return next()
})

export default router
