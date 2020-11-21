<template>
  <div>
    <!-- <Header /> -->
    <div class="song-playList clearFix">
      <div class="playList-content">
        <div class="playList-left">
          <!-- 左侧内容 -->
          <div class="left-content clearFix">
            <div class="left-content-header">
              <div class="song-img">
                <img :src="this.coverImgUrl" alt="" />
                <span class="msk"></span>
              </div>
              <div class="content">
                <div class="content-right">
                  <div class="content-R-hd clearFix">
                    <i class="song-icon">
                      <span></span>
                    </i>
                    <div class="tit">
                      <h2>{{ name }}</h2>
                    </div>
                  </div>
                  <div class="user clearFix">
                    <a class="face" href="javascript:;">
                      <img :src="this.creator.avatarUrl" alt="" />
                    </a>
                    <span class="name">
                      <a href="javascript:;">{{ creator.nickname }}</a>
                    </span>
                    <span class="time"
                      >{{ updateyearTime(trackUpdateTime) }}&nbsp;创建</span
                    >
                  </div>
                  <div
                    class="song-content clearFix"
                    v-if="songdetails.playlist"
                  >
                    <a href="javascript:;" class="play-btn" @click="toPlay">
                      <i>
                        <em class="ply"></em>
                        播放
                      </i>
                    </a>
                    <a
                      href="javascript:;"
                      class="add song-content-btn"
                      @click="addList"
                    ></a>
                    <a class="favorite song-content-btn" href="javascript:;">
                      <i class="song-content-btn"
                        >({{ songdetails.playlist.subscribedCount }})</i
                      >
                    </a>
                    <a href="javascript:;" class="share song-content-btn">
                      <i class="song-content-btn"
                        >({{ songdetails.playlist.shareCount }})</i
                      >
                    </a>
                    <a href="javascript:;" class="dowm song-content-btn">
                      <i class="song-content-btn">下载</i>
                    </a>
                    <a href="javascript:;" class="comment song-content-btn">
                      <i class="song-content-btn">
                        (
                        <span>{{ songdetails.playlist.commentCount }}</span>
                        )
                      </i>
                    </a>
                  </div>
                  <div class="tags clearFix">
                    <b>标签：</b>
                    <a
                      href="javascript:;"
                      class="u-tag"
                      v-for="(item, index) in tags"
                      :key="index"
                    >
                      <i>{{ item }}</i>
                    </a>
                  </div>
                  <p class="dec" v-if="songdetails.playlist">
                    <b>介绍：</b>
                    {{ songdetails.playlist.description }}
                  </p>
                </div>
              </div>
            </div>
            <!--                歌曲歌单-->
            <!-- 表格 -->
          </div>

          <div class="zzz">
            <el-table
              :data="tracks"
              :span="24"
              :row-style="{
                height: '32px',
                background: '##e6e6e6',
                border: 'none',
                fontSize: '12px',
              }"
              :header-cell-style="tableHeaderStyle"
              :cell-style="{ padding: '5px' }"
              stripe
              style="
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
                margin-top: 20px;
              "
            >
              <el-table-column type="index" label=""> </el-table-column>
              <el-table-column label="歌曲标题" width="200">
                <template slot-scope="{ row, $index }">
                  <div class="song-title clearFix">
                    <i
                      class="iconfont icon-bofang3 playSong"
                      @click="playSong(row)"
                    ></i>
                    <span class="song-name">
                      <router-link :to="`/music/${row.id}`">{{ row.name }}</router-link>
                      <!-- <span class="song-small">{{}}</span> -->
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="时长" width="90">
                <template slot-scope="{ row, $index }">
                  <span class="song-time">{{ updateTime(row.dt) }} </span>
                  <!-- 图片与事件替换显示 坑  -->
                  <div class="showIcn">
                    <span class="icn-plus"></span>
                    <span class="icn-collect u-icn"></span>
                    <span class="icn-share u-icn"></span>
                    <span class="icn-download u-icn"></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="歌手" width>
                <template slot-scope="{ row, $index }">
                  <a href="javascript:;">{{ row.ar[0].name }}</a>
                </template>
              </el-table-column>
              <el-table-column label="专辑" width>
                <template slot-scope="{ row, $index }">
                  <a href="javascript:;">{{ row.ar[0].name }}</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="right-content clearFix">
        <div class="right-content-list">
          <h3>喜欢这个歌单的人</h3>
          <ul class="userlike clearFix">
            <li
              class="userlike-everyone"
              v-for="(item, index) in subscribers"
              :key="index"
            >
              <a href="javascript:;" :title="item.nickname">
                <img :src="item.avatarUrl" />
              </a>
            </li>
          </ul>
          <h3>相关推荐</h3>
          <ul class="tuijian">
            <li class="tuijian-everyone">
              <div class="tuijian-img">
                <a href="javascript:;">
                  <img
                    src="../../assets/images/109951165322438262.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div class="tuijian-info">
                <p>花海</p>
                <p><span>by</span>&nbsp;网抑云</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>
<script>
import formaDate from "../../utils/formaDate_xjw"
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
export default {
  name: "SongContentList",
  data () {
    return {
      tableHeaderStyle: {
        background: "#f5f5f5",
        padding: "6px 5px",
        border: "1px solid #d3d3d3",
      },
      // 歌单详情数据
      songdetails: [],
      // 喜欢的用户
      subscribers: [],
      creator: {},
      // 歌单列表
      tracks: [],
      // 歌单详情标签
      tags: [],
      coverImgUrl: "",
      name: "",
      trackUpdateTime: "",
    }
  },
  // components: {
  //   Header,
  //   Footer,
  // },
  async mounted () {
    console.log(this.$route.query.id)
    const { id } = this.$route.query
    console.log(id)
    const ruselt = await this.$API.songList.getsongdetails(id)
    this.songdetails = ruselt
    this.tracks = ruselt.playlist.tracks
    this.creator = ruselt.playlist.creator
    this.subscribers = ruselt.playlist.subscribers
    this.tags = ruselt.playlist.tags
    this.coverImgUrl = ruselt.playlist.coverImgUrl
    this.name = ruselt.playlist.name
    this.trackUpdateTime = ruselt.playlist.trackUpdateTime
  },

  methods: {
    addList () {
      this.$store.dispatch("addMusicList", this.tracks)
      this.$bus.$emit("isAddOnList")
    },
    toPlay () {
      this.$store.dispatch("replacePlayList", this.tracks)
      this.$store.dispatch("setCurrentSong", this.tracks[0].id)
    },
    updateTime (time) {
      return formaDate(time, "s")
    },
    updateyearTime (time) {
      return formaDate(time, "y")
    },
    playSong (song) {
      this.$store.dispatch('addSongOfPlayList', song)
      this.$store.dispatch('setCurrentSong', song.id)
    }
  },
};
</script>
<style scoped lang="less">
.playSong {
  cursor: pointer;
  margin-right: 10px;
}
.song-playList {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background: url(../../assets/images/wrap4.png) repeat-y center 0;
  margin-bottom: 40px;
}
.clearfix::after {
  display: block;
  height: 0;
  content: "";
  clear: both;
  visibility: hidden;
}
.playList-content {
  float: left;
  width: 100%;
  margin-right: -270px;
}
.playList-content .playList-left {
  margin-right: 270px;
}
.playList-left .left-content {
  padding: 47px 30px 40px 39px;
}
.left-content-header .song-img {
  width: 200px;
  height: 200px;
  float: left;
  position: relative;
  display: inline;
  margin: 0 -220px 0 0;
}
.song-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.song-img .msk {
  position: absolute;
  width: 208px;
  height: 208px;
  background: url(../../assets/images/coverall.png);
  background-position: 0 -1285px;
  top: -4px;
  left: -4px;
}
.left-content-header .content {
  float: right;
  width: 100%;
}
.content .content-right {
  margin-left: 230px;
}
.content-right .content-R-hd {
  position: relative;
  margin: 0 0 12px;
  line-height: 24px;
}
.content-R-hd .song-icon {
  float: left;
  position: relative;
  background: url(../../assets/images/icon.png);
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  width: 54px;
  height: 24px;
  background-position: 0 -243px;
}
.content-right .song-icon span {
  position: absolute;
  background: url(../../assets/images/white-r-icon@3x.png);
  display: inline-block;
  width: 8px;
  height: 8px;
  top: 2px;
  background-size: cover;
  left: 34px;
}
.content-R-hd .tit {
  margin-left: 64px;
  position: relative;
}
.tit h2 {
  line-height: 24px;
  font-size: 20px;
  font-weight: normal;
}
.content-right .user {
  margin: 0 0 20px;
  line-height: 35px;
}
.user .face {
  float: left;
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.face img {
  float: left;
  width: 35px;
  height: 35px;
}
.user .name {
  float: left;
}
.name a {
  color: #0c73c2 !important;
}
.name a:hover {
  color: #0c73c2 !important;
}
.user .time {
  margin-left: 15px;
  color: #999;
}
.song-content {
  margin-bottom: 25px;
  margin-right: -10px;
}
.song-content .play-btn {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  display: inline-block;
  height: 31px;
  line-height: 31px;
  overflow: hidden;
  vertical-align: top;
  text-align: center;
  padding: 0 5px 0 0;
  white-space: nowrap;
  text-decoration: none;
  color: #fff;
  background-position: right -428px;
  float: left;
}
.song-content .play-btn:hover {
  background-position: right -510px;
}
.song-content .play-btn:active {
  background-position: right -592px;
}
.play-btn i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  display: inline-block;
  height: 31px;
  line-height: 31px;
  overflow: hidden;
  vertical-align: top;
  text-align: center;
  pointer-events: none;
  color: #fff;
  background-position: 0 -387px;
  padding: 0 7px 0 8px;
}
.play-btn:hover i {
  background-position: 0 -469px;
}
.play-btn:active i {
  background-position: 0 -551px;
}
.play-btn i .ply {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  float: left;
  width: 20px;
  height: 18px;
  margin: 6px 2px 2px 0;
  background-position: 0 -1622px;
  overflow: hidden;
}
.play-btn:hover i .ply {
  background-position: -28px -1622px;
}
.play-btn:active i .ply {
  background-position: -56px -1622px;
}
.song-content-btn {
  float: left;
  height: 31px;
  line-height: 30px;
  min-width: 23px;
}
.song-content .add {
  background: url(../../assets/images/button2.png);
  padding: 0 5px 0 0;
  white-space: nowrap;
  color: #333;
  text-decoration: none;
  width: 31px;
  margin-left: -3px;
  padding-right: 0;
  background-position: 0 -1588px;
  margin-right: 5px;
}
.song-content .add:hover {
  background-position: -40px -1588px;
}
.song-content .add:active {
  background-position: -80px -1588px;
}
.song-content .favorite {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding: 0 5px 0 0;
  white-space: nowrap;
  color: #333 !important;
  text-decoration: none;
  background-position: right -1020px;
  margin-right: 6px;
}
.song-content .favorite:hover {
  background-position: right -1106px;
  color: #333 !important;
}
.favorite i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding-right: 2px;
  padding-left: 28px;
  background-position: 0 -977px;
}
.favorite:hover i {
  background-position: 0 -1063px;
}
.song-content .share {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  color: #333 !important;
  text-decoration: none;
  background-position: right -1020px;
  margin-right: 6px;
  padding: 0 5px 0 0;
  text-decoration: none;
}
.song-content .share:hover {
  background-position: right -1106px;
  color: #333 !important;
}
.share i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding-right: 2px;
  padding-left: 28px;
  background-position: 0 -1225px;
}
.share:hover i {
  background-position: 0 -1268px;
}
.song-content .dowm {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding: 0 5px 0 0;
  white-space: nowrap;
  color: #333 !important;
  text-decoration: none;
  background-position: right -1020px;
  margin-right: 6px;
}
.song-content .dowm:hover {
  background-position: right -1106px;
  color: #333 !important;
}
.dowm i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding-right: 2px;
  padding-left: 28px;
  background-position: 0 -2761px;
}
.dowm:hover i {
  background-position: 0 -2805px;
}
.song-content .comment {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding: 0 5px 0 0;
  white-space: nowrap;
  color: #333 !important;
  background-position: right -1020px;
  margin-right: 6px;
}
.song-content .comment:hover {
  background-position: right -1106px;
  color: #333 !important;
}
.comment i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding-left: 28px;
  padding-right: 2px;
  background-position: 0 -1465px;
}
.comment:hover i {
  background-position: 0 -1508px;
}
.content-right .tags {
  margin: 25px 0 5px;
  line-height: 22px;
}
.tags b {
  float: left;
}
.tags .u-tag {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  height: 22px;
  line-height: 22px;
  color: #777 !important;
  padding: 0 10px 0 0;
  text-shadow: 0 1px #fdfdfd;
  background-position: right -27px;
  float: left;
  margin: 0 10px 3px 0;
}
.tags .u-tag:hover {
  background-position: right -1430px;
  color: #777 !important;
}
.u-tag i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  float: left;
  height: 22px;
  line-height: 22px;
  position: relative;
  zoom: 1;
  padding: 0 3px 0 13px;
  background-position: 0 0;
}
.u-tag:hover i {
  background-position: 0 -1400px;
}
.content-right .dec {
  color: #666;
  line-height: 18px;
  margin-top: 4px;
}
.dec b {
  display: inline-block;
  color: #666;
}
.right-content {
  position: relative;
  float: right;
  width: 270px;
  height: 100px;
  zoom: 1;
}
.right-content-list {
  padding: 20px 40px 40px 30px;
}
.right-content-list h3 {
  position: relative;
  *zoom: 1;
  height: 23px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  color: #333;
}
.userlike {
  margin-left: -13px;
  padding-bottom: 25px;
}
.userlike-everyone {
  float: left;
  width: 40px;
  height: 40px;
  display: inline;
  padding: 0 0 13px 13px;
}
.userlike-everyone a img {
  float: left;
  width: 40px;
  height: 40px;
}
.tuijian {
  margin-bottom: 25px;
}
.tuijian-everon {
  float: left;
  width: 200px;
  height: 50px;
  margin-bottom: 15px;
  line-height: 24px;
}
.tuijian-img {
  float: left;
  width: 50px;
  height: 50px;
  margin-right: -60px;
}
.tuijian-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.tuijian-info {
  margin-left: 60px;
  line-height: 24px;
}
.tuijian-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
}

.song-table {
  width: 665px;
  border: 1px solid #d3d3d3;
  margin-top: 20px;
  margin-bottom: 40px;
  a:hover {
    text-decoration: underline;
  }
  .song-title {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    .song-name {
      padding-left: 5px;
      color: #333;
      max-width: 200px;
      a {
        margin-left: 8px;
      }
      .song-small {
        color: #aeaeae;
      }
    }
  }
  // 播放图

  .showIcn {
    display: block;
  }

  .icn-collect {
    background-position: 0 -174px;
  }
  .icn-share {
    background-position: 0 -195px;
  }
  .icn-download {
    background-position: -81px -174px;
  }
}
.song-time {
  display: block;
}
</style>
