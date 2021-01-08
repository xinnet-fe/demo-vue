<template>
  <div>
    <el-form ref="joinActivityForm" :model="joinActivityForm" :rules="joinActivityFormRules">
      <div class="selectlevel">
        <span>*</span>选择等级
      </div>
      <el-form-item label="" prop="value">
        <el-transfer
          v-model="joinActivityForm.value"
          filterable
          :filter-method="filter_levelList"
          filter-placeholder="请选择等级"
          :data="levelList"
          @change="change_level"
        />
      </el-form-item>
      <span class="selectlevelTip">{{ selectlevelTip }}</span>

      <el-form-item label="选择活动" prop="activity">
        <el-autocomplete
          ref="activity"
          v-model="joinActivityForm.activity"
          popper-class="my-autocomplete"
          :fetch-suggestions="querySearch_activity"
          placeholder="请输入活动"
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
            <div class="name">{{ item.promotionName }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer" style="text-align:right">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectlevelTip: '',
      // 穿梭框中的列表
      levelList: [],
      // 表单数据
      joinActivityForm: {
        // 所选的等级
        value: [],
        // 所选活动的name
        activity: '',
        // 所选活动的code
        promotionCode: ''
      },
      // 穿梭框的过滤规则
      filter_levelList(query, item) {
        return item.label.indexOf(query) > -1
      },
      // 表单的规则
      joinActivityFormRules: {
        // 选择活动
        activity: [
          {
            required: true,
            message: '请选择活动',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      // 获取所有级别名称
      queryAllGrade: state => state.promotion.queryAllGrade,
      // 获取所有关联活动
      queryAllAgentPromotion: state => state.promotion.queryAllAgentPromotion,
      // 关联活动【添加】
      gradeRelaPromotion: state => state.promotion.gradeRelaPromotion,
      // 查询条件
      levelQueryWhere: state => state.promotion.levelQueryWhere
    })
  },
  created() {
    // console.log('created 获取所有级别名称、关联活动')
    // 获取所有级别名称
    this.$store.dispatch('promotion/queryAllGrade', {})
    // 获取所有关联活动
    this.$store.dispatch('promotion/queryAllAgentPromotion', {})
  },
  mounted() {
    // console.log('mounted')
    // 更新穿梭框中的等级  label 与 key 是 element-ui 中的关键字
    this.levelList = this.queryAllGrade.data.map((item, index) => ({
      label: item.gradeName,
      code: item.id,
      key: index
    }))
    // console.log('this.queryAllGrade.data = ', this.queryAllGrade.data)
  },
  methods: {
    // 选择等级
    change_level(arr) {
      if (arr.length === 0) {
        this.selectlevelTip = '请选择等级'
      } else {
        this.selectlevelTip = ''
      }
    },
    // 【关联活动】下拉菜单，列表（返回建议内容）
    querySearch_activity(qs, cb) {
      var results = []
      // console.log('this.queryAllAgentPromotion = ', this.queryAllAgentPromotion)
      if (qs === '') {
        results = this.queryAllAgentPromotion.data.map((item) => ({
          value: item.promotionName,
          promotionName: item.promotionName,
          promotionCode: item.promotionCode
        }))
      } else {
        results = this.queryAllAgentPromotion.data.filter((item) => item.promotionName.indexOf(qs) > -1).map((item) => ({
          value: item.promotionName,
          promotionName: item.promotionName,
          promotionCode: item.promotionCode
        }))
      }
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 关联活动
    handleBlur_activity() {
      const activity = this.joinActivityForm.activity
      const queryAllAgentPromotionData = this.queryAllAgentPromotion.data
      // console.log('activity = ', activity)
      // console.log('queryAllAgentPromotionData = ', queryAllAgentPromotionData)
      const ind = queryAllAgentPromotionData.findIndex(item => item.promotionName === activity)
      // console.log('ind = ', ind)
      if (ind === -1) {
        this.joinActivityForm.activity = ''
        this.joinActivityForm.promotionCode = ''
      } else {
        // console.log('queryAllAgentPromotionData[ind] = ', queryAllAgentPromotionData[ind])
        this.joinActivityForm.activity = queryAllAgentPromotionData[ind].promotionName
        this.joinActivityForm.promotionCode = queryAllAgentPromotionData[ind].promotionCode
      }
    },
    // 选择【关联活动】下拉菜单建议项时
    handleSelect_activity(row) {
      // console.log('row = ', row)
      this.joinActivityForm.promotionCode = row.promotionCode
    },
    // 点击【关联活动】下拉菜单，icon图标时
    handleIconClick_activity() {
      this.$refs.activity.focus()
    },
    // 提交表单时
    onSubmit() {
      // 检查所选的等级
      this.selectlevelTip = ''
      if (this.joinActivityForm.value.length === 0) {
        this.selectlevelTip = '请选择等级'
        return false
      }
      this.$refs['joinActivityForm'].validate((valid) => {
        if (valid) {
          const payload = {
            // 获取所选的活动
            promotionCode: this.joinActivityForm.promotionCode,
            // 获取所选的等级
            gradeList: this.joinActivityForm.value.map(item => this.levelList[item].code).join(',')
          }
          this.$store.dispatch('promotion/gradeRelaPromotion', payload).then(_ => {
            if (!this.gradeRelaPromotion.code) {
              if (this.gradeRelaPromotion.data.isSuccess === '1') {
                this.$alert('关联成功', { callback: () => {} })
                this.$store.dispatch('promotion/queryGradePromotionsRelation', {
                  ...this.levelQueryWhere,
                  pageNum: 1
                })
                // 关闭层
                this.resetForm()
              } else if (this.gradeRelaPromotion.data.isSuccess === '0') {
                if (this.gradeRelaPromotion.data.gradeNames && this.gradeRelaPromotion.data.gradeNames.length > 0) {
                  this.$alert(this.gradeRelaPromotion.data.gradeNames.join('、') + '关联失败，等级与活动已关联，不能重复关联', { callback: () => {} })
                }
                if (this.gradeRelaPromotion.data.reGradeNames && this.gradeRelaPromotion.data.reGradeNames.length > 0) {
                  this.$alert(this.gradeRelaPromotion.data.reGradeNames.join('、') + '关联活动失败，原因：活动商品及规格重叠', { callback: () => {} })
                }
              } else {
                this.$alert(this.gradeRelaPromotion.msg, { callback: () => {} })
              }
            } else {
              this.$alert(this.gradeRelaPromotion.msg, { callback: () => {} })
            }
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 点击取消时
    resetForm() {
      // 重置表单
      this.$refs['joinActivityForm'].resetFields()
      // 关闭浮层
      this.$parent.$parent.formVisible_Join = false
      // console.log('resetForm this.joinActivityForm=', this.joinActivityForm)
    }
  }
}
</script>

<style lang="scss" scoped>
>>>.el-transfer-panel__item.el-checkbox .el-checkbox__label,.el-transfer-panel__item.el-checkbox .el-checkbox__label{
  overflow:inherit !important;
}
>>>.el-transfer__buttons{
  padding: 0 20px !important;
}

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

.selectlevel{
  font-size: 12px;
  padding-bottom: 10px;
  span {
    color: red;
    margin-right: 5px;
  }
}

.selectlevelTip{
  color: #f35b5c;
  font-size: 12px;
}
</style>
