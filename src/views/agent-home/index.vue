<template>
  <div class="home-container">
    <el-alert v-if="usersafe.userInfoAuth === 'N'" class="el-alert-top" type="warning" show-icon>
      <p slot="title">依据《中华人民共和国网络安全法》规定，您的账号未进行认证，请尽快完成认证，避免影响您后期业务正常使用，感谢您的支持与合作。<a href="http://console.xinnet.com/jump.html?p=realuser" class="a-blue">去实名&gt;&gt;</a></p>
    </el-alert>
    <el-row :gutter="20" class="main-cont">
      <el-col :span="16" class="grid-content-1">
        <div class="grid-content ">
          <div class="total-view">
            <table>
              <tr>
                <td class="col1">
                  <span class="img">
                    <img src="/static/img/home/img_01.png" alt="" srcset="">
                  </span>
                  <div class="info">
                    <div style="font-weight:bold">{{ user.agentCode }}
                      <span class="safe">
                        <i v-if="user.loginProtect === 'N'" class="icon">
                          <img src="/static/img/home/img_09.png" alt="" srcset="">
                        </i>
                        <i v-if="user.loginProtect === 'Y'" class="icon">
                          <img src="/static/img/home/img_10.png" alt="" srcset="">
                        </i>
                        <!-- <i v-if="user.agentType === 'N'" class="icon">
                          <img src="/static/img/home/img_11.png" alt="" srcset="">
                        </i> -->
                        <i v-if="user.agentType === 'P'" class="icon">
                          <img src="/static/img/home/img_12.png" alt="" srcset="">
                        </i>
                        <i v-if="user.agentType === 'C'" class="icon">
                          <img src="/static/img/home/img_13.png" alt="" srcset="">
                        </i>
                      </span>
                    </div>
                    <p>{{ gradeByAgent.gradeName }}</p>
                  </div>
                </td>
                <td class="col2">
                  <span class="img">
                    <img src="/static/img/home/img_02.png" alt="" srcset="">
                  </span>
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
                <el-tabs type="card" class="domain-query">
                  <el-tab-pane label="域名">
                    <div class="queryDomain">
                      <el-input v-model="queryDomain" placeholder="输入域名，如：xinnet.com">
                        <el-button slot="append">查域名</el-button>
                      </el-input>
                      <div class="links">
                        <a href="">批量域名注册</a>
                        <a href="">批量域名注册</a>
                        <a href="">批量域名注册</a>
                        <a href="">批量域名注册</a>
                        <a href="">批量域名注册</a>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="商标">
                    <div class="queryDomain">
                      <el-input v-model="queryBrand" placeholder="输入您想检索的商标名称、申请号、申请人名称">
                        <el-button slot="append">查商标</el-button>
                      </el-input>
                      <div class="links">
                        <a href="">商标注册</a>
                        <a href="">商标注册</a>
                        <a href="">商标注册</a>
                        <a href="">商标注册</a>
                        <a href="">商标注册</a>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
                <el-row :gutter="20" class="prod-list">
                  <el-col :span="6">
                    <div class="grid-content grid-content-prod-1 clearfix">
                      <span class="img">
                        <i class="iconfont icon-font01" />
                      </span>
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
                      <span class="img">
                        <i class="iconfont icon-font02" />
                      </span>
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
                      <span class="img">
                        <i class="iconfont icon-font03" />
                      </span>
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
                      <span class="img">
                        <i class="iconfont icon-font04" />
                      </span>
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
                <router-link to="/agent-mgmt/index">客户管理</router-link>
              </div>
              <div slot="cont">
                <div class="adv" />
                <el-row class="order-num">
                  <el-col :span="8">
                    <div class="grid-content grid-content-order-1 clearfix">
                      <span class="img">
                        <img src="/static/img/home/img_03.png" alt="" srcset="">
                      </span>
                      <div class="info">
                        <span>客户</span>
                        <em>1024</em>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-order-2 clearfix">
                      <span class="img">
                        <img src="/static/img/home/img_04.png" alt="" srcset="">
                      </span>
                      <div class="info">
                        <span>待支付订单</span>
                        <em>1024</em>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-order-3 clearfix">
                      <span class="img">
                        <img src="/static/img/home/img_05.png" alt="" srcset="">
                      </span>
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
                <ul class="el-list el-list-style3 clearfix">
                  <li v-for="(item, i) in list" :key="i" class="el-list-item clearfix" style="width: 50%;float: left;">
                    <strong class="tit"><a href="">{{ item.tit }}</a></strong>
                  </li>
                </ul>
                <el-row :gutter="20" class="help-list-2">
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-1">
                      <a href="http://" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">资料下载</span>
                        <span class="img">
                          <img src="/static/img/home/img_06.png" alt="" srcset="">
                        </span>
                      </a>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-2">
                      <a href="http://" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">新手指南</span>
                        <span class="img">
                          <img src="/static/img/home/img_07.png" alt="" srcset="">
                        </span>
                      </a>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-3">
                      <a href="http://" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">常见问题</span>
                        <span class="img">
                          <img src="/static/img/home/img_08.png" alt="" srcset="">
                        </span>
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
              <el-carousel-item v-for="item in 0" :key="item">
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
                <router-link to="/agent-notice/index">查看公告</router-link>
              </div>
              <div slot="cont">
                <ul class="el-list">
                  <li v-for="(item, i) in list" :key="i" class="el-list-item">
                    <strong class="tit"><a href="">{{ item.tit }}</a></strong>
                    <p class="desc">{{ item.time }}</p>
                  </li>
                </ul>
              </div>
            </Box>
          </div>
          <div class="login-list">
            <Box type="2">
              <div slot="tit-left">最近登录</div>
              <div slot="tit-right">
                <a href="http://" target="_blank" rel="noopener noreferrer">安全设置</a>
              </div>
              <div slot="cont">
                <ul class="el-list el-list-style2">
                  <li v-for="(item, i) in list" :key="i" class="el-list-item clearfix">
                    <strong class="tit"><a href="">{{ item.tit }}<br>{{ item.tit }}</a></strong>
                    <p class="desc">{{ item.time }}</p>
                  </li>
                </ul>
              </div>
            </Box>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 广告弹窗 -->
    <el-dialog class="el-dialog-adv" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
      <div class="carousel">
        <el-carousel trigger="click" height="460px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Box from '@/components/Box'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Box
  },
  data() {
    return {
      queryDomain: '',
      queryBrand: '',
      dialogVisible: false,
      list: [
        {
          tit: 'vue v-for循环的用法',
          time: '2018年12月6日'
        },
        {
          tit: 'vue v-for循环的用法',
          time: '2018年12月6日'
        },
        {
          tit: 'vue v-for循环的用法',
          time: '2018年12月6日'
        },
        {
          tit: 'vue v-for循环的用法',
          time: '2018年12月6日'
        },
        {
          tit: 'vue v-for循环的用法',
          time: '2018年12月6日'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => state.userinfo.user,
      usersafe: state => state.usersafe.usersafe,
      gradeByAgent: state => state.userinfo.gradeByAgent
    })
  },
  mounted() {
    const adv = Cookies.get('agent-adv')
    if (!adv) {
      Cookies.set('agent-adv', 'true', { expires: 1 })
      this.dialogVisible = true
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
// 如果有外层xcs_mian容器
.xcs_main .main-cont{
  padding: 20px 20px 20px 20px!important;
}
.home-container {
  background: #f5f5f5;
  .el-dialog-adv{
    .el-dialog__header{
      height: 0px;
      padding: 0px;
    }
    .el-dialog__body{
      padding: 0px;
    }
    .el-dialog__headerbtn{
      width: 29px;
      height: 29px;
      z-index: 999;
      border-radius: 100%;
      background: rgba(0, 0, 0, 0.2);
      .el-icon-close:before{
        color: #fff;
        font-size: 20px;
      }
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
  }
  .el-alert-top{
    background: #fff7da!important;
    .el-alert__icon{
      color: #f46a68;
    }
    p{
      color: #f46a68!important;
      margin: 0px;
      font-size: 12px;
      a{
        color: #7295d9;
      }
    }
  }
  .main-cont{
    padding-top: 20px;
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
        .el-button{
          border-radius: 14px;
        }
      }
      td .img{
        width: 51px;
        height: 51px;
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
          .safe{
            line-height: 0px;
            display: inline-block;
            vertical-align: middle;
            margin-left: 3px;
            i{
              display: inline-block;
            }
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
      .domain-query{
        .el-tabs__nav{
          border-radius: 0px!important;
          border: none;
          .el-tabs__item{
            height: 40px;
            line-height: 40px;
            background: #f3f3f3;
            color: #666;
            border: 1px solid #f3f3f3;
            border-bottom-color: #e6e6e6;
          }
          .el-tabs__item.is-active{
            position: relative;
            color: #333;
            background: #fff;
            border-color: #e6e6e6;
          }
          .el-tabs__item.is-active::after{
            content: "";
            width: calc(100% + 2px);
            height: 2px;
            background: #f34648;
            top: -1px;
            left: -1px;
            position: absolute;
          }
        }
        .el-tabs__header{
          margin-bottom: 0px;
        }
        .el-tabs__content{
          padding-top: 0px;
          margin-top: -1px;
        }
        .el-input{
          height: 50px;
        }
        .el-input__inner{
          height: 50px;
          border-radius: 0px;
          border-color: #e6e6e6;
        }
        .el-input-group__append{
          border-radius: 0px;
          background: #f34648;
        }
        .el-button span{
          color: #fff;
          font-size: 16px;
        }
        .links{
          padding: 10px 0;
          a{
            display: inline-block;
            margin-right: 20px;
            font-size: 12px;
          }
        }
      }

      .prod-list{
        border-top: 1px solid #f5f5f5;
        margin-left: -20px!important;
        margin-right: -20px!important;
        padding: 25px 10px 0 10px;
      }
      .prod-list .img{
        width: 51px;
        height: 51px;
        line-height: 51px;
        vertical-align: middle;
        text-align: center;
        background: #fff;
        float: left;
        margin-right: 20px;
        border-radius: 100%;
        -moz-box-shadow:0px 5px 6px rgba(0,0,0,0.3);
        -webkit-box-shadow:0px 5px 6px rgba(0,0,0,0.3);
        box-shadow:0px 5px 6px rgba(0,0,0,0.3);
        i{
          display: inline-block;
          vertical-align: middle;
          color: #bbb;
          font-size: 19px;
        }
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
      .box-tit-right a{
        color: #666666;
      }
      .adv{
        height: 170px;
        background: #6a98ed;
        margin-bottom: 25px;
      }
      .order-num .img{
        width: 51px;
        height: 51px;
        line-height: 51px;
        vertical-align: middle;
        text-align: center;
        background: #fff;
        float: left;
        margin-right: 20px;
        border-radius: 100%;
        -moz-box-shadow:0px 5px 6px rgba(0,0,0,0.3);
        -webkit-box-shadow:0px 5px 6px rgba(0,0,0,0.3);
        box-shadow:0px 5px 6px rgba(0,0,0,0.3);
        img{
          display: inline-block;
          vertical-align: middle;
        }
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
    .help-list{
      .box-tit-right a{
        color: #666666;
      }
      .box-cont{
        padding-top: 20px;
      }
      .el-list{
        margin-bottom: 20px;
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
          line-height: 51px;
          text-align: center;
          vertical-align: middle;
          background: #f8f8f8;
          float: right;
          margin-top: 20px;
          border-radius: 100%;
          img{
            vertical-align: middle;
          }
        }
      }
    }
  }
  .grid-content-2{
    width: 320px;
    float: right;
    .grid-content{
    }
    .carousel{
      background: url('/static/img/home/img_14.png') no-repeat;
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
      .box-cont{
        padding-top: 0px;
        padding-bottom: 0px;
      }
    }
    .login-list{
      .box-cont{
        padding-top: 0px;
        padding-bottom: 0px;
      }
    }
    .notice-list .box-tit-right a,
    .login-list .box-tit-right a{
      color: #666666;
    }
  }
}
</style>

