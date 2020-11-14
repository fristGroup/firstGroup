import Vue from 'vue'
import Vuex from 'vuex'

// 引入moudules模块
import moudles from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  moudles
})
