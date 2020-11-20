<template>
  <div class="music-container">
    <div class="music-main">
      <!-- 封面区域 -->
      <div class="music-main-left">
        <img
          src="./images/needle.png"
          class="needle"
          :style="{
            transform: isPlaying ? 'rotateZ(-12deg)' : 'rotateZ(-35deg)',
          }"
          alt=""
        />
        <div
          class="cover-container"
          :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
        >
          <img :src="currentSong.picUrl" class="cover" alt="" />
          <img class="discImg" src="./images/disc.png" alt="" />
        </div>
        <div class="content-operation">
          <span class="like iconfont icon-weibiaoti-"></span>
          <span class="collect iconfont icon-wenjianjia"></span>
          <span
            class="download iconfont icon-anchuweidianiconquanji_fuzhi-"
          ></span>
          <span class="share iconfont icon-fenxiang"></span>
        </div>
      </div>

      <!-- 歌词区域 -->
      <div class="music-main-right">
        <div class="music-top">
          <h2 class="music-title">{{ currentSong.songName }}</h2>
          <!-- button -->
                        

          <div class="music-info">
            <div class="album">
              专辑：<a>{{ currentSong.album }}</a>
            </div>
            <div class="singer">
              歌手：<a>{{ currentSong.singer }}</a>
            </div>
            <div></div>
          </div>
          <div class="btns">
            <el-button-group style="margin-top: -3px">
              <el-button
                type="primary"
                size="mini"
                @click="playOraddSong('play')"
              >
                <span style="font-size: 12px">播放</span>
              </el-button>
              <el-button
                type="primary"
                size="mini"
                style="padding: 6px 10px"
                @click="playOraddSong"
              >
                <span style="font-size: 12px">+</span>
              </el-button>
            </el-button-group>
            <el-button size="mini" style="margin-left: 4px">
                 <i
                class="iconfont icon-fenxiang"
                style="font-size: 14px; margin-right: 2px"
              ></i>
                                  (1000)                 </el-button
            >
                            <el-button size="mini" style="margin-left: 4px">
                                <template>
                                    <i
                  class="iconfont icon-anchuweidianiconquanji_fuzhi-"
                  style="font-size: 14px; margin-right: 2px"
                ></i>
                                    下载</template
              >
                              </el-button
            >

                            <a href="#coms">
                                <el-button size="mini" style="margin-left: 4px">
                                    <template>
                                        <i
                    class="iconfont icon-groupcopy5-copy"
                    style="font-size: 14px"
                  ></i>
                                        (100)</template
                >
                                  </el-button
              ></a
            >
                            <!-- 按钮 -->
                          
          </div>
          <div class="lyric-wrapper" ref="lyc">
            <div class="currentLyric" v-if="currentLyric">
              <p
                ref="lyricLine"
                :class="{ current: currentLineNum === index }"
                v-for="(line, index) in currentLyric.lines"
                :key="line.key"
              >
                {{ line.txt }}
              </p>
            </div>
            <div v-else>
              <p>没有歌词</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部评论区域 -->
    <div class="comment-container">
      <div class="comment-count">
        <span class="title">评论</span
        ><span class="count">(已有{{ commentTotal }}条评论)</span>
      </div>
      <textarea class="comment-input" placeholder="请输入评论"></textarea>

      <!-- 精彩评论 -->
      <div class="wonderful-comment-container">
        <p class="wonderful-comment-title">精彩评论</p>
        <CommentList :comments="hotComments" v-if="hotComments.length > 0" />
      </div>

      <!-- 普通评论 -->
      <div class="comments">
        <h2 class="comment-title">最新评论({{ commentTotal }})</h2>
        <CommentList :comments="comments" v-if="comments.length > 0" />

        <!-- 分页器 -->
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="commentTotal"
          @current-change="getComments"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Lyric from 'lyric-parser'
import formaDate from '@/utils/formaDate'
import CommentList from '@/components/CommentList'

import { mapState, mapActions } from 'vuex'
export default {
  name: 'Music',
  components: {
    CommentList
  },
  data () {
    return {
      currentLyric: null,
      pageNo: 1, // 评论页数
      commentTotal: 0, // 评论总数
      comments: [], // 评论
      hotComments: [], // 精彩评论
      cursor: 0, // 上一页评论的时间戳
      currentLineNum: 0, // 歌词当前行数
      currentTime: 0, // 歌曲当前播放时间
      musicDetail: {}, // 歌曲详情
      currentSong: {}, // 当前歌曲信息
    }
  },
  computed: {
    ...mapState({
      isPlaying: (state) => state.play.isPlaying,
      songId: (state) => state.play.songId
    })
  },
  async mounted () {
    this.songInit()
  },
  methods: {

    // 播放或添加到播放列表
    playOraddSong (flag) {
      if (flag === 'play') {
        // 通知子组件播放
        this.$bus.$emit('play', this.currentSong)
      }
      // 将歌曲对象添加到播放列表
      this.$store.dispatch('addSongOfPlayList', this.musicDetail)
    },

    // 完成歌曲初始化操作
    async songInit () {
      this.getSongDetail()
      await this.getMusicLyric()
      if (this.currentLyric) {
        this.scroll = new BScroll(this.$refs.lyc, {
          scrollY: true
        })
      }
      this.getMusicHotComment()
      this.getComments()
      this.$bus.$on('setProgress', (currentTime) => {


        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }


        if (!this.isPlaying) {
          // 如果没有在播放状态
          this.currentLyric.togglePlay()
        }

      })

    },
    // 获取歌词
    async getMusicLyric () {
      // 每次获取歌词前，清空歌词
      this.currentLyric = null

      const result = await this.$API.song.getMusicLyric(this.songId)
      // 当没有歌词时，则直接返回
      if (result.nolyric) return

      this.currentLyric = new Lyric(result.lrc.lyric, this.handleLyric)
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        // 若当前行大于5,开始滚动,以保歌词显示于中间位置
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        // 结合better-scroll，滚动歌词
        this.scroll.scrollToElement(lineEl, 1000)
      }
    },
    // 获取精彩评论
    async getMusicHotComment () {
      const result = await this.$API.song.getMusicHotComment(this.songId)
      const { hotComments, total } = result
      this.hotComments = hotComments
      this.commentTotal = total
    },
    // 获取评论
    async getComments (currentPage = 1) {
      this.pageNo = currentPage
      const { songId: id, pageNo, cursor } = this
      const result = await this.$API.song.getComments({ id, type: 0, sortType: 3, pageNo, cursor })
      this.comments = result.data.comments
      this.cursor = result.data.cursor
    },
    // 格式化日期
    formatDate (time) {
      return formaDate(time)
    },

    // 获取歌曲详情
    async getSongDetail () {
      const result = await this.$API.song.getMusicDetail(this.songId)
      const { al: { name: album, picUrl }, ar: [{ name: singer }], name: songName } = result.songs[0]
      this.currentSong = {
        songName,
        picUrl,
        singer,
        album
      }
      this.musicDetail = result.songs[0]
    },

  },
  watch: {
    // 监视播放状态，修改歌词播放或暂停
    isPlaying (isplaying) {
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },

    // 如果歌曲id改变，则重新初始化数据
    async songId (newId, oldId) {

      if (this.currentLyric) {
        this.currentLyric.stop()
      }

      await this.songInit()
      // 如果当前是在播放状态，则继续播放

      // 通知子组件播放
      this.$bus.$emit('play', this.currentSong)
      // 将歌曲对象添加到播放列表
      this.$store.dispatch('addSongOfPlayList', this.musicDetail)


    },

    // 监视歌曲变化
    musicDetail (newInfo, oldInfo) {
      // 页面加载时，不发送到控制栏
      if (!Object.keys(oldInfo).length) return

      this.$bus.$emit('switchSong', newInfo)

    }

  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.music-container {
  margin: 0 auto;
  padding-bottom: 50px;
  width: 980px;
  background-color: #fff;
  .music-main {
    display: flex;
    .music-main-left {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .needle {
        z-index: 2;
        margin-top: 20px;
        margin-left: 50px;
        width: 90px;
        height: 130px;
        transition: all 0.8s;
        transform-origin: left top;
      }
      .isPlaying {
        transform: rotateZ(0deg);
      }
      .cover-container {
        position: relative;
        display: flex;
        top: -100px;
        width: 300px;
        height: 300px;
        text-align: center;
        animation: spin 8s linear infinite;

        .cover {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 190px;
        }
        .discImg {
          z-index: 1;
          width: 300px;
          height: 300px;
        }
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}

.music-main-right {
  padding-left: 50px;
  padding-top: 30px;
  .music-title {
    font-size: 22px;
    font-weight: normal;
    line-height: 50px;
  }
  .music-info {
    display: flex;
    font-size: 12px;
    line-height: 30px;
    .singer {
      margin-left: 20px;
    }
    a {
      color: #507daf;
    }
  }
  .lyric {
    font-size: 14px;
    line-height: 35px;
  }
  .btns {
    margin-bottom: 10px;
  }
  .el-button--mini {
    padding: 5px 10px !important;
  }
}

.content-operation {
  display: flex;
  width: 300px;
  margin-top: -70px;
  justify-content: space-around;
  font-size: 22px;
  span {
    width: 40px;
    height: 40px;
    font-size: 18px;
    background: #f5f5f5;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    color: #555555;
  }
  span:hover {
    background-color: #ebebeb;
  }
  .like {
    color: #ec4141;
  }
}

.comment-container {
  padding-left: 100px;
  .comment-count {
    margin-bottom: 30px;
    .title {
      font-weight: 700;
      font-size: 16px;
    }
    .count {
      font-size: 12px;
      color: #999999;
    }
  }
  .comment-input {
    width: 550px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    resize: none;
    padding: 10px;
  }
  .wonderful-comment-container {
    .wonderful-comment-title {
      font-weight: 700;
      margin: 30px 0 0px;
      font-size: 14px;
    }
  }
  .comments {
    .comment-title {
      font-weight: 700;
      margin: 100px 0 0px;
      font-size: 14px;
    }

    .el-pagination {
      width: 65%;
      text-align: center;
      margin-top: -1px;
      padding-top: 40px;
      background-color: #fff;
      font-weight: normal !important;
      /deep/.active {
        background-color: #ec4141 !important;
        color: #fff;
      }
    }
  }
}

.lyric-wrapper {
  height: 350px;
  overflow: hidden;
  font-size: 14px;
  color: #666;
  .currentLyric {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 35px;
  }
  .current {
    color: #000;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
