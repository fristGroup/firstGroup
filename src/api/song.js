import request from "@/utils/request";

export default {
  // 获取歌曲详情
  getMusicDetail(ids) {
    return request(`/song/detail?ids=${ids}`);
  },

  // 获取歌曲播放链接
  getMusicUrl(id) {
    return request(`/song/url?id=${id}`);
  },

  // 获取歌词
  getMusicLyric(id) {
    return request(`/lyric?id=${id}`);
  },

  // 获取歌曲热门评论
  getMusicHotComment(id) {
    return request(`/comment/music?id=${id}`);
  },

  /* 
    id : 资源 id, 如歌曲 id,mv id

    tpye: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型   

    0: 歌曲

    1: mv

    2: 歌单

    3: 专辑

    4: 电台

    5: 视频

    6: 动态

    可选参数 :

    pageNo:分页参数,第N页,默认为1

    pageSize:分页参数,每页多少条数据,默认20

    sortType: 排序方式,1:按推荐排序,2:按热度排序,3:按时间排序

    cursor: 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time

  */
  // 获取评论
  getComments(params) {
    return request({
      method: "GET",
      url: "/comment/new",
      params,
    });
  },

  // 获取歌单详情
  getMusicListDetail(id) {
    return request(`/playlist/detail?id=${id}`);
  },
};
