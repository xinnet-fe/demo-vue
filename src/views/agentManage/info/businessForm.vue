<template>
  <div class="info-business-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改业务归属" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="选择分公司/选择销售" prop="company" required>
          <el-cascader
            :options="queryOrganSaleList"
            v-model="selectedOptions"
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
      selectedOptions: '',
      form: {
        company: '',
        market: '',
        level: ''
      },
      rules: {
        company: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ],
        market: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ]
      },
      companyOptions: this.$parent.companyOptions,
      marketOptions: this.$parent.marketOptions
    }
  },
  mounted () {
    console.log("state.userManager.queryOrganSaleList")
    console.log(this.queryOrganSaleList)
    // this.queryOrganSaleList
  },
  computed: {
    ...mapState({
      queryOrganSaleList (state) {
        // console.log(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value'))
        return JSON.parse(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value').replace(/(name)/g, 'label'))
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
          this.$message.success('修改成功!')
          this.closeModal()
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
      this.form.company = selected[0].company
      this.form.market = selected[0].sale
    },
    open() {
      const selected = this.$parent.multipleSelection
      if (selected.length === 1) {
        this.setData(selected)
      }
    }
  }
}
</script>
