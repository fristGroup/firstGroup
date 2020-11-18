<template>
  <div class="swiper-container" id="swL" ref="sw">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in carouselList"
        :key="index"
      >
        <div :style="`backgroundImage:url(${carousel.bgImg})`" class="bgImg">
          <img :src="carousel.imageUrl" alt />
        </div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
// 引入swiper对象
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: {
    carouselList: Array,
  },
  data() {
    return {
      // flag: true,
    };
  },
  mounted() {
    // console.log('mounted....执行了.....', this.carouselList.length)
    // this.test();
  },
  watch: {
    carouselList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function() {
        // 判断
        if (this.carouselList.length === 0) return;
        // console.log('watch....执行了....', this.carouselList.length)
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。\
        // this.$nextTick(() => {
        //   new Swiper(this.$refs.sw, {
        //     loop: true, // 循环模式选项
        //     // 如果需要分页器
        //     pagination: {
        //       el: ".swiper-pagination",
        //     },
        //     // 如果需要前进后退按钮
        //     navigation: {
        //       nextEl: ".swiper-button-next",
        //       prevEl: ".swiper-button-prev",
        //     },
        //   });
        // });
        this.test();
        //   this.$nextTick().then((res) => {
        //     new Swiper(this.$refs.sw, {
        //       loop: true, // 循环模式选项
        //       // 如果需要分页器
        //       pagination: {
        //         el: ".swiper-pagination",
        //       },
        //       // 如果需要前进后退按钮
        //       navigation: {
        //         nextEl: ".swiper-button-next",
        //         prevEl: ".swiper-button-prev",
        //       },
        //     });
        //   });
      },
      // immediate: true,
    },
  },
  methods: {
    test() {
      if (this.carouselList.length === 0) return;
      // console.log('watch....执行了....', this.carouselList.length)
      // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。\
      // if (!this.flag) return;

      this.$nextTick(() => {
        setTimeout(() => {
          new Swiper(this.$refs.sw, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            effect: "fade",
            //三秒切换
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
              disableOnInteraction: false,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        }, 1000);

        // this.flag = false;
      });
    },
  },
};
</script>
<style lang="less" reg="stylesheet/less" scoped>
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      height: 285px;
      .bgImg {
        background-size: 6000px;
        background-position: center center;

        img {
          width: 730px;
          height: 285px;
          display: block;
          margin-left: 270px;
        }
      }
    }
  }
  .swiper-button-prev {
    left: 200px;
    --swiper-navigation-color: rgb(230, 223, 223);
  }
  .swiper-button-next {
    right: 195px;
    --swiper-navigation-color: rgb(230, 223, 223);
  }
  .swiper-pagination-bullets {
    left: -110px;
  }
}
</style>
