<template>
  <div class="demo-container">
    <Detail :handle-to-back="handleBack" class="bg" a="true">
      <!-- <div slot="tit-center">标题</div> -->
      <div slot="cont" class="bbbbbbgggg">
        <Box type="1">
          <div slot="tit-left">基本信息</div>
          <div slot="cont" style="padding-top:0px" class="contop-con">
            <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple">用户编号：{{ list.agentCode }}</div></el-col>
              <!-- <el-col :span="6"><div class="grid-content bg-purple">单位（个人）名称：{{ list.organNames }}</div></el-col> -->
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-tooltip placement="top">
                    <div slot="content">
                      {{ list.organName }}
                    </div>
                    <div class="icon-item">
                      <!-- <i :class="'el-icon-' + item" /> -->
                      <span>单位（个人）名称：{{ list.organNames }}</span>
                    </div>
                  </el-tooltip>
                </div>
              </el-col>
              <el-col :span="6"><div class="grid-content bg-purple">账号状态：{{ list.accountState === '01' ? '未开通' : list.accountState === '02' ? '已开通' : list.accountState === '03' ? '锁定' : list.accountState === '04' ? '注销' : '' }}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">手机号：{{ list.phoneNumber }}</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple">注册渠道：{{ list.registerChannel }}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">实名状态：{{ list.realNameState === '0' || list.realNameState === '4' ? '审核中' : list.realNameState === '1' ? '已实名' : list.realNameState === '2' ? '审核失败' : list.realNameState === '3' ? '已取消' : '未实名' }}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">分公司：{{ list.companyName }}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">账号绑定邮箱：{{ list.bindEmail }}</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple">注册时间：{{ list.registerDate }}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">认证类型：{{ list.authType === 'T' || list.authType === 'P' ? '个人' : list.authType === 'C' ? '企业' : '' }}</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">用户类型：{{ list.userType }}</div></el-col>
            </el-row>
          </div>
        </Box>

        <div class="contable conmiddle">
          <h2 class="tit">
            <span />
            <p>联系人信息</p>
          </h2>
          <div class="contables conmiddle-table">
            <el-table
              :data="list.contacts"
              style="width: 100%"
            >
              <el-table-column
                prop="contactsName"
                label="姓名"
              />
              <el-table-column
                prop="contactsEmail"
                label="邮箱"
              />
              <el-table-column
                prop="contactsMobile"
                label="手机号"
              />
              <el-table-column
                prop="remark"
                label="备注"
              />
            </el-table>
          </div>
        </div>

        <div class="contable conmiddle">
          <h2 class="tit">
            <span />
            <p>绑定销售信息</p>
          </h2>
          <div class="contables conmiddle-table">
            <el-table
              :data="list.bindSales"
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="姓名"
              />
              <el-table-column
                prop="email"
                label="邮箱"
              />
              <el-table-column
                prop="mobile_code"
                label="手机号"
              />
              <el-table-column
                prop="remark"
                label="备注"
              />
            </el-table>
          </div>
        </div>
      </div>
    </Detail>
  </div>
</template>

<script>
import Box from '@/components/Box'
import Detail from '@/components/Detail'
import { getUserDetail } from '@/api/userinfoManage'
export default {
  name: 'ComplexTable',
  components: { Box, Detail },
  // components: { Pagination },
  // directives: { waves },
  filters: {
  },
  data() {
    return {
      list: '',
      tableData: []
    }
  },
  created() {
    const str = this.$route.query.id
    this.getList(str)
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    getList(agent) {
      getUserDetail({ agentCode: agent }).then(res => {
        if (res.bindSale) {
          res.bindSales = []
          res.bindSales.push(res.bindSale)
        }
        if (res.organName.length > 30) {
          res.organNames = res.organName.substr(0, 30) + '...'
        } else {
          res.organNames = res.organName
        }
        this.list = res
      })
    }
  }
}
</script>
<style scoped>
  .detail-container > div {
    background: #000!important;
  }
  .box-container{
    border-bottom: 20px solid #f3f7fa;
  }
  .contop-con {
    padding: 0 10px 0 10px;
    box-sizing: border-box;
  }
  .contop-con > div {
    height: 40px;
  }
  .contop-con > div > div {
    height: 18px;
  }
  .bb {
    background: #000;
  }
  .nones {
    font-size: 15px;
    line-height: 45px;
    color: #999;
    background: #f6f6f6;
    text-align: center;
    height: 45px!important;
  }
  .contop, .contable {
    background: #fff;
    color: #333;
    margin-bottom: 20px;
  }
  .contables {
    padding: 30px 30px;
    box-sizing: border-box;
  }
  .tit {
    height: 51px;
    font-size: 14px;
    /* line-height: 51px; */
    /* border-left: solid 2px #6282a9; */
    border-bottom: solid 1px #e5e5e5;
    margin: 0;
    display: flex;
  }
  .tit span {
    display: inline-block;
    height: 20px;
    width: 2px;
    margin-top: 17px;
    margin-right: 15px;
    background: #0180cd;
  }
  .tit p {
    height: 20px;
    line-break: 20px;
    font-size: 14px;
    font-weight: 400;
    margin: 20px 0 0 0;
  }
  .icon-item {
    float: left;
    color: #24292e;
    cursor: pointer;
  }
  </style>
