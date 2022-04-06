
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'

uni.$http = $http
$http.baseUrl = 'https://api-ugo-web.itheima.net/api/public/v1'
$http.beforeRequest = function (option) {
  uni.showLoading({
    title: '数据加载中...'
  })
}
$http.afterRequest = function(option) {
  if(option.data.meta.status !== 200) {
    uni.showToast({
      title: '数据请求失败！',
      duration: 1500,
      icon: 'none'
    })
  }
  uni.hideLoading()
}
Vue.config.productionTip = true

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif