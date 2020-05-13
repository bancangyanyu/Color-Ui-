import Vue from 'vue'
import App from './App'

import store from './store'
import api from '@/apis/request.js'
import {msg ,back} from '@/apis/util.js'
import * as filters from '@/apis/filters.js'
// import common from '@/apis/common.js'
Vue.config.productionTip = false
Vue.prototype.$msg = msg
Vue.prototype.$store = store
Vue.prototype.$back = back 
Vue.prototype.$api = api
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
}) 
// Vue.prototype.$common = common 
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
