import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './utils/error-log' // error log
import request from '@/utils/request'

import * as filters from './filters' // global filters
import uploader from 'vue-simple-uploader'
import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.css';

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(uploader)
Vue.use(Vuetify);

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$delete = request.delete

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
