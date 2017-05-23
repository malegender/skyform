import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'

Vue.use(Router)

export default document.router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
