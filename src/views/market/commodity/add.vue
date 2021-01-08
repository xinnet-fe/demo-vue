<template>
  <div>
    <el-form ref="addActivityForm" :model="addActivityForm" :rules="addActivityFormRules" label-width="80px">

      <el-form-item label="商品编码" prop="searchWord">
        <el-col :span="12">
          <el-input ref="searchWord" v-model="addActivityForm.searchWord" placeholder="请输入商品编码" />
        </el-col>
        <el-col :span="6">
          <el-button @click="search_handle">查询</el-button>
        </el-col>
      </el-form-item>

      <el-row>
        <el-col style="padding-left:8px">
          商品名称
          <span style="padding-left:12px">{{ goodsName }}</span>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" class="dialog-footer" style="text-align:right">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      disabled: true,
      goodsName: '',
      addActivityForm: {
        searchWord: ''
      },
      addActivityFormRules: {
        searchWord: [
          {
            required: true,
            message: '编码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      // 添加商品 -> 根据编号，查询名称
      queryProductNameByCode: state => state.promotion.queryProductNameByCode,
      // 添加商品
      saveProduct: state => state.promotion.saveProduct
    })
  },
  methods: {
    // 根据编号，查询名称
    search_handle() {
      this.disabled = true
      if (this.addActivityForm.searchWord === '') {
        // this.$alert('请输入商品编号')
        this.$refs.searchWord.focus()
        this.$refs.searchWord.blur()
      } else {
        const payload = {
          goodsCode: this.addActivityForm.searchWord
        }
        this.$store.dispatch('promotion/queryProductNameByCode', payload).then(_ => {
          if (!this.queryProductNameByCode.code) {
            this.disabled = false
            this.goodsName = this.queryProductNameByCode.data.goodsName
          } else {
            this.goodsName = ''
            this.$alert(this.queryProductNameByCode.msg, { callback: () => {} })
          }
        })
      }
    },
    // 提交表单时
    onSubmit() {
      this.disabled = true
      this.$refs['addActivityForm'].validate((valid) => {
        if (valid) {
          // console.log('submit this.addActivityForm=', this.addActivityForm)
          const payload = {
            goodsCode: this.addActivityForm.searchWord
          }
          this.$store.dispatch('promotion/saveProduct', payload).then(_ => {
            if (!this.saveProduct.code) {
              if (this.saveProduct.data.isSuccess === '1') {
                this.$alert('添加成功', { callback: () => {} })
                this.disabled = false
                // 关闭层
                this.resetForm()
              } else if (this.saveProduct.data.isSuccess === '0') {
                this.$alert('添加失败', { callback: () => {} })
                this.disabled = false
              } else {
                this.$alert(this.saveProduct.data.isSuccess, { callback: () => {} })
                this.disabled = false
              }
            } else {
              this.$alert(this.saveProduct.msg, { callback: () => {} })
              this.disabled = false
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
      this.$refs['addActivityForm'].resetFields()
      // 关闭浮层
      this.$parent.$parent.formVisible_Add = false
      // console.log('resetForm this.addActivityForm=', this.addActivityForm)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
