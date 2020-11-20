<template>
  <div
    class="play-list-wrap"
    ref="wrap"
    :style="{ height: height, width: width }"
  >
    <div class="play-list">
      <div class="play-list-top">
        <p class="play-list-title">播放列表</p>
        <p class="delAll">
          <span class="iconfont icon-huishouzhan2" @click="emptyPlayList"></span
          >清空列表
        </p>
      </div>
      <el-table
        v-if="playList.length"
        :show-header="false"
        stripe
        :data="playList"
        :style="{ width: '100%' }"
      >
        <el-table-column width="200">
          <template v-slot="{ row, $index }">
            <span
              :class="[
                'iconfont play',
                currentIndex === $index ? 'icon-zanting' : 'icon-bofang2',
              ]"
              @click="play($index, row.id)"
            ></span>
            <span class="songName">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" width="150">
          <template v-slot="{ row }">
            <span class="singer">{{ row.ar[0].name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dt">
          <template v-slot="{ row }">
            <span class="duration">{{ formaTime(row.dt) }} </span>
          </template>
        </el-table-column>
        <el-table-column>
          <template v-slot="{ row }">
            <span
              class="iconfont icon-huishouzhan del"
              @click="removeSong(row.id)"
            ></span>
          </template>
        </el-table-column>
      </el-table>
      <p class="tips" v-else>您还没有添加任何歌曲！</p>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PlayList',
  props: {
    height: {
      type: String
    },
    width: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      songId: (state) => state.play.songId,
      playList: (state) => state.play.playList
    }),
    ...mapGetters(['currentIndex'])
  },
  async mounted () {
    await this.getMusicListDetial()
    this.scroll = new BScroll(this.$refs.wrap, {})
  },
  methods: {
    // 格式化时间
    formaTime (time) {
      return moment(time).format("mm:ss")
    },
    // 获取歌单详情
    async getMusicListDetial () {
      const res = await this.$API.song.getMusicListDetail(24381616)
      this.$store.dispatch('addMusicList', res.playlist.tracks)
    },
    play (index, songId) {
      if (this.currentIndex === index) return

      this.$store.dispatch('setCurrentSong', songId)
    },
    // 清空列表
    emptyPlayList () {
      this.$store.dispatch('clearPlayList')
    },
    // 移除单曲
    removeSong (id) {
      this.$store.dispatch('delMusic', id)
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.play-list-wrap {
  position: absolute;
  bottom: 76px;
  height: 500px;
  background-color: #fff;
  border-radius: 5px 0 0 0;
  border-top: 1px solid #cfcfd4;
  border-left: 1px solid #cfcfd4;
  transition: right 0.5s;
}
.play-list {
  width: 510px;
  height: 490px;
  .tips {
    text-align: center;
    font-size: 18px;
    height: 50%;
    line-height: 200px;
  }
  .play-list-top {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    margin: 0 20px;
    .play-list-title {
      font-weight: 700;
    }
    .delAll {
      cursor: pointer;
      font-size: 13px;
      .icon-huishouzhan2 {
        margin-right: 10px;
      }
    }
  }
  .play {
    margin: 0 10px;
    cursor: pointer;
  }

  .songName {
    font-size: 12px;
  }
  .singer {
    font-size: 12px;
    color: #656565;
  }
  .duration {
    font-size: 12px;
    color: #cacad9;
  }
  .del {
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
