<template>
  <ul class="comment" v-if="comments.length > 0">
    <li class="cmt-item" v-for="item in comments" :key="item.id">
      <div class="avatar">
        <img :src="item.user.avatarUrl" alt="" width="40" height="40" />
      </div>
      <div class="cntwrap">
        <div class="comment-content">
          <p class="content">
            <a href="" class="user">{{ item.user.nickname }}:</a>
            {{ item.content }}
          </p>
        </div>
        <div class="rp">
          <div class="time" v-if="item">
            <span>{{ date(item.time) }}</span>
          </div>
          <div class="operation">
            <span class="iconfont icon-zanpress line"
              ><span class="praise-count">{{ item.likedCount }}</span></span
            >
            <span class="iconfont icon-zhuanfa2 line2"></span>
            <span class="iconfont icon-groupcopy5-copy"></span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import formaDate from '@/utils/formaDate'

export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  methods: {
    date (time) {
      return formaDate(time)
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.comment {
  width: 65%;
  .cmt-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;
    width: 100%;
    padding: 20px 0 10px;
    .cntwrap {
      width: 100%;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
      overflow: hidden;
      border: 1px solid #ccc;
    }
    .user {
      color: #507daf;
      text-decoration: none;
    }
    .user:hover {
      color: #0b58b0;
    }
    .comment-content {
      display: flex;
      font-size: 12px;
      .content {
        color: #333333;
      }
    }
    .rp {
      display: flex;
      font-size: 10px;
      color: #999999;
      justify-content: space-between;
      margin-top: 10px;
      .operation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666666;
        width: 130px;
        span {
          position: relative;
        }
        span:hover {
          color: #333;
        }
        .icon-zhuanfa2 {
          font-size: 22px;
        }
        .icon-zanpress {
          font-size: 18px;
          display: flex;
          align-items: center;
          .praise-count {
            font-size: 12px;
            font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
              sans-serif;
          }
        }
        .line::after {
          position: absolute;
          content: "";
          display: block;
          width: 1px;
          height: 12px;
          background-color: #e8e8e8;
          right: -12px;
          top: 5px;
        }
        .line2::after {
          position: absolute;
          content: "";
          display: block;
          width: 1px;
          height: 12px;
          background-color: #e8e8e8;
          right: -7px;
          top: 7px;
        }
      }
    }
  }
}
</style>
