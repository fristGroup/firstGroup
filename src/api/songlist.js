import request from "@/utils/request";

// 示例
export default {
  //获取分类标题栏数据
  getsongList: () => {
    return request.get("/playlist/catlist");
  },
  // 获取对应风格的音乐数据
  getsongListContent: (cat, limit, offset) => {
    return request.get(
      `/top/playlist/?cat=${cat}&limit=${limit}&offset=${offset}`
    );
  },
  // 获取歌单详情
  getsongdetails: (id) => {
    return request.get(`/playlist/detail/?id=${id}`);
  },
  getrelatedlist: (id) => {
    return request.get(`/related/playlist/?id=${id}`);
  },
};
