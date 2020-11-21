import request from "@/utils/request";

// 示例
export default {
  //页面进入默认渲染的推荐热门歌手榜单
  reqRecommendSinger() {
    return request(`/top/artists`);
  },
  //获取歌手详情
  reqSingerDetails(type, area) {
    return request(`/artist/list?type=${type}&area=${area}`);
  },
  //根据歌手的id获取对应的歌曲信息
  reqsingerObtainSong(id) {
    return request(`/artist/top/song?id=${id} `);
  },
  //根据歌手id获取专辑
  reqSingerAlbum(id) {
    return request(`/artist/album?id=${id} `);
  },
  //根基歌手id获取相关mv
  reqsingerMV(id) {
    return request(`/artist/mv?id=${id} `);
  },
  //根据歌手id获取歌手介绍
  reqsingerIntroduce(id) {
    return request(`/artist/desc?id=${id} `);
  },
  //根据歌手获取相似歌手
  reqsingerBeSimilar(id) {
    return request(`/simi/artist?id=${id} `);
  },
};
