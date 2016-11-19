// Import Vue modules
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './routes'
import store from './store'
// Load in Vue modules
Vue.use(VueRouter)
Vue.use(VueResource)

// App starting point
new Vue({
  router,
  store,
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
