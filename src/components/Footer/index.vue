<template>
  <div class="g-ft">
    <div class="m-ft">
      <div class="wrap">
        <div class="copy">
          <p class="link">
            <a href="###" class="item">服务条款</a><span class="line">|</span>
            <a href="####" class="item">隐私政策</a><span class="line">|</span>
            <a href="####" class="item">儿童隐私政策</a
            ><span class="line">|</span>
            <a href="####" target="_blank" class="item ">版权投诉指引</a
            ><span class="line">|</span>
            <a href="####" class="item">意见反馈</a>
            <span class="line">|</span><a class=""></a>
          </p>
          <p class="right">
            <span class="span">网易公司版权所有©1997-2020</span
            ><span class="span">杭州乐读科技有限公司运营：</span
            ><a href="####" class="alink s-fc3">浙网文[2018]3506-263号</a>
          </p>
          <p class="contact">
            <span class="span">违法和不良信息举报电话：0571-89853516</span>
            <span class="span">举报邮箱：</span
            ><a class="alink" href="mailto:ncm5990@163.com">ncm5990@163.com</a>
          </p>
          <p class="right">
            <span class="sep span">粤B2-20090191-18</span
            ><a href="###" class="alink">工业和信息化部备案管理系统网站</a>
            <a href="###" class="alink police-link">
              <span class="police-logo"></span>
              <span class="police-text">浙公网安备 33010902002564号</span>
            </a>
          </p>
        </div>
        <ul class="enter">
          <li class="unit unit-first">
            <a class="logo logo-amped" href="###"></a>
            <span class="tt tt-amped"></span>
          </li>
          <li class="unit">
            <a class="logo  logo-auth" href="###"></a>
            <span class="tt tt-auth"></span>
          </li>
          <li class="unit">
            <a class="logo logo-musician" href="###"></a>
            <span class="tt tt-musician"></span>
          </li>
          <li class="unit">
            <a class="logo logo-reward" href="###"></a>
            <span class="tt tt-reward"></span>
          </li>
          <li class="unit">
            <a class="logo logo-cash" href="###"></a>
            <span class="tt tt-cash"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" reg="stylesheet/less" scoped>
.g-ft {
  height: 172px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  .m-ft {
    width: 980px;
    margin: 0 auto;
    .wrap {
      font-size: 12px;
      color: #333;
      overflow: hidden;
      .copy {
        float: left;
        width: 520px;
        padding-top: 15px;
        line-height: 24px;
        .link {
          .item {
            color: #999;
          }
          .line {
            margin: 0 8px 0 10px;
            color: #c2c2c2;
          }
        }
        .right {
          .span {
            margin-right: 14px;
          }
          .alink {
            text-decoration: none;
            color: #333;
          }
          .police-logo {
            width: 14px;
            height: 14px;
            background: url("./images/police.png") no-repeat;
            background-size: cover;
            display: inline-block;
            margin-right: 2px;
            vertical-align: -2px;
          }
          .police-link {
            margin-left: 5px;
          }
        }
        .contact {
          .span {
            margin-right: 14px;
          }
          .alink {
            text-decoration: none;
            color: #333;
          }
        }
      }

      .enter {
        width: 420px;
        margin-top: 33px;
        float: right;

        .unit {
          float: left;
          width: 60px;
          height: 70px;
          text-align: center;
          color: #666;
          margin-left: 30px;

          .logo {
            display: block;
            float: none;
            width: 50px;
            height: 45px;
            margin: 0 auto;
            background: url("./images/foot_enter_new.png") no-repeat;
            background-size: 110px 552px;
          }
          .tt {
            display: inline-block;
            margin: 5px 5px 0;
            width: 52px;
            height: 14px;
            background: url("./images/foot_enter_tt.png") no-repeat;
            background-size: 180px 139px;
          }

          .logo-amped {
            background-position: -63px -456.5px;
          }
          .tt-amped {
            margin-left: -6px;
            width: 72px;

            background-position: 0 -108px;
          }

          .logo-auth {
            background-position: -63px -101px;
          }
          .tt-auth {
            background-position: -1px -91px;
          }
          .logo-musician {
            background-position: 0 0;
          }
          .tt-musician {
            background-position: 0 0;
          }

          .logo-reward {
            background-position: -60px -50px;
          }
          .tt-reward {
            background-position: 0 -54px;
          }

          .logo-cash {
            background-position: 0 -101px;
          }
          .tt-cash {
            background-position: -1px -72px;
          }
        }

        .unit-first {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
