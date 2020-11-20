import { getUserInfo } from "../../api/login";
export default {
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo_key") || "{}"),
  },
  mutations: {
    REVICE_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 清空用户数据
    RESET_USERINFO(state) {
      state.userInfo = {};
      localStorage.removeItem("userInfo_key");
    },
  },
  actions: {
    //获取用户的信息
    async LoginUserInfo({ commit }, { phone, password }) {
      const result = await getUserInfo(phone, password);

      if (result.code === 200) {
        const userInfo = result;
        localStorage.setItem("userInfo_key", JSON.stringify(userInfo));
        commit("REVICE_USERINFO", userInfo);
      } else {
        throw new Error("登录失败");
      }
    },
    // 退出登录
    async logout({ commit }) {
      commit("RESET_USERINFO");
    },
  },
  getters: {
    profile(state) {
      return state.userInfo.profile || {};
    },
  },
};
