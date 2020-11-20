<template>
  <div class="tatol-container clearfix">
    <!-- rank -->
    <Rank @getId="getId"></Rank>
    <!-- 右部分 -->
    <div class="right-container ">
      <div class="g-mn3c clearfix">
        <!-- 右上 -->
        <div class="top-title">
          <div class="cover">
            <img :src="playlist.coverImgUrl" alt="" />
          </div>
          <div class="cnt">
            <div class="cntc">
              <div class="hd">
                <h2 class="clearfix">{{ playlist.name }}</h2>
              </div>
              <div class="update">
                <!-- 图标 -->
                <i class="u-icn"></i>
                <span class="s-fc3"
                  >最近更新:{{
                    updateTime(playlist.trackNumberUpdateTime)
                  }}</span
                >
                <span class="fc4">({{ update }})</span>
              </div>
              <!-- button -->
              <div class="btns">
                <el-button type="primary" size="mini">
                  播放
                </el-button>

                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left:-5px;font-size:12px;border-left:1px solid #d3d3d3"
                >
                  <span style="font-size:12px">+</span>
                </el-button>

                <el-button size="mini" style="margin-left:4px">
                  <template>
                    <i
                      class="iconfont icon-wenjianjia"
                      style="font-size:14px;margin-right:2px;"
                    ></i>
                    ({{ playlist.subscribedCount }})</template
                  >
                </el-button>
                <el-button size="mini" style="margin-left:4px">
                  <template>
                    <i
                      class="iconfont icon-fenxiang"
                      style="font-size:14px;margin-right:2px;"
                    ></i>
                    ({{ playlist.shareCount }})</template
                  >
                </el-button>
                <el-button size="mini" style="margin-left:4px">
                  <i
                    class="iconfont icon-anchuweidianiconquanji_fuzhi-"
                    style="font-size:14px;margin-right:2px;"
                  ></i>
                  下载
                </el-button>

                <a href="#coms">
                  <el-button size="mini" style="margin-left:4px">
                    <i
                      class="iconfont icon-groupcopy5-copy"
                      style="font-size:14px;"
                    ></i>
                    ({{ playlist.commentCount }})
                  </el-button></a
                >
                <!-- 按钮 -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 歌曲列表以及评论的容器 -->
      <div class="main-wrap12">
        <div class="main-h3 clearfix">
          <h3>
            <span class="ff2">歌曲列表</span>
          </h3>
          <span class="sub">
            <span>{{ playlist.trackCount }}</span> 首歌
          </span>
          <div class="more">
            播放:
            <strong>{{ playlist.playCount }}</strong
            >次
          </div>
        </div>
        <!-- 表格 -->
        <div class="song-table">
          <!-- :row-style="{ height: '32px', background: 'pink' }" -->
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
            style="width: 100%;border-collapse: collapse;
                border-spacing: 0;"
          >
            <!--  -->
            <el-table-column type="index" label="" width="78">
            </el-table-column>
            <el-table-column label="标题" width="320">
              <template slot-scope="{ row, $index }">
                <div class="song-title ">
                  <img
                    v-if="$index < 3"
                    :src="row.al.picUrl"
                    style="width:50px;margin-right:14px"
                    alt=""
                  />
                  <i class="play-song "></i>
                  <span class="song-name">
                    <a href="javascript:;">{{ row.name }}</a>
                    <span class="song-small">{{
                      row.alia[0] ? " - (" + row.alia[0] + ")" : ""
                    }}</span>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="时长" width>
              <template slot-scope="{ row, $index }">
                <div>
                  <span class="song-time">{{ date(row.dt) }} </span>
                  <!-- 图片与事件替换显示 坑  -->
                  <div class="showIcn">
                    <span class="icn-plus "></span>
                    <span class="icn-collect u-icn"></span>
                    <span class="icn-share u-icn"></span>
                    <span class="icn-download u-icn"></span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="歌手" width="155">
              <template slot-scope="{ row, $index }">
                <a href="javascript:;">{{ row.ar[0].name }}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 评论标头 -->
        <div class="main-h3 clearfix" id="coms">
          <h3>
            <span class="ff2">评论</span>
          </h3>
          <span class="sub">共 <span>198090</span> 条评论 </span>
        </div>
        <!-- 评论容器 -->
        <div class="main-comment">
          <div class="iptarea">
            <div class="heade-img">
              <img src="../../assets/images/png.png" width="50" height="50px" />
            </div>

            <el-form
              inline
              style="width:90%;float:right;position: relative;;top:-53px"
            >
              <el-input type="textarea" placeholder="评论" rows="3"></el-input>
            </el-form>
            <div class="submit">
              <span style="color:#999;">140 &nbsp; &nbsp; </span>
              <el-button type="primary" size="mini">提交</el-button>
            </div>
            <!-- 表情 -->
            <div class="express">
              <i class="emoji iconfont icon-nanguo"></i>
              <i class="emoji iconfont icon-aite"></i>
            </div>
          </div>
          <!-- 精彩评论 -->
          <div class="hot-comments">
            <div class="comment2">
              <h3>精彩评论</h3>
            </div>
            <!-- 评论 开始渲染数据 -->
            <div
              class="comment-item com-dotted clearfix"
              v-for="comments in getCommentLists"
              :key="comments.id"
            >
              <div class="user-img">
                <img v-lazy="comments.user.avatarUrl" />
              </div>
              <div class="cntwrap">
                <div class="catn">
                  <a class="name-a" href="javascript:;">{{
                    comments.user.nickname
                  }}</a>
                  <span class="comment-content">:{{ comments.content }}</span>
                </div>
                <div class="rp">
                  <div class="date">{{ commentTime(comments.time) }}</div>
                  <i class="icon-like"></i>
                  <a class="like" href="javascript:;">
                    ({{ comments.likedCount }})</a
                  >
                  <span class="sep"> | </span>
                  <a class="s-fc3" href="javascript:;">回复</a>
                </div>
              </div>
            </div>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="getCommentList"
              :total="total"
              style="text-align:center;margin-top:40px"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formaDate from "../../utils/formaDate.js";
import Rank from "../Rank/index";
export default {
  name: "TopList",

  data() {
    return {
      // 表格的移入移出

      id: 19723756,
      playlist: {},
      // 歌曲列表
      tracks: [],
      limit: 20,
      total: 0,
      cursor: 0,
      // 更新日期
      update: "每天更新",
      comId: 1407551413,
      page: 1,
      getCommentLists: [],
      tableHeaderStyle: {
        background: "#f5f5f5",
        padding: "6px 5px",
        border: "1px solid #d3d3d3",
      },
    };
  },
  watch: {
    id: {
      handler(newId, oldId) {
        this.getSong();
      },
    },
  },
  mounted() {
    this.getCommentList();
    this.getSong(this.id);
    this.id = this.$route.params.id;
    this.getSong();
  },
  methods: {
    getId(idOrUpdate) {
      const { id, update } = idOrUpdate;
      this.id = id;
      this.update = update;
      // console.log(this.update);
      this.getSong(this.id);
      // console.log(this.id);
    },
    // 获取歌曲的数据
    async getSong() {
      const result = await this.$API.toplist.getSongList(this.id);
      // console.log(result);
      const { playlist } = result;
      const { tracks } = result.playlist;
      this.playlist = playlist;
      this.tracks = tracks;
      // console.log(this.playlist, "playlist");
      // console.log(this.tracks, "tracks");
    },
    updateTime(time) {
      return formaDate(time, "m");
    },
    date(time) {
      return formaDate(time, "s");
    },
    commentTime(time) {
      return formaDate(time);
    },
    //获取评论的数据
    async getCommentList(pageNo = 1) {
      this.page = pageNo;
      // console.log(this.page);
      const result = await this.$API.toplist.getComment(
        this.comId,
        this.page,
        this.cursor
      );
      if (result.code === 200) {
        // this.getCommentList = result;
        // console.log(result);
        this.getCommentLists = result.data.comments;
        this.cursor = result.data.cursor;
        this.total = result.data.totalCount;
        // console.log(this.getCommentLists);
      }
    },

    //分页数据
  },
  components: {
    Rank,
  },
};
</script>

<style lang="less" reg="stylelesheet/less" scoped>
.tatol-container {
  width: 980px;
  height: 100%;
  // padding-top: 40px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3;

  // 右部分
  .right-container {
    height: 100%;
    width: 667px;
    padding: 40px 30px 70px 40px;
    float: left;
    border-left: 1px solid #d3d3d3;
    background: #fff;
    .g-mn3c {
      padding-bottom: 40px;
    }
    .top-title {
      width: 667px;
      height: 155px;
      .cover {
        float: left;
        right: 0;
        position: relative;
        display: inline;
        // margin: 0 -220px 0 0;
        padding: 3px;
        border: 1px solid #ccc;
        img {
          width: 150px;
          height: 150px;
          vertical-align: bottom;
        }
      }
      .cnt {
        position: absolute;
        float: right;
        margin-left: 187px;
        .cntc {
          .hd {
            position: relative;
            margin: 0 0 12px;
            line-height: 24px;
            margin: 20px 0 4px;
            h2 {
              line-height: 24px;
              font-size: 20px;
              font-weight: normal;
            }
          }
          .update {
            margin: 0 0 20px;
            line-height: 35px;
            // i图标
            .s-fc3 {
              color: #666;
              margin: 0 5px;
            }
            .fc4 {
              color: #999;
            }
          }
          // button按钮
          .btns {
            margin-bottom: 25px;
            margin-right: -10px;
          }
        }
      }
    }
    // 歌曲列表和评论
    .main-wrap12 {
      .main-h3 {
        height: 40px;
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        h3 {
          float: left;
          font-size: 20px;
          line-height: 28px;
          font-weight: normal;
        }
        .sub {
          color: #666;
          float: left;
          margin: 9px 0 0 20px;
        }
        .more {
          margin-top: 10px;
          float: right;

          strong {
            color: #c20c0c;
            font-weight: bold;
          }
        }
      }
      // 表格音乐列表
      .song-table {
        width: 665px;
        border: 1px solid #d3d3d3;
        margin-bottom: 40px;
        a:hover {
          text-decoration: underline;
        }
        .song-title {
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .song-name {
            color: #333;
            max-width: 200px;
            a {
              margin-left: 8px;
            }
            .song-small {
              color: #aeaeae;
            }
          }

          // 播放图
          .play-song {
            float: left;
            margin-right: 4px;
            background: url(../../assets/images/table.png);
            width: 17px;
            height: 17px;
            cursor: pointer;
            background-position: 0 -103px;
          }
          .play-song:hover {
            background-position: 0 -128px;
          }
        }
        .showIcn {
          display: none;
          .icn-plus {
            float: left;
            margin-top: 2px;
            background: url("../../assets/images/icon.png");
            width: 13px;
            height: 13px;
            background-position: 0 -700px;
          }
          .u-icn {
            float: left;
            width: 18px;
            height: 16px;
            background: url("../../assets/images/table.png");
            margin: 2px 0 0 4px;
            text-indent: -999px;
            overflow: hidden;
            cursor: pointer;
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
      }
      /deep/ .el-table--enable-row-hover .el-table__body tr:hover .showIcn {
        display: block;
      }
      /deep/ .el-table--enable-row-hover .el-table__body tr:hover .song-time {
        display: none;
      }

      // 评论
      .main-comment {
        .iptarea {
          height: 98px;
          width: 667px;
          margin-top: 20px;
          position: relative;
          .submit {
            position: absolute;
            right: 0;
            bottom: -15px;
          }
          // 坑  表情
          .express {
            position: absolute;
            left: 66px;
            bottom: -3px;
            .emoji {
              margin-right: 5px;
              font-size: 18px;
            }
          }
        }
        .comment2 {
          margin-top: 30px;
          height: 21px;
          width: 667px;
          border-bottom: 1px solid #cfcfcf;
        }
        // 评论虚线
        .com-dotted {
          border-top: 1px dotted #ccc;
        }
        .comment-item {
          padding: 15px 0;
          height: 52px;
          width: 667px;
          img {
            width: 50px;
            height: 50px;
            float: left;
          }
          .cntwrap {
            margin-left: 60px;
            .catn {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              span {
                width: 100%;
                overflow: hidden;
                line-height: 20px;
              }
              .name-a {
                color: #0c73c2;
                margin-right: 5px;
              }
            }
            .rp {
              margin-top: 15px;
              text-align: right;
              .date {
                float: left;
                margin: 0 !important;
                color: #999;
              }
              .like {
              }
              .icon-like {
                background: url("../../assets/images/icon2.png");
                margin-right: 3px;
                vertical-align: -2px;
                display: inline-block;
                overflow: hidden;
                cursor: pointer;
                font-size: 25px;
                width: 15px;
                height: 14px;
                background-position: -150px 0;
              }
              span {
                margin: 0 8px;
                color: #ccc;
              }
              .s-fc3 {
                color: #666;
              }
            }
          }
          a:link:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        // fenye
      }
    }
  }
}
</style>
