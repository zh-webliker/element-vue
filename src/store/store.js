import Vue from 'vue'
import Vuex from 'vuex'

import StorageStore from './StorageStore'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },

  //引入模组store
  modules: {
    storage: StorageStore
  }
})
