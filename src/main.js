import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入elementUI样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Carousel from "./components/Carousel";
// 引入字体图标样式
import "@/assets/font/iconfont.css";

// 引入swiper的样式(原因:ListContainer组件和Floor组件中都有轮播图效果,其他的组件中也有该效果,此时,优化代码,直接在main.js中引入一次)
import "swiper/css/swiper.css";
// 参数1:组件的名字,参数2:组件对象
Vue.component("Carousel", Carousel);
// 注册公共组件
import Login from "@/views/Login";
Vue.component("Login", Login);
Vue.config.productionTip = false;
//全局注册
Vue.use(ElementUI);
// 引入所有api
import * as API from "@/api";

// 将所有api接口挂载到vue原型上
Vue.prototype.$API = API;

// 引入懒加载插件
import VueLazyload from "vue-lazyload";
// 注册懒加载
Vue.use(VueLazyload, {
  loading: require("./assets/images/lazy-bg.png"),
});

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
