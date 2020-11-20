import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

// 重新修改路由器对象中的push方法和replace方法
const pushOrigin = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, onComplete = () => {}, onAbort) {
  return pushOrigin.call(this, location, onComplete, onAbort);
};
const replaceOrigin = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (
  location,
  onComplete,
  onAbort = () => {}
) {
  return replaceOrigin.call(this, location, onComplete, onAbort);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
