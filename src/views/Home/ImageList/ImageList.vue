<template>
  <div class="swiper-outer">
    <div class="swiper-container swiper-no-swiping" ref="sw4">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(diskImg, index) in diskImageList"
          :key="index"
        >
          <div class="u-cover">
            <img :src="diskImg.picUrl" class="diskImg" />
            <a href="javascript:;" class="msk"></a>
            <a href="javascript:;"></a>
          </div>
          <p class="f-thide">
            <a href="javascript:;">{{ diskImg.name }}</a>
          </p>
          <p class="f-thide">
            <span v-for="(singer, index) in diskImg.artists" :key="singer.id">
              <router-link :to="`/singerAlbum/${singer.id}`">{{
                singer.name
              }}</router-link>
              {{ diskImg.artists[index + 1] ? `&nbsp;/` : "" }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入swiper对象
import Swiper from "swiper"

export default {
  name: "ImageList",
  props: {
    diskImageList: Array,
  },
  // data() {},
  // 计算属性
  computed: {},
  methods: {
    getSingers (singers) {
      const singersStr = singers.reduce((pre, current, index) => {
        let str = `<a href="javascript:;">${current.name}</a>/`
        return pre + str
      }, "")
      return `${singersStr.substr(0, singersStr.length - 1)}`
    },
  },
  watch: {
    diskImageList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function () {
        // 判断
        if (this.diskImageList.length === 0) return
        // console.log('watch....执行了....', this.carouselList.length)
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.sw4, {
            loop: true, // 循环模式选项
            slidesPerView: 5, // 每一屏中显示图片的数量
            slidesPerGroup: 5, // 每次移动的图片的数量
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          })
        })
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-outer {
  position: relative;
  .swiper-container {
    height: 184px;
    width: 645px;
    box-sizing: border-box;
    // margin: 0 16px;
    .swiper-wrapper {
      .swiper-slide {
        width: 100px;
        height: 100px;

        .u-cover {
          margin-top: 28px;
          width: 100px;
          height: 100px;
          position: relative;

          .msk {
            width: 118px;
            height: 100px;
            margin-left: 11px;
            position: absolute;
            top: 0;
            left: 0;
            background: url("../images/coverall.png") no-repeat 0 -570px;
          }

          img {
            width: 100%;
            height: 100%;
            padding: 2px;
            display: block;
          }
        }

        .f-thide {
          width: 90%;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .swiper-button-next {
    outline: none;
    left: auto;
    right: 8px;
    --swiper-navigation-size: 10px;
  }

  .swiper-button-prev {
    left: 8px;
    right: auto;
    outline: none;
    --swiper-navigation-size: 10px;
  }
}
</style>
