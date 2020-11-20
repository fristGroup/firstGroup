<template>
  <!-- 进度条 -->
  <div class="progress-bar-wrap" ref="progressWrap" :style="{ width: width }">
    <div class="progress-bar" ref="progress">
      <div
        class="progress-inner"
        :style="{ width: `${progress}%` }"
        ref="inner"
      ></div>
      <div class="slider" ref="slider" :style="{ left: `${progress}%` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    width: {
      type: String,
      default: "100px"
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.progressBarAddListener()
  },
  methods: {
    progressBarAddListener (e) {
      const { slider, progress, inner, progressWrap } = this.$refs
      let isClickSlider = false
      let distance = 0 // 滑块与点击坐标的绝对距离
      let progressWidth = progress.offsetWidth

      slider.onmousedown = (e) => {

        isClickSlider = true
        // 计算出滑块与点击坐标的绝对距离
        distance = e.clientX - progress.offsetLeft - slider.offsetLeft
        e.preventDefault()
      }

      progressWrap.onmousemove = (e) => {
        let curX = e.clientX - progress.offsetLeft - distance

        let currentProgress = (curX / progressWidth) * 100
        if (currentProgress >= 100) {
          currentProgress = 100
        }

        if (currentProgress <= 0) {
          currentProgress = 0
        }

        if (isClickSlider) {
          slider.style.left = currentProgress + "%"
          inner.style.width = currentProgress + '%'
          this.$emit('changeProgress', currentProgress)
        }
        e.preventDefault()
      }

      document.onmouseup = (e) => {

        isClickSlider = false
        e.preventDefault()
      }
    },
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.progress-bar-wrap {
  position: relative;
  padding: 10px 0;
  .progress-bar {
    position: relative;
    height: 4px;
    background-color: #c2c2c4;
    border-radius: 3px;
    .progress-inner {
      border-radius: 3px;
      height: 4px;
      background-color: #ff4e4e;
      padding-left: 4px;
    }
    .slider {
      position: absolute;
      top: -2px;
      width: 8px;
      height: 8px;
      background-color: #ec4141;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
