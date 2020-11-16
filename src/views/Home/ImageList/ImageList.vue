<template>
  <div class="swiper-container  swiper-no-swiping" ref="sw4">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(diskImg, index) in diskImageList"
        :key="index"
      >
        <div class="u-cover ">
          <img :src="diskImg.imgUrl" class="diskImg" />
          <a href="###" class="msk"></a>
          <a href="###"></a>
        </div>
        <p class="f-thide">
          <a href="####">野生歌手</a>
        </p>
        <p class="f-thide">
          <a href="####">徐秉龙</a>
        </p>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入swiper对象
import Swiper from "swiper";

export default {
  name: "ImageList",
  props: {
    diskImageList: Array,
  },
  data() {},
  // 计算属性
  computed: {},
  watch: {
    diskImageList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function() {
        // 判断
        if (this.diskImageList.length === 0) return;
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
          });
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 184px;
  width: 669px;
  box-sizing: border-box;
  padding: 0 16px;

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

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .f-thide {
      width: 90%;
      line-height: 18px;
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 16px;
    height: 184px;
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
