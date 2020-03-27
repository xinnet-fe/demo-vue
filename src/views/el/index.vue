<template>
  <div class="el-form">
    <el-form ref="searchForm" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="searchForm.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="showForm">添加</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :before-close="beforeClose" title="添加" :visible.sync="formVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" prop="name" :rules="[{ required: true, message: '活动名称不能为空'}]">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
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
        age: ''
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
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onSearch() {
      console.log('ok')
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
