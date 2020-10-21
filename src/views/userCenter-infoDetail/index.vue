<template>
  <div class="demo-container">
    <Box type="1">
      <div slot="tit-left"><a href="javascript:;" @click="handleBack"> &lt; 返回</a></div>
      <div slot="cont">
        <Box type="1">
          <div slot="tit-left">基本信息</div>
          <!-- <div slot="tit-right">
            <a href="javascript:;" @click="handleBack">返回上一页</a>
          </div> -->
          <div slot="cont" style="padding-top:0px" class="contop-con">
            <p>
              <span>用户编号：{{ list.agentCode }}</span>
              <!-- <span>注册设备：{{ list.registerDevice }}</span> -->
              <span>单位（个人）名称：{{ list.organName }}</span>
              <span>账号状态：{{ list.accountState === '01' ? '未开通' : list.accountState === '02' ? '已开通' : list.accountState === '03' ? '锁定' : list.accountState === '04' ? '注销' : '' }}</span>
              <span>手机号：{{ list.phoneNumber }}</span>
            </p>
            <p>
              <span>注册渠道：{{ list.registerChannel }}</span>
              <span>实名状态：{{ list.realNameState === '0' || list.realNameState === '4' ? '审核中' : list.realNameState === '1' ? '已实名' : list.realNameState === '2' ? '审核失败' : list.realNameState === '3' ? '已取消' : '未实名' }}</span>
              <span>分公司：{{ list.companyName }}</span>
              <span>账号绑定邮箱：{{ list.bindEmail }}</span>
            </p>
            <p>
              <span>注册时间：{{ list.registerDate }}</span>
              <span>认证类型：{{ list.authType === 'T' || list.authType === 'P' ? '个人' : list.authType === 'C' ? '企业' : '' }}</span>
              <span>用户类型：{{ list.userType }}</span>
            </p>
          </div>
        </Box>

        <Box type="1">
          <div slot="tit-left">联系人信息</div>
          <div slot="cont" class="contop-con">
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
        </Box>

        <Box type="1">
          <div slot="tit-left">绑定销售信息</div>
          <div slot="cont" class="contop-con">
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
        </Box>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/Box'
import { getUserDetail } from '@/api/userinfoManage'
export default {
  name: 'ComplexTable',
  components: { Box },
  // components: { Pagination },
  // directives: { waves },
  filters: {
  },
  data() {
    return {
      list: '',
      tableData: [{
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }, {
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }, {
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }, {
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }]
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
        res.bindSales = []
        res.bindSales.push(res.bindSale)
        this.list = res
      })
    }
  }
}
</script>
<style scoped>
  .box-container{
    border-bottom: 20px solid #f3f7fa;
  }
  .contop-con {
    padding: 0 10px 0 10px;
    box-sizing: border-box;
  }
  .contop-con > p {
    font-size: 12px;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .contop-con > p > span {
    display: inline-block;
    width: 24%;
  }
  </style>
