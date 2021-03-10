<template>
  <div class="detail-container">
    <table class="base-info">
      <tr>
        <td rowspan="3" class="td1">
          <img src="@/assets/img_01.png" alt="">
        </td>
        <td colspan="4"><strong>{{ obj.custNameCn }}</strong></td>
      </tr>
      <tr>
        <td class="td2">客户类型：<div>{{ obj.custType === 1 ? '企业' : '个人' }}</div></td>
        <td class="td3">会员code：<div>{{ obj.memberCode }}</div></td>
        <td class="td4">注册手机：<div>无</div></td>
        <td class="td5">注册邮箱：<div>{{ obj.custMail }}</div></td>
      </tr>
      <tr>
        <td class="td2">会员名称：<div>{{ obj.memberName }}</div></td>
        <td class="td3">当前状态：<div>{{ obj.custOperStatus }}</div></td>
        <td class="td4">商务：<div>{{ obj.salerName }}</div></td>
        <td class="td5">管家：<div>{{ obj.gjName }}</div></td>
      </tr>
    </table>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="idx1">
        <detail-base-info ref="idx1" :row="row" :obj="obj" />
      </el-tab-pane>
      <el-tab-pane label="行为信息" name="idx2">
        <detail-action-info ref="idx2" :row="row" />
      </el-tab-pane>
      <el-tab-pane label="消费信息" name="idx3">
        <detail-consume-info ref="idx3" :row="row" />
      </el-tab-pane>
      <el-tab-pane label="跟进服务记录" name="idx4">
        <detail-follow-info ref="idx4" :row="row" />
      </el-tab-pane>
      <el-tab-pane label="产品服务信息" name="idx5">
        <detail-product-info ref="idx5" :row="row" />
      </el-tab-pane>
      <el-tab-pane label="产品服务效果" name="idx6">
        <detail-product-effect ref="idx6" :row="row" />
      </el-tab-pane>
      <el-tab-pane label="投诉信息" name="idx7">
        <detail-complain-info ref="idx7" :row="row" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DetailBaseInfo from './detailBaseInfo'
import DetailActionInfo from './detailActionInfo'
import DetailConsumeInfo from './detailConsumeInfo'
import DetailFollowInfo from './detailFollowInfo'
import DetailProductInfo from './detailProductInfo'
import DetailProductEffect from './detailProductEffect'
import DetailComplainInfo from './detailComplainInfo'
export default {
  name: 'DetailOperation',
  components: {
    DetailBaseInfo,
    DetailActionInfo,
    DetailConsumeInfo,
    DetailFollowInfo,
    DetailProductInfo,
    DetailProductEffect,
    DetailComplainInfo
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeName: '',
      obj: {}
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['security/getCustomerDetailAndProtectById']
    })
  },
  methods: {
    ...mapActions('security', ['getCustomerDetailAndProtectById']),
    handleClick(v) {
      console.log(v)
      this.$refs[v.name].handleGetList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      const query = {
        custId: this.row.id
      }
      this.getCustomerDetailAndProtectById(query).then((res) => {
        this.obj = res.data.customer
      }).catch((error) => {
        console.log(error)
      })
      this.activeName = 'idx1'
    })
  }
}
</script>

<style lang="scss" scoped>
.detail-container{
  padding: 20px;
  .base-info{
    font-size: 12px;
    margin-bottom: 20px;
    color: #333;
    div{
      color: #666;
      padding-top: 3px;
    }
    .td1{
      width: 140px;
    }
    .td2,
    .td3,
    .td4,
    .td5{
      width: 180px;
    }
    strong{
      font-size: 16px;
    }
  }
}
</style>
