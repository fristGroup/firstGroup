<template>
  <div class="outer">
    <Header />
    <router-view exact></router-view>
    <Footer />
    <a href="#" class="top" title="回到顶部" v-show="isTopShow"></a>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isTopShow: false,
    };
  },
  created() {
    document.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    // console.log(document.documentElement.scrollTop);
  },

  methods: {
    handleScroll() {
      // console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 100) {
        this.isTopShow = true;
      } else {
        this.isTopShow = false;
      }
    },
    to(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.outer {
  .top {
    display: block;
    position: fixed;
    left: 50%;
    margin-left: 500px;
    bottom: 160px;
    width: 49px;
    height: 44px;
    background: url("./assets/images/sprite.png") no-repeat -265px -47px;
  }
}
</style>
