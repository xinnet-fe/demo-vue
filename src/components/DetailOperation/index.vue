<template>
  <div class="detail-container">
    <table class="base-info">
      <tr>
        <td rowspan="3" class="td1">
          <img src="@/assets/img_01.png" alt="">
        </td>
        <td colspan="4"><strong>中地乳业集团有限公司</strong></td>
      </tr>
      <tr>
        <td class="td2">客户类型：企业</td>
        <td class="td3">会员code：CEM10147087</td>
        <td class="td4">注册手机：13426168242</td>
        <td class="td5">注册邮箱：renshouyi@sin...</td>
      </tr>
      <tr>
        <td class="td2">会员名称：无</td>
        <td class="td3">当前状态：无</td>
        <td class="td4">商务：李四</td>
        <td class="td5">管家：王五</td>
      </tr>
    </table>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="idx1">
        <detail-base-info />
      </el-tab-pane>
      <el-tab-pane label="行为信息" name="idx2">
        <detail-action-info />
      </el-tab-pane>
      <el-tab-pane label="消费信息" name="idx3">
        <detail-consume-info />
      </el-tab-pane>
      <el-tab-pane label="跟进服务记录" name="idx4">
        <detail-follow-info />
      </el-tab-pane>
      <el-tab-pane label="产品服务信息" name="idx5">
        <detail-product-info />
      </el-tab-pane>
      <el-tab-pane label="产品服务效果" name="idx6">
        <detail-product-effect />
      </el-tab-pane>
      <el-tab-pane label="投诉信息" name="idx7">
        <detail-complain-info />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
    handleToBack: {
      type: Function
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
      activeName: 'idx1'
    }
  },
  computed: {
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container{
  padding: 20px;
  .base-info{
    font-size: 12px;
    margin-bottom: 20px;
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
