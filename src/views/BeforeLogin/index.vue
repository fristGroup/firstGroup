<template>
  <div>
    <div class="container">
      <img src="../../assets/images/login1.png" alt="" />

      <div class="btn" @click="showDialog"></div>
    </div>
    <!-- <Login v-if="dialogFormVisible" :visible.sync="dialogFormVisible"></Login> -->

    <!-- <Login :dialogFormVisible="dialogFormVisible" :dialog="dialog"></Login> -->
    <Login v-if="dialogFormVisible" :visible.sync="dialogFormVisible"></Login>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BeforeLogin",

  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    showDialog() {
      this.dialogFormVisible = true;
    },
    // dialog() {
    //   if (this.dialogFormVisible) {
    //     this.dialogFormVisible = false;
    //   } else {
    //     this.dialogFormVisible = true;
    //   }
    // },
  },
};
</script>

<style lang="less" reg="stylelesheet/less" scoped>
.container {
  width: 980px;
  margin: 0 auto;
  height: 500px;
}
.btn {
  display: block;
  width: 167px;
  height: 45px;
  margin: 102px 0 0 482px;

  position: relative;
  top: -219px;
  left: 85px;
  cursor: pointer;
}
</style>
