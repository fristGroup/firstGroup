<template>
  <div class="singerContext">
    <el-row>
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <div class="singerConLeft">
            <!-- 大图区域 -->
            <div class="singerBigImg">
              <h2>{{ singerCon.name }}</h2>
              <img v-lazy="singerCon.picUrl" alt="" />
              <div class="mask">
                <a href="" class="artist-home"></a>
                <a id="" href="" class="artist-sub"></a>
              </div>
            </div>
            <!-- 下方播放列表 -->
            <div class="singerPlayList">
              <!-- 播放按钮区域 -->
              <!-- 推荐这种写法-->
              <ul class="tab-title">
                <li
                  v-for="(title, index) in tabTitle"
                  :key="index"
                  @click="cur = index"
                  :class="{ active: cur == index }"
                >
                  {{ title }}
                </li>
              </ul>
              <!-- tab切换内容 1-->
              <div v-show="0 === cur" class="tab1">
                <div class="buttonPlay">
                  <!-- 播放 -->
                  <a
                    href="javascript:;"
                    class="clickPlay"
                    @click="clickPlay"
                  ></a>
                  <!-- 添加 -->
                  <a
                    href="javascript;"
                    class="clickCollection"
                    @click="addList"
                  ></a>

                  <a href="javascript;" class="collectionHot"></a>
                  <a href="javascript;" class="hotSingle"></a>
                </div>

                <div class="playListCon">
                  <el-table
                    :data="singerSongsList"
                    stripe
                    style="width: 100%"
                    max-height="1500"
                    :show-header="false"
                  >
                    <el-table-column
                      type="index"
                      width="80"
                      class="pB"
                    ></el-table-column>
                    <el-table-column>
                      <template slot-scope="{ row, $index }">
                        <i class="song-icon" @click="playSong(row)"></i>
                        <a href="javascript:;" style="max-width: 200px">{{
                          row.name
                        }}</a>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" width="90">
                      <template slot-scope="{ row, $index }">
                        <span>{{ updateTime(row.dt, "s") }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="al.name" width="90">
                    </el-table-column>
                  </el-table>
                  <!-- <li>
                    1
                    <el-button
                      type="primary"
                      icon="el-icon-video-play"
                    ></el-button>
                    会不会(吉他版) 03.54 会不会
                  </li> -->
                </div>
              </div>
              <!-- tab切换内容 2-->
              <div v-show="1 === cur" class="tab2">
                <el-row :gutter="20">
                  <el-col
                    :span="6"
                    v-for="item in singerAlbumList"
                    :key="item.picId"
                    style="padding-top: 20px; padding-buttom: 20px"
                    ><div class="grid-content bg-purple">
                      <img
                        v-lazy="item.picUrl"
                        alt=""
                        width="120"
                        height="120"
                      />
                      <p class="albumCon">{{ item.name }}</p>
                      <p class="albumshijian">
                        {{ updateTime(item.publishTime, "y") }}
                      </p>
                    </div></el-col
                  >
                </el-row>
              </div>
              <!-- tab切换内容 3-->
              <div v-show="2 === cur" class="tab3">
                <el-row :gutter="20">
                  <el-col
                    :span="6"
                    v-for="(item, index) in singerMVList"
                    :key="index"
                    style="
                      margin-top: 20px;
                      margin-bottom: 20px;
                      cursor: pointer;
                    "
                    ><div class="grid-content bg-purple">
                      <img
                        v-lazy="item.imgurl"
                        alt=""
                        width="130"
                        height="103"
                      />
                      <p>{{ item.name }}</p>
                    </div></el-col
                  >
                </el-row>
              </div>
              <!-- tab切换内容 4-->
              <div v-show="3 === cur" class="tab4">
                <h3>{{ singerCon.name }}简介</h3>
                <!-- v-for="(item,index )in singerIntroduceList" :key="index" -->
                <p>{{ singerIntroduceList.briefDesc }}</p>
              </div>
            </div>
          </div>
        </div></el-col
      >
      <!-- 右方侧边栏 -->
      <el-col :span="8"
        ><div class="grid-content bg-purple-light">
          <div class="singerConRigth">
            <h3>相似歌手</h3>
            <div class="hotSinger">
              <ul class="hotSingerList">
                <li
                  v-for="item in singerBeSimilarList"
                  :key="item.id"
                  @click="beSimilarSinger(item.id)"
                >
                  <img v-lazy="item.picUrl" alt="" width="50px" height="50px" />
                  <p>{{ item.name }}</p>
                </li>
              </ul>
            </div>
            <!-- 下载图标 -->
            <h3>网易云音乐多端下载</h3>
            <div class="downloadIcon"></div>
          </div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import formaDate from "../../utils/formaDate.js";
export default {
  name: "SingerAlbum",
  data() {
    return {
      //tab切换
      tabTitle: ["热门作品", "所有专辑", "相关MV", "艺人介绍"],
      cur: 0, //默认选中第一个tab
      singerId: 0, //获取的歌手id
      //根据歌手id拿到的歌曲，专辑，MV，介绍  右侧相似
      singerSongsList: [
        //歌曲列表
      ],
      singerAlbumList: [
        //专辑列表
      ],
      singerMVList: [
        //MV列表
      ],
      singerIntroduceList: [
        //介绍列表
      ],
      singerBeSimilarList: [
        //右侧相似列表
      ],
      singerCon: {},
    };
  },
  // components: {
  //   FindSinger,
  // },
  // created() {
  //   this.$bus.$on("add", (msg) => {
  //     console.log(msg);
  //   });
  // },
  //机算属性
  computed: {},
  mounted() {
    // console.log(this.$route);
    // var self = this;
    // this.$bus.$on("add", (msg, data) => {
    //   // console.log(msg, data);
    //   // console.log(msg);
    // });

    this.singerCon = this.$route.params;

    this.singerSongs(this.singerCon.id);
  },
  methods: {
    //根据歌手id获取的数据
    async singerSongs(id) {
      //根据歌手id获取的热门50首
      const singerSong = await this.$API.singer.reqsingerObtainSong(id);
      this.singerSongsList = singerSong.songs;

      //获取的专辑列表
      const singerAlbum = await this.$API.singer.reqSingerAlbum(id);
      this.singerAlbumList = singerAlbum.hotAlbums;
      // console.log(singerAlbum.artist);
      this.singerCon = singerAlbum.artist;

      //获取的专辑MV    reqsingerMV
      const singerMV = await this.$API.singer.reqsingerMV(id);

      // console.log(singerMV);
      this.singerMVList = singerMV.mvs.slice(0, 8);

      //获取歌手介绍
      const singerIntroduce = await this.$API.singer.reqsingerIntroduce(id);
      this.singerIntroduceList = singerIntroduce;
      // console.log(this.singerIntroduceList);
      //获取相似歌手列表
      const singerBeSimilar = await this.$API.singer.reqsingerBeSimilar(id);
      this.singerBeSimilarList = singerBeSimilar.artists.slice(0, 6);
      // console.log(this.singerBeSimilarList);
    },
    //时间戳
    updateTime(time, flag) {
      return formaDate(time, flag);
    },
    //相似歌手切换
    beSimilarSinger(id) {
      this.singerSongs(id);
    },
    //点击播放
    clickPlay() {
      this.$store.dispatch("replacePlayList", this.singerSongsList);
      this.$store.dispatch("setCurrentSong", this.singerSongsList[0].id);
    },
    addList() {
      this.$store.dispatch("addMusicList", this.singerSongsList);
      this.$bus.$emit("isAddOnList");
    },
    playSong(song) {
      this.$store.dispatch("addSongOfPlayList", song);
      this.$store.dispatch("setCurrentSong", song.id);
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
body {
  width: 100%;
  // height: 100%;
  font-size: 12px;
  color: #333;
}
.singerContext {
  width: 982px;
  margin: 0 auto;
  border: 1px solid #cccccc;
  // height: 2000px;
  //左边
  .singerConLeft {
    padding: 30px;
    .singerBigImg {
      margin: 0 auto;
      h2 {
        height: 34px;
        line-height: 24px;
        font-size: 24px;
        color: #333;
      }
      img {
        display: block;
        width: 594px;
        height: 300px;
      }
      .mask {
        width: 200px;
        position: absolute;
        top: 310px;
        right: 375px;
        .artist-home {
          height: 32px;
          width: 96px;
          float: left;
          background: url("../../assets/images/iconall.png") no-repeat;
          background-position: 0 -1156px;
        }
        .artist-sub {
          height: 32px;
          width: 76px;
          float: right;
          background: url("../../assets/images/iconall.png") no-repeat;
          background-position: 0 -500px;
        }
      }
    }
    .singerPlayList {
      li {
        float: left;
        width: 25%;
        height: 39px;
        line-height: 39px;
        text-align: center;
        background-color: #f4f4f4;
        cursor: pointer;
      }
      .active {
        background-color: #fff;
        border-top: 2px solid red;
      }
      .tab-title {
        height: 39px;
      }
      .tab1 {
        width: 594px;

        float: left;
        .buttonPlay {
          // width: 100%;
          margin: 20px 0 10px;
          height: 50px;
          .clickPlay {
            height: 31px;
            line-height: 31px;
            // color: #fff;
            display: inline-block;
            width: 62px;
            background: url("../../assets/images/play.png") no-repeat;
          }
          .clickCollection {
            width: 31px;
            height: 31px;
            display: inline-block;
            background: url("../../assets/images/tianjia.png") no-repeat;
          }
          .collectionHot {
            width: 91px;
            height: 31px;
            display: inline-block;
            background: url("../../assets/images/shoucang.png") no-repeat;
          }
          .hotSingle {
            float: right;
            width: 104px;
            height: 32px;
            background: url("../../assets/images/danqu.png");
          }
        }
        //tab切换样式
        //隐藏tab切换滚动条
        /deep/ .el-table--scrollable-y .el-table__body-wrapper {
          overflow-y: hidden;
        }
        /deep/ .el-table__row {
        }
        // .pB {
        //   background: url("./images/bofang.png") no-repeat;
        // }
        .playListCon /deep/ .el-table__row td {
          padding: 0 !important;
          height: 35px;
        }
        .playListCon /deep/ .el-table__row td div {
          font-size: 12px;
          height: 21px;
          line-height: 21px;
        }
        .song-icon {
          float: left;
          background: url("../../assets/images/table.png");
          width: 17px;
          height: 17px;
          cursor: pointer;
          background-position: 0 -103px;
          margin-top: 2px;
          margin-right: 4px;
        }
      }
      .tab2 {
        float: left;
        width: 594px;
        min-height: 350px;
        .grid-content {
          cursor: pointer;
        }
        .albumCon {
          line-height: 19px;
          font-size: 14px;
        }
        .albumshijian {
          font-size: 12px;
          color: #666;
        }
      }
      .tab3 {
        float: left;
        width: 594px;
        min-height: 350px;
      }
      .tab4 {
        h3 {
          padding-left: 20px;
          border-left: 2px solid #c10d0c;
          margin: 28px 0 8px 0;
          color: #333;
          font-size: 14px;
        }
        p {
          line-height: 25px;
          color: #666;
          text-indent: 2em;
          font-size: 12px;
        }
      }
    }
  }
  //右边
  .el-row {
    .el-col-16 {
      border-right: 1px solid #cccccc;
    }
    .el-col-8 {
      padding-left: 29px;
    }
  }
  .singerConRigth {
    padding-top: 20px;
    font-size: 12px;
    h3 {
      width: 258px;
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
    }
    .hotSinger {
      width: 258px;
      overflow: hidden;
      .hotSingerList {
        width: 330px;
        height: 200px;
        li {
          float: left;
          height: 80px;
          width: 50px;
          margin-right: 54px;
          img {
          }
          p {
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
    .downloadIcon {
      margin-left: 30px;
      width: 258px;
      height: 150px;
      background: url("../../assets/images/sprite.png") no-repeat 0 9999px;
      background-position: 0 -472px;
    }
  }
}
</style>
