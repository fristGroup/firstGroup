<template>
  <div>
    <Header/>
    <!-- <MyMusic/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// // 引入MyMusic组件
// import MyMusic from './views/MyMusic'
// 引入Header组件
import Header from './components/Header'
export default {
  name: 'App',
  // 注册组件
  components: {
    // MyMusic,
    Header
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
</style>
