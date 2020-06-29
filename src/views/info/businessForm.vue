<template>
  <div class="info-business-form">
    <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="修改业务归属" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="180px" :rules="rules">
        <el-form-item label="选择分公司/选择销售" prop="selectedOptions" required>
          <el-cascader
            :options="queryOrganSaleList"
            v-model="form.selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="选择销售" prop="market" required>
          <el-select v-model="form.market" placeholder="请绑定销售">
            <el-option v-for="item in marketOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'BusinessForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        selectedOptions: ['', '']
      },
      rules: {
        selectedOptions: [
          { required: true, message: '必须填写！', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const selected = this.$parent.multipleSelection
      if (selected.length === 1) {
        this.setData(selected)
      }
    })
  },
  computed: {
    ...mapState({
      queryOrganSaleList (state) {
        // console.log(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value'))
        // return JSON.parse(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value').replace(/(name)/g, 'label'))
        return state.userManager.queryOrganSaleList.map((v) => {
          const item = {
            label: v.name,
            value: v.orgCode
          }
          if (v.salemans && v.salemans.length) {
            item.children = []
            item.children = v.salemans.map((v2) => {
              return {
                label: v2.name,
                value: v2.ptid
              }
            })
          }
          return item
        })
      }
    }),
    formVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('userManager', ['batchUpdate']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log(this.selected)
          // submit
          const params = {
            type: 'yewu',
            agentCodes: this.selected.map((v) => {
              return v.agentCode
            }).join(','),
            organCode: this.form.selectedOptions[0],
            saleCode: this.form.selectedOptions[1]
          }
          this.batchUpdate(params).then(res => {
            if (!res.code) {
              this.$message.success('修改成功!')
              this.closeModal()
              this.$parent.onSearch()
            }
          }).catch(error => {})
        } else {
          return false
        }
      })
    },
    handleChange () {

    },
    closeModal() {
      const { form } = this.$refs
      this.$emit('update:visible', false)
      this.$emit('update:row', {})
      form.resetFields()
      form.clearValidate('form')
      clearFormData(this.form)
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    setData(selected) {
      this.form.selectedOptions[0] = selected[0].organCode
      this.form.selectedOptions[1] = selected[0].saleCode
    },
    open() {
      // const selected = this.$parent.multipleSelection
      // if (selected.length === 1) {
      //   this.setData(selected)
      // }
    }
  }
}
</script>
