// import Home from "../views/Home";
import MyMusic from "../views/MyMusic";
import DownLoad from "../views/DownLoad";
import Musician from "../views/Musician";
import Friend from "../views/Friend";
import Shopping from "../views/Shopping";
import TopList from "../views/TopList";
import Search from "../views/Search";
//引入歌手详情页
import FindSinger from "@/views/FindSinger";
import SingerAlbum from "@/views/SingerAlbum";
//歌单详情
import SongList from "../views/SongList";
import SongContentList from "../views/SongContentList";
import store from "../store";
export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
    meta: {
      isHideLine: true,
    },
  },
  {
    path: "/discover",
    name: "Home",
    // component: Home,
    component: () => import("../views/Home"),
    meta: {
      isHideLine: true,
    },
    // children: [
    //   {
    //     path: '/discover/toplist',
    //     component: TopList
    //   },
    // ]
  },
  {
    path: "/discover/toplist/:id?",
    component: TopList,
    name: "topList",
    meta: {
      isHideLine: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // 路由懒加载
    component: () => import("../views/About.vue"),
  },
  {
    path: "/mymusic",
    name: "MyMusic",
    component: MyMusic,
    meta: {
      isHideFooter: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.userInfo.code) {
        next();
      } else {
        next("/discover/beforelogin");
      }
    },
  },
  {
    path: "/discover/beforelogin",
    name: "Beforelogin",
    component: () => import("@/views/BeforeLogin"),
  },
  {
    path: "/download",
    name: "DownLoad",
    component: DownLoad,
  },
  {
    path: "/musician",
    name: "Musician",
    component: Musician,
  },
  {
    path: "/shopping",
    name: "Shopping",
    component: Shopping,
  },
  {
    path: "/friend",
    name: "Friend",
    component: Friend,
  },
  {
    path: "/music/:id",
    name: "Music",
    // 路由懒加载
    component: () => import("@/views/Music"),
    meta: {
      isHideLine: true,
    },
  },
  {
    //?表是参数可传可不传
    path: "/search/:keyword?",
    component: Search,
    name: "search",
  },
  {
    name: "findSinger",
    path: "/discover/findSinger",
    component: FindSinger,
    children: [],
    meta: {
      isHideLine: true,
    },
  },
  {
    name: "singerAlbum",
    path: "/singerAlbum/:id",
    component: SingerAlbum,
    meta: {
      isHideLine: true,
    },
  },
  {
    //歌单页面
    path: "/discover/songlist",
    component: SongList,
    name: "SongList",
    meta: {
      isHideLine: true,
    },
  },
  {
    //歌单详情
    path: "/songcontentlist/:id?",
    component: SongContentList,
    name: "SongContentList",
    meta: {
      isHideLine: true,
    },
  },
];
