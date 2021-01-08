<template>
  <div>
    <el-form ref="removeActivityForm" :model="removeActivityForm" :rules="removeActivityFormRules">

      <el-form-item label="选择等级" prop="value">
        <el-col>
          <el-checkbox-group v-model="removeActivityForm.values">
            <el-checkbox
              v-for="(item, index) in queryGoodsPromotionsIntersection.data.intersectPromotList"
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
      promotionCodes: [], // 活动codes 逗号分隔
      priceCodes: [], // 商品规格codes 逗号分隔
      removeActivityForm: {
        values: []
      },
      removeActivityFormRules: {

      }
    }
  },
  computed: {
    ...mapState({
      // 商品关联活动（列表页 多选）
      commodity_multipleSelection: state => state.promotion.commodity_multipleSelection,
      // 查询商品活动交集
      queryGoodsPromotionsIntersection: state => state.promotion.queryGoodsPromotionsIntersection,
      // 解除等级活动
      liftGoodsPromotionsRelation: state => state.promotion.liftGoodsPromotionsRelation
    })
  },
  methods: {
    checkbox_change(checked, item) {
      if (checked) {
        this.promotionCodes.push(item.promotionCode)
      } else {
        const ind = this.promotionCodes.findIndex(value => value === item.promotionCode)
        if (ind > -1) {
          this.promotionCodes.splice(ind, 1)
        }
      }
      // console.log('this.promotionCodes=', this.promotionCodes)
      // console.log('this.priceCodes=', this.commodity_multipleSelection)
    },
    // 提交表单时
    onSubmit() {
      this.$refs['removeActivityForm'].validate((valid) => {
        if (valid) {
          // console.log('submit this.removeActivityForm=', this.removeActivityForm)
          // 商品规格codes 逗号分隔
          this.priceCodes = []
          this.commodity_multipleSelection.forEach(item => {
            this.priceCodes.push(item.priceCode)
          })

          // 活动codes 逗号分隔
          // this.promotionCodes
          if (this.promotionCodes.length === 0) {
            this.$alert('请选择等级', { callback: () => {} })
            return
          }

          const payload = {
            priceCodes: this.priceCodes.join(','),
            promotionCodes: this.promotionCodes.join(',')
          }

          this.$store.dispatch('promotion/liftGoodsPromotionsRelation', payload).then(_ => {
            if (this.liftGoodsPromotionsRelation.code) {
              this.$alert(this.liftGoodsPromotionsRelation.msg, { callback: () => {} })
            }
            if (this.liftGoodsPromotionsRelation.data.isSuccess === '1') {
              this.$alert('操作成功', { callback: () => {} })
              // 关闭层
              this.resetForm()
              // 刷新列表
              this.$store.dispatch('promotion/commodityQueryWhere', {
                ...this.commodityQueryWhere,
                ac_now: new Date().getTime(),
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
