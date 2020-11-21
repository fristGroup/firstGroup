<template>
  <div>
    <el-dialog
      title="手机号登录"
      :before-close="modalClose"
      width="30%"
      :visible.sync="visible"
    >
      <el-form style="width:80%;margin-left:40px">
        <el-form-item>
          <!--  -->
          <el-input
            v-model="phone"
            placeholder="请输入手机号"
            autocomplete="off"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <!--  -->
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="请输入密码"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalClose">取 消</el-button>
        <el-button type="primary" @click="tologin">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async tologin() {
      const { phone, password } = this;
      if (phone === "" || password === "") {
        this.$message.error("手机号或密码不能为空");
        return;
      }
      try {
        await this.$store.dispatch("LoginUserInfo", { phone, password });
        // this.dialogFormVisible = false;
        this.$emit("update:visible", false);
        if (this.$route.path.indexOf("/discover/beforelogin") != -1) {
          this.$router.replace("/mymusic");
        } else if (
          this.$route.path.indexOf("/discover") != -1 ||
          this.$route.path.indexOf("/") != -1
        ) {
          this.$router.replace("/");
        }
        this.phone = "";
        this.password = "";
      } catch (error) {
        this.phone = "";
        this.password = "";
        this.$message.error("手机号或密码错误");
      }
    },
    modalClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="less" reg="stylelesheet/less" scoped></style>
