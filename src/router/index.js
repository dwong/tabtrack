import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/Tab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tab,
      props: (route) => (route.query.t ? { tab: JSON.parse(route.query.t) } : {})
    }
  ]
})
