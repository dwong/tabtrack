import Vue from 'vue'
import Router from 'vue-router'
import TabCreate from '@/components/TabCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TabCreate
    }
  ]
})
