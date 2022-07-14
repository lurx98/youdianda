import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'



Vue.use(Vuex)
const TOKEN_KEY = 'USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY) || '',
    baseUrl: 'http://122.51.249.55:8060/',
    listInfo: {},
  },
  getters: {
    token: state => state.user
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY, data)
    },
    setIndex(state, data) {
      state.listInfo = data
    },


  },
  actions: {
  },
  modules: {
  }
})
