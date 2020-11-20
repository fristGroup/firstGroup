// import Home from "../views/Home";
import MyMusic from "../views/MyMusic";
import DownLoad from "../views/DownLoad";
import Musician from "../views/Musician";
import Friend from "../views/Friend";
import Shopping from "../views/Shopping";
import TopList from "../views/TopList";
import Search from "../views/Search";
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
    // meta: {
    //   isHideLine: false,
    // },
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
    path: "/music",
    name: "Music",
    // 路由懒加载
    component: () => import("@/views/Music"),
  },
  {
    //?表是参数可传可不传
    path: "/search/:keyword?",
    component: Search,
    name: "search",
  },
];
