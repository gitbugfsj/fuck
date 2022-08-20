// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import './assets/stylesheet/base.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios // 设置http全局标量，之后就可以以this.$http的形式访问了
axios.defaults.baseURL = '/api'

// 响应拦截器，状态码对应跳转页面 TODO ?未知跳转是否有效
axios.interceptors.response.use(
  response => {
    const code = response.status
    switch (code) {
      case 200:
        return response
      case 404:
        this.$router.push('/404')
        break
      case 403:
        this.$router.push('/403')
        break
      case 405:
        this.$router.push('/405')
        break
      case 400:
        this.$router.push('/400')
        break
      default:
        this.$router.push('/')
    }
  },
  error => {
    console.log('axios中response报错', error)
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
