import Vue from "vue";
import App from "./App.vue";
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
Vue.use(VueLazyload, {
  loading: require("./assets/timg.gif"),
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
