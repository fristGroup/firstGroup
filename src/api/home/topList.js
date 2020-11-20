import request from "@/utils/request";

export default {
  getTopList() {
    return request({
      url: "/toplist",
      method: "get",
    });
  },
  getTopDetailList(id) {
    return request({
      url: "/playlist/detail",
      method: "get",
      params:{
        id
      }
    });
  },
};
