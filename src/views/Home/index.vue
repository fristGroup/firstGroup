<template>
  <div class="home">
    <div class="carouselContainer">
      <Carousel :carouselList="carouselList" />
      <!-- <div class="download"></div> -->
    </div>
    <div class="centerContainer">
      <div class="center">
        <div class="left">
          <div class="leftContainer">
            <div class="hotRecommendWrap">
              <div class="hotRecommendNav">
                <a href="javascript:;" class="hotRecommend">热门推荐</a>
                <div class="navContent">
                  <span v-for="(item, index) in hotRecommendNav" :key="item.id">
                    <a href="javascript:;">{{ item.name }}</a>
                    <span
                      class="line"
                      v-if="!(index === hotRecommendNav.length - 1)"
                      >|</span
                    >
                  </span>

                  <!-- <a href="javascript:;">流行</a>
                  <span class="line">|</span>
                  <a href="javascript:;">摇滚</a>
                  <span class="line">|</span>
                  <a href="javascript:;">民谣</a>
                  <span class="line">|</span>
                  <a href="javascript:;">电子</a> -->
                </div>
                <span class="more">
                  <a href="javascript:;">更多</a>
                  <i class="cor"></i>
                </span>
              </div>

              <ul class="m-cvrlst">
                <li
                  v-for="hotRecommend in hotRecommendList"
                  :key="hotRecommend.id"
                >
                  <div class="u-cover">
                    <img v-lazy="hotRecommend.picUrl" alt="" />
                    <a href="javascript:;" class="msk"></a>
                    <div class="bottom">
                      <a href="javascript:;" class="icon-play"></a>
                      <span class="icon-headset"></span>
                      <span class="nb">{{
                        hotRecommend.playCount / 10000 > 0
                          ? parseInt(hotRecommend.playCount / 10000) + "万"
                          : hotRecommend.playCount
                      }}</span>
                    </div>
                  </div>
                  <p class="dec">
                    <a href="javascript:;" class="tit">
                      {{ hotRecommend.name }}
                    </a>
                  </p>
                </li>
              </ul>
            </div>

            <div class="newPlateWrap">
              <div class="newPlateNav">
                <a href="javascript:;" class="newPlat">新碟上架</a>
                <span class="more">
                  <a href="javascript:;">更多</a>
                  <i class="cor"></i>
                </span>
              </div>

              <div class="n-disk">
                <ImageList :diskImageList="diskImageList" />
              </div>
            </div>

            <div class="topListWrap">
              <div class="topListNav">
                <a href="javascript:;" class="topList">榜单</a>
                <span class="more">
                  <a href="javascript:;">更多</a>
                  <i class="cor"></i>
                </span>
              </div>
              <div class="n-bilst">
                <dl
                  class="blk"
                  v-for="(top, topIndex) in topList"
                  :key="top.id"
                >
                  <dt class="top">
                    <div class="cver">
                      <img v-lazy="top.coverImgUrl" alt="" class="j-img" />
                      <a href="javascript:;#" class="msk"></a>
                    </div>
                    <div class="tit">
                      <a href="javascript:;">
                        {{ top.name }}
                      </a>
                      <div class="btn">
                        <a href="javascript:;" title="播放" class="bg-play"></a>
                        <a
                          href="javascript:;"
                          title="收藏"
                          class="bg-collect"
                        ></a>
                      </div>
                    </div>
                  </dt>
                  <dd>
                    <ol v-if="topDetailList[topIndex]">
                      <li
                        v-for="(topDetail, index) in topDetailList[topIndex]
                          .tracks"
                        :key="topDetail.id"
                        :data-topId="topDetail.id"
                        @mouseenter="
                          isIconShow($event, topIndex + '' + topDetail.id)
                        "
                        @mouseleave="isIconHide($event, topDetail.id)"
                      >
                        <span class="no" :class="{ noTop: index < 3 }">{{
                          index + 1
                        }}</span>
                        <a href="javascript:;">{{ topDetail.name }}</a>
                        <div
                          class="oper"
                          v-show="currentId === topIndex + '' + topDetail.id"
                        >
                          <a href="javascript:;#" title="播放"></a>
                          <a href="javascript:;#" title="添加到播放列表"></a>
                          <a href="javascript:;#" title="收藏"></a>
                        </div>
                      </li>
                    </ol>
                    <div class="more">
                      <a href="javascript:;#">查看全部></a>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="n-user-profile">
            <div class="n-myinfo">
              <p class="note">
                登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
              </p>
              <a href="javascript:;" class="btn">用户登录</a>
            </div>
          </div>
          <div class="n-singer">
            <div class="v-hd3">
              <span class="f-fl">入驻歌手</span>
              <a href="javascript:;" class="more">查看全部 ></a>
            </div>
            <ul class="n-enter">
              <li v-for="(singer, index) in singersList" :key="singer.id">
                <a href="javascript:;#" class="itm">
                  <div class="head">
                    <img class="j-img" v-lazy="singer.img1v1Url" />
                  </div>
                  <div class="ifo">
                    <h4>
                      <span class="nm">{{ singer.name }}</span>
                    </h4>
                    <p class="f-thide s-fc3">
                      {{ singer.singerInfo }}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
            <div class="toMusicPresonWrap">
              <a href="javascript:;" class="toMusicPresonBtn">
                <i>申请成为网易音乐人</i>
              </a>
            </div>
          </div>
          <div class="n-dj">
            <h3 class="v-hd3">热门主播</h3>
            <ul class="n-hotdj">
              <li v-for="(dj, index) in popularDjList" :key="dj.id">
                <a href="javascript:;" class="cver">
                  <img v-lazy="dj.avatarUrl" alt="" class="j-img" />
                </a>
                <div class="info">
                  <p>
                    <a href="javascript:;">{{ dj.nickName }}</a>
                  </p>
                  <p>{{ dj.nickName }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入的是图片轮播图组件
import ImageList from "./ImageList/ImageList";
export default {
  name: "Home",
  components: {
    ImageList,
  },
  data() {
    return {
      currentId: "",
      carouselList: [],
      hotRecommendList: [],
      hotRecommendNav: [],
      diskImageList: [],
      popularDjList: [],
      singersList: [],
      topList: [],
      topDetailList: [],
      iconShow: false,
    };
  },
  async mounted() {
    //获取主页的大轮播图
    this.getCarouselList();
    //获取榜单
    await this.getTopList();
    //获取榜单详情
    this.getTopDetailList();
    //获取热门推荐的导航栏
    this.getHotRecommendNav();
    //获取热门推荐
    this.getHotRecommendList();
    //获取新碟上架
    this.getDiskImageList();
    //获取热门主播
    this.getPopularDj();
    //获取入驻歌手
    await this.getSingerList();
  },
  methods: {
    isIconShow(event, id) {
      // console.log("event", event);
      // console.log(id, event);
      // console.log(id, event.target.dataset.topid);
      this.currentId = id;
    },
    isIconHide(event, id) {
      this.currentId = "";
    },
    async getCarouselList() {
      const result = await this.$API.banners.getBannersList();
      // console.log(result);
      if (result.code === 200) {
        this.carouselList = result.banners;
      }
    },
    async getHotRecommendList() {
      const result = await this.$API.hotRecommend.getHotRecommendList();
      // console.log(result);
      if (result.code === 200) {
        this.hotRecommendList = result.result;
      }
    },
    async getHotRecommendNav() {
      const result = await this.$API.hotRecommend.getHotRecommendNav();
      // console.log(result);
      if (result.code === 200) {
        this.hotRecommendNav = result.tags.slice(0, 5);
      }
    },
    async getDiskImageList() {
      const result = await this.$API.banners.getNewAlbumList();
      // console.log(result);
      if (result.code === 200) {
        this.diskImageList = result.albums.slice(0, 10);
      }
    },
    async getPopularDj() {
      const result = await this.$API.popularDj.getPopularDjList();
      // console.log(result);
      if (result.code === 200) {
        this.popularDjList = result.data.list;
      }
    },
    async getSingerList() {
      const result = await this.$API.singers.getSingerList();

      if (result.code === 200) {
        this.singersList = result.artists;
        const promises = result.artists.map((item, index) => {
          return this.getSingerInfo(item.id);
        });
        const singerInfo = await Promise.all(promises);
        this.singersList = this.singersList.map((item, index) => {
          return {
            ...item,
            singerInfo: singerInfo[index],
          };
        });

        // singerInfo=res.
      }
    },
    async getSingerInfo(id) {
      const result = await this.$API.singers.getSingerInfo(id);
      // const briefDesc = "";
      // this.$API.singers.getSingerInfo(id).then((success) => {
      //   const briefDesc = success.briefDesc;
      // });

      if (result.code === 200) {
        // console.log(result.briefDesc);
        return result.briefDesc;
      }
    },
    async getTopList() {
      const result = await this.$API.topList.getTopList();
      // console.log(result);
      if (result.code === 200) {
        this.topList = result.list.splice(0, 3);
      }
    },
    async getTopDetailList() {
      const { topList, topDetailList } = this;
      // console.log(topList);
      const promises = topList.map((item, index) => {
        let result = this.$API.topList.getTopDetailList(item.id);
        return result;
      });
      // console.log(promises);
      const res = await Promise.all(promises);
      // console.log(res);
      res.forEach((item, index) => {
        topDetailList.push({ tracks: item.playlist.tracks.slice(0, 10) });
      });
      this.topDetailList = topDetailList;
    },
  },
};
</script>
<style lang="less" reg="stylesheet/less" scoped>
.home {
  background: #f5f5f5;
  .carouselContainer {
    width: 100%;  
    height: 285px;
  }
  .centerContainer {
    width: 980px;
    margin: 0 auto;
    overflow: hidden;
    background: white;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    .left {
      width: 729px;
      float: left;
      border-right: 1px solid #d3d3d3;
      .leftContainer {
        padding: 20px 20px 40px;
        width: 100%;
        box-sizing: border-box;

        .hotRecommendWrap {
          margin-bottom: 35px;
          .hotRecommendNav {
            height: 33px;
            padding: 0 10px 0 34px;
            background: url("./images/bgImg.png") no-repeat -225px -156px;
            border-bottom: 2px solid #c10d0c;

            .hotRecommend {
              text-decoration: none;
              float: left;
              font-size: 20px;
              font-weight: normal;
              line-height: 28px;
            }
            .navContent {
              float: left;
              margin: 7px 0 0 20px;
              .line {
                margin: 0 10px;
                color: #ccc;
              }
            }

            .more {
              float: right;
              margin-top: 9px;

              .cor {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-left: 4px;
                vertical-align: middle;
                background: url("./images/bgImg.png") no-repeat 0 -240px;
              }
            }
          }

          .m-cvrlst {
            display: flex;
            margin-top: 20px;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
              width: 140px;
              height: 204px;
              margin-bottom: 30px;

              .u-cover {
                width: 140px;
                height: 140px;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                }
                .msk {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                }
                .bottom {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 27px;

                  background: url("./images/coverall.png") no-repeat 0 -537px;
                  color: #ccc;

                  .icon-play {
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    width: 16px;
                    height: 17px;
                    background: url("./images/icon.png") no-repeat 0 0;
                    &:hover {
                      background: url("./images/icon.png") no-repeat 0 -60px;
                    }
                  }

                  .icon-headset {
                    float: left;
                    width: 14px;
                    height: 11px;
                    background: url("./images/icon.png") no-repeat 0 -24px;
                    margin: 9px 5px 9px 10px;
                  }
                  .nb {
                    float: left;
                    margin: 7px 0 0 0;
                  }
                }
              }

              .dec {
                margin: 8px 0 3px;
                font-size: 14px;
              }
            }
          }
        }

        .newPlateWrap {
          .newPlateNav {
            height: 33px;
            padding: 0 10px 0 34px;
            background: url("./images/bgImg.png") no-repeat -225px -156px;
            border-bottom: 2px solid #c10d0c;

            .newPlat {
              text-decoration: none;
              float: left;
              font-size: 20px;
              font-weight: normal;
              line-height: 28px;
            }
            .more {
              float: right;
              margin-top: 9px;

              .cor {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-left: 4px;
                vertical-align: middle;
                background: url("./images/bgImg.png") no-repeat 0 -240px;
              }
            }
          }

          .n-disk {
            height: 186px;
            margin: 20px 0 37px;
            border: 1px solid #d3d3d3;
            background: #f5f5f5;
          }
        }

        .topListWrap {
          .topListNav {
            height: 33px;
            padding: 0 10px 0 34px;
            background: url("./images/bgImg.png") no-repeat -225px -156px;
            border-bottom: 2px solid #c10d0c;

            .topList {
              text-decoration: none;
              float: left;
              font-size: 20px;
              font-weight: normal;
              line-height: 28px;
            }

            .more {
              float: right;
              margin-top: 9px;

              .cor {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-left: 4px;
                vertical-align: middle;
                background: url("./images/bgImg.png") no-repeat 0 -240px;
              }
            }
          }

          .n-bilst {
            width: 690px;
            height: 472px;
            margin-top: 20px;
            padding-left: 1px;
            background: url("./images/topList.png") no-repeat;

            .blk {
              float: left;
              width: 230px;
              .top {
                height: 100px;
                padding: 20px 0 0 19px;
                .cver {
                  float: left;
                  position: relative;
                  .j-img {
                    display: block;
                    width: 80px;
                    height: 80px;
                  }
                  .msk {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    top: 0;
                    left: 0;
                  }
                }

                .tit {
                  float: left;
                  width: 116px;
                  margin: 6px 0 0 10px;
                  font-size: 14px;

                  a {
                    color: #333;
                    font-weight: bold;
                    display: block;
                    width: 116px;
                  }

                  .btn {
                    margin-top: 10px;
                    a {
                      display: block;
                      float: left;
                      width: 22px;
                      height: 22px;
                      margin-right: 10px;
                      background: url("./images/index.png") no-repeat;
                    }
                    .bg-play {
                      background-position: -267px -205px;
                    }
                    .bg-collect {
                      background-position: -300px -205px;
                    }
                  }
                }
              }

              dd {
                ol {
                  height: 319px;
                  margin-left: 50px;
                  line-height: 32px;
                  li {
                    height: 32px;
                    .no {
                      float: left;
                      position: relative;
                      width: 35px;
                      height: 32px;
                      margin-left: -35px;
                      text-align: center;
                      color: #666;
                      font-size: 16px;
                    }
                    .noTop {
                      color: #c10d0c;
                    }
                    a {
                      float: left;
                      width: 96px;
                      height: 32px;
                      color: #000;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .songShow {
                      width: 170px;
                    }
                    .iconShow {
                      display: block;
                    }
                    .oper {
                      float: right;
                      width: 82px;
                      margin-top: 7px;
                      // display: none;
                      a {
                        float: left;
                        width: 17px;
                        height: 17px;
                        margin-right: 10px;

                        &:nth-child(1) {
                          background: url("./images/index.png") no-repeat -267px -268px;
                        }
                        &:nth-child(2) {
                          background: url("./images/icon1.png") no-repeat 0 -700px;
                          margin: 2px 6px 0 0;
                        }
                        &:nth-child(3) {
                          background: url("./images/index.png") no-repeat -297px -268px;
                        }
                      }
                    }
                  }
                }
                .more {
                  font-size: 12px;
                  color: #333;
                  height: 32px;
                  margin-right: 32px;
                  text-align: right;
                  line-height: 32px;
                  a {
                    color: #000;
                  }
                }
              }
            }
          }
        }
      }
    }
    .right {
      float: right;
      width: 250px;

      .n-user-profile {
        .n-myinfo {
          height: 126px;
          background: url("./images/index.png") no-repeat 0 0;

          .note {
            width: 205px;
            margin: 0 auto;
            padding: 16px 0;
            line-height: 22px;
          }
          .btn {
            display: block;
            width: 100px;
            height: 31px;
            margin: 0 auto;
            line-height: 31px;
            text-align: center;
            color: #fff;
            text-shadow: 0 1px 0 #8a060b;
            background: url("./images/index.png") no-repeat 0 -195px;
          }
        }
      }

      .n-singer {
        margin-top: 15px;
        .v-hd3 {
          height: 23px;
          margin: 0 20px;
          border-bottom: 1px solid #ccc;
          color: #333;
          font-weight: bold;
          .f-fl {
            float: left;
          }
          .more {
            float: right;
            font-weight: normal;
          }
        }

        .n-enter {
          margin: 6px 0 14px 20px;
          overflow: hidden;
          li {
            margin-top: 14px;
            float: left;
            width: 210px;
            height: 62px;
            background: #fafafa;
            .itm {
              .head {
                float: left;
                width: 62px;
                height: 62px;
                .j-img {
                  display: block;
                  width: 62px;
                  height: 62px;
                }
              }
              .ifo {
                float: left;
                width: 133px;
                height: 60px;
                padding-left: 14px;
                border: 1px solid #e9e9e9;
                border-left: none;
                h4 {
                  margin-top: 8px;
                  .nm {
                    font-size: 14px;
                    font-weight: bold;
                  }
                }

                .f-thide {
                  margin-top: 8px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }

        .toMusicPresonWrap {
          font-size: 12px;
          color: #333;
          .toMusicPresonBtn {
            display: block;
            width: 205px;
            margin-left: 20px;
            border-radius: 4px;
            border: 1px solid #d3d3d3;
            background-color: #fafafa;
            text-decoration: none;
            i {
              text-align: center;
              display: block;
              width: 170px;
              height: 31px;
              line-height: 31px;
              font-weight: bold;
              padding: 0 15px 0 20px;
            }
          }
        }
      }

      .n-dj {
        margin-top: 30px;
        .v-hd3 {
          width: 100%;
          height: 23px;
          margin: 0 20px;
          border-bottom: 1px solid #ccc;
          color: #333;
        }
        .n-hotdj {
          margin: 20px 0 0 20px;
          li {
            float: left;
            width: 210px;
            height: 50px;
            .cver {
              float: left;
              width: 40px;
              margin-right: 10px;
              .j-img {
                width: 40px;
                height: 40px;
                box-shadow: 0 0 1px #333333 inset;
              }
            }
            .info {
              float: left;
              width: 160px;
              line-height: 21px;
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
