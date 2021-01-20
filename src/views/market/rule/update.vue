<template>
  <div>
    <el-form ref="current_form" :model="current_form" label-width="100px" :rules="formRules">

      <el-form-item label="模版名称：" prop="promotionName">
        <el-col>
          {{ current_form.promotionName }}
        </el-col>
      </el-form-item>

      <el-form-item label="业务类型：" prop="preferentialForm">
        <el-col>
          {{ format_preferentialForm(current_form.preferentialForm) }}
        </el-col>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-tooltip effect="dark" :content="tooltip" placement="top-start">
            <el-form-item :label="'新开'+format_preferentialForm(current_form.preferentialForm)" prop="newDiscountValue">
              <el-input v-model="current_form.newDiscountValue" :placeholder="format_preferentialForm(current_form.preferentialForm)+'值'" />
            </el-form-item>    
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip effect="dark" :content="tooltip" placement="top-start">
            <el-form-item :label="'续费'+format_preferentialForm(current_form.preferentialForm)" prop="renewalDiscountValue">
              <el-input v-model="current_form.renewalDiscountValue" :placeholder="format_preferentialForm(current_form.preferentialForm)+'值'" />
            </el-form-item>
          </el-tooltip>
        </el-col>
        <!--
        <el-col :span="8">
          <el-form-item :label="'新开' + format_preferentialForm(current_form.preferentialForm) + '：'">
            {{ current_form.newDiscountValue }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'续费' + format_preferentialForm(current_form.preferentialForm) + '：'">
            {{ current_form.renewalDiscountValue }}
          </el-form-item>
        </el-col>
        -->
        <el-col :span="8">
          <el-form-item :label="format_preferentialForm(current_form.preferentialForm) + '：'">
            {{ format_Type(current_form.preferentialForm, current_form.promotionRule) }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="活动时间：" prop="time">
        <el-col>
          <el-date-picker v-model="current_form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-col>
      </el-form-item>

      <el-form-item label="备注：" prop="remark">
        <el-col>
          {{ current_form.remark }}
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
  props: {
    row: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      current_form: {
        time: [],
        preferentialForm: '',
        newDiscountValue: 0,
        renewalDiscountValue: 0
      },
      tooltip: '0(不含)-1(含)之间的两位小数,75折则填写0.75',
      formRules: {
        time: [
          {
            required: true,
            message: '请选择活动时间',
            trigger: 'change'
          }
        ],
        newDiscountValue: [
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const type = this.current_form.preferentialForm
              if (value === '') {
                callback()
              }
              const len = ('' + value).length
              if (Number(value) !== parseFloat(value)) {
                callback(new Error('输入格式不正确'))
              }
              value = value * 1
              if (type === '1') {
                if (!(value > 0 && value <= 1)) {
                  callback(new Error('输入格式不正确'))
                }
                if (!(len >= 1 && len <= 4)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              if (type === '2') {
                if (!(value >= -99999 && value <= 99999)) {
                  callback(new Error('输入格式不正确'))
                }
                if (!(len >= 1 && len <= 7)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              callback()
              
            }
          }
        ],
        renewalDiscountValue: [
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const type = this.current_form.preferentialForm
              if (value === '') {
                callback()
              }
              const len = ('' + value).length
              if (Number(value) !== parseFloat(value)) {
                callback(new Error('输入格式不正确'))
              }
              value = value * 1
              if (type === '1') {
                if (!(value > 0 && value <= 1)) {
                  callback(new Error('输入格式不正确'))
                }
                if (!(len >= 1 && len <= 4)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              if (type === '2') {
                if (!(value >= -99999 && value <= 99999)) {
                  callback(new Error('输入格式不正确'))
                }
                if (!(len >= 1 && len <= 7)) {
                  callback(new Error('输入格式不正确'))
                }
              }
              callback()
            }
          }
        ],
      }
    }
  },
  computed: {
    ...mapState({
      // 修改活动
      modifyPromotions: state => state.promotion.modifyPromotions
    }),
    format_preferentialForm() {
      return (v) => {
        if (v === '1') {
          this.tooltip = '0(不含)-1(含)之间的两位小数,75折则填写0.75'
          return '折扣'
        } else if (v === '2') {
          this.tooltip = '-99999(含)-99999(含)之间的数,保留2位小数'
          return '立减'
        } else {
          return v
        }
      }
    },
    format_Type() {
      return (t, v) => {
        if (t === '1') {
          //return '折扣'
          if (v === 'all') {
            return '取整'
          } else if (v === 'everyM') {
            return '保留一位小数'
          } else if (v === 'everyY') {
            return '保留两位小数'
          }  else {
            return v
          }  
        } else if (t === '2') {
          //return '立减'
          if (v === 'all') {
            return '所有规格'
          } else if (v === 'everyY') {
            return '每年'
          } else if (v === 'everyM') {
            return '每月'
          }  else {
            return v
          }  
        }
        
      }
    }
  },
  created(a) {
    //console.log('设置初始值 row = ', this.row)
    this.current_form = {
      ...this.row,
      time: [
        new Date(this.row.eventStartTime),
        new Date(this.row.eventEndTime)
      ]
    }
  },
  methods: {
    // 提交表单时
    onSubmit() {
      this.$refs['current_form'].validate((valid) => {
        if (valid) {
          //console.log('submit this.current_form=', this.current_form)
          const dt = new Date(this.current_form.time[1])
          dt.setHours(dt.getHours() + 23)
          dt.setMinutes(dt.getMinutes() + 59)
          dt.setSeconds(dt.getSeconds() + 59)
          // vuex 修改活动
          this.$store.dispatch('promotion/modifyPromotions', {
            promotionCode: this.current_form.promotionCode,
            eventStartTime: formatTime(new Date(this.current_form.time[0]).getTime()),
            eventEndTime: formatTime(new Date(dt).getTime()),
            newDiscountValue: this.current_form.newDiscountValue,        //新开值
            renewalDiscountValue: this.current_form.renewalDiscountValue,   //续费值
          }).then(_ => {
            if (!this.modifyPromotions.code) {
              if (this.modifyPromotions.data.isSuccess === '1') {
                this.$alert('修改成功', { callback: () => {} })
                // 关闭层
                this.resetForm()
              } else {
                this.$alert(this.modifyPromotions.msg, { callback: () => {} })
              }
            } else {
              this.$alert(this.modifyPromotions.msg, { callback: () => {} })
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
      this.$refs['current_form'].resetFields()
      // 关闭浮层
      this.$parent.$parent.formVisible_updateActivityForm = false
      // console.log('resetForm this.current_form=', this.current_form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
