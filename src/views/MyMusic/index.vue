<template>
  <div class="container">
    <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
    <div class="sidebar">
      <div class="selectList">
        <div class="mySinger">我的歌手 <span>(3)</span></div>
        <div class="createList">
          <span @click="handleShow">创建的歌单</span>
          <span>({{ userList.length }})</span>
          <el-button class="elButton" type="text" @click="open" border="1"
            >+新建</el-button
          >
        </div>
        <div class="hideList" v-show="isShow">
          <ul class="hideUl">
            <li
              @mouseenter="changeShow(true, index)"
              @mouseleave="changeShow(false)"
              @click="switchPage(item.id)"
              v-for="(item, index) in userList"
              :key="item.id"
            >
              <div class="creatTitleContainer">
                <div>
                  <img :src="item.coverImgUrl" alt="" />
                </div>
                <div>
                  <p>{{ item.name }}</p>
                  <!-- <p>{{detailList.tracks.length}}首歌</p> -->
                </div>
                <span
                  class="el-icon-delete"
                  v-show="currentIndex === index"
                  @click="del(index)"
                ></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="holdList" @click="showHold">
          收藏的歌单<span>({{ topList.length }})</span>
        </div>
        <div class="holderList" v-show="isShowHold">
          <ul class="holdUl">
            <li
              @mouseenter="changeHold(true, index)"
              @mouseleave="changeHold(false)"
              @click="switchAllTop(item.id)"
              v-for="(item, index) in topList"
              :key="item.id"
            >
              <div class="titleContainer">
                <div>
                  <img :src="item.coverImgUrl" alt="" />
                </div>
                <div>
                  <p>{{ item.name }}</p>
                  <p>100首</p>
                </div>
                <span
                  class="el-icon-delete"
                  v-show="nowIndex === index"
                  @click="delHide(index)"
                ></span>
              </div>
            </li>
            <!-- <li>
              <img src="./images/per2.jpg" alt="" />
              <span>好听的音乐</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="headerContent">
        <div class="content-left">
          <img :src="detailList.coverImgUrl" alt="" />
        </div>
        <div class="content-right">
          <div class="firstFloor">
            <span class="firstSpan">歌单</span>
            <span>{{ detailList.name }}</span>
          </div>
          <div class="secondFloor">
            <img class="wangyiImg" src="./images/wangyi.jpg" alt="" />
            <a>网易云音乐</a>
            <span>{{ newTime(detailList.createTime) }}创建</span>
          </div>
          <div class="thirdFloor">
            <el-button size="mini" class="firstBtn" @click="toPlay1">播放</el-button>
            <el-button size="mini" @click="toPlay2">+</el-button>
            <el-button size="mini">收藏</el-button>
            <el-button size="mini">分享</el-button>
            <el-button size="mini">下载</el-button>
            <a href="#Scomment"><el-button size="mini">评论</el-button></a>
          </div>
          <span class="fourthFloor">介绍：{{ detailList.description }}</span>
        </div>
      </div>
      <div class="musicContainer">
        <div class="musicTitle" v-if="detailList.tracks">
          <span>歌曲列表</span>
          <span>{{ detailList.tracks.length }} 首歌</span>
          <span
            >播放:<span>{{ detailList.playCount }}</span
            >次</span
          >
        </div>
        <div class="formTitle">
          <div class="song-table">
            <!-- :row-style="{ height: '32px', background: 'pink' }" -->
            <el-table
              :data="detailList.tracks"
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
              style="width: 100%; border-collapse: collapse; border-spacing: 0"
            >
              <el-table-column type="index" label="" width="78">
              </el-table-column>
              <el-table-column
                label="标题"
                width="230"
                :show-overflow-tooltip="true"
                @click="toPlay4(row.id)"
              >
                <template slot-scope="{ row, $index }">
                  <div class="song-title">
                    <i class="play-song" @click="toPlay"></i>
                    <span class="song-name">
                      <a href="javascript:;">{{ row.name }}</a>
                      <span class="song-small">{{
                        row.alia[0] ? " - (" + row.alia[0] + ")" : ""
                      }}</span>
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="时长"
                width="111"
                class="timer"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row, $index }">
                  <span class="song-time">{{ date(row.dt) }}</span>
                  <div class="showImg">
                    <a class="el-icon-plus" @click="addSong(row)"></a>
                    <a
                      type="text"
                      @click="dialogTableVisible = true"
                      class="el-icon-folder-add"
                    ></a>
                    <a class="el-icon-share"></a>
                    <a class="el-icon-download"></a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="歌手"
                width="103"
                @click="singerDetail"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row, $index }">
                  <a href="javascript:;" @click="singerDetail(row.ar[0].id)">{{ row.ar[0].name }}</a>
                </template>
              </el-table-column>
              <el-table-column
                label="专辑"
                width="183"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row, $index }">
                  <a href="javascript:;">{{ row.al.name }}</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="commentTitle">
          <span>评论</span>
          <span>共<span>5522</span>条评论</span>
        </div>
        <div class="commentCon">
          <div class="commentHeader">
            <div class="headerContainer">
              <img src="./images/avatar.png" alt="" />
              <textarea
                placeholder="评论"
                name="comment"
                class="commentWord"
                cols="80"
                rows="4"
                v-model="commentText"
                id="Scomment"
              ></textarea>
              <div class="icon">
                <i class="icn u-icn u-icn-36 j-flag"></i>
                <span>140</span>
                <el-button type="primary" size="mini" @click="addComment()"
                  >评论</el-button
                >
              </div>
            </div>
          </div>
          <div class="commentList">
            <div class="goodComment">
              <h3>精彩评论</h3>
              <ul class="goodList">
                <li
                  v-for="(item, index) in commentList"
                  :key="item.id"
                  :v-model="commentText"
                >
                  <img :src="item.user.avatarUrl" alt="" />
                  <div>
                    <span
                      ><a href="">{{ item.user.nickname }}</a
                      >:{{ item.content }}</span
                    >
                    <div class="praseCon">
                      <p>{{ updateTime(item.time) }}</p>
                      <a class="el-icon-thumb"></a>
                      <span>({{ item.likedCount }})</span>
                      <a>回复</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="newComment">
              <h3>最新评论</h3>
              <ul class="newList">
                <li>
                  <img src="./images/per1.jpeg" alt="" />
                  <div>
                    <span
                      ><a href="">爱春的秋</a
                      >：：毋庸置疑。天份1551%，承蒙关照</span
                    >
                    <p>2019年11月02日</p>
                  </div>
                </li>
                <li>
                  <img src="./images/per2.jpg" alt="" />
                  <div>
                    <span
                      ><a href="">还是潇潇</a
                      >：《大千世界》如果你听懂了，一定会为它鼓掌，一定会为它爸爸鼓掌</span
                    >
                    <p>2019年09月02日</p>
                  </div>
                </li>
                <li>
                  <img src="./images/per3.jpg" alt="" />
                  <div>
                    <span
                      ><a href="">青春童话额</a
                      >：1599%，2019年最高飙升，薛之谦！</span
                    >
                    <p>2019年06月02日</p>
                  </div>
                </li>
                <li>
                  <img src="./images/per6.jpeg" alt="" />
                  <div>
                    <span
                      ><a href="">云村专业钓鱼</a
                      >：上线仅12个小时，不是网易首发，没有任何推荐，全靠歌迷口口相传，飙升584%，可以了。</span
                    >
                    <p>2018年09月02日</p>
                  </div>
                </li>
                <li>
                  <img src="./images/per7.jpg" alt="" />
                  <div>
                    <span
                      ><a href="">过眼星点</a
                      >：为大千世界继续打榜，也推荐大千世界的mv。这首歌的内涵和思辩需要自己去发现才是最好的，mv打榜四步骤点赞收藏评论分享！</span
                    >
                    <p>2019年09月02日</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="navigation">
            <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="getComment"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="margin-top: 20px; text-align: center"
      background
    >
    </el-pagination> -->

            <el-button size="mini">>上一页</el-button>
            <el-button size="mini">1</el-button>
            <el-button size="mini">2</el-button>
            <el-button size="mini">3</el-button>
            <el-button size="mini">4</el-button>
            <el-button size="mini">5</el-button>
            <el-button size="mini">......</el-button>
            <el-button size="mini">999</el-button>
            <el-button size="mini">下一页></el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="添加到新歌单" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="新歌单"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
// {{ item.time | formatDate('YYYY-MM-DD HH:mm:ss')}}
import formaDate from "../../utils/formaDate.js";
import { mapState } from "vuex";
// import formaDate from "../../utils/formaDate.js";
export default {
  name: "myMusic",
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",

      tableHeaderStyle: {
        background: "#f5f5f5",
        padding: "6px 5px",
        border: "1px solid #d3d3d3",
      },
      cursor: 0,
      commentId: 1407551413,
      page: 1,
      showTime: false, //显示时间，默认显示
      showPlay: true, //显示图标，默认不显示
      hideUl: [], //歌单是一个数组
      showIcon: false,
      isShow: true,
      isShowHold: true, //控制收藏的歌单显示隐藏，默认显示
      isHide: false,
      hideList: [], //隐藏的列表
      commentList: [], //评论列表
      songsList: [], //歌曲列表
      userList: [], //用户歌单
      id: 3779629, //从用户歌单获取到的每个歌单的id
      goodComment: [], //评论数组
      commentText: "", //评论框新输入的内容
      songMusicArray: [], //歌单数组
      PageList: [], //把右侧主页定义为一个数组，左侧点击切换前清空数组
      detailList: {}, //歌单详情对象，默认初始值为空
      currentIndex: null,
      nowIndex: null,
      perfectList: [], //精品歌单
      topList: [], //排行榜
      listId: [], //排行榜id数组
      topDetailList: [], //排行榜中的歌单
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.userInfo.account) {
        this.getHotMusic(this.userInfo.account.id);
      } else {
        this.userList = [];
      }
      this.getComment();
      this.switchPage(this.id);
      // this.getPerList(); //获取精品歌单
      this.reqTopList();
    },
    // 删除新建歌单
    del(index) {
      this.$confirm("此操作将删除此歌单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(index);
        this.userList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });

        // this.detailList = this.userList[0];
        // this.getHotMusic()
      });
    },
    // 删除收藏的榜单
    delHide(index) {
      this.$confirm("此操作将删除此歌单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(index);
        this.topList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.detailList = this.topList[0];
        // this.switchAllTop(this.listId)
      });
    },
    // 控制歌单上图标显示隐藏
    changeShow(flag, index) {
      if (flag) {
        this.currentIndex = index;
      } else {
        this.currentIndex = null;
      }
    },
    // 控制榜单上的图标显示隐藏
    changeHold(flag, index) {
      if (flag) {
        this.nowIndex = index;
      } else {
        this.nowIndex = null;
      }
    },
    // 获取精彩评论
    async getComment() {
      const id = this.listId;
      const reuslt = await this.$API.mymusic.getMusicComment();
      this.commentList = reuslt.hotComments;
      // this.commentList = result.comments
    },
    // 获取用户歌单
    async getHotMusic(uid) {
      const result = await this.$API.mymusic.getHotList(uid);
      this.userList = result.playlist;
      // console.log(this.userList,'用户歌单');
    },

    // 获取用户信息
    // gerUserInfo(){
    //   this.$store.dispatch('LoginUserInfo',{phone,password})
    // },
    //控制创建的歌单显示或隐藏
    handleShow() {
      this.isShow = !this.isShow;
    },
    // 控制收藏的歌单显示隐藏
    showHold() {
      this.isShowHold = !this.isShowHold;
    },
    // 点击创建的歌单右侧展示歌单信息
    async switchPage(id) {
      const result = await this.$API.mymusic.getListDetail(id);
      if (result.code === 200) {
        this.detailList = result.playlist;
      }
    },

    // 点击收藏歌单展示右侧榜单详情信息
    async switchAllTop(id) {
      const result = await this.$API.mymusic.getAllTopDetail(id);
      if (result.code === 200) {
        this.detailList = result.playlist;
        this.singerId = result.playlist.tracks[0].ar[0].id;
        console.log(this.detailList, "nnn");
        this.listId = id;
      }
    },
    // 新建歌单
    open() {
      this.$prompt("新建歌单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.userList.push({
            name: value,
            coverImgUrl: "/per6.jpeg",
          });
          this.$message({
            type: "success",
            message: "新建歌单成功" + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //点击添加评论
    addComment(commentText) {
      console.log(this.contentText);
      this.commentList.unshift({
        content: this.commentText,
        user: {
          avatarUrl: this.userInfo.profile.avatarUrl,
          nickname: "同桌你好坏",
        },
        time: Date.now(),
        // name:'同桌你好坏',
        // time:Date.now(),
      });
      // 清空输入框
      this.commentText = "";
    },
    // 歌曲时长
    date(time) {
      return formaDate(time, "s");
    },
    // 歌单创建时间
    newTime(time) {
      return formaDate(time, "m");
    },
    // 评论更新时间
    updateTime(time) {
      return formaDate(time);
    },
    // 获取排行榜
    async reqTopList() {
      const result = await this.$API.mymusic.getTopList();
      if (result.code === 200) {
        console.log(result, "所有榜单");
        this.topList = result.list.splice(1, 10);
      }
    },
    // 查看歌手详情
    async singerDetail(id) {
      // console.log(id)
      // 路由跳转传参
      const result = await this.$API.singer.reqSingerAlbum(id);
      this.$router.push("/singerAlbum/"+id)
      // this.idArray = 
      // this.$router.push({
      //   path: "/singerAlbum",
      //   query: {
      //     // id,
      //     // name:result.artist.name,
      //     // url:result.artist.picUrl,
      //   },
      // });
    },

    // 点击播放小图标
    toPlay(row) {
      this.$store.dispatch("addSongOfPlayList", row);
      this.$store.dispatch("setCurrentSong", row.id);
    },

    //点击'播放'
    toPlay1() {
      // console.log(this.tracks);
      // console.log(this.tracks[0]);
      this.$store.dispatch("replacePlayList", this.detailList.tracks);
      this.$store.dispatch("setCurrentSong", this.detailList.tracks[0].id);
      console.log(this.detailList.tracks);
    },
    //点击'+',添加整个榜单
    toPlay2() {
      this.$bus.$emit("isAddOnList");
      this.$store.dispatch("addMusicList", this.detailList.tracks);
    },
    //点击歌曲名字跳转详情页
    toPlay4(nameId) {
      this.$router.push(`/music/${nameId}`);
    },
    //添加到播放列表
    addSong(song) {
      this.$bus.$emit("isAddOnList");
      this.$store.dispatch("addSongOfPlayList", song);
      console.log("添加");
    },

    handleSizeChange(val) {
      // 更新每页条数的数据
      this.limit = val;
      // 重新获取数据
      this.getComment();
    },
  },
  watch: {
    userInfo() {
      this.init();
    },
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
a {
  text-decoration: none;
}
.container {
  margin: 0 auto;
  width: 982px;
  position: relative;
  display: flex;

  .sidebar {
    padding-top: 30px;
    width: 240px;
    border-right: 1px solid #e4e6e9;
    border-left: 1px solid #e4e6e9;
    overflow-y: auto;
    .selectList {
      margin-left: 20px;
      .mySinger {
        font-size: 15px;
        font-weight: 700;
      }
      .createList {
        font-size: 15px;
        font-weight: 700;
        margin-top: 10px;
        .elButton {
          margin-left: 30px;
        }
      }
      .holdList {
        font-size: 15px;
        font-weight: 700;
        margin-top: 10px;
      }
      .hideList {
        .hideUl {
          list-style: none;
          margin-top: 10px;
          margin-left: -10px;
          .creatTitleContainer {
            display: flex;
            p:nth-child(1) {
              margin-top: 2px;
              margin-bottom: 6px;
              margin-left: 5px;
            }
            p:nth-child(2) {
              margin-left: 5px;
            }
          }
        }
        img {
          width: 40px;
          height: 40px;
        }
        span:nth-child(1) {
          margin-top: -25px;
          font-size: 12px;
        }
        a {
          margin-left: 10px;
        }
      }
      .holderList {
        .holdUl {
          list-style: none;
          margin-top: 10px;
          margin-left: -10px;
          .titleContainer {
            display: flex;
            p:nth-child(1) {
              margin-top: 2px;
              margin-bottom: 6px;
              margin-left: 5px;
            }
            p:nth-child(2) {
              margin-left: 5px;
            }
          }
        }
        img {
          width: 40px;
          height: 40px;
        }
        span:nth-child(1) {
          margin-top: -25px;
          font-size: 12px;
        }
        a {
          margin-left: 10px;
        }
      }
    }
  }
  .content {
    left: 411px;
    border: 1px solid #ccc;
    margin-right: -10px;
    .headerContent {
      display: flex;
      width: 710px;
      .content-left {
        img {
          width: 200px;
          height: 200px;
          margin-left: 50px;
          margin-top: 50px;
          padding: 3px;
          border: 1px solid gray;
        }
      }
      .content-right {
        margin-top: 50px;
        margin-left: 40px;
        .firstFloor {
          margin-bottom: 20px;
          span:nth-child(1) {
            margin-right: 10px;
            background-color: red;
            color: white;
            padding: 5px 10px 5px 5px;
          }
          span:nth-child(2) {
            font-size: 20px;
          }
        }
        .secondFloor {
          margin-bottom: 30px;
          .wangyiImg {
            width: 35px;
            height: 35px;
          }
          span {
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .thirdFloor {
          display: flex;
          margin-left: -10px;
          margin-bottom: 20px;
          .el-button + .el-button {
            margin: 0px;
          }
          button:nth-child(1) {
            background-color: blue;
            color: white;
          }
          button:nth-child(2) {
            margin-left: -5px;
            background-color: blue;
            color: white;
          }
        }
        .fourthFloor {
          font-size: 12px;
        }
      }
    }
    .musicContainer {
      margin-left: 5px;
      .musicTitle {
        margin-top: 40px;
        border-bottom: 3px solid red;
        width: 710px;
        margin-left: 18px;
        // position: relative;
        span:nth-child(1) {
          font-size: 20px;
          margin-left: 40px;
        }
        span:nth-child(2) {
          font-size: 12px;
          margin-left: 15px;
        }
        span:nth-child(3) {
          font-size: 12px;
          // position: absolute;
          float: right;
          span {
            font-size: 12px;
            color: red;
            margin-left: -1px;
          }
        }
      }
      .formTitle {
        line-height: 35px;
        font-size: 12px;
        .song-table {
          width: 710px;
          border: 1px solid #d3d3d3;
          margin-bottom: 40px;
          margin-left: 18px;
          .el-table {
            margin-left: 1px;
          }
          .song-time {
            display: block;
          }
          .showImg {
            display: none;
            height: 20px;
            a {
              margin: 0 1px;
              width: 17px;
              height: 17px;
              cursor: pointer;
            }
            a:hover {
              text-decoration: none;
            }
          }
          /deep/ .el-table--enable-row-hover .el-table__body tr:hover .showImg {
            display: block;
          }
          /deep/
            .el-table--enable-row-hover
            .el-table__body
            tr:hover
            .song-time {
            display: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .song-title {
            display: flex;
            align-items: center;
            .song-name {
              padding-left: 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #333;

              .song-small {
                color: #aeaeae;
              }
            }

            // 播放图
            .play-song {
              float: left;
              padding-right: 8px;
              background: url("../../assets/table.png");
              width: 17px;
              height: 17px;
              cursor: pointer;
              background-position: 0 -103px;
            }
            .play-song:hover {
              background-position: 0 -128px;
            }
          }
        }
        .hotList {
          list-style: none;
          span:nth-child(1) {
            margin-left: 20px;
          }
          span:nth-child(2) {
            margin-left: 80px;
          }
          span:nth-child(3) {
            margin-left: 140px;
          }
          span:nth-child(4) {
            margin-left: 100px;
            i {
              width: 20px;
              height: 20px;
            }
          }
          span:nth-child(5) {
            margin-left: 100px;
          }
        }
      }
      .musicList {
        list-style: none;
      }
      .commentTitle {
        margin-top: 40px;
        border-bottom: 3px solid red;
        width: 710px;
        margin-left: 18px;
        span:nth-child(1) {
          font-size: 20px;
          margin-left: 40px;
        }
        span:nth-child(2) {
          font-size: 12px;
          margin-left: 15px;
          span {
            font-size: 12px;
            margin-left: -1px;
          }
        }
      }
      .commentCon {
        .commentHeader {
          .headerContainer {
            width: 656px;
            margin: 0 auto;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              left: 10px;
              width: 40px;
              height: 40px;
            }
            .commentWord {
              margin-top: 20px;
              margin-left: 70px;
            }
            .icon {
              margin-left: 490px;
              background: url(../MyMusic/images/download.png) no-repeat 0 9999px;
              button {
                color: white;
                font-size: 12px;
                background-color: blue;
              }
              span {
                font-size: 12px;
              }

              .u-icn-36 {
                width: 18px;
                height: 18px;

                background-position: -40px -490px;
              }
            }
          }
        }
        .commentList {
          width: 700px;
          margin: 0 auto;
          .goodComment {
            .goodList {
              list-style: none;
              li {
                font-size: 12px;
                display: flex;
                padding-top: 15px;
                border-bottom: 1px dashed grey;
                img {
                  width: 50px;
                  height: 50px;
                  margin-right: 5px;
                }
                .praseCon {
                  display: flex;
                  margin-top: 15px;
                  p {
                    margin-right: 440px;
                  }
                  .el-icon-thumb {
                    width: 17px;
                    height: 17px;
                  }
                  .el-icon-thumb:hover {
                    cursor: pointer;
                  }
                  span {
                    margin: 0 5px;
                  }
                }
              }
            }
          }
          .newComment {
            .newList {
              list-style: none;
              li {
                font-size: 12px;
                display: flex;
                padding-top: 15px;
                border-bottom: 1px dashed grey;
                img {
                  width: 50px;
                  height: 50px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
        .navigation {
          margin-top: 50px;
          margin-left: 100px;
        }
      }
    }
  }
  .toTop {
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
}
</style>
