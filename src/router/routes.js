import Home from '../views/Home.vue'
import MyMusic from '../views/MyMusic'
export default [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // 路由懒加载
  //   component: () => import('../views/About.vue')
  // }
    {
    path: '/mymusic',
    name: 'MyMusic',
    component: MyMusic
  },
 ]
