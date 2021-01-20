<template>
  <div>
    <el-form ref="joinActivityForm" :model="joinActivityForm" :rules="joinActivityFormRules">

      <el-form-item label="选择活动" prop="activity">
        <el-autocomplete
          ref="activity"
          v-model="joinActivityForm.activity"
          popper-class="my-autocomplete-multiple"
          :fetch-suggestions="querySearch_activity"
          placeholder="请输入活动"
          :clearable="true"
          @select="handleSelect_activity"
          @blur="handleBlur_activity"
          :debounce="1000"
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
      priceCodes: [],
      joinActivityForm: {
        // 选择活动
        activity: ''
      },
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
      // 获取所有关联活动
      queryAllAgentPromotion: state => state.promotion.queryAllAgentPromotion,
      // 商品关联活动（列表页 多选）
      commodity_multipleSelection: state => state.promotion.commodity_multipleSelection,
      // 商品关联活动
      goodsRelatedPromotions: state => state.promotion.goodsRelatedPromotions
    })
  },
  created() {
    // 获取所有关联活动
    //this.$store.dispatch('promotion/queryAllAgentPromotion', {})
  },
  methods: {
    // 【关联活动】下拉菜单，列表（返回建议内容）
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
              promotionName: item.promotionName,
              promotionCode: item.promotionCode
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
    */
    // 关联活动
    handleBlur_activity() {
      const activity = this.joinActivityForm.activity
      const queryAllAgentPromotionData = this.queryAllAgentPromotion.data.list
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
      this.$refs['joinActivityForm'].validate((valid) => {
        if (valid) {
          this.priceCodes = []
          this.commodity_multipleSelection.forEach(item => {
            this.priceCodes.push(item.priceCode)
          })

          const payload = {
            promotionCode: this.joinActivityForm.promotionCode,
            priceCodes: this.priceCodes.join(',')
          }

          // 商品关联活动
          this.$store.dispatch('promotion/goodsRelatedPromotions', payload).then(_ => {
            // console.log('goodsRelatedPromotions = ', this.goodsRelatedPromotions)
            if (this.goodsRelatedPromotions.code) {
              this.$alert(this.goodsRelatedPromotions.msg, { callback: () => {} })
            } else {
              if (this.goodsRelatedPromotions.data.isSuccess === '1') {
                this.$alert('操作成功', { callback: () => {} })
                // 关闭层
                this.resetForm()
              } else {
                // this.$alert('操作失败')
                if (this.goodsRelatedPromotions.data.goodsNames && this.goodsRelatedPromotions.data.goodsNames.length > 0) {
                  this.$alert(this.goodsRelatedPromotions.data.goodsNames.join('、') + '关联活动失败，原因：同一规格不能关联两个或以上已被相同等级使用的活动', { callback: () => {} })
                }
                if (this.goodsRelatedPromotions.data.relatedPromotGoodsNames && this.goodsRelatedPromotions.data.relatedPromotGoodsNames.length > 0) {
                  this.$alert(this.goodsRelatedPromotions.data.relatedPromotGoodsNames.join('、') + '关联失败，商品规格与活动已关联，不能重复关联', { callback: () => {} })
                }
              }
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

.my-autocomplete,
.my-autocomplete-multiple {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.el-autocomplete /deep/ input[popperclass="my-autocomplete-multiple"] {
  width: 350px !important;
}
</style>
