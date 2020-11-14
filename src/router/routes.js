import Home from "../views/Home.vue";
//引入歌手详情页
import FindSinger from "../views/FindSinger";

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
    path: "/findSinger",
    name: "FindSinger",
    component: FindSinger,
    // 路由懒加载
    // component: () => import("../views/About.vue"),
  },
];
