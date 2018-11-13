import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Error404 from '../components/Error404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'Error',
      component: Error404
    }
  ]
})
