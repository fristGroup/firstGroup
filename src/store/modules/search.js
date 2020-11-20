// 管理首页中所有的数据
// 引入api接口函数
import { reqSearchResult } from "@/api/search";
export default {
  state: {
    // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1006: 歌词, 1009: 电台, 1014: 视频
    // 搜索的单曲数据数组  1
    songsList: [],
    //搜索的专辑数据数组  10
    albumsList: [],
    //搜索的歌手数据数组  100
    artList: [],
    //搜索的歌单数据数组  1000
    songPlayList: [],
    //搜索的用户数据数组  1002
    userprofilesList: [],
    //搜索的视频数据数组 1014
    videosList: [],
    //搜索的歌词数据数组  1006
    lyricsList: [],
    //搜索的电台数据数组  1009
    djRadiosList: [],
  },
  mutations: {
    // 直接更新单曲信息数据对象
    RECEIVE_SONGS_LIST(state, songsList) {
      state.songsList = songsList;
    },
    // 直接更新专辑信息数据对象
    RECEIVE_ALBUMS_LIST(state, albumsList) {
      state.albumsList = albumsList;
    },
    // 直接更新歌手信息数据对象
    RECEIVE_ART_LIST(state, artList) {
      state.artList = artList;
    },
    // 直接更新歌单信息数据对象
    RECEIVE_SONG_PLAY_LIST(state, songPlayList) {
      state.songPlayList = songPlayList;
    },
    // 直接更新用户信息数据对象
    RECEIVE_USERPROFILES_LIST(state, userprofilesList) {
      state.userprofilesList = userprofilesList;
    },
    // 直接更新视频信息数据对象
    RECEIVE_VIDEOS_LIST(state, videosList) {
      state.videosList = videosList;
    },
    // 直接更新歌词信息数据对象
    RECEIVE_LYRICS_LIST(state, lyricsList) {
      state.lyricsList = lyricsList;
    },
    // 直接更新电台信息数据对象
    RECEIVE_DJRADIOS_LIST(state, djRadiosList) {
      state.djRadiosList = djRadiosList;
    },
    //清空vuex里面的数据
    CLEAR_DATA(state) {
      state.songsList = [];
      state.albumsList = [];
      state.artList = [];
      state.songPlayList = [];
    },
  },
  actions: {
    clearData({ commit }) {
      commit("CLEAR_DATA");
    },
    //1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1006: 歌词, 1009: 电台, 1014: 视频
    // 获取单曲信息数据数组
    async getSongsList({ commit }, params) {
      // console.log(params);
      // const {keywords, type, limit, offest} = params
      // console.log(keywords, type, limit, offest);
      const result = await reqSearchResult(params);
      // console.log(result);

      if (result.code === 200) {
        commit("RECEIVE_SONGS_LIST", result.result.songs || []);
      }
    },
    // 获取专辑信息数据数组
    async getAlbumsList({ commit }, params) {
      const result = await reqSearchResult(params);
      if (result.code === 200) {
        commit("RECEIVE_ALBUMS_LIST", result.result.albums || []);
      }
    },
    // 获取歌手信息数据数组
    async getArtList({ commit }, params) {
      const result = await reqSearchResult(params);
      if (result.code === 200) {
        commit("RECEIVE_ART_LIST", result.result.artists || []);
      }
    },
    // 获取歌单信息数据数组
    async getSongPlayList({ commit }, params) {
      const result = await reqSearchResult(params);
      if (result.code === 200) {
        commit("RECEIVE_SONG_PLAY_LIST", result.result.playlists || []);
      }
    },
  },
  getters: {},
};
