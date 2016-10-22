// Import Vue modules
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'
// Load in Vue modules
Vue.use(VueRouter)

// App starting point
new Vue({
  router,
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
