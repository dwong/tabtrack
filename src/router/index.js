import Vue from 'vue'
import Router from 'vue-router'
import CreateTab from '@/components/CreateTab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: CreateTab
    }
  ]
})
