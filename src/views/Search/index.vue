<template>
  <div>
    <h1>Search</h1>
  </div>
</template>
<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      options: {
        keywords: "",
        type: 1,
        limit: 30,
        offest: 0,
      },
    };
  },
  mounted() {
    this.getSongsList();
  },
  computed: {
    ...mapState({
      songsList: (state) => state.search.songsList,
    }),
  },
  methods: {
    // 获取商品信息数据对象
    getSongsList() {
      this.options.keywords = this.$route.params.keywords;
      // 分发的action
      this.$store.dispatch("getSongsList", this.options);
    },
  },
};
</script>
<style lang="less" reg="stylesheet/less" scoped></style>
