import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
//重写
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
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
