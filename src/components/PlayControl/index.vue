<template>
  <div
    :style="{ bottom: isShowControl ? '0px' : '-75px' }"
    @mouseenter="handleMouse(true)"
    @mouseleave="handleMouse(false)"
    class="play-control-container"
  >
    <div class="lock-wrap" @click="lockBar">
      <span
        :class="['lock iconfont', lock ? 'icon-lock' : 'icon-unlock']"
      ></span>
    </div>
    <div class="wrap">
      <!-- 左侧区域 -->
      <div class="play-control-left">
        <div class="cover">
          <img
            v-if="songDetail.picUrl"
            class="coverImg"
            :src="songDetail.picUrl"
            alt=""
          />
          <img
            v-else
            class="coverImg"
            :src="require('@/assets/images/lazy-bg.png')"
            alt=""
          />
        </div>
        <div class="muisc-info">
          <p class="music-title">
            {{ songDetail.songName
            }}<span class="like iconfont icon-weibiaoti-"></span>
          </p>
          <p class="singer">{{ songDetail.singer }}</p>
        </div>
      </div>

      <!-- 控制区域 -->
      <div class="play-control-middle">
        <div class="control">
          <span
            class="pre iconfont icon-shangyiqu"
            @click="preOrNext('pre')"
          ></span>
          <span
            :class="[
              'play',
              'iconfont',
              isPlaying ? 'icon-zantingtingzhi' : 'icon-bofang',
            ]"
            @click="play"
          ></span>
          <span
            class="next iconfont icon-xiayiqu"
            @click="preOrNext('next')"
          ></span>
        </div>
        <div class="progress">
          <span class="start-time">{{ startTime }}</span>
          <!-- 进度条 -->
          <div class="progress-bar" ref="progress">
            <div
              class="progress-inner"
              :style="{ width: progress }"
              ref="inner"
            ></div>
            <div class="slider" ref="slider" :style="{ left: progress }"></div>
          </div>
          <span class="end-time">{{ duration }}</span>
        </div>
      </div>

      <!-- 播放列表区域 -->
      <div class="play-control-right">
        <!-- 音量区域 -->
        <div class="volume">
          <span class="iconfont trumpet icon-yinliang3"></span>
          <ProgressBar
            :progress="volume * 100"
            width="60px"
            @changeProgress="changeProgress"
          />
        </div>
        <!-- 播放列表 -->
        <div
          class="show-play-list iconfont icon-menu"
          @click="showPlayList"
        ></div>
      </div>
    </div>
    <PlayList
      height="500px"
      :style="{ right: isShowPlayList ? '-0px' : '-511px' }"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import ProgressBar from '@/components/ProgressBar'
import PlayList from '@/components/PlayList'

export default {
  name: 'PlayControl',
  components: {
    ProgressBar,
    PlayList
  },
  data () {
    return {
      songDetail: {}, // 歌曲信息
      isShowPlayList: false, // 播放列表显示隐藏
      lock: false, // 控制栏是否锁定
      isShowControl: true, // 控制播放控制栏显示隐藏
      audio: null, // audio实例
      duration: '00:00', // 歌曲总时长
      startTime: "00:00", // 歌曲开始时间
      progress: 0, // 播放进度
      volume: 1, // 当前音量
    }
  },
  computed: {
    ...mapState({
      isPlaying: (state) => state.play.isPlaying,
      songId: (state) => state.play.songId
    })
  },
  async mounted () {
    // 当点击播放时
    this.$bus.$on('play', async (songDetail) => {
      await this.initAudio()
      if (this.songDetail !== songDetail) {
        this.songDetail = songDetail
      }
      this.play()
    })

    // 当切换歌曲时
    this.$bus.$on('switchSong', (songDetail) => {
      console.log(songDetail)
      const { al: { name: album, picUrl }, ar: [{ name: singer }], name: songName } = songDetail
      this.songDetail = {
        songName,
        picUrl,
        singer,
        album
      }
    })
  },
  methods: {
    // 播放初始化
    async initAudio () {
      // 获取播放链接
      await this.getMusicUrl()
      // 绑定audio事件监听
      this.audioAddEventListeners()
      // 绑定进度条监听事件
      this.progressBarAddListener()
      // // 控制栏显示
      this.handleMouse(false)
      // 添加到播放列表

    },

    // 获取播放链接
    async getMusicUrl () {
      try {
        const result = await this.$API.song.getMusicUrl(this.songId)
        if (this.audio) {
          this.audio.src = result.data[0].url
        } else {
          // 创建audio实例
          this.audio = new Audio(result.data[0].url)
        }

      } catch (error) {
        console.log(error)
      }
    },

    // 为audio绑定监听事件
    audioAddEventListeners () {
      // 音频开始可以播放事件
      this.audio.addEventListener('canplay', () => {
        this.duration = moment(this.audio.duration * 1000).format('mm:ss')
      })
      // 播放进度更新事件
      this.audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = this.audio
        this.startTime = moment(this.audio.currentTime * 1000).format('mm:ss')
        // 更新进度条
        this.progress = (currentTime / duration) * 100 + '%'
      })
    },

    // 进度条监听事件
    progressBarAddListener (e) {
      const { slider, progress, inner } = this.$refs
      let isClickSlider = false
      let distance = 0 // 滑块与点击坐标的绝对距离
      let progressWidth = progress.offsetWidth

      slider.onmousedown = (e) => {
        isClickSlider = true
        // 计算出滑块与点击坐标的绝对距离
        distance = e.clientX - progress.offsetLeft - slider.offsetLeft
        e.preventDefault()
      }

      document.onmousemove = (e) => {
        let curX = e.clientX - progress.offsetLeft - distance

        this.progress = (curX / progressWidth) * 100
        if (this.progress >= 100) {
          this.progress = 100
        }

        if (this.progress <= 0) {
          this.progress = 0
        }

        if (isClickSlider) {
          slider.style.left = this.progress + "%"
          inner.style.width = this.progress + '%'

          // 计算拖动的事件
          const time = this.audio.duration * (this.progress / 100)

          // 拖拽时，修改播放进度
          this.audio.currentTime = time

          // 歌词跟着跳转
          this.$bus.$emit('setProgress', this.audio.currentTime)
        }
        e.preventDefault()
      }

      document.onmouseup = (e) => {
        isClickSlider = false
        e.preventDefault()
      }

    },

    // 播放或暂停
    play () {
      if (!this.audio) return

      if (this.isPlaying) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
      this.$store.dispatch('setIsPlaying')
    },

    // 鼠标进入离开，控制栏的隐藏显示
    handleMouse (flag) {
      clearTimeout(this.timerId)
      if (this.lock) return

      if (flag) {
        // 鼠标进入则显示
        this.isShowControl = true
      } else {
        // 鼠标离开
        this.timerId = setTimeout(() => {
          this.isShowPlayList = false
          this.isShowControl = false
        }, 3000)
      }
    },

    // 锁定控制栏
    lockBar () {
      if (this.lock) {
        // 解锁
        this.lock = false
      } else {
        // 锁定
        clearTimeout(this.timerId)
        this.lock = true
        this.isShowControl = true
      }

    },

    // 音量条
    changeProgress (val) {
      this.audio.volume = val / 100
    },

    // 播放列表的展示隐藏
    showPlayList () {
      this.isShowPlayList = !this.isShowPlayList
    },

    // 上一曲或下一曲
    preOrNext (flag) {
      if (flag === 'pre') {
        // 上一曲
        this.$store.dispatch('nextOrPre', { songId: this.songId, flag: 'pre' })
      } else {
        // 下一曲
        this.$store.dispatch('nextOrPre', { songId: this.songId, flag: 'next' })
      }
    }

  },
  watch: {
    // 如果歌曲id改变，则重新初始化数据
    songId () {
      this.initAudio()
      this.play()
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.play-control-container {
  position: fixed;
  padding-top: 20px;
  transition: bottom 0.4s ease-out;
  width: 100%;
  z-index: 1000;
  .lock-wrap {
    position: absolute;
    width: 38px;
    height: 21px;
    right: 50px;
    top: 0px;
    overflow: hidden;
    cursor: pointer;
    z-index: 100;
    .lock {
      display: block;
      width: 35px;
      height: 35px;
      text-align: center;
      line-height: 22px;
      background-color: #f6f6f8;
      border-radius: 50%;
      border: 1px solid #e1e1e1;
    }
  }
  .wrap {
    height: 75px;
    background-color: #f6f6f8;
    border-top: 1px solid #e1e1e1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .play-control-left {
    display: flex;
    padding-left: 10px;
    width: 20%;
    align-items: center;
    .cover {
      margin-right: 15px;
      .coverImg {
        width: 50px;
        height: 50px;
        border-radius: 6px;
      }
    }
    .muisc-info {
      .music-title {
        color: #313132;
        .like {
          color: #ec4141;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .singer {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
  .play-control-middle {
    display: flex;
    justify-content: center;
    width: 500px;
    flex-direction: column;
    align-items: center;
    .control {
      display: flex;
      width: 200px;
      justify-content: space-around;
      align-items: center;
      span {
        cursor: pointer;
      }
      .play {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        background-color: #ebebed;
        text-align: center;
        line-height: 35px;
      }
      .play:hover {
        background-color: #ddddde;
      }
    }

    .progress {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #939395;
      .progress-bar {
        position: relative;
        height: 4px;
        width: 85%;
        background-color: #c2c2c4;
        border-radius: 3px;
        .progress-inner {
          border-radius: 3px;
          height: 4px;
          background-color: #ff4e4e;
          padding-left: 4px;
        }
        .slider {
          position: absolute;
          top: -2px;
          width: 8px;
          height: 8px;
          background-color: #ec4141;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
  .play-control-right {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .play-list {
      font-size: 26px;
      float: right;
      margin-right: 20px;
      cursor: pointer;
    }
    .show-play-list {
      font-size: 18px;
      cursor: pointer;
    }
  }
}

.volume {
  display: flex;
  align-items: center;
  margin-left: 20px;
  .trumpet {
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>
