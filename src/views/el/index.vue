<template>
  <div class="el-form">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age" :rules="ageRule">
        <el-input v-model.number="searchForm.age" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch('searchForm')">查 询</el-button>
        <el-button type="primary" @click="resetForm('searchForm')">重 置</el-button>
        <el-button type="primary" @click="showForm('searchForm')">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :before-close="beforeClose" title="添加" :visible.sync="formVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="上海" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'ElFormDemo',
  props: {},
  data() {
    return {
      formVisible: false,
      searchForm: {
        name: '',
        age: '',
        state: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      stateOptions: [
        { label: '有效', value: 'valid' },
        { label: '无效', value: 'invalid' }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ageRule() {
      const isNumber = (rule, value, callback) => {
        const reg = /^\d+$/g
        if (!value) {
          callback()
        } else if (!reg.test(value)) {
          callback(new Error('年龄必须是数字'))
        } else {
          callback()
        }
      }
      return [{ validator: isNumber, trigger: 'change' }]
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    onSearch(formName) {
      // console.log(formName)
      this.$refs[formName].validate((valid, object) => {
        // console.log(valid)
        // console.log(object)
        if (valid) {
          // console.log(valid)
        } else {
          return false
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showForm() {
      this.formVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    beforeClose(done) {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin: 10px 20px 0;
  overflow: hidden;
}
</style>
