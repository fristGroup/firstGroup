import request from "@/utils/request";

export default {
  /*
  获取订单分页列表(带搜索)
  */
  getHotRecommendList() {
    return request({
      url: "/personalized",
      method: "get",
      params: {
        limit: 8,
      },
    });
  },
  getHotRecommendNav(){
    return request({
      url: "/playlist/hot",
      method: "get",
    });
  }
};
