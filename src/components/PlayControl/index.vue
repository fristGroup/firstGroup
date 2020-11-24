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
          <router-link :to="`/music/${songId}`">
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
          </router-link>
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
          <ProgressBar
            @changeProgress="changeProgress"
            :progress="progress"
            :width="'85%'"
          />
          <span class="end-time">{{ duration }}</span>
        </div>
      </div>

      <!-- 播放列表区域 -->
      <div class="play-control-right">
        <span
          :class="`iconfont order ${orderClass}`"
          @click="switchOrder"
        ></span>
        <!-- 音量区域 -->
        <div class="volume">
          <span class="iconfont trumpet icon-yinliang3"></span>
          <ProgressBar
            :progress="volume * 100"
            width="60px"
            @changeProgress="changeProgressOfVol"
          />
        </div>
        <!-- 播放列表 -->
        <div
          class="show-play-list iconfont icon-bofangliebiao5"
          @click="showPlayList"
        ></div>
      </div>
    </div>
    <PlayList
      height="500px"
      :style="{ right: isShowPlayList ? '-0px' : '-511px' }"
    />
    <span class="tips" v-show="visible">{{ tips }}</span>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import ProgressBar from '@/components/ProgressBar'
import PlayList from '@/components/PlayList'
import swiper from 'swiper'

export default {
  name: 'PlayControl',
  components: {
    ProgressBar,
    PlayList
  },
  data () {
    return {
      order: 1, // 播放顺序
      orderClass: 'icon-ziyuan', // 改变播放顺序图标
      tips: '', // 弹框提示文字 
      visible: false,
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
      isShowMusicPage: (state) => state.play.isShowMusicPage,
      isPlaying: (state) => state.play.isPlaying,
      songId: (state) => state.play.songId
    }),
    ...mapGetters(['songDetail'])
  },
  async mounted () {
    this.handleMouse(false)

    // 当点击播放时
    this.$bus.$on('play', async () => {
      console.log('con:play')
      // 初始化音频
      await this.initAudio()
    })

    // 当添加到播放列表时
    this.$bus.$on('isAddOnList', () => {
      this.showTips('已添加到播放列表')
      // 控制栏显示
      this.handleMouse(true)
      this.handleMouse(false)
    })
  },
  methods: {
    // 播放初始化
    async initAudio () {
      // 获取播放链接
      await this.getMusicUrl()
      // 绑定audio事件监听
      this.audioAddEventListeners()
      // 控制栏显示
      this.handleMouse(true)
      this.handleMouse(false)
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
        // 如果当前已加载完毕，表示此时可以播放
        this.audio.play()
        this.$store.dispatch('setIsPlaying', true)
        this.showTips('已开始播放')
      })
      // 播放进度更新事件
      this.audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = this.audio
        this.startTime = moment(this.audio.currentTime * 1000).format('mm:ss')
        // 更新进度条
        this.progress = (currentTime / duration) * 100

        if (this.isShowMusicPage) {
          // 歌词跟着跳转
          this.$bus.$emit('setProgress', this.audio.currentTime)
        }

      })

      // 歌曲播放完毕
      this.audio.addEventListener('ended', () => {
        if (this.order === 2) {
          // 如果是单曲循环
          return this.initAudio()
        }
        // 如果歌曲播放完毕，则自动下一曲
        this.$store.dispatch('nextOrPre', { songId: this.songId, flag: 'pre', order: this.order })

      })
    },

    // 播放或暂停
    play () {
      if (!this.audio) return

      if (this.isPlaying) {
        this.audio.pause()
        this.$store.dispatch('setIsPlaying', false)
      } else {
        this.audio.play()
        this.$store.dispatch('setIsPlaying', true)
      }

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

    showTips (text) {
      this.tips = text
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 2000)
    },

    // 音量条
    changeProgressOfVol (val) {
      this.audio.volume = val / 100
    },

    // 播放进度条
    changeProgress (val) {
      this.progress = val
      // 计算拖动的事件
      const time = this.audio.duration * (this.progress / 100)
      // 拖拽时，修改播放进度
      this.audio.currentTime = time
    },

    // 播放列表的展示隐藏
    showPlayList () {
      this.isShowPlayList = !this.isShowPlayList
    },

    // 上一曲或下一曲
    preOrNext (flag) {
      if (flag === 'pre') {
        // 上一曲
        this.$store.dispatch('nextOrPre', { songId: this.songId, flag: 'pre', order: this.order })
      } else {
        // 下一曲
        this.$store.dispatch('nextOrPre', { songId: this.songId, flag: 'next', order: this.order })
      }
    },

    // 切换顺序
    switchOrder () {
      this.order = ++this.order

      if (this.order > 3) {
        this.order = 1
      }

      switch (this.order) {
        case 1: this.orderClass = 'icon-ziyuan'
          break
        case 2: this.orderClass = 'icon-ziyuan1'
          break
        case 3: this.orderClass = 'icon-suiji4'
          break
      }
    }

  },
  watch: {
    // 如果歌曲id改变，则重新初始化数据
    async songId (newId, oldId) {

      // if (oldId === 0) return
      await this.initAudio()
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

  .tips {
    background-color: #fff;
    position: absolute;
    top: -20px;
    right: 30px;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .tips::after {
    content: " ";
    border-width: 6px;
    bottom: -12px;
    right: 12px;
    margin-left: -6px;
    border-top-color: #fff;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
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
    position: relative;
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
    justify-content: left;
    .order {
      cursor: pointer;
      width: 20px;
    }
    .play-list {
      font-size: 26px;
      float: right;
      margin-right: 20px;
      cursor: pointer;
    }
    .show-play-list {
      cursor: pointer;
      margin-left: 30px;
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
