import Vue from 'vue'
import VueRouter from 'vue-router'
import PageHome from '../components/PageHome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome
    }
  ]
})

export default router
