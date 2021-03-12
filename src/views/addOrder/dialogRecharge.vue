<template>
  <el-dialog
    title="用户编号：hy000111"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="600px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="域名">
        1.cn
      </el-form-item>
      <el-form-item label="服务编号">
        D121454545
      </el-form-item>
      <el-form-item label="续费价格">
        <el-select v-model="form.newPrice" placeholder="请选择">
          <el-option
            v-for="item in newPriceList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="实扣价格" prop="price">
        <el-input v-model="form.price" placeholder="" maxlength="100" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
      <el-button type="primary" size="medium" :loading="loading" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import isMoney from '@/utils/isMoney.js'
export default {
  name: 'DialogNew',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        newPrice: '',
        price: ''
      },
      rules: {
        price: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: isMoney, message: '格式错误', trigger: 'blur' }
        ]
      },
      newPriceList: [
        {
          'label': '全部',
          'value': ''
        }, {
          'label': '注册',
          'value': '1'
        }, {
          'label': '续费',
          'value': '2'
        }, {
          'label': '偿还',
          'value': '3'
        }
      ]
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    ...mapState({
      loading: state => state.loading.effects['violateDomain/queryViolateDomainList']
    })
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // const query = {
          //   ...this.form
          // }
          // this.$store.dispatch('violateDomain/createViolateDomain', query).then(res => {
          //   if (res.code === '0') {
          //     this.$alert(`<p>成功：${res.successCount}个</p><p>失败：${res.faildCount}个</p>`, '提示', {
          //       dangerouslyUseHTMLString: true,
          //       confirmButtonText: '确定',
          //       callback: () => {
          //         this.$emit('refreshList')
          //         this.handleClose()
          //       }
          //     })
          //   }
          // }).catch(error => {
          //   console.log(error)
          // })
          this.$alert('<b>已操作扣费成功！</b><br />订单号为：000000，请稍后在订单进行查询具体明细！', '提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              this.$emit('refreshList')
              this.handleClose()
            }
          })
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
