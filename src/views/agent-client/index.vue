<template>
  <div class="home-container">
    <el-alert class="el-alert-top" type="warning" show-icon>
      <p slot="title">辅助性文字。也可通过默认 slot 传入</p>
    </el-alert>
    <el-row :gutter="20" class="main-cont">
      <el-col :span="16" class="grid-content-1">
        <div class="grid-content ">
          <div class="total-view">
            <table>
              <tr>
                <td class="col1">
                  <span class="img" />
                  <div class="info">
                    <div style="font-weight:bold">agent1231232</div>
                    <p>白金会员代理商</p>
                  </div>
                </td>
                <td class="col2">
                  <span class="img" />
                  <div class="info">
                    <div>我的余额：<em>￥ 64545.23</em></div>
                    <p>
                      <a href="http://" target="_blank" rel="noopener noreferrer">消费明细</a>
                      <span class="line">|</span>
                      <a href="http://" target="_blank" rel="noopener noreferrer">冻结资金</a>
                    </p>
                  </div>
                </td>
                <td class="col3">
                  <el-button type="primary" size="mini">充值</el-button>
                </td>
              </tr>
            </table>
          </div>
          <div class="resource-list">
            <Box type="1">
              <div slot="tit-left">资源管理</div>
              <div slot="cont">
                <div class="adv" />
                <el-row :gutter="20" class="prod-list">
                  <el-col :span="6">
                    <div class="grid-content grid-content-prod-1 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>客户</span>
                        <em>1024</em>
                        <div class="btns">
                          <a href="" class="buy">购买</a>
                          <span class="line">|</span>
                          <a href="" class="mgmt">管理</a>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content grid-content-prod-2 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>待支付订单</span>
                        <em>1024</em>
                        <div class="btns">
                          <a href="" class="buy">购买</a>
                          <span class="line">|</span>
                          <a href="" class="mgmt">管理</a>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content grid-content-prod-3 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>待支付客户订单</span>
                        <em>1024</em>
                        <div class="btns">
                          <a href="" class="buy">购买</a>
                          <span class="line">|</span>
                          <a href="" class="mgmt">管理</a>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content grid-content-prod-4 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>待支付客户订单</span>
                        <em>1024</em>
                        <div class="btns">
                          <a href="" class="buy">购买</a>
                          <span class="line">|</span>
                          <a href="" class="mgmt">管理</a>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </Box>
          </div>

          <div class="order-list">
            <Box type="1">
              <div slot="tit-left">客户订单</div>
              <div slot="tit-right">
                <a href="http://" target="_blank" rel="noopener noreferrer">客户管理</a>
              </div>
              <div slot="cont">
                <div class="adv" />
                <el-row class="order-num">
                  <el-col :span="8">
                    <div class="grid-content grid-content-order-1 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>客户</span>
                        <em>1024</em>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-order-2 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>待支付订单</span>
                        <em>1024</em>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-order-3 clearfix">
                      <span class="img" />
                      <div class="info">
                        <span>待支付客户订单</span>
                        <em>1024</em>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </Box>
          </div>

          <div class="help-list">
            <Box type="1">
              <div slot="tit-left">帮助</div>
              <div slot="tit-right">
                <a href="http://" target="_blank" rel="noopener noreferrer">更多</a>
              </div>
              <div slot="cont">
                <el-row :gutter="20" class="help-list-2">
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-1">
                      <a href="http://" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">资料下载</span>
                        <i class="img" />
                      </a>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-2">
                      <a href="http://" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">新手指南</span>
                        <i class="img" />
                      </a>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-3">
                      <a href="http://" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">常见问题</span>
                        <i class="img" />
                      </a>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </Box>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="grid-content-2">
        <div class="grid-content">
          <div class="carousel">
            <el-carousel trigger="click" height="230px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="msgs">
            <el-row>
              <el-col :span="8">
                <div class="grid-content grid-content-msg-1">
                  <em>13</em>
                  <p>未读消息</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content grid-content-msg-2">
                  <em>13</em>
                  <p>我的工单</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content grid-content-msg-3">
                  <em>13</em>
                  <p>急需续费产品</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="notice-list">
            <Box type="2">
              <div slot="tit-left">重要公告</div>
              <div slot="tit-right">
                <a href="http://" target="_blank" rel="noopener noreferrer">查看公告</a>
              </div>
              <div slot="cont">该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的：</div>
            </Box>
          </div>
          <div class="login-list">
            <Box type="2">
              <div slot="tit-left">最近登录</div>
              <div slot="tit-right">
                <a href="http://" target="_blank" rel="noopener noreferrer">安全设置</a>
              </div>
              <div slot="cont">该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的：</div>
            </Box>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Box from '@/components/Box'
export default {
  name: 'Home',
  components: {
    Box
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss">
.home-container {
  background: #f5f5f5;
  .el-alert-top{
    background: #fff7da!important;
    .el-alert__icon{
      color: #f46a68;
    }
    p{
      color: #f46a68!important;
      margin: 0px;
      font-size: 12px;
    }
  }
  .main-cont{
    padding: 20px 20px 20px 20px;
  }
  .grid-content-1{
    width: calc(100% - 320px);
    .grid-content{
    }
    .total-view{
      background: #fff;
      margin-bottom: 20px;
      table{
        width: 100%;
      }
      td{
        padding: 34px 20px;
      }
      td:nth-child(1) {
        border-right: 1px solid #ededed;
      }
      .col1,
      .col2{
        width: 40%;
      }
      .col3{
        width: 20%;
        text-align: right;
      }
      td .img{
        width: 51px;
        height: 51px;
        background: #eaeaea;
        float: left;
        margin-right: 20px;
      }
      td .info{
        overflow: hidden;
        div{
          display: block;
          font-size: 14px;
          line-height: 23px;
          color: #333;
          margin-bottom: 10px;
          em{
            font-size: 20px;
            color: #fe6c00;
            font-weight: 600;
            font-style: normal;
          }
        }
        p{
          display: block;
          font-size: 12px;
          line-height: 12px;
          color: #676767;
          margin: 0px;
          a{
            font-size: 12px;
            line-height: 12px;
            color: #333;
          }
          .line{
            display: inline-block;
            margin: 0 20px;
            color: #ededed;
            line-height: 12px;
          }
        }
      }
    }
    .resource-list{
      margin-bottom: 20px;
      .prod-list{
        border-top: 1px solid #f5f5f5;
        margin-left: -20px!important;
        margin-right: -20px!important;
        padding: 25px 10px 0 10px;
      }
      .prod-list .img{
        width: 51px;
        height: 51px;
        background: #eaeaea;
        float: left;
        margin-right: 20px;
      }
      .prod-list .info{
        overflow: hidden;
        span{
          display: block;
          font-size: 12px;
          line-height: 12px;
          color: #676767;
          margin-bottom: 10px;
        }
        em{
          display: block;
          font-size: 16px;
          line-height: 16px;
          color: #333;
          font-weight: 600;
          font-style: normal;
          margin-bottom: 10px;
        }
        .btns{
          font-size: 12px;
          line-height: 12px;
          .buy{
            color: #333;
            display: inline-block;
          }
          .mgmt{
            color: #7295d9;
            display: inline-block;
          }
          .line{
            display: inline-block;
            margin: 0 7px;
            color: #ededed;
            line-height: 12px;
          }
        }
      }
    }
    .order-list{
      margin-bottom: 20px;
      .adv{
        height: 170px;
        background: #6a98ed;
        margin-bottom: 25px;
      }
      .order-num .img{
        width: 51px;
        height: 51px;
        background: #eaeaea;
        float: left;
        margin-right: 20px;
      }
      .order-num .info{
        overflow: hidden;
        span{
          display: block;
          font-size: 12px;
          line-height: 12px;
          color: #676767;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        em{
          display: block;
          font-size: 16px;
          line-height: 16px;
          color: #333;
          font-weight: 600;
          font-style: normal;
        }
      }
    }
    .help-list-2{
      .grid-content{
        height: 96px;
        line-height: 94px;
        border: 1px solid #e6e6e6;
        padding: 0 20px;
        font-size: 14px;
        a{
          display: block;
        }
        .img{
          width: 51px;
          height: 51px;
          background: #eaeaea;
          float: right;
          margin-top: 20px;
        }
      }
    }
  }
  .grid-content-2{
    width: 320px;
    float: right;
    .grid-content{
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .el-carousel__button{
      width: 9px;
      height: 9px;
      border-radius: 100%;
    }
    .msgs{
      background: #fff;
      text-align: center;
      padding: 23px 0;
      margin-bottom: 20px;
      em{
        display: block;
        font-weight: 600;
        font-size: 15px;
        line-height: 15px;
        font-style: normal;
        margin-bottom: 10px;
      }
      p{
        font-size: 12px;
        color: #666666;
        margin: 0px;
      }
      .el-col:nth-child(1) .grid-content,
      .el-col:nth-child(2) .grid-content{
        border-right: 1px solid #e5e5e5;
      }
    }
    .notice-list{
      margin-bottom: 20px;
    }
    // .notice-list .box-tit-right a,
    // .login-list .box-tit-right a{
    //   font-size: 12px;
    //   color: #666666;
    // }
  }
}
</style>

