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
                    <p>{{ gradeByAgent && gradeByAgent.gradeName }}</p>
                  </div>
                </td>
                <td class="col2">
                  <span class="img">
                    <img src="/static/img/home/img_02.png" alt="" srcset="">
                  </span>
                  <div class="info">
                    <div>我的余额：<em>￥ {{ account.totalBalance }}</em></div>
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
                  <el-col v-for="(item, i) in busList" :key="i" :span="6">
                    <div class="grid-content grid-content-prod-1 clearfix">
                      <span class="img">
                        <i class="iconfont icon-font01" />
                      </span>
                      <div class="info">
                        <span>{{ item.productName }}</span>
                        <em>{{ item.productNum }}</em>
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
                        <em>{{ dlCustomerNum }}</em>
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
                  <li v-for="(item, i) in listHelp" :key="i" class="el-list-item clearfix" style="width: 50%;float: left;">
                    <strong class="tit"><a :href="item.url" target="_blank">{{ item.title }}</a></strong>
                  </li>
                </ul>
                <el-row :gutter="20" class="help-list-2">
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-1">
                      <a href="http://www.xinnet.com/service/zlxz/index.html" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">资料下载</span>
                        <span class="img">
                          <img src="/static/img/home/img_06.png" alt="" srcset="">
                        </span>
                      </a>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-2">
                      <a href="http://www.xinnet.com/service/xssl/index.html" target="_blank" rel="noopener noreferrer" class="clearfix">
                        <span class="text">新手指南</span>
                        <span class="img">
                          <img src="/static/img/home/img_07.png" alt="" srcset="">
                        </span>
                      </a>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content grid-content-list-3">
                      <a href="http://www.xinnet.com/service/cjwt/index.html" target="_blank" rel="noopener noreferrer" class="clearfix">
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
              <el-carousel-item v-for="item in listAdvRight" :key="item.id">
                <img :src="'/agent/api/announce/echoImage?imgUrl='+item.topTitlePath" alt="" srcset="" @click="handleShow(item)">
              </el-carousel-item>
            </el-carousel>
            <el-drawer
              title="未读消息"
              :modal="false"
              :show-close="true"
              :visible.sync="drawerMsg"
              custom-class="drawerMsg"
              size="100%"
              direction="btt"
              :before-close="handleCloseMsg"
            >
              <ul class="el-list el-list-style2">
                <li v-for="(item, i) in list" :key="i" class="el-list-item clearfix">
                  <strong class="tit"><a>{{ item.title }}</a></strong>
                  <p class="desc">{{ item.updateTime }}</p>
                </li>
              </ul>
            </el-drawer>
          </div>
          <div class="msgs">
            <el-row>
              <el-col :span="8" style="cursor: pointer">
                <div class="grid-content grid-content-msg-1" @click="handleShowMsg()">
                  <em>{{ msgWorkorder.list && msgWorkorder.list.result.length }}</em>
                  <p>未读消息</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content grid-content-msg-2">
                  <em>{{ msgWorkorder.num }}</em>
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
                    <strong class="tit"><a @click="handleShow(item)">{{ item.title }}</a></strong>
                    <p class="desc">{{ item.updateTime }}</p>
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
                  <li v-for="(item, i) in ipAddress" :key="i" class="el-list-item clearfix">
                    <strong class="tit"><a>{{ item.ipAddress }}<br>{{ item.area }}</a></strong>
                    <p class="desc">{{ item.updateTime }}</p>
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
          <el-carousel-item v-for="item in listAdvPop" :key="item.id">
            <img :src="'/agent/api/announce/echoImage?imgUrl='+item.topTitlePath" alt="" srcset="" @click="handleShow(item)">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
    <!-- 公告详情 -->
    <el-drawer
      :title="title"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleCloseDrawer"
    >
      <div slot="title">
        <h3>{{ title }}</h3>
        <p><span>发布时间：{{ time }}</span><span>发布者：{{ author }}</span></p>
      </div>
      <div class="article" v-html="content" />
    </el-drawer>
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
      list: [],
      listAdvPop: [],
      listAdvRight: [],
      listHelp: [
        {
          title: '新网新版代理合同下载',
          url: 'http://www.xinnet.com/service/zlxz/richang/671.html'
        },
        {
          title: '如何变更实名认证信息?',
          url: 'http://www.xinnet.com/service/cjwt/hy/shiming/1544.html'
        },
        {
          title: '代理商如何修改账户信息',
          url: 'http://www.xinnet.com/service/cjwt/hy/xiugai/1869.html'
        },
        {
          title: '备案流程',
          url: 'http://www.xinnet.com/service/cjwt/qita/icp/1469.html'
        },
        {
          title: '售后问题在线提问',
          url: 'http://www.xinnet.com/service/xssl/hyczsc/1149.html'
        },
        {
          title: '代理申请发票流程',
          url: 'http://www.xinnet.com/service/cjwt/caiwu/fapiao/1340.html'
        }
      ],
      drawer: false,
      drawerMsg: false,
      direction: 'rtl',
      title: '',
      time: '2020-05-05',
      author: '新网',
      content: '',
      dlCustomerNum: 0,
      ipAddress: [],
      busType: ['D', 'V', 'M', 'W', 'N'],
      busList: [],
      msgWorkorder: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.userinfo.user,
      usersafe: state => state.usersafe.usersafe,
      gradeByAgent: state => state.userinfo.gradeByAgent,
      account: state => state.userinfo.account
    })
  },
  beforeCreate() {
    this.$router.push({ path: '/agent-home/index?showLayout=false' })
  },
  mounted() {
    const adv = Cookies.get('agent-adv')
    if (!adv) {
      Cookies.set('agent-adv', 'true', { expires: 1 })
      this.getNoticeCarousel({
        type: 'pop',
        preType: '',
        pageNum: 1,
        pageSize: 3
      })
    }
    this.getNotice()
    this.getNoticeCarousel({
      type: 'right',
      preType: '2',
      pageNum: 1,
      pageSize: 5
    })
    this.getDlCustomer()
    this.queryIpAddress()
    this.queryMyServices()
    this.queryMsgWorkorder()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    getNotice() {
      const query = {
        preType: '1',
        pageNum: 1,
        pageSize: 5
      }
      this.$store.dispatch('announce/queryDlActivityOrAnnounce', query).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.list = res.data.list
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getNoticeCarousel(params) {
      const query = {
        preType: params.preType,
        pageNum: params.pageSize
      }
      this.$store.dispatch('announce/findDlActivityAnnounce', query).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          if (params.type === 'pop') {
            this.listAdvPop = res.data
            if (res.data.length) {
              this.dialogVisible = true
            }
          } else {
            this.listAdvRight = res.data
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getDlCustomer() {
      this.$store.dispatch('userinfo/findDlCustomer', {}).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.dlCustomerNum = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    queryIpAddress() {
      this.$store.dispatch('userinfo/queryIpAddress', {}).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.ipAddress = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    queryMyServices() {
      this.busType.map((v) => {
        this.$store.dispatch('usercommon/queryMyServices', { busType: v }).then(res => {
          console.log(res.success)
          if (!res.code && res.success) {
            // this.ipAddress = res.data
            this.busList.push(...res.data)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    queryMsgWorkorder() {
      this.$store.dispatch('usercommon/queryMsgWorkorder', {}).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.msgWorkorder = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleShow(param) {
      this.drawer = true
      this.$store.dispatch('announce/queryContentById', { id: param.id }).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.title = res.data.title
          this.content = res.data.content.replace(/\/userManager\//, '/agent/api/announce/')
          this.time = res.data.updateTime
          this.author = res.data.publisher
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleShowMsg() {
      this.drawerMsg = true
    },
    handleCloseDrawer() {
      this.drawer = false
    },
    handleCloseMsg() {
      this.drawerMsg = false
    }
  }
}
</script>
<style lang="scss">
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
    .el-carousel__item{
      text-align: center;
      line-height: 460px;
      vertical-align: middle;
      img{
        max-width: 100%;
        max-height: 100%;
      }
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
            color: #333;
          }
        }
      }

      .prod-list{
        border-top: 1px solid #f5f5f5;
        margin-left: -20px!important;
        margin-right: -20px!important;
        padding: 25px 10px 0 10px;
        .el-col{
          margin: 10px 0;
        }
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
        .text{
          color: #333;
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
      position: relative;
      .el-drawer__wrapper{
        position: absolute;
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
    .el-carousel__item{
      text-align: center;
      line-height: 230px;
      vertical-align: middle;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .msgs{
      background: #fff;
      text-align: center;
      padding: 23px 0;
      margin-bottom: 20px;
      color: #333;
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
  .el-drawer{
    .el-drawer__header {
      margin-bottom: 0px;
      border-bottom: 1px solid #e5e5e5;
      padding-top: 27px;
      padding-bottom: 27px;
      *{
        outline: none;
      }
      h3{
        margin-top: 0px;
        font-size: 16px;
        line-height: 24px;
        color: #333;
        font-weight: normal;
      }
      p{
        margin: 0px;
      }
      p span{
        font-size: 12px;
        display: inline-block;
        margin-right: 20px;
      }
    }
    .el-drawer__body {
      overflow: auto;
      /* overflow-x: auto; */
      color: #333;
    }
    .article {
      font-size: 12px;
      line-height: 24px;
      padding: 0 20px;
    }
    img{
      max-width: 100%;
    }
  }
  .drawerMsg{
    .el-drawer__header{
      padding: 0px 20px;
      line-height: 30px;
      // height: 0px;
    }
    .el-drawer__close-btn{
      position: relative;
      right: -10px;
      font-size: 14px;
    }
    .el-drawer__body{
      padding: 0 20px;
    }
  }
}

</style>

