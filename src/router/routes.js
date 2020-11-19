//引入歌手详情页
import FindSinger from "@/views/FindSinger";
import SingerAlbum from "@/views/SingerAlbum";

export default [
  {
    name:'findSinger',
    path: "/findSinger",
    component: FindSinger,
    // 路由懒加载
    // component: () => import("../views/About.vue"),

    children: [],
  },
  {
    name:'singerAlbum',
    path: "/singerAlbum/:id",
    component: SingerAlbum,
  },
];
