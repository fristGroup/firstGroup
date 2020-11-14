<template>
  <div>
    <button @click="toRank">跳转排行</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    toRank() {
      this.$router.push("/rank");
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
