// 引入api 
import play from '@/api/song'

export default {
  state: {
    songId: 26217171, // 当前播放的歌曲id
    isPlaying: false,  // 当前播放状态
    playList: [], // 播放列表，存放歌曲数据
  },
  mutations: {
    // 
    RECEIVE_MUSIC_DETAIL (state, detail) {
      state.musicDetail = detail
      // 修改网页标题
      document.title = detail.songName
    },

    // 更改播放状态 
    RECEIVE_IS_PLAYING (state) {
      state.isPlaying = !state.isPlaying
    },

    // 添加歌单到播放列表
    RECEIVE_PLAY_LIST (state, musicList) {
      // 已经存在的歌曲不再添加到播放列表
      state.playList = state.playList.concat(musicList.filter(item => !state.playList.includes(item)))
    },

    // 添加某首歌曲到播放列表
    ADD_MUSIC_OF_PLAY_LIST (state, musicDetail) {
      // 如果歌曲已经存在，则不继续添加
      if (state.playList.findIndex(item => item.id === musicDetail.id) !== -1) return
      state.playList.push(musicDetail)
    },

    // 替换播放列表
    REPLACE_PLAY_LIST (state, musicList) {
      state.playList = musicList
    },

    // 从播放列表删除某首歌曲
    DEL_MUSIC_FOR_PLAY_LIST (state, songId) {
      state.playList = state.playList.filter(item => item.id !== songId)
    },

    // 清空播放列表
    CLERA_PLAY_LIST (state) {
      state.playList = []
    },

    // 上一曲或下一曲
    REVISE_CURRENT_SONG (state, { songId, flag }) {
      const { playList } = state
      // 如果当前数组只有一首歌曲，则直接返回
      if (playList.length === 1) return
      let currentIndex = playList.findIndex(item => item.id === songId)

      if (flag === 'pre') {
        currentIndex = currentIndex - 1
        // 上一曲
        if (currentIndex === 0) {
          currentIndex = playList.length - 1
        }
        state.songId = playList[currentIndex].id
      }

      if (flag === 'next') {
        currentIndex = currentIndex + 1
        // 下一曲
        if (currentIndex >= playList.length - 1) {
          currentIndex = 0
        }
        state.songId = playList[currentIndex].id
      }
    },

    // 修改当前歌曲
    SET_CURRENT_SONG (state, songId) {
      state.songId = songId
    }

  },
  actions: {
    // 异步修改状态数据
    async getSongDetail ({ commit }, id) {
      const result = await play.getMusicDetail(id)
      if (result.code === 200) {
        const {
          name: songName,
          al: { name: albumName, picUrl },
          ar: [{ name: singer }]
        } = result.songs[0]
        commit("RECEIVE_MUSIC_DETAIL", {
          songName, picUrl, albumName, singer
        })
      } else {
        throw new Error(result)
      }
    },
    // 播放暂停
    setIsPlaying ({ commit }) {
      commit('RECEIVE_IS_PLAYING')
    },

    // 添加歌单到播放列表
    addMusicList ({ commit }, musicList) {
      commit('RECEIVE_PLAY_LIST', musicList)
    },

    // 替换播放列表
    replacePlayList ({ commit }, musicList) {
      commit('REPLACE_PLAY_LIST', musicList)
    },

    // 添加单首音乐到播放列表
    addSongOfPlayList ({ commit }, musicDetail) {

      commit('ADD_MUSIC_OF_PLAY_LIST', musicDetail)
    },

    // 从歌单删除某首歌曲
    delMusic ({ commit }, songId) {
      commit('DEL_MUSIC_FOR_PLAY_LIST', songId)
    },

    // 清空播放列表
    clearPlayList ({ commit }) {
      commit('CLERA_PLAY_LIST')
    },

    // 上一曲或下一曲
    nextOrPre ({ commit }, data) {
      commit('REVISE_CURRENT_SONG', data)
    },

    // 修改当前歌曲
    setCurrentSong ({ commit }, songId) {
      commit('SET_CURRENT_SONG', songId)
    }
  },
  getters: {
    // 当前播放歌曲详情
    musicDetail (state) {
      return state.playList.find(item => item.id === state.songId)
    },
    currentIndex (state) {
      return state.playList.findIndex(item => item.id === state.songId)
    }
  }
}