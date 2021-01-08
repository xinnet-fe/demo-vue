<template>
  <div class="form-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true" label-width="80px">
      
          <el-form-item label="活动名称" prop="promotionName">
            <el-input v-model="searchForm.promotionName" placeholder="请输入活动名称" />
          </el-form-item>

          <el-form-item label="备注" prop="reMark">
            <el-input v-model="searchForm.reMark" placeholder="请输入备注" />
          </el-form-item>

          <el-form-item label="活动类型" prop="searchActivityType">
            <el-select v-model="searchForm.activityType" placeholder="请选择">
              <el-option
                v-for="item in searchActivityTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="" prop="searchWord">
            <el-checkbox v-model="searchForm.takeEffect">当前生效</el-checkbox>
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
            <el-button type="primary" @click="onReset('searchForm')">重置</el-button>
            <el-button type="primary" @click="onAdd()">添加活动</el-button>
          </el-form-item>
        
    </el-form>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'

export default {
  data() {
    return {
      searchActivityTypeOptions: [{
        value: '全部',
        label: '全部'
      }, {
        value: '折扣',
        label: '折扣'
      }, {
        value: '立减',
        label: '立减'
      }],
      searchForm: {
        reMark: '',
        promotionName: '',
        activityType: '全部',
        takeEffect: false
      }
    }
  },
  methods: {
    onReset(formName) {
      clearFormData(this.searchForm)
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate(formName)
      this.searchForm.activityType = '全部'
    },
    onSearch() {
      // 查询时，生成查询条件
      const payload = {}
      var searchForm = this.searchForm
      payload.type = searchForm.type
      payload.promotionName = searchForm.promotionName
      payload.reMark = searchForm.reMark
      switch (searchForm.activityType) {
        case '全部':
          payload.preferentialForm = null
          break
        case '折扣':
          payload.preferentialForm = 1
          break
        case '立减':
          payload.preferentialForm = 2
          break
      }
      // console.log('searchForm.takeEffect = ', searchForm.takeEffect)
      if (searchForm.takeEffect) {
        payload.currentEffect = 'yes'
      } else {
        payload.currentEffect = 'no'
      }
      // console.log('查询 payload=', payload)
      // 将查询条件保存到store中
      this.$store.dispatch('promotion/ruleQueryWhere', payload)
    },
    onAdd() {
      // 显示【添加活动】弹出框
      this.$parent.formVisible_addActivityForm = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
