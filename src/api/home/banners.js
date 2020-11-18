import request from "@/utils/request";

export default {
  /*
  获取订单分页列表(带搜索)
  */
  getBannersList() {
    return request({
      url: "/banner",
      method: "get",
      params: {
        type: 0,
      },
    });
  },
  getNewAlbumList() {
    return request({
      url: "/album/newest",
      method: "get",
    });
  },
};
