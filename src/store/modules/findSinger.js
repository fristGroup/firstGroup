//管理findSinger中所有的数据
//引入api接口函数
import { reqSingerDetails } from "@/api";
export default {
  // 包含了多个状态数据的对象
  stat: {
    //歌手分类数组
    SingerDetailsList: [],
  },
  // 包含了多个直接修改状态数据的方法的对象
  mutations: {
    //同步修改
    RECEIVE_SINGER_DETAILS_LIST(state, SingerDetailsList) {
      state.SingerDetailsList = SingerDetailsList;
    },
  },
  // 包含了多个间接修改状态数据的方法的对象
  actions: {
    //异步请求
    async reqSingerDetails({ commit }, { type, area }) {
      const result = await getSingerDetails();
      if (result.code === 200) {
        //提交mutation
        commit("RECEIVE_SINGER_DETAILS_LIST", result.data);
      }
    },
  },
  // 包含了多个状态数据的计算属性的get方法的对象
  getters: {},
};
