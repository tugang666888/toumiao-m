import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import 'vant/lib/index.css'
import './styles/globle.less'
// 加载动态设置 REM 基准值
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')