<template>
  <div>
    <el-form ref="removeActivityForm" :model="removeActivityForm" :rules="removeActivityFormRules">

      <el-form-item label="选择等级" prop="value">
        <el-col>
          <el-checkbox-group v-model="removeActivityForm.values">
            <el-checkbox
              v-for="(item, index) in queryGradePromotionsIntersection.data.agentGradeList"
              :key="index"
              border
              :label="item.promotionName"
              @change="checkbox_change($event, item)"
            />
          </el-checkbox-group>
        </el-col>
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
      promotionCodes: [],
      gradleCodes: [],
      removeActivityForm: {
        values: []
      },
      removeActivityFormRules: {

      }
    }
  },
  computed: {
    ...mapState({
      // 等级关联活动（列表页 多选）
      level_multipleSelection: state => state.promotion.level_multipleSelection,
      // 查询等级活动交集
      queryGradePromotionsIntersection: state => state.promotion.queryGradePromotionsIntersection,
      // 解除等级活动
      liftGradePromotionsRelation: state => state.promotion.liftGradePromotionsRelation
    })
  },
  methods: {
    checkbox_change(checked, item) {
      // console.log('item=', item)
      if (checked) {
        this.promotionCodes.push(item.promotionCode)
      } else {
        const ind = this.promotionCodes.findIndex(value => value === item.promotionCode)
        if (ind > -1) {
          this.promotionCodes.splice(ind, 1)
        }
      }
      // console.log('this.promotionCodes=', this.promotionCodes)
      // console.log('this.gradleCodes=', this.level_multipleSelection)
    },
    // 提交表单时
    onSubmit() {
      this.$refs['removeActivityForm'].validate((valid) => {
        if (valid) {
          // console.log('submit this.removeActivityForm=', this.removeActivityForm)

          // 等级codes 逗号分隔
          this.gradleCodes = []
          this.level_multipleSelection.forEach(item => {
            this.gradleCodes.push(item.gradeCode)
          })

          // 活动codes 逗号分隔
          // this.promotionCodes
          if (this.promotionCodes.length === 0) {
            this.$alert('请选择等级', { callback: () => {} })
            return
          }

          const payload = {
            gradleCodes: this.gradleCodes.join(','),
            promotionCodes: this.promotionCodes.join(',')
          }
          this.$store.dispatch('promotion/liftGradePromotionsRelation', payload).then(_ => {
            if (this.liftGradePromotionsRelation.code) {
              this.$alert(this.liftGradePromotionsRelation.msg, { callback: () => {} })
            }
            if (this.liftGradePromotionsRelation.data.isSuccess === '1') {
              this.$alert('操作成功', { callback: () => {} })
              // 关闭层
              this.resetForm()
              // 刷新列表
              this.$store.dispatch('promotion/queryGradePromotionsRelation', {
                ...this.levelQueryWhere,
                pageNum: 1
              })
            } else {
              this.$alert('操作失败', { callback: () => {} })
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
      this.$refs['removeActivityForm'].resetFields()
      // 关闭浮层
      this.$parent.$parent.formVisible_Remove = false
      // console.log('resetForm this.removeActivityForm=', this.removeActivityForm)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
