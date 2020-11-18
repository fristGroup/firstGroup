import request from "@/utils/request";

export default {
  /*
  获取订单分页列表(带搜索)
  */
  getSingerList() {
    return request({
      url: "/top/artists",
      method: "get",
      params: {
        limit: 5,
        offset: 0,
      },
    });
  },
  getSingerInfo(id) {
    return request({
      url: "/artist/desc",
      method: "get",
      params: {
        id,
      },
    });
  },
};
