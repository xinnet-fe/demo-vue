<template>
  <div class="form-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true" label-width="80px">
      
          <el-form-item label="级别名称" prop="levelName">
            <el-autocomplete
              ref="levelName"
              v-model="searchForm.levelName"
              popper-class="my-autocomplete"
              :fetch-suggestions="querySearch_levelName"
              placeholder="请输入级别名称"
              :clearable="true"
              @select="handleSelect_levelName"
              @blur="handleBlur_levelName"
            >
              <i
                slot="suffix"
                class="el-icon-caret-bottom el-input__icon"
                @click="handleIconClick_levelName"
              />
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>

          <el-form-item label="关联活动" prop="activity">
            <el-autocomplete
              ref="activity"
              v-model="searchForm.activity"
              popper-class="my-autocomplete"
              :fetch-suggestions="querySearch_activity"
              placeholder="请输入关联活动"
              :clearable="true"
              @select="handleSelect_activity"
              @blur="handleBlur_activity"
            >
              <i
                slot="suffix"
                class="el-icon-caret-bottom el-input__icon"
                @click="handleIconClick_activity"
              />
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
            <el-button @click="onReset('searchForm')">重置</el-button>
          </el-form-item>
        
    </el-form>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      searchForm: {
        // 级别名称，所选
        levelName: '',
        // 关联活动，所选
        activity: ''
      },
      gradeCode: '',
      promotionCode: '',
      timer: null
    }
  },
  computed: {
    ...mapState({
      // 获取所有级别名称
      queryAllGrade: state => state.promotion.queryAllGrade,
      // 获取所有关联活动
      queryAllAgentPromotion: state => state.promotion.queryAllAgentPromotion
    })
  },
  created() {
    // console.log('created 获取所有级别名称、关联活动')
    // 获取所有级别名称
    this.$store.dispatch('promotion/queryAllGrade', {})
    // 获取所有关联活动
    //this.$store.dispatch('promotion/queryAllAgentPromotion', {})
  },
  methods: {
    // 级别名称，（返回建议内容）
    querySearch_levelName(qs, cb) {
      // console.log('级别名称，queryAllGrade=', this.queryAllGrade)
      var results
      if (qs === '') {
        results = this.queryAllGrade.data.map((item) => ({
          value: item.gradeName,
          code: item.id
        }))
      } else {
        results = this.queryAllGrade.data.filter((item) => item.gradeName.indexOf(qs) > -1).map((item) => ({
          value: item.gradeName,
          code: item.id
        }))
      }
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 级别名称
    handleBlur_levelName() {
      const levelName = this.searchForm.levelName
      const queryAllGradeData = this.queryAllGrade.data
      const ind = queryAllGradeData.findIndex(item => item.gradeName === levelName)
      // console.log('ind = ', ind)
      if (ind === -1) {
        this.searchForm.levelName = ''
        this.gradeCode = ''
      } else {
        // console.log('queryAllGradeData[ind] = ', queryAllGradeData[ind])
        this.searchForm.levelName = queryAllGradeData[ind].gradeName
        this.gradeCode = queryAllGradeData[ind].id
      }
    },
    // 选择 级别名称 下拉菜单建议项时
    handleSelect_levelName(row) {
      // console.log('handleSelect, ', row)
      this.gradeCode = row.code
    },
    // 点击 级别名称 下拉菜单，icon图标时
    handleIconClick_levelName() {
      this.$refs.levelName.focus()
    },

    // 关联活动，（返回建议内容）
    querySearch_activity(qs, cb) {
      var results
      if (qs) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          //console.log('fetch')
          // 获取输入的对应的关联活动
          this.$store.dispatch('promotion/queryAllAgentPromotion', {promotionName: qs}).then(res => {
            //console.log('res=', this.queryAllAgentPromotion)
            results = this.queryAllAgentPromotion.data.list.map((item) => ({
              value: item.promotionName,
              code: item.promotionCode
            }))
            // 调用 callback 返回建议列表的数据
            cb(results)
          }).catch(() => {
            console.error('queryAllAgentPromotion接口错误')
          })
        }, 500)
      } else {
        results = []
        cb(results)
      }
    },
    /*
    querySearch_activity(qs, cb) {
      var results
      // console.log('this.queryAllAgentPromotion=', this.queryAllAgentPromotion)
      if (qs === '') {
        results = this.queryAllAgentPromotion.data.map((item) => ({
          value: item.promotionName,
          code: item.promotionCode
        }))
      } else {
        results = this.queryAllAgentPromotion.data.filter((item) => item.promotionName.indexOf(qs) > -1).map((item) => ({
          value: item.promotionName,
          code: item.promotionCode
        }))
      }
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    */
    // 关联活动
    handleBlur_activity() {
      const activity = this.searchForm.activity
      const queryAllAgentPromotionData = this.queryAllAgentPromotion.data.list
      // console.log('activity = ', activity)
      // console.log('queryAllAgentPromotionData = ', queryAllAgentPromotionData)
      const ind = queryAllAgentPromotionData.findIndex(item => item.promotionName === activity)
      // console.log('ind = ', ind)
      if (ind === -1) {
        this.searchForm.activity = ''
        this.promotionCode = ''
      } else {
        // console.log('queryAllAgentPromotionData[ind] = ', queryAllAgentPromotionData[ind])
        this.searchForm.activity = queryAllAgentPromotionData[ind].promotionName
        this.promotionCode = queryAllAgentPromotionData[ind].promotionCode
      }
    },
    // 选择 关联活动 下拉菜单建议项时
    handleSelect_activity(row) {
      // console.log('handleSelect, ', row)
      this.promotionCode = row.code
    },
    // 点击 关联活动 下拉菜单，icon图标时
    handleIconClick_activity() {
      this.$refs.activity.focus()
    },
    onReset(formName) {
      clearFormData(this.searchForm)
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate(formName)
    },
    // 点击【查询】
    onSearch() {
      // console.log('submit searchForm=', this.searchForm)
      // 将查询条件保存到store中
      const payload = {
        gradeCode: this.searchForm.levelName === '' ? '' : this.gradeCode,
        promotionCode: this.searchForm.activity === '' ? '' : this.promotionCode
      }
      this.$store.dispatch('promotion/levelQueryWhere', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
