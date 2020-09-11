import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './style/style.scss'
import 'material-icons'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
/***
 * 初始化axios
 * https://www.kancloud.cn/yunye/axios/234845
 */
import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/' : '/api';
axios.defaults.headers.withCredentials = true;
Vue.prototype.$axios = axios;

// import './style/test.scss'

/**
 * element
 * */
import Element from 'element-ui'
import './style/element-variables.scss'
Vue.use(Element);


Vue.config.productionTip = false;

const requireComponent = require.context(
  '../src/components/baseComponts',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 这个地方直接传入filename其实就是内部会调用了resolve方法，会返回对应的文件内容（不理解可以console一下看看）
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
