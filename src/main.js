import Vue from "vue";
import App from "./App.vue";
// import Vuex from "vuex";
// Vue.use(Vuex);
//引入UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
//引入axios
import axios from "axios"; //导入axios
Vue.prototype.$axios = axios; //修改原始数据
//引入字体图标样式
import "../public/fonts/iconfont.css";

import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 引入所有api
import * as API from "@/api";

// 将所有api接口挂载到vue原型上
Vue.prototype.$API = API;

// 引入懒加载插件
import VueLazyload from "vue-lazyload";
// 注册懒加载
import loading from "./assets/images/la.png";
Vue.use(VueLazyload, {
  loading,
});

//引入公共组件
import Footer from "@/components/Footer";
import Header from "@/components/Header";
//设置为全局公共组件
Vue.component("Footer", Footer);
Vue.component("Header", Header);

new Vue({
  // 数据初始化之前
  beforeCreate() {
    // 事件总线的方式
    Vue.prototype.$bus = new Vue();
  },
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
