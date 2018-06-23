import Vue from 'vue'
import App from './components/App'
import store from './src/store'
import router from './src/router'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
