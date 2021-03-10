<template>
  <div class="">
    <table>
      <tr>
        <td class="td1">联系地址</td>
        <td class="td2">联系地址联系地址联系地址联系地址</td>
        <td class="td3">邮编</td>
        <td class="td4">邮编邮编</td>
      </tr>
      <tr>
        <td class="td1">企业规模</td>
        <td class="td2">企业规模企业规模</td>
        <td class="td3">注册资金</td>
        <td class="td4">注册资金注册资金</td>
      </tr>
      <tr>
        <td class="td1">法人</td>
        <td class="td2">法人法人</td>
        <td class="td3">经营状态</td>
        <td class="td4">经营状态经营状态</td>
      </tr>
      <tr>
        <td class="td1">成立日期</td>
        <td class="td2">成立日期成立日期</td>
        <td class="td3">经营期限</td>
        <td class="td4">经营期限经营期限</td>
      </tr>
      <tr>
        <td class="td1">行业</td>
        <td class="" colspan="3">成立日期成立日期</td>
      </tr>
      <tr>
        <td class="td1">主营产品</td>
        <td class="td2">成立日期成立日期</td>
        <td class="td3">市场</td>
        <td class="td4">经营期限经营期限</td>
      </tr>
      <tr>
        <td class="td1">品牌</td>
        <td class="td2">成立日期成立日期</td>
        <td class="td3">生意渠道</td>
        <td class="td4">经营期限经营期限</td>
      </tr>
      <tr>
        <td class="td1">竞品公司</td>
        <td class="td2">成立日期成立日期</td>
        <td class="td3">竞品网址</td>
        <td class="td4">经营期限经营期限</td>
      </tr>
      <tr>
        <td class="td1">官网</td>
        <td class="td2">成立日期成立日期</td>
        <td class="td3">企业邮箱</td>
        <td class="td4">经营期限经营期限</td>
      </tr>
      <tr>
        <td class="td1">经营范围</td>
        <td class="" colspan="3">成立日期成立日期</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DetailOperation',
  components: {
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
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  td{
    border: 1px solid #e8e8e8;
    padding: 10px;
    height: 40px;
    line-height: 16px;
    color: #333;
  }
  .td1{
    width: 20%;
    background: #f6f6f6;
  }
  .td3{
    width: 20%;
    background: #f6f6f6;
  }
  .td2{
    width: 20%;
  }
  .td4{
    width: 20%;
  }
}
</style>
