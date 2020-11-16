//引入歌手详情页
import FindSinger from "../views/FindSinger";

export default [
  {
    path: "/findSinger",
    name: "FindSinger",
    component: FindSinger,
    // 路由懒加载
    // component: () => import("../views/About.vue"),
  },
];
