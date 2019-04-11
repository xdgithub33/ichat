import Vue from 'vue'
import Router from 'vue-router'
import AccountRouter from './accountRouter'
import HomeRouter from './homeRouter'
Vue.use(Router)
export const routers = [...AccountRouter, ...HomeRouter]
const router = new Router({
  mode: 'history',
  routes: routers,
})

export default router
