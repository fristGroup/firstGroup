<template>
  <!-- 左部分 -->
  <div class="left-container ">
    <h2 class="left-note">云音乐飙升榜</h2>
    <div
      class="data"
      @click="toTopList(tfl.id, tfl.updateFrequency)"
      v-for="tfl in topFirstList"
      :key="tfl.id"
    >
      <!-- 1 -->
      <ul class="card">
        <li class="mine z-selected clearfix">
          <div class="card-item">
            <div class="left-img">
              <a href="javascript:;">
                <img :src="tfl.coverImgUrl" />
              </a>
            </div>
            <p class="name">
              <a href="javascript:;">{{ tfl.name }}</a>
            </p>
            <p class="s-fc4">{{ tfl.updateFrequency }}</p>
          </div>
        </li>
      </ul>
    </div>
    <h2 class="left-note left-note-2">全球媒体榜</h2>
    <div
      class="data-2"
      v-for="tbl in topLastList"
      :key="tbl.id"
      @click="toTopList(tbl.id, tbl.updateFrequency)"
    >
      <ul class="card">
        <li class="mine z-selected clearfix">
          <div class="card-item">
            <div class="left-img">
              <a href="javascript:;">
                <img :src="tbl.coverImgUrl" alt="" />
              </a>
            </div>
            <p class="name">
              <a href="javascript:;">{{ tbl.name }}</a>
            </p>
            <p class="s-fc4">{{ tbl.updateFrequency }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data() {
    return {
      topFirstList: [],
      topLastList: [],
    };
  },

  mounted() {
    this.getTopList();
  },
  methods: {
    async getTopList() {
      const result = await this.$API.toplist.getTopList();
      if (result.code === 200) {
        // console.log(result);
        const { list } = result;
        this.topFirstList = list.slice(0, 5);
        this.topLastList = list.slice(5);
      }
    },
    toTopList(id, update) {
      // console.log(id);
      this.$emit("getId", { id, update });
    },
  },
};
</script>

<style lang="less" reg="stylelesheet/less" scoped>
// 左部分
.left-container {
  width: 240px;
  height: 100%;
  background-color: #f5f5f5;
  float: left;
  padding-top: 40px;

  .left-note {
    padding: 0 10px 12px 15px;
    font-size: 14px;
    color: #000;
  }
  .left-note-2 {
    margin-top: 20px;
  }
  .card {
    width: 240px;
    height: 62px;

    cursor: pointer;
    vertical-align: middle;
    // li
    .mine {
      padding: 10px 0 10px 20px;
      height: 42px;
      .card-item {
        padding-left: 50px;
        .left-img {
          display: inline;
          float: left;
          margin-left: -50px;
          overflow: hidden;
          width: 40px;
          a {
            display: block;
            position: relative;
            width: 40px;
            height: 40px;
            img {
              width: 40px;
              height: 40px;
            }
          }
        }
        .name {
          width: 150px;
          overflow: hidden;

          margin: 2px 0 8px 0;
          a {
            text-decoration: none;
            white-space: nowrap;
            color: #000;
          }
        }
        .s-fc4 {
          color: #999;
        }
      }
    }
    li.z-selected:hover {
      background: #e6e6e6;
    }
  }
}
</style>
