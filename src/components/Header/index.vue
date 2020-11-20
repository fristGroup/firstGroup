<template>
  <div class="g-topbar">
    <div class="m-top">
      <div class="m-top-container clearfix">
        <h1 class="logo">
          <a href="javascript:;">网易云音乐</a>
        </h1>
        <ul class="m-nav">
          <li
            :class="{
              navWraper: $route.path === '/discover' || $route.path === '/',
            }"
          >
            <!-- <router-link to="/" class="nav">发现音乐</router-link> -->
            <a href="javascript:;" class="nav" @click="to('/')">发现音乐</a>
            <i
              :class="{
                triangle:
                  $route.path.indexOf('/discover') != -1 || $route.path === '/',
              }"
            ></i>
          </li>
          <li :class="{ navWraper: $route.path === '/mymusic' }">
            <!-- <router-link to="/mymusic" class="nav">我的音乐</router-link> -->
            <a href="javascript:;" class="nav" @click="to('/mymusic')"
              >我的音乐</a
            >
            <i :class="{ triangle: $route.path === '/mymusic' }"></i>
          </li>
          <li :class="{ navWraper: $route.path === '/friend' }">
            <!-- <router-link to="/friend" class="nav">朋友</router-link> -->
            <a href="javascript:;" class="nav" @click="to('/friend')">朋友</a>
            <i :class="{ triangle: $route.path === '/friend' }"></i>
          </li>
          <li :class="{ navWraper: $route.path === '/shopping' }">
            <!-- <router-link to="/shopping" class="nav">商城</router-link> -->
            <a href="javascript:;" class="nav" @click="to('/shopping')">商城</a>
            <i :class="{ triangle: $route.path === '/shopping' }"></i>
          </li>
          <li :class="{ navWraper: $route.path === '/musician' }">
            <!-- <router-link to="/musician" class="nav">音乐人</router-link> -->
            <a href="javascript:;" class="nav" @click="to('/musician')"
              >音乐人</a
            >
            <i :class="{ triangle: $route.path === '/musician' }"></i>
          </li>
          <li :class="{ navWraper: $route.path === '/download' }">
            <!-- <router-link to="/download" class="nav">下载客户端</router-link> -->
            <a href="javascript:;" class="nav" @click="to('/download')"
              >下载客户端</a
            >
            <i class="hot"></i>
            <i :class="{ triangle: $route.path === '/download' }"></i>
          </li>
        </ul>

        <!-- <div class="loginContainer">
          <a href="javascript:;" class="loginLink">登录</a>
          <el-button type="text" @click="open" class="loginLink"
            >登录</el-button
          >
        </div> -->
        <div class="loginContainer">
          <!-- <a href="###" class="loginLink">登录</a> -->
          <!-- <el-button
            v-if="profile.nickname"
            type="text"
            @click="dialogFormVisible = true"
            class="loginLink"
            >{{ profile.nickname }}</el-button
          > -->
          <!-- start -->
          <div v-if="profile.nickname" style="position: absolute;">
            <img
              v-lazy="profile.avatarUrl"
              style="border-radius:30px;width:30px;height:30px;margin-top:20px"
            />
            <span
              @click="goOut"
              style="color:#ccc;position: relative;left:10px;top:-10px;cursor: pointer;"
              >退出</span
            >
          </div>

          <el-button
            v-else
            type="text"
            @click="dialogFormVisible = true"
            class="loginLink"
            >登录</el-button
          >

          <!-- end -->
        </div>
        <a href="javascript:;" class="createdCenter">创作者中心</a>

        <div class="searchContainer">
          <i class="searchIcon"></i>
          <div class="inputContainer">
            <input
              type="text"
              placeholder="音乐/视频/电台/用户"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='音乐/视频/电台/用户'"
              v-model="options.keywords"
              @keyup.enter="toSearch"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleBlur"
            />
            <div class="searchResult" v-show="searchResultShow">
              <p class="userResult" v-if="this.options.keywords">
                <a href="javascript:;">搜索{{ options.keywords }}相关用户</a>
                <i>></i>
              </p>
              <div class="rap">
                <div class="itm" v-if="songsList.length">
                  <h3 class="clearfix">
                    <i style="background-position: -35px -300px;"></i>
                    <em>单曲</em>
                  </h3>
                  <ul class="clearfix">
                    <li
                      v-for="(song, index) in songsList.slice(0, 3)"
                      :key="song.id"
                    >
                      <a href="javascript:;">{{ song.name }}</a>
                    </li>
                  </ul>
                </div>
                <div class="itm" v-if="artList.length">
                  <h3>
                    <i style="background-position: -50px -300px;"></i>
                    <em>歌手</em>
                  </h3>
                  <ul class="clearfix">
                    <li
                      v-for="(art, index) in artList.slice(0, 3)"
                      :key="art.id"
                    >
                      <a href="javascript:;">{{ art.name }}</a>
                    </li>
                  </ul>
                </div>
                <div class="itm" v-if="albumsList.length">
                  <h3>
                    <i style=" background-position: -35px -320px;"></i>
                    <em>专辑</em>
                  </h3>
                  <ul class="clearfix">
                    <li
                      v-for="(albums, index) in albumsList.slice(0, 3)"
                      :key="albums.id"
                    >
                      <a href="###">{{ albums.name }}</a>
                    </li>
                  </ul>
                </div>
                <div class="itm" v-if="songPlayList.length">
                  <h3>
                    <i style=" background-position: -50px -320px;"></i>
                    <em>歌单</em>
                  </h3>
                  <ul class="clearfix">
                    <li
                      v-for="(songPlay, index) in songPlayList.slice(0, 3)"
                      :key="songPlay.id"
                    >
                      <a href="###">{{ songPlay.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line" v-if="!$route.meta.isHideLine"></div>
    <div class="m-subnav" v-else>
      <div class="wrap">
        <ul class="nav">
          <li>
            <router-link to="/discover">
              <em
                :class="{
                  emShow: $route.path === '/discover' || $route.path === '/',
                }"
                >推荐</em
              >
            </router-link>
          </li>
          <li>
            <router-link to="/discover/toplist">
              <em
                :class="{
                  emShow: $route.path.indexOf('/discover/toplist') != -1,
                }"
                >排行榜</em
              >
            </router-link>
          </li>
          <li>
            <a href="javascript:;">
              <em>歌单</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em>主播电台</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em>歌手</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em>新碟上架</em>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹框 登录 -->
    <el-dialog title="手机号登录" width="30%" :visible.sync="dialogFormVisible">
      <el-form style="width:80%;margin-left:40px">
        <el-form-item>
          <!--  -->
          <el-input
            v-model="phone"
            placeholder="请输入手机号"
            autocomplete="off"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <!--  -->
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="请输入密码"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="tologin">登 录</el-button>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>
<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      //keyword: "",
      options: {
        keywords: "",
        type: 1,
        limit: 30,
        offest: 0,
      },
      searchResultShow: false,
      //登陆弹框
      dialogFormVisible: false,

      phone: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      songsList: (state) => state.search.songsList,
      albumsList: (state) => state.search.albumsList,
      artList: (state) => state.search.artList,
      songPlayList: (state) => state.search.songPlayList,
      userInfo: (state) => state.user.userInfo,
    }),
    ...mapGetters(["profile"]),
  },
  methods: {
    //登陆
    async tologin() {
      const { phone, password } = this;
      if (phone === "" || password === "") {
        alert("请输入手机号或密码");
        return;
      }
      try {
        await this.$store.dispatch("LoginUserInfo", { phone, password });
        this.dialogFormVisible = false;
        this.phone = "";
        this.password = "";
      } catch (error) {
        console.log("错误信息");
      }
    },
    //退出
    async goOut() {
      this.$store.dispatch("logout");
    },
    open() {
      this.$alert(
        "<div style='width:100%;height:20px;backgroundColor:yellow'>登录</div>",
        "登录",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
    to(path) {
      this.$router.push(path);
    },
    toSearch() {
      if (this.options.keywords) {
        this.$router.push({
          name: "search",
          params: { keywords: this.options.keywords },
        });
      } else {
        this.$router.push({ name: "search" });
      }
    },
    // 获取单曲数据
    getSongsList() {
      //this.options.keywords = this.$route.params.keyword;
      // 分发的action
      this.$store.dispatch("getSongsList", this.options);
    },
    // 获取专辑对象
    getAlbumsList() {
      //this.options.keywords = this.$route.params.keyword;
      // 分发的action
      this.options.type = 10;
      this.$store.dispatch("getAlbumsList", this.options);
    },
    // 获取歌手对象
    getArtList() {
      //this.options.keywords = this.$route.params.keyword;
      // 分发的action
      this.options.type = 100;
      this.$store.dispatch("getArtList", this.options);
    },
    // 获取歌单对象
    getSongPlayList() {
      //this.options.keywords = this.$route.params.keyword;
      // console.log("执行了")

      // 分发的action
      this.options.type = 1000;
      this.$store.dispatch("getSongPlayList", this.options);
    },
    handleInput() {
      // console.log(this.options.keywords)
      if (this.options.keywords.trim() === "") {
        this.searchResultShow = false;
        this.$store.dispatch("clearData");
        return;
      }
      this.searchResultShow = true;
      this.getSongsList();
      this.getAlbumsList();
      this.getSongPlayList();
      this.getArtList();
    },
    handleFocus() {
      if (this.options.keywords.trim() === "") return;
      this.searchResultShow = true;
    },
    handleBlur() {
      this.searchResultShow = false;
    },
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.g-topbar {
  width: 100%;
  .m-top {
    width: 100%;
    min-width: 1100px;
    // height: 70px;
    background: #242424;
    // border-bottom: 1px solid #000;

    .m-top-container {
      width: 1100px;
      margin: 0 auto;
      // overflow: hidden;

      .logo {
        float: left;
        width: 176px;
        height: 69px;
        background: url("./images/logo.png") no-repeat 0 0px;

        a {
          width: 157px;
          height: 69px;
          padding-right: 20px;
          font-size: 0;
        }
      }

      .m-nav {
        float: left;
        .navWraper {
          background-color: #000;
        }
        li {
          position: relative;
          float: left;

          &:hover {
            background-color: #000;
          }
          .nav {
            display: block;
            height: 69px;
            line-height: 69px;
            padding: 0 19px;
            font-size: 14px;
            color: #ccc;
            text-decoration: none;
          }

          .triangle {
            position: absolute;
            z-index: 10;
            width: 0;
            height: 0;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid;
            border-color: transparent transparent red transparent;
          }
          &:last-child {
            position: relative;
          }

          .hot {
            display: block;
            position: absolute;
            top: 21px;
            left: 100px;
            width: 28px;
            height: 19px;
            background: url("./images/logo.png") no-repeat -192px 0;
          }
        }
      }

      .loginContainer {
        float: right;
        height: 69px;
        line-height: 69px;
        padding: 0 22px 0 0;
        margin-left: 20px;
        .loginLink {
          font-size: 12px;
          color: #666;
          // display: block;
          text-decoration: none;
          &:hover {
            color: #787878;
          }
        }
      }

      .createdCenter {
        float: right;
        display: block;
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin: 19px 0 0 12px;
        text-decoration: none;
        border: 1px solid #4f4f4f;
        border-radius: 20px;
        &:hover {
          color: #fff;
          border: 1px solid #ccc;
        }
      }

      .searchContainer {
        float: right;
        width: 158px;
        height: 32px;
        background-color: #fff;
        border-radius: 32px;
        margin-top: 19px;
        .searchIcon {
          background: url("./images/logo.png") no-repeat -10px -108px;
          width: 13px;
          height: 14px;
          display: block;
          float: left;
          margin: 9px 0 0 10px;
        }
        .inputContainer {
          float: left;
          width: 126px;
          line-height: 16px;
          margin: 7px 0 0 8px;
          position: relative;
          input {
            outline: none;
            width: 90%;
            line-height: 16px;
            border: none;
            font-size: 12px;
          }
          .searchResult {
            background-color: white;
            position: absolute;
            box-sizing: border-box;
            border: 1px solid #bebebe;
            border-radius: 4px;
            width: 240px;
            top: 30px;
            left: -32px;
            z-index: 200;
            .userResult {
              height: 17px;
              padding: 11px 10px;
              border-bottom: 1px solid #e2e2e2;
            }
            .rap {
              .itm {
                h3 {
                  float: left;
                  width: 52px;
                  line-height: 17px;
                  padding: 10px 0 0 10px;
                  font-weight: normal;
                  i {
                    width: 14px;
                    height: 15px;
                    float: left;
                    margin: 2px 4px 0 0;
                    background: url("./images/icon.png") no-repeat;
                  }

                  em {
                    float: left;
                    line-height: 17px;
                    font-size: 12px;
                    font-style: normal;
                    text-align: left;
                  }
                }
                ul {
                  margin-left: 62px;
                  margin-top: -1px;
                  padding: 6px 0 5px;
                  border-top: 1px solid #e2e2e2;
                  border-left: 1px solid #e2e2e2;
                  li {
                    width: 100%;
                    float: left;
                    a {
                      display: block;
                      width: 100%;
                      text-indent: 12px;
                      line-height: 24px;
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
    }
  }

  .m-subnav {
    width: 100%;
    min-width: 1100px;
    height: 35px;
    box-sizing: border-box;
    background-color: #c20c0c;
    border-bottom: 1px solid #a40011;

    .wrap {
      width: 1100px;
      height: 34px;
      margin: 0 auto;
      .nav {
        overflow: hidden;
        padding-left: 180px;
        li {
          float: left;
          height: 34px;
          text-align: center;
          font-size: 12px;
          color: #333;
          a {
            display: block;
            line-height: 34px;
            color: #fff;
            text-decoration: none;
            em {
              display: inline-block;
              height: 20px;
              padding: 0 13px;
              margin: 7px 17px 0;
              border-radius: 20px;
              line-height: 21px;
              &:hover {
                background: #9b0909;
              }
            }
          }
          .emShow {
            background: #9b0909;
          }
        }
      }
    }
  }

  .line {
    height: 5px;
    box-sizing: border-box;
    background-color: #c20c0c;
    width: 100%;
  }
}
.el-message-box__wrapper .el-message-box__title {
  width: 100%;
  height: 20px;
  background-color: yellow;
}
</style>
