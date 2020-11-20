<template>
  <div class="bgImgWrapper">
    <div class="swiper-outer">
      <div class="swiper-container" id="swL" ref="sw">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(carousel, index) in carouselList"
            :key="index"
          >
            <div class="bgImg">
              <img :src="carousel.imageUrl" alt />
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="download"></div>
    </div>
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
          const mySwiper = new Swiper(this.$refs.sw, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            effect: "fade",
            clickable: true,
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

          //鼠标滑过pagination控制swiper切换
          // for (let i = 0; i < mySwiper.pagination.bullets.length; i++) {
          //   mySwiper.pagination.bullets[i].onmouseover = function() {
          //     this.click();
          //   };
          // }
          //如果你在swiper初始化后才决定使用clickable，可以这样设置
          mySwiper.params.pagination.clickable = true;
          //此外还需要重新初始化pagination
          mySwiper.pagination.destroy();
          mySwiper.pagination.init();
          mySwiper.pagination.bullets
            .eq(0)
            .addClass("swiper-pagination-bullet-active");
        }, 1000);

        // this.flag = false;
      });
    },
  },
};
</script>
<style lang="less" reg="stylesheet/less" scope>
.bgImgWrapper {
  width: 100%;
  height: 285px;
  background-color: pink;
  .swiper-outer {
    width: 982px;
    height: 285px;
    margin: 0 auto;
    position: relative;
    .swiper-container {
      width: 982px;
      height: 285px;
      .swiper-wrapper {
        .swiper-slide {
          width: 982px;
          height: 285px;
          .bgImg {
            // background-size: 6000px;
            // background-position: center center;
            background-color: tan;
            width: 1100px;
            height: 285px;
            img {
              width: 730px;
              height: 285px;
              display: block;
            }
          }
        }
      }

      .swiper-pagination-bullets {
        left: -110px;
        .swiper-pagination-bullet {
          background: #fff !important;
          opacity: 0.5 !important;
        }
        .swiper-pagination-bullet-active {
          background: red !important;
        }
      }
      // .swiper-pagination-bullet-active {
      //   background: red;
      // }
    }
    .swiper-button-prev {
      position: absolute;
      width: 37px;
      height: 63px;
      left: -68px;
      outline: none;
      --swiper-navigation-color: rgb(204, 199, 199);
      &:hover {
        background-color: rgba(218, 215, 215, 0.8);
      }
    }
    .swiper-button-next {
      position: absolute;
      width: 37px;
      height: 63px;
      right: -68px;
      outline: none;
      --swiper-navigation-color: rgb(204, 199, 199);
      &:hover {
        background-color: rgba(218, 215, 215, 0.8);
      }
    }
    .download {
      position: absolute;
      top: 0;
      z-index: 20;
      left: 728px;
      width: 254px;
      height: 285px;
      background: url("./images/download.png") no-repeat 0 0;
    }
  }
  // .swiper-container-horizontal
  //   > .swiper-pagination-bullets
  //   .swiper-pagination-bullet {
  //   // background: white;
  // }
}
</style>
