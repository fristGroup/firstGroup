import request from "@/utils/request";

export default {

  getPopularDjList() {
    return request({
      url: "/dj/toplist/popular",
      method: "get",
      params: {
        limit: 5,
      },
    });
  },
};
