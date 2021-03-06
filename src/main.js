import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './style/style.scss'
import 'material-icons'

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

// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'

// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   // '../src/components/baseComponts',
//   './components/baseComponts',
//   // 是否查询其子目录
//   false,
//   // 匹配基础组件文件名的正则表达式
//   /Base[A-Z]\w+\.(vue|js)$/
// )
// console.log(requireComponent.keys())
// requireComponent.keys().forEach(fileName => {
//   // 获取组件配置
//   const componentConfig = requireComponent(fileName)
//   // 这个地方直接传入filename其实就是内部会调用了resolve方法，会返回对应的文件内容（不理解可以console一下看看）
//   // 获取组件的 PascalCase 命名
//   const componentName = upperFirst(
//     camelCase(
//       // 获取和目录深度无关的文件名
//       fileName
//         .split('/')
//         .pop()
//         .replace(/\.\w+$/, '')
//     )
//   )

//   // 全局注册组件
//   Vue.component(
//     componentName,
//     // 如果这个组件选项是通过 `export default` 导出的，
//     // 那么就会优先使用 `.default`，
//     // 否则回退到使用模块的根。
//     componentConfig.default || componentConfig
//   )
// })
import Basebutton from './components/baseComponts/Basebutton.vue'
import Basetitle from './components/baseComponts/Basetitle.vue'
Vue.component('Basebutton', Basebutton)
Vue.component('Basetitle', Basetitle)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
