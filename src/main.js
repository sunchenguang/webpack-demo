/**
 * Created by suncg on 2018/11/20.
 */
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import './icons'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})

