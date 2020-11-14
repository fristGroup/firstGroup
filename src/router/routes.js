import Home from "../views/Home.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // 路由懒加载
    component: () => import("../views/About.vue"),
  },
  {
    path: "/rank",
    name: "Rank",
    component: () => import("../views/Rank/index.vue"),
  },
];
