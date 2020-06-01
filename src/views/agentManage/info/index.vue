<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="会员ID" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="开通时间" required>
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
      <el-form-item label="所属分公司" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务归属" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="财务归属" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch('searchForm')">查 询</el-button>
        <el-button type="primary" @click="resetModal('searchForm')">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->
  </div>
</template>
<script>

export default {
  name: 'AgentManageApply',
  components: {
  },
  data() {
    return {
      updateId: null,
      formVisible: false,
      searchForm: {
        name: '',
        // age: '',
        state: ''
      },
      form: {
        name: '',
        domain: '',
        region: '',
        date1: '',
        // date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      stateOptions: [
        { label: '新增', value: 'add' },
        { label: '变更', value: 'change' }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请输入域名', trigger: 'blur' }
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
      },
      multipleSelection: []
    }
  },
  methods: {
    onSearch(formName) {
      console.log(formName)
    },
    resetModal(formName) {
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;
}
</style>
