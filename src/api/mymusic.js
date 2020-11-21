import request from '@/utils/request'
export default {
  // 请求歌单评论
    getMusicComment:()=>{
      return request.get(`/comment/music?id=186016&limit=4`)
    },
    // 获取用户歌单
    getHotList:(uid)=>{
      return request.get(`/user/playlist?uid=${uid}&limit=4`)
    },
  
    // 获取歌单详情
    getListDetail:(id)=>{
      return request.get(`/playlist/detail?id=${id}`)
    },
  
    // 获取排行榜
    getTopList:()=>{
      return request.get(`/toplist`)
    },
    // 获取排行榜详情
    getAllTopDetail:(id)=>{
      return request.get(`/top/list?id=${id}`)
    }
  }