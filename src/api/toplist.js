import request from "@/utils/request";

export default {
  getTopList: () => {
    return request.get("/toplist");
  },
  getSongList: (id) => {
    return request.get(`/top/list?id=${id}`);
  },
  getComment: (id, pageNo, cursor) => {
    return request.get(
      `/comment/new?type=0&sortType=3&id=${id}&pageNo=${pageNo}&cursor=${cursor}`
    );
    // 186016
  },
  // 登录
  getUserInfo: (phone, password) => {
    return request.post(`/login/cellphone?phone=${phone}&password=${password}`);
  },
  // 退出登录
  outLogin: () => {
    return request.get(`/login/status`);
  },
};
