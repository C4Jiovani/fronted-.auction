import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import NotificationView from '@/views/NotificationView.vue'
import Accueil from '../views/Accueil.vue'
import LiveView from '../views/LiveViews.vue'
import HistoryView from '../views/HistoryView.vue'
import Login from '@/views/Login.vue'
import HomeView from '../views/HomeView.vue'
import ForgetPass from '@/views/ForgetPass.vue'
import Dashboard from '@/views/Admin/Dashboard.vue'
import test from '@/views/test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/accueil',
    name: 'accueil',
    component: Accueil,
    children:[{
      path: '/notification',
      component: NotificationView
    },
    {
      path: '/accueil',
      component: test, meta: {requireAuth: true}
    },
    {
      path: '/live',
      name: 'live',
      component: LiveView
    },
    {
      path: '/history',
      name: 'historie',
      component: HistoryView
    },
  ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'accueille',
    component: HomeView
  },
  {
    path: '/forgetpass',
    name: 'ForgetPass',
    component: ForgetPass
  },
  {
    path: '/admin',
    name: 'ForgetPassA',
    component: Dashboard
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
