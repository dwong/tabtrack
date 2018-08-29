import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/Tab'
import TabSummary from '@/components/TabSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tab,
      props: (route) => (route.query.t ? { tabParam: JSON.parse(route.query.t) } : {})
    },
    {
      path: '/summary',
      name: 'TabSummary',
      component: TabSummary
    }
  ]
})
