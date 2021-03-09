<template>
  <el-dialog custom-class="dialogEdit" :close-on-click-modal="false" :append-to-body="true" :before-close="beforeClose" destroy-on-close title="编辑" :visible.sync="dialogEditShow" width="500px">
    <el-form v-if="dialogEditShow" ref="formEdit" :model="form2" :rules="rules" label-width="120px">
      <el-form-item label="销售负责人1:" prop="salesmagFirst">
        <el-select
          v-model="form2.salesmagFirst"
          placeholder="请选择"
          clearable
          filterable
          @focus="handleFocus(1)"
        >
          <el-option
            v-for="item in saleNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="mark1" label="备注:" prop="salesmagRemarkFirst">
        <el-input v-model="form2.salesmagRemarkFirst" maxlength="30" placeholder="请输入30字以内" />
        <span class="operateUser">操作人：{{ name }}</span>
      </el-form-item>
      <el-form-item label="订单方式:" prop="businessType">
        <el-select
          v-model="form2.businessType"
          placeholder="请选择"
          clearable
          @focus="handleFocus(2)"
        >
          <el-option
            v-for="item in businessTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="mark2" label="备注:" prop="businessTypeRemark">
        <el-input v-model="form2.businessTypeRemark" maxlength="30" placeholder="请输入30字以内" />
        <span class="operateUser">操作人：{{ name }}</span>
      </el-form-item>
      <el-form-item label="销售负责人2:" prop="salesmagSecond">
        <el-select
          v-model="form2.salesmagSecond"
          placeholder="请选择"
          clearable
          filterable
          @focus="handleFocus(3)"
        >
          <el-option
            v-for="item in saleNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="mark3" label="备注:" prop="salesmagRemarkSecond">
        <el-input v-model="form2.salesmagRemarkSecond" maxlength="30" placeholder="请输入30字以内" />
        <span class="operateUser">操作人：{{ name }}</span>
      </el-form-item>
      <el-form-item label="成单类型:" prop="orderType">
        <el-select
          v-model="form2.orderType"
          placeholder="请选择"
          clearable
          @focus="handleFocus(4)"
        >
          <el-option
            v-for="item in orderTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="mark4" label="备注:" prop="orderTypeRemark">
        <el-input v-model="form2.orderTypeRemark" maxlength="30" placeholder="请输入30字以内" />
        <span class="operateUser">操作人：{{ name }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :disabled="loading" @click="dialogSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'DialogSubmitMaterial',
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
    },
    saleNameList: {
      type: Array,
      default: () => []
    },
    businessTypeList: {
      type: Array,
      default: () => []
    },
    orderTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form2: {
        id: '',
        salesmagFirst: '',
        salesmagRemarkFirst: '',
        businessType: '',
        salesmagSecond: '',
        salesmagRemarkSecond: '',
        businessTypeRemark: '',
        orderType: '',
        orderTypeRemark: ''
      },
      rules: {
        salesmagFirst: [{ required: true, message: '请选择', trigger: 'change' }],
        businessType: [{ required: true, message: '请选择', trigger: 'change' }],
        salesmagSecond: [{ required: true, message: '请选择', trigger: 'change' }],
        orderType: [{ required: true, message: '请选择', trigger: 'change' }],
        salesmagRemarkFirst: [{ required: true, message: '请输入', trigger: 'blur' }],
        salesmagRemarkSecond: [{ required: true, message: '请输入', trigger: 'blur' }],
        businessTypeRemark: [{ required: true, message: '请输入', trigger: 'blur' }],
        orderTypeRemark: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      mark1: false,
      mark2: false,
      mark3: false,
      mark4: false
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['region/addRegionData']
    }),
    ...mapGetters(['name']),
    dialogEditShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('region', ['addRegionData', 'selectRegionDataDropDown']),
    handleFocus(v) {
      this['mark' + v] = true
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    },
    dialogSubmit() {
      this.$refs.formEdit.validate((valid) => {
        if (valid) {
          this.loadingBtn = true
          const query = {
            ...this.form2
          }
          query.id = this.row.id
          console.log(query)
          this.$store.dispatch('performance/updatePerformance', query).then((res) => {
            this.loadingBtn = false
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.handleClose()
              this.$emit('getList')
            } else {
              this.$message.error(res.msg)
            }
          }).catch((error) => {
            this.loadingBtn = false
            console.log(error)
          })
        } else {
          console.log(2)
        }
      })
    }
  },
  created() {
  },
  mounted() {
    this.form2.salesmagFirst = this.row.salesmagFirst
    this.form2.businessType = this.row.businessType
    this.form2.salesmagSecond = this.row.salesmagSecond
    this.form2.orderType = this.row.orderType
  }
}
</script>
<style lang="scss" scoped>
  .operateUser{
    font-size: 12px;
  }
</style>
