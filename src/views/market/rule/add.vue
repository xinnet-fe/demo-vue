<template>
  <div>
    <el-form ref="addActivityForm" :model="addActivityForm" label-width="80px" :rules="addActivityFormRules">

      <el-form-item label="活动名称" prop="promotionName">
        <el-col>
          <el-input v-model="addActivityForm.promotionName" placeholder="请输入模板名称，限20个字符" maxlength="20" show-word-limit />
        </el-col>
      </el-form-item>

      <el-form-item label="优惠形式" prop="preferentialForm">
        <el-col>
          <el-select v-model="addActivityForm.preferentialForm" @change="preferentialForm_change">
            <el-option
              v-for="item in preferentialFormOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-tooltip effect="dark" :content="tooltip" placement="top-start">
            <el-form-item :label="'新开'+preferentialFormFlag" prop="newDiscountValue">
              <el-input v-model="addActivityForm.newDiscountValue" :placeholder="preferentialFormFlag+'值'" />
            </el-form-item>    
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip effect="dark" :content="tooltip" placement="top-start">
            <el-form-item :label="'续费'+preferentialFormFlag" prop="renewalDiscountValue">
              <el-input v-model="addActivityForm.renewalDiscountValue" :placeholder="preferentialFormFlag+'值'" />
            </el-form-item>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="preferentialFormFlag + '类型'" prop="promotionRule">
            <el-select v-model="addActivityForm.promotionRule">
              <el-option
                v-for="item in promotionRuleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      

      <el-form-item label="活动时间" prop="activityTime">
        <el-col>
          <el-date-picker v-model="addActivityForm.activityTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-col>
      </el-form-item>

      <el-form-item label="活动备注" prop="reMark">
        <el-col>
          <el-input
            v-model="addActivityForm.reMark"
            type="textarea"
            placeholder="请填写备注，限500个字符"
            maxlength="500"
            show-word-limit
          />
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
import formatTime from '@/utils/formatTime'

export default {
  data() {
    return {
      preferentialFormOptions: [{
        value: '折扣',
        label: '折扣'
      }, {
        value: '立减',
        label: '立减'
      }],
      isLijian: false,
      promotionRuleOptions:[{
        value: 'all',
        label: '取整'
      },{
        value: 'everyM',
        label: '保留一位小数'
      },{
        value: 'everyY',
        label: '保留两位小数'
      },],
      // 折扣
      promotionRuleOptions1:[{
        value: 'all',
        label: '取整'
      },{
        value: 'everyM',
        label: '保留一位小数'
      },{
        value: 'everyY',
        label: '保留两位小数'
      },],
      // 立减
      promotionRuleOptions2:[{
        value: 'all',
        label: '所有规格'
      },{
        value: 'everyY',
        label: '每年'
      },{
        value: 'everyM',
        label: '每月'
      },],
      preferentialFormFlag: '折扣',
      tooltip: '0(不含)-1(含)之间的两位小数,75折则填写0.75',
      addActivityForm: {
        promotionName: '',
        preferentialForm: '折扣',
        newDiscountValue: '',
        renewalDiscountValue: '',
        activityTime: '',
        remarks: '',
        promotionRule: 'all', // 立减类型
      },
      addActivityFormRules: {
        promotionName: [
          {
            required: true,
            message: '请填写活动名称',
            trigger: 'blur'
          }
        ],
        preferentialForm: [
          {
            required: true,
            message: '请选择优惠形式',
            trigger: 'change'
          }
        ],
        newDiscountValue: [
          {
            required: true,
            message: '请填写新开折扣',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const type = this.addActivityForm.preferentialForm
              if (value === '') {
                callback()
              }
              const len = ('' + value).length
              if (Number(value) !== parseFloat(value)) {
                callback(new Error('输入格式不正确'))
              }
              value = value * 1
              if (type === '折扣') {
                if (!(value > 0 && value <= 1)) {
                  callback(new Error('输入格式不正确'))
                }
                if (!(len >= 1 && len <= 4)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              if (type === '立减') {
                if (!(value >= -99999 && value <= 99999)) {
                  callback(new Error('输入格式不正确'))
                }
                // 负数最大长度9，正数8
                const maxLen = value < 0 ? 9 : 8
                if (!(len >= 1 && len <= maxLen)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              callback()
              
            }
          }
        ],
        renewalDiscountValue: [
          {
            required: true,
            message: '请填写续费折扣',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const type = this.addActivityForm.preferentialForm
              if (value === '') {
                callback()
              }
              const len = ('' + value).length
              if (Number(value) !== parseFloat(value)) {
                callback(new Error('输入格式不正确'))
              }
              value = value * 1
              if (type === '折扣') {
                if (!(value > 0 && value <= 1)) {
                  callback(new Error('输入格式不正确'))
                }
                if (!(len >= 1 && len <= 4)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              if (type === '立减') {
                if (!(value >= -99999 && value <= 99999)) {
                  callback(new Error('输入格式不正确'))
                }
                // 负数最大长度9，正数8
                const maxLen = value < 0 ? 9 : 8
                if (!(len >= 1 && len <= maxLen)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              callback()
            }
          }
        ],
        activityTime: [
          {
            required: true,
            message: '请选择活动时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      // 添加活动
      addPromotions: state => state.promotion.addPromotions
    })
  },
  methods: {
    // 提交表单时
    onSubmit() {
      this.$refs['addActivityForm'].validate((valid) => {
        if (valid) {
          // 处理时间
          const { activityTime, preferentialForm } = this.addActivityForm
          this.addActivityForm.eventStartTime = formatTime(new Date(activityTime[0]).getTime())
          const dt = new Date(activityTime[1])
          dt.setHours(dt.getHours() + 23)
          dt.setMinutes(dt.getMinutes() + 59)
          dt.setSeconds(dt.getSeconds() + 59)
          this.addActivityForm.eventEndTime = formatTime(new Date(dt).getTime())
          
          // 数据
          const payload = {
            ...this.addActivityForm
          }
          // 处理‘立减’与‘折扣’
          if (preferentialForm === '立减') {
            payload.preferentialForm = '2'
          }
          if (preferentialForm === '折扣') {
            payload.preferentialForm = '1'
          }
          delete payload.activityTime
          // console.log('submit this.addActivityForm=', this.addActivityForm)
          // vuex 添加活动
          this.$store.dispatch('promotion/addPromotions', payload).then(_ => {
            if (!this.addPromotions.code) {
              if (this.addPromotions.data.isSuccess === '1') {
                this.$alert('添加成功', { callback: () => {} })
                // 关闭层
                this.resetForm()
              } else {
                this.$alert(this.addPromotions.msg, { callback: () => {} })
              }
            } else {
              this.$alert(this.addPromotions.msg, { callback: () => {} })
            }
            // console.log('this.addPromotions = ', this.addPromotions)
          })
        } else {
          // 提示
          this.$alert('添加失败', { callback: () => {} })
          return false
        }
      })
    },
    // 点击取消时
    resetForm() {
      // 重置表单
      this.$refs['addActivityForm'].resetFields()
      // 关闭浮层
      this.$parent.$parent.formVisible_addActivityForm = false
      // console.log('resetForm this.addActivityForm=', this.addActivityForm)
    },
    // 优惠形式发生改变时
    preferentialForm_change(val) {
      this.preferentialFormFlag = val
      if (val === '折扣') {
        this.tooltip = '0(不含)-1(含)之间的两位小数,75折则填写0.75'
        this.promotionRuleOptions = this.promotionRuleOptions1
      } else if (val === '立减') {
        this.tooltip = '-99999(含)-99999(含)之间的数,保留2位小数'
        this.promotionRuleOptions = this.promotionRuleOptions2
      }
    }
  }
}
</script>

<style lang="scss">

</style>
