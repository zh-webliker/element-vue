
//vuex store 模块
//https://vuex.vuejs.org/zh/guide/modules.html

export default {

  //开启命名空间
  namespaced: true,

  //状态
  state: {
    "storageText": "请输入一些文字",
    "storageTime": 0
  },

  //set操作
  mutations: {
    setText: (state, text)=> state.storageText = text,
    setTime: (state, time)=> state.storageTime = time
  },

  //批量操作，可以执行异步
  actions: {
    setStorage(context, obj){
      context.commit('setText', obj.text);
      context.commit('setTime', obj.time);
    }
  },

  //get操作
  getters:{
    getText(state) {
      return state.storageText;
    },
    getTime(state) {
      return state.storageTime;
    },
    getNextTime(state){
      return state.storageTime + 60;
    }
  }
}
