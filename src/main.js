import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Rem from './utils/rem'
import VueCookies from 'vue-cookies'
import IChatHeader from './components/common/IChatHeader.vue'
import './plugins/vant.js'
import './style/index.less' //引入默认样式|自定义样式

import Store from './store'

Rem(false, 100, 1) //rem屏幕适配
//vue的原型链上挂载axios
Vue.prototype.$axios = axios
Vue.component('IChatHeader', IChatHeader)

Vue.use(VueCookies)
new Vue({
  router,
  store: Store,
  render: h => h(App),
}).$mount('#app')
