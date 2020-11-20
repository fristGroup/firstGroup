<template>
  <div>
    <div class="songList-bg">
      <!-- 头部 -->
      <div class="songList-wrap">
        <div class="songList-title cleanfix">
          <h3>
            <span>{{ songcat }}</span>
            <a
              href="javascript:;"
              class="songList-btn songList-btn1"
              id="btn"
              @click="isShow = !isShow"
            >
              <i
                >选择分类
                <em></em>
              </i>
            </a>
          </h3>
          <div class="songList-btn2">
            <a
              href="javascript:;"
              class="a1"
              :data-songcat="songcat"
              @click="tohot"
              >热门</a
            >
          </div>
        </div>

        <!-- 选择分类 -->
        <div class="songList-box" id="songList-box" v-show="isShow">
          <div class="hd">
            <i class="icn"></i>
          </div>
          <div class="bd" @click="newClassicalMusic">
            <h3>
              <a href="javascript:;" :data-all="this.all" @click="toall">
                <em>全部风格</em>
              </a>
            </h3>
            <!-- 遍历歌曲分类 -->
            <dl
              class="f-cd cleanfix"
              v-for="(touch, touchIndex) in classicalMusic.categories"
              :key="touchIndex"
            >
              <dt>
                <i class="songList-icn songList-icn-1"></i>
                {{ touch }}
              </dt>
              <dd>
                <ul>
                  <!-- 遍历分类的每个子主题 -->
                  <li v-for="(item, index) in items(touchIndex)" :key="index">
                    <a
                      href="javascript:;"
                      class="s-fc1"
                      :data-cat="item.name"
                      >{{ item.name }}</a
                    >
                    <span class="line">|</span>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
          <div class="ft"></div>
        </div>

        <!-- 歌单 -->
        <ul class="songList-cvrlst cleanfix">
          <li v-for="(item, index) in songListContent" :key="item.id">
            <div class="songList-cover">
              <img class="songList-jpg" v-lazy="item.coverImgUrl" alt="" />
              <a
                :title="item.name"
                :data-id="item.id"
                href="javascript:;"
                class="msk"
                @click="toSongContentList($event)"
              ></a>
              <div class="bottom">
                <a
                  title="播放"
                  class="icon-play"
                  href="javascript:;"
                  :data-id="item.id"
                  @click="playsongall"
                ></a>
                <span class="icon-headset"></span>
                <span class="nb">{{ item.playCount }}</span>
              </div>
            </div>
            <p class="song-dec">
              <a :title="item.name" href="javascript:;" class="song-tit">{{
                item.name
              }}</a>
            </p>
            <p>
              <span class="s-fc4">by</span>&nbsp;
              <a
                :title="item.creator.nickname"
                href="javascript:;"
                class="slUser"
                >{{ item.creator.nickname }}</a
              >
              <img
                v-if="item.creator.avatarDetail != null"
                class="smicon"
                :src="item.creator.avatarDetail.identityIconUrl"
                alt=""
              />
            </p>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="pager">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="35"
            layout=" prev, pager, next"
            :total="total"
          >
          </el-pagination>

          <!-- 波哥的分页组件 -->
          <!-- <Pagination 
          :pageConfig="{total:total, pageNo:page,pageSize:35,keyword:keyword, showPageNo:showPageNo}" @changeCurrentPage="getnewsonglist"/> -->
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <!-- <Footer /> -->
  </div>
</template>
<script>
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      // 请求到德歌单分类信息
      classicalMusic: [],
      // 获取分类的数据
      songListContent: [],
      // 显示的数据
      showList: [],
      //
      currentPage: 1,
      // 页数
      page: 1,
      // 总条数
      //每页条数
      total: 1,
      showPageNo: 7,
      // 风格
      songcat: "全部",
      cat: "",
      isShow: false,
      all: "全部",
      trackIds: [],
    };
  },
  // components: {
  //   Header,
  //   Footer,
  // },

  methods: {
    toSongContentList(event) {
      const id = event.target.dataset.id;
      this.$router.push(`/songcontentlist/?id=${id}`);
    },
    // 波哥的分页组件用的方法
    // getnewsonglist(pageNo=1){
    //   this.page = pageNo
    //   const {songcat} = this
    //   const offset = (pageNo - 1) * 35
    //   this.getSongList(songcat,undefined, offset)

    // },
    // 过滤歌曲分类的子主题回调
    items(touchIndex) {
      const classical = this.classicalMusic.sub.filter((item) => {
        return item.category == touchIndex;
      });
      return classical;
    },
    newClassicalMusic(e) {
      // 事件委托

      const nodeTarget = e.target;
      if (nodeTarget.nodeName === "A") {
        const { cat } = nodeTarget.dataset;
        this.cat = cat;
        this.$router.push("/discover/songlist/?cat=" + cat);
        this.getSongList(cat);
        this.currentPage = 1;
      }
    },
    async playsongall(e) {
      const nodeTarget = e.target;
      if (nodeTarget.nodeName === "A") {
        const { id } = nodeTarget.dataset;
        const ruselt = await this.$API.songList.getsongdetails(id);
        // console.log(ruselt);
        const { tracks } = ruselt.playlist;
        this.tracks = tracks;
        console.log(this.tracks);
        this.$store.dispatch("replacePlayList", this.tracks);
        this.$store.dispatch("setCurrentSong", this.tracks[0].id);
      }
    },
    toall(e) {
      const nodeTarget = e.target;
      if (nodeTarget.nodeName === "A") {
        const { all } = nodeTarget.dataset;
        this.$router.push(`/discover/songlist/?cat=${all}&order=hot`);
        this.getSongList(all);
        this.currentPage = 1;
      }
    },
    // 点击热门获取数据
    tohot(e) {
      const nodeTarget = e.target;
      if (nodeTarget.nodeName === "A") {
        const { songcat } = nodeTarget.dataset;
        this.$router.push(`/discover/songlist/?cat=${songcat}&order=hot`);
        this.getSongList(songcat);
        this.currentPage = 1;
      }
    },
    // 封装获取分类数据的请求方法
    async getSongList(cat = "全部", limit = 35, offset = 0) {
      const result = await this.$API.songList.getsongListContent(
        cat,
        limit,
        offset
      );
      if (result.code === 200) {
        this.songListContent = result.playlists;
        this.total = result.total;
        this.page = this.total / 35;
        this.songcat = result.cat;
        this.isShow = false;
      } else {
        console.log("网络异常");
      }
    },
    handleCurrentChange(page = 1) {
      const { songcat } = this;
      const offset = (page - 1) * 35;
      this.getSongList(songcat, undefined, offset);
      this.$router.push(
        `/discover/songlist/?cat=${songcat}&limi=35&offset=${offset}`
      );
    },
  },
  async mounted() {
    this.classicalMusic = await this.$API.songList.getsongList();
    if (this.$route.query.cat) {
      this.getSongList(this.$route.query.cat);
    } else {
      this.getSongList();
    }
  },
};
</script>
<style scoped>
.songList-bg {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
}
.cleanfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.songList-bg .songList-wrap {
  padding: 40px;
  position: relative;
}
.songList-bg .songList-wrap .songList-title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
}
.songList-bg .songList-wrap .songList-title h3 {
  float: left;
  font-size: 24px;
  font-weight: normal;
}
.songList-bg .songList-wrap .songList-title .songList-btn {
  height: 31px;
  line-height: 31px;
  font-size: 12px;
  font-weight: normal;
  margin: 2px 0 0 12px;
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  padding: 0 4px 0 0;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  text-align: center;
}
.songList-bg .songList-wrap .songList-title .songList-btn1 {
  background-position: right -100px;
}

.songList-bg .songList-wrap .songList-title .songList-btn1:hover {
  background-position: right -182px;
}
.songList-bg .songList-wrap .songList-title .songList-btn1:active {
  background-position: right -264px;
}
.songList-bg .songList-wrap .songList-title .songList-btn1 i {
  background: url(../../assets/images/button2.png) no-repeat 0 9999px;
  display: inline-block;
  height: 31px;
  line-height: 31px;
  overflow: hidden;
  vertical-align: top;
  text-align: center;
  background-position: 0 -59px;
  color: #0c73c2 !important;
  padding: 0 10px 0 15px;
}

.songList-bg .songList-wrap .songList-title .songList-btn1 i:hover {
  background-position: 0 -141px;
}
.songList-bg .songList-wrap .songList-title .songList-btn1 i:active {
  background-position: 0 -223px;
}

.songList-bg .songList-wrap .songList-title .songList-btn1 em {
  background: url(../../assets/images/icon.png) no-repeat 0 9999px;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  width: 8px;
  height: 5px;
  background-position: -70px -543px;
  margin-left: 5px;
}
.songList-bg .songList-wrap .songList-title .songList-btn2 {
  float: right;
  background: url(../../assets/images/button.png) no-repeat 0 9999px;
  display: inline-block;
  height: 29px;
  background-position: 0 0;
  border-radius: 3px;
}
.songList-bg .songList-wrap .songList-title .songList-btn2 .a1 {
  float: left;
  width: 46px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  color: #fff !important;
}
.songList-bg .songList-wrap .songList-box {
  display: block;
  left: 0;
  z-index: 5;
  top: 75px;
  position: absolute;
}
.songList-bg .songList-wrap .songList-box .hd {
  height: 32px;
  background: url(../../assets/images/sltlyr.png) no-repeat;
}
.songList-bg .songList-wrap .songList-box .hd .icn {
  background: url(../../assets/images/iconall.png);
  vertical-align: middle;
  background-position: -48px 0;
  height: 11px;
  width: 24px;
  display: inline-block;
  left: 132px;
  top: 2px;
  position: absolute;
}
.songList-bg .songList-wrap .songList-box .bd {
  width: 700px;
  padding: 0 10px;
  background: url(../../assets/images/sltlyr.png) no-repeat;
  background-position: -720px 0;
  background-repeat: repeat-y;
}
.songList-bg .songList-wrap .songList-box .bd h3 {
  font-size: 100%;
  font-weight: normal;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 26px;
  height: 37px;
}
.songList-bg .songList-wrap .songList-box .bd h3 a {
  background: url(../../assets/images/button.png) no-repeat 0 9999px;
  display: inline-block;
  width: 75px;
  height: 26px;
  background-position: 0 -64px;
  text-align: center;
  line-height: 26px;
}
.songList-bg .songList-wrap .songList-box .bd h3 a:hover {
  color: #000 !important;
}
.songList-bg .songList-wrap .songList-box .bd dt {
  float: left;
  display: inline;
  width: 70px;
  margin: 0 -100px 0 26px;
  padding-top: 15px;
  border-right: 1px solid #e6e6e6;
  font-weight: bold;
}
.songList-icn {
  margin-right: 8px;
  margin-bottom: 4px;
  background: url(../../assets/images/icon.png) no-repeat 0 9999px;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.songList-icn-1 {
  width: 23px;
  height: 23px;
  background-position: -20px -735px;
}
dl:nth-child(3) i {
  width: 24px;
  height: 24px;
  background-position: 0px -60px;
}
dl:nth-child(4) i {
  width: 24px;
  height: 24px;
  background-position: 0px -88px;
}
dl:nth-child(5) i {
  width: 24px;
  height: 24px;
  background-position: 0px -117px;
}
dl:nth-child(6) i {
  width: 24px;
  height: 24px;
  background-position: 0px -141px;
}
.songList-bg .songList-wrap .songList-box .bd dd {
  line-height: 24px;
  margin-left: 96px;
  padding: 16px 15px 0 15px;
  border-left: 1px solid #e6e6e6;
}
dl:nth-child(6) {
  padding-bottom: 25px;
}
a.s-fc1:hover {
  color: #000 !important;
}
.s-fc1 {
  white-space: nowrap;
  color: #333333;
}
.songList-bg .songList-wrap .songList-box .bd dd .line {
  margin: 0 8px 0 10px;
  color: #d8d8d8;
}
.songList-bg .songList-wrap .songList-box li {
  display: inline-block;
}
.songList-bg .songList-wrap .songList-box .ft {
  background: url(../../assets/images/sltlyr.png) no-repeat;
  height: 20px;
  background-position: -1440px -12px;
}
.songList-bg .songList-wrap .songList-cvrlst {
  margin: 30px 0 0 -50px;
}
.songList-bg .songList-wrap .songList-cvrlst li {
  float: left;
  display: inline-block;
  width: 140px;
  height: 188px;
  overflow: hidden;
  padding: 0 0 30px 50px;
  line-height: 1.4;
}
.songList-bg .songList-wrap .songList-cvrlst .songList-cover {
  position: relative;
  display: block;
  width: 140px;
  height: 140px;
}
.songList-bg .songList-wrap .songList-cvrlst .songList-jpg {
  display: block;
  width: 100%;
  height: 100%;
}
.songList-bg .songList-wrap .songList-cvrlst .msk {
  background: url(../../assets/images/coverall.png) no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: 0 0;
}
.songList-bg .songList-wrap .songList-cvrlst .bottom {
  background: url(../../assets/images/coverall.png);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 27px;
  background-position: 0 -537px;
  color: #ccc;
}
.songList-bg .songList-wrap .songList-cvrlst .icon-play {
  float: right;
  background: url(../../assets/images/iconall.png) no-repeat;
  display: inline-block;
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background-position: 0 0;
}
.songList-bg .songList-wrap .songList-cvrlst .icon-play:hover {
  background-position: 0 -60px;
}
.songList-bg .songList-wrap .songList-cvrlst .icon-headset {
  background: url(../../assets/images/iconall.png) no-repeat;
  display: inline-block;
  float: left;
  width: 14px;
  height: 11px;
  background-position: 0 -24px;
  margin: 9px 5px 9px 10px;
}
.songList-bg .songList-wrap .songList-cvrlst .nb {
  margin: 7px 0 0 0;
  float: left;
}
.songList-bg .songList-wrap .songList-cvrlst .song-dec {
  width: 100%;
  font-size: 14px;
  margin: 8px 0 3px;
}
.songList-bg .songList-wrap .songList-cvrlst .song-tit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
}
.songList-bg .songList-wrap .songList-cvrlst .s-fc4 {
  color: #999;
}
.songList-bg .songList-wrap .songList-cvrlst .slUser {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
  display: inline-block;
  vertical-align: middle;
  max-width: 73%;
  margin-right: 4px;
}
.songList-bg .songList-wrap .songList-cvrlst .smicon {
  height: 13px;
  width: 13px;
  display: inline-block;
  vertical-align: middle;
}
.songList-bg .songList-wrap .pager {
  margin: 20px 0;
  text-align: center;
}

/* 分页*/
</style>
