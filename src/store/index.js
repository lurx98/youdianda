import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TOKEN_KEY = 'USER'
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(TOKEN_KEY))
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
