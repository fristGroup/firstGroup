<template>
  <div class="singerCon">
    <section class="singerContext">
      <el-row :gutter="20">
        <!-- 左侧nav导航栏 -->
        <el-col :span="4" class="singerLeft">
          <div class="grid-content bg-purple" @click="handleClick">
            <div class="singer-cat-nav">
              <h2 class="tit">推荐</h2>
              <ul class="navListOne">
                <li data-isAbcList="isAbcList">
                  - 推荐歌手
                </li>
                <li data-type="3" data-area="7" data-isAbcList="isAbcList">
                  - 入驻歌手
                </li>
              </ul>
              <div class="blk">
                <h2 class="tit">华语</h2>
                <ul class="navList">
                  <li data-type="1" data-area="7">- 华语男歌手</li>
                  <li data-type="2" data-area="7">- 华语女歌手</li>
                  <li data-type="3" data-area="7">- 华语组合/乐队</li>
                </ul>
              </div>
              <div class="blk">
                <h2 class="tit">欧美</h2>
                <ul class="navList">
                  <li data-type="1" data-area="96">- 欧美男歌手</li>
                  <li data-type="2" data-area="96">- 欧美女歌手</li>
                  <li data-type="3" data-area="96">- 欧美组合/乐队</li>
                </ul>
              </div>
              <div class="blk">
                <h2 class="tit">日本</h2>
                <ul class="navList">
                  <li data-type="1" data-area="8">- 日本男歌手</li>
                  <li data-type="2" data-area="8">- 日本女歌手</li>
                  <li data-type="3" data-area="8">- 日本组合/乐队</li>
                </ul>
              </div>
              <div class="blk">
                <h2 class="tit">韩国</h2>
                <ul class="navList">
                  <li data-type="1" data-area="16">- 韩国男歌手</li>
                  <li data-type="2" data-area="16">- 韩国女歌手</li>
                  <li data-type="3" data-area="16">- 韩国组合/乐队</li>
                </ul>
              </div>
              <div class="blk">
                <h2 class="tit">其他</h2>
                <ul class="navList">
                  <li data-type="1" data-area="0">- 其他男歌手</li>
                  <li data-type="2" data-area="0">- 其他女歌手</li>
                  <li data-type="3" data-area="0">- 其他组合/乐队</li>
                </ul>
              </div>
            </div>
          </div></el-col
        >
        <!-- 右侧分类区 -->
        <el-col :span="20" class="singerRight">
          <div class="grid-content bg-purple">
            <!-- 上面歌手详情页面 -->
            <el-row class="singerList">
              <el-col :span="24"
                ><div class="grid-content bg-purple-dark">
                  <div class="singerCategory">
                    <h3><span>歌手</span></h3>
                    <a>更多 ></a>
                  </div>
                  <!-- 字母跳转区域 -->
                  <ul
                    class="n-ltlst f-cb"
                    id="initial-selector"
                    v-show="isAbcList"
                  >
                    <li class="remen">
                      <a href="" class="ch f-fs0 z-slt">热门</a>
                    </li>
                    <li>
                      <a href="" class="">A</a>
                    </li>
                    <li>
                      <a href="" class="">B</a>
                    </li>
                    <li>
                      <a href="" class="">C</a>
                    </li>
                    <li>
                      <a href="" class="">D</a>
                    </li>
                    <li>
                      <a href="" class="">E</a>
                    </li>
                    <li>
                      <a href="" class="">F</a>
                    </li>
                    <li>
                      <a href="" class="">G</a>
                    </li>
                    <li>
                      <a href="" class="">H</a>
                    </li>
                    <li>
                      <a href="" class="">I</a>
                    </li>
                    <li>
                      <a href="" class="">J</a>
                    </li>
                    <li>
                      <a href="" class="">K</a>
                    </li>
                    <li>
                      <a href="" class="">L</a>
                    </li>
                    <li>
                      <a href="" class="">M</a>
                    </li>
                    <li>
                      <a href="" class="">N</a>
                    </li>
                    <li>
                      <a href="" class="">O</a>
                    </li>
                    <li>
                      <a href="" class="">P</a>
                    </li>
                    <li>
                      <a href="" class="">Q</a>
                    </li>
                    <li>
                      <a href="" class="">R</a>
                    </li>
                    <li>
                      <a href="" class="">S</a>
                    </li>
                    <li>
                      <a href="" class="">T</a>
                    </li>
                    <li>
                      <a href="" class="">U</a>
                    </li>
                    <li>
                      <a href="" class="">V</a>
                    </li>
                    <li>
                      <a href="" class="">W</a>
                    </li>
                    <li>
                      <a href="" class="">X</a>
                    </li>
                    <li>
                      <a href="" class="">Y</a>
                    </li>
                    <li>
                      <a href="" class="">Z</a>
                    </li>
                    <li class="qita">
                      <a href="" class="ch f-fs0 ">其他</a>
                    </li>
                  </ul>
                  <div class="singeListCon">
                    <ul class="singerNameList">
                      <li
                        v-for="item in singerClassificationList"
                        :key="item.id"
                      >
                        <!-- :click="sendMsg(item.id, item.name, item.picUrl)" -->
                        <!-- to="/singerAlbum" -->
                        <a
                          class="singerNameDetails"
                          @click="
                            ToSingerAlbum(item.id, item.name, item.picUrl)
                          "
                        >
                          <img
                            v-lazy="item.picUrl"
                            :alt="item.name + '的音乐'"
                            :title="item.name + '的音乐'"
                          />
                          <div class="setIco">
                            <p>
                              {{ item.name }}
                            </p>
                            <div></div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div></div
              ></el-col>
            </el-row>

            <!-- 下面歌手名字区域 -->
            <div class="singerName-con">
              <ul class="singerName-conList">
                <li v-for="item in singerClassName" :key="item.id">
                  <div class="setSingerName">
                    <router-link :to="'/singerAlbum/' + item.id">
                      {{ item.name }}
                      <div></div>
                    </router-link>
                  </div>
                </li>
              </ul>
            </div></div
        ></el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
//引入Vuex中的辅助函数
// import { mapState } from "vuex";
export default {
  name: "FindSinger",
  //数据
  data() {
    return {
      //点击华语,欧美等分类时右侧字母导航栏显示
      isAbcList: false,
      //点击显示样式
      isshow: false,
      //分类导航数组
      singerClassificationList: [],
      //页面下方需要的歌手名字
      singerClassName: [],
    };
  },
  //计算属性
  computed: {
    // //通过Vue的辅助函数来获取home中的状态数据
    // ...mapState({}),
  },
  //页面渲染开始前的回调
  mounted() {
    this.getrecommendSinger();
  },
  //方法
  methods: {
    //获取页面开始时渲染的默认热门榜单
    async getrecommendSinger() {
      const result = await this.$API.singer.reqRecommendSinger();
      // console.log(result);
      this.singerClassificationList = result.artists.slice(0, 10);

      this.singerClassName = result.artists.filter((item, index) => {
        return index > 10;
      }, []);
      // console.log(this.singerClassName);
    },
    //获取歌手分类信息
    async getSingerList(type, area) {
      const result = await this.$API.singer.reqSingerDetails(type, area);
      this.singerClassificationList = result.artists.slice(0, 10);
      this.singerClassName = result.artists.filter((item, index) => {
        return index > 10;
      }, []);
      // console.log(this.singerClassificationList);
    },
    //事件委托
    handleClick(e) {
      // console.log(e);
      if (e.target.tagName === "LI") {
        const { type, area } = e.target.dataset;
        if (!e.target.dataset.isabclist) {
          this.isAbcList = true;
          this.singerClassificationList = [];
          this.getSingerList(type, area);
        } else {
          this.isAbcList = false;
          this.singerClassificationList = [];
          this.getrecommendSinger();
        }

        // console.log(e.target.dataset.type);
        // const type = e.tar.dataset.type;
        // const area = e.tar.dataset.area;

        // if (!e.target.index && e.target.index !== 2) {

        // } else {

        // }

        // console.log(e);
      }
    },
    // 点击传参
    ToSingerAlbum(id, name, url) {
      this.$router.push({
        name: "singerAlbum",
        params: {
          id,
          name,
          url,
        },
      });
    },
    //传值
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// * {
//   margin: 0;
//   padding: 0;
//   list-style: none;
// }
.singerCon {
  width: 100%;
  background-color: #f5f5f5;
}
.singerContext {
  width: 50%;
  border: 1px solid #cccccc;
  // min-width: 980px;
  min-width: 780px;
  margin: 0 auto;
  padding: 0 10px;
}
//左侧导航栏样式
.singerContext .singerLeft {
  background-color: #f9f9f9;
  padding-top: 50px;
  font-size: 12px;
  color: #333;

  .singer-cat-nav {
    .navListOne {
      li {
        // list-style: disc;
        padding-left: 10px;
        height: 29px;
        line-height: 29px;
        margin: 2px 0;
        cursor: pointer;
      }
      .active {
        color: #c20c0c;
        border: 1px solid #cccccc;
        border-radius: 3px;
      }
    }
    .blk {
      margin: 5px 0 0;
      padding-top: 16px;
      border-top: 1px solid #d3d3d3;
      .navList {
        li {
          padding-left: 10px;
          height: 29px;
          line-height: 29px;
          margin: 2px 0;
          cursor: pointer;
        }
        .active {
          color: #c20c0c;
          border: 1px solid #cccccc;
          border-radius: 3px;
        }
      }
    }
  }
}
// 右侧分类区样式
.singerContext .singerRight {
  .singerList {
    width: 720px;
    margin: 40px auto;
    // 上半区域
    .singerCategory {
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 24px;
        font-weight: normal;
      }
      a {
        float: right;
        margin-top: 14px;
      }
    }
    //字母跳转区
    .n-ltlst {
      margin-top: 20px;
      margin-left: -3px;
      font-size: 12px;
      color: #333;
      li {
        float: left;
        margin-left: 3px;
        font-size: 14px;
        width: 21px;
        height: 24px;

        a {
          line-height: 24px;
          text-align: center;
        }
      }
      .remen {
        text-align: center;
        width: 45px;
        background-color: #c20c0c;
        a {
          color: #fff;
        }
      }
      .qita {
        padding-left: 0;
        text-align: center;
        width: 45px;
      }
    }
    .singeListCon {
      width: 720px;
      overflow: hidden;
      .singerNameList {
        width: 740px;
        li {
          float: left;
          margin-right: 18px;
          margin-top: 20px;
          cursor: pointer;
          .singerNameDetails {
            img {
              height: 130px;
              width: 130px;
            }
            .setIco {
              p {
                float: left;
                width: 110px;
                height: 30px;
                line-height: 20px;
                margin-top: 8px;
                font-size: 12px;
                color: #000;
              }
              div {
                padding-right: 2px;
                float: right;
                margin-top: 8px;
                width: 17px;
                height: 18px;
                background: url("../../assets/images/ren.png") no-repeat 0 0;
              }
            }
          }
        }
      }
    }
  }
  //右侧下方样式
  .singerName-con {
    width: 720px;
    margin: 0 auto;
    padding-top: 10px;
    border-top: 1px dashed #000000;
    .singerName-conList {
      width: 740px;
      li {
        width: 130px;
        margin-right: 18px;
        float: left;

        .setSingerName {
          a {
            margin-right: 5px;
            float: left;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #000;
          }
          div {
            float: right;
            width: 17px;
            height: 18px;
            background: url("../../assets/images/ren.png") no-repeat 0 0;
          }
        }
      }
    }
  }
}
</style>
