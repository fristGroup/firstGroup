import Vue from "vue";
import Vuex from "vuex";

// 引入moudules模块
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});
