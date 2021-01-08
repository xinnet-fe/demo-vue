<template>
  <div class="container">
    <Search />
    <List />
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_addActivityForm" :close-on-click-modal="false" destroy-on-close title="添加活动" :visible.sync="formVisible_addActivityForm">
      <Add />
    </el-dialog>
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_updateActivityForm" :close-on-click-modal="false" destroy-on-close title="修改模版" :visible.sync="formVisible_updateActivityForm">
      <Update v-if="formVisible_updateActivityForm" :row="row" />
    </el-dialog>
  </div>
</template>

<script>
import Search from './rule/search'
import List from './rule/list'
import Add from './rule/add'
import Update from './rule/update'

export default {
  components: {
    Search,
    List,
    Add,
    Update
  },
  data() {
    return {
      // 【弹出框】添加活动
      formVisible_addActivityForm: false,
      // 【弹出框】修改活动
      formVisible_updateActivityForm: false,
      // 当前所选行（修改活动）
      row: {}
    }
  },
  methods: {
    // 【关闭弹出框】添加活动
    beforeClose_addActivityForm(done) {
      done()
    },
    // 【关闭弹出框】修改活动
    beforeClose_updateActivityForm(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
  overflow: hidden;
}
</style>
<style lang="scss">
.customWidthRefundDialog{
  width: 50%;
  min-width: 720px;
}
</style>

