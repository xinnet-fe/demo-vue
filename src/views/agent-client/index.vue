<template>
  <div class="home-container">
    <el-alert class="alert" title="" type="" :closable="false">阿卡丽大家飞拉萨的开放时间了大家</el-alert>
    <el-row :gutter="15">
      <el-col :span="6" class="col1">
        <div class="grid-content grid-content1">
          <div class="photo">
            <span class="img"></span>
            <div class="info">
              <a href="javascript:;">绑定邮箱</a>
              <span>用户ID：hy2343432</span>
            </div>
          </div>
          <div class="graph">

          </div>
          <div class="text">阿卡丽大家飞拉萨的开放时间了大家</div>
        </div>
      </el-col>
      <el-col :span="12" class="col2">
        <div class="grid-content grid-content1">
          <div class="balance">
            我的余额：<span>￥<em>4545</em></span>
            <el-button class="btnRecharge" type="primary" round>充值</el-button>
          </div>
          <el-row class="row2">
            <el-col :span="24">
              <div class="grid-content">
                <span class="img"></span>
                <div class="info">
                  <p>可消耗余额</p>
                  <p>
                    <em class="price">￥46545</em>
                    <a href="http://" target="_blank" rel="noopener noreferrer">交易明细</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">资金冻结明细</a>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="row2">
            <el-col :span="12">
              <div class="grid-content">
                <span class="img"></span>
                <div class="info">
                  <p>授信额度：<em class="price">￥3232</em></p>
                  <p>可用额度：<em class="price">￥3232</em></p>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <span class="img"></span>
                <div class="info">
                  <p>购物卡</p>
                  <p>
                    <em class="price">10张</em>
                    <a href="http://" target="_blank" rel="noopener noreferrer">卡包</a>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6" class="col3">
        <div class="grid-content grid-content1">
          <div class="adv"></div>
          <table>
            <tr>
              <td>
                <em>45</em>
                <p>待付款订单</p>
              </td>
              <td>
                <em>45</em>
                <p>未读消息</p>
              </td>
              <td>
                <em>45</em>
                <p>我的工单</p>
              </td>
              <td>
                <em>45</em>
                <p>急需续费产品</p>
              </td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { title } from '@/settings'
export default {
  name: 'Dashboard',
  data() {
    return {
      title: title,
      welcome: require('@/assets/welcome/welcome.jpg')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  width: 1400px;
  margin: 0 auto;
  text-align: center;
  color: #868686;
  height: 500px;
  .alert{
    margin-bottom: 5px;
    background: none;
  }
  .grid-content1 {
    height: 320px;
    background: #fff;
  }
  .col1{
    width: 340px;
    .grid-content{
      padding: 20px;
      -moz-box-shadow:2px 2px 3px rgba(0,0,0,0.1);
      -webkit-box-shadow:2px 2px 3px rgba(0,0,0,0.1);
      box-shadow:2px 2px 3px rgba(0,0,0,0.1);
    }
    .photo{
      text-align: left;
      overflow: hidden;
      margin-bottom: 30px;
      .img{
        width: 50px;
        height: 50px;
        background: #f00;
        border-radius: 100%;
        display: inline-block;
        float: left;
        margin-right: 15px;
      }
      .info{
        overflow: hidden;
        a{
          display: inline-block;
          font-size: 12px;
          color: #7e007e;
          font-weight: 600;
          margin-bottom: 12px;
          margin-top: 8px;
        }
        span{
          display: block;
          font-size: 12px;
          color: #666666;
        }
      }
    }
    .graph{
      height: 115px;
      background: #aaa;
      margin-bottom: 40px;
    }
    .text{
      font-size: 12px;
      color: #999999;
    }
  }
  .col2{
    width: 660px;
    &>.grid-content{
      padding: 20px;
      -moz-box-shadow:2px 2px 3px rgba(0,0,0,0.1);
      -webkit-box-shadow:2px 2px 3px rgba(0,0,0,0.1);
      box-shadow:2px 2px 3px rgba(0,0,0,0.1);
    }
    .balance{
      border-bottom: 1px solid #f4f4f4;
      padding:  0 20px 30px 20px;
      margin-left: -20px;
      margin-right: -20px;
      margin-bottom: 10px;
      overflow: hidden;
      .btnRecharge{
        float: right;
      }
    }
    color: #000;
    text-align: left;
    font-size: 16px;
    span{
      color: #f1474a;
      font-weight: 600;
      em{
        color: #f1474a;
        font-size: 27px;
        font-style: normal;
      }
    }
    .row2{
      .grid-content{
        overflow: hidden;
        padding: 25px 0;
      }
      .img{
        width: 50px;
        height: 50px;
        background: #f00;
        border-radius: 100%;
        float: left;
        margin-right: 45px;
      }
      .info{
        overflow: hidden;
        p{
          margin: 0px;
          font-size: 14px;
          line-height: 26px;
        }
        a{
          font-size: 12px;
          color: #666666;
          display: inline-block;
          margin: 0 15px;
        }
        .price{
          font-weight: 600;
          font-size: 16px;
          font-style: normal;
        }
      }
    }
  }
  .col3{
    width: 415px;
    .grid-content{
      -moz-box-shadow:2px 2px 3px rgba(0,0,0,0.1);
      -webkit-box-shadow:2px 2px 3px rgba(0,0,0,0.1);
      box-shadow:2px 2px 3px rgba(0,0,0,0.1);
    }
    .adv{
      width: 100%;
      height: 240px;
      background: #666666;
      margin-bottom: 20px;
    }
    table{
      width: 100%;
      em{
        font-size: 15px;
        font-weight: 600;
        font-style: normal;
        display: inline-block;
        margin-bottom: 5px;
      }
      p{
        font-size: 12px;
        margin: 0px;
      }
      td{
        height: 40px;
        width: 25%;
        border-right: 1px solid #e5e5e5;
      }
      td:nth-last-child(1){
        border-right: none;
      }
    }
  }
}
</style>

