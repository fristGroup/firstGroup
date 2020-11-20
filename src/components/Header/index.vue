<template>
  <div class="g-topbar">
    <div class="m-top">
      <div class="m-top-container">
        <h1 class="logo">
          <a href="###">网易云音乐</a>
        </h1>
        <ul class="m-nav">
          <li>
            <a href="###">发现音乐</a>
            <i class="triangle"></i>
          </li>
          <li>
            <a href="###">我的音乐</a>
          </li>
          <li>
            <a href="###">朋友</a>
          </li>
          <li>
            <a href="###">商城</a>
          </li>
          <li>
            <a href="###">音乐人</a>
          </li>
          <li>
            <a href="###">下载客户端</a>
            <i class="hot"></i>
          </li>
        </ul>

        <div class="loginContainer">
          <!-- <a href="###" class="loginLink">登录</a> -->
          <el-button type="text" @click="open" class="loginLink"
            >登录</el-button
          >
        </div>
        <a href="###" class="createdCenter">创作者中心</a>

        <div class="searchContainer">
          <i class="searchIcon"></i>
          <div class="inputContainer">
            <input
              type="text"
              placeholder="音乐/视频/电台/用户"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='音乐/视频/电台/用户'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="m-subnav">
      <div class="wrap">
        <ul class="nav">
          <li>
            <a href="###">
              <em>推荐</em>
            </a>
          </li>
          <li>
            <a href="###">
              <em>排行榜</em>
            </a>
          </li>
          <li>
            <a href="###">
              <em>歌单</em>
            </a>
          </li>
          <li>
            <a href="###">
              <em>主播电台</em>
            </a>
          </li>
          <li>
            <a href="###">
              <em>歌手</em>
            </a>
          </li>
          <li>
            <a href="###">
              <em>新碟上架</em>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    open() {
      this.$alert(
        "<div style='width:100%;height:20px;backgroundColor:yellow'>登录</div>",
        "登录",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.g-topbar {
  width: 100%;
  .m-top {
    width: 100%;
    // height: 70px;
    background: #242424;
    // border-bottom: 1px solid #000;

    .m-top-container {
      width: 1100px;
      margin: 0 auto;
      overflow: hidden;

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

        li {
          position: relative;
          float: left;
          &:first-child {
            background-color: #000;
          }
          &:hover {
            background-color: #000;
          }
          a {
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

          input {
            outline: none;
            width: 90%;
            line-height: 16px;
            border: none;
            font-size: 12px;
          }
        }
      }
    }
  }

  .m-subnav {
    width: 100%;
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
          &:first-child em {
            background: #9b0909;
          }
        }
      }
    }
  }
}
.el-message-box__wrapper .el-message-box__title {
  width: 100%;
  height: 20px;
  background-color: yellow;
}
</style>
