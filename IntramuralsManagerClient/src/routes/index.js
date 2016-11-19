import VueRouter from 'vue-router'
// import components
import Layout from '../components/Layout'
import Login from '../components/Login'
import Players from '../components/Players'

const routes = [
  { path: '/', component: Layout,
    children: [
      { path: '', redirect: { name: 'login' } },
      { name: 'login', path: 'login', component: Login },
      { name: 'players', path: 'players', component: Players }
    ]
  }
]

// Router
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
