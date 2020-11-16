import Home from "../views/Home";
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
];
