<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="模板名称">
        <el-input v-model="form.template" :placeholder="placeholder" :clearable="true" />
      </el-form-item>
      <el-form-item label="任务下发">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="创建人">
        <el-select v-model="form.createPeople" placeholder="请选择">
          <el-option
            v-for="item in createPeopleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分配人">
        <el-select v-model="form.distributor" placeholder="请选择">
          <el-option
            v-for="item in distributorList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商务">
        <el-select v-model="form.business" placeholder="请选择">
          <el-option
            v-for="item in businessList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch()">查 询</el-button>
        <el-button type="default" size="medium" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="table-section">
      <el-table
        ref="table"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="list"
      >
        <el-table-column
          fixed="left"
          prop="agentCode"
          label="模板名称"
          width="150"
        />
        <el-table-column
          prop="telenumber"
          label="创建人"
        />
        <el-table-column
          prop="userNameEmail"
          label="分配人"
        />
        <el-table-column
          prop="organizeNameCn"
          label="任务下发日期"
          show-overflow-tooltip
        />
        <el-table-column
          prop="publicProvinceCn"
          label="下发客户数"
          show-overflow-tooltip
        />
        <el-table-column
          prop="publicCityCn"
          label="商务"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="所属分区"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="所属分司"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="所属部门"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="已跟进客户数"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="未跟进客户数"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="成单客户数"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="成单客户金额（元）"
          show-overflow-tooltip
        />
      </el-table>
      <pagination
        :total="page.total"
        :page.sync="page.page"
        :limit.sync="page.limit"
        @pagination="onSearch"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import clearFormData from '@/utils/clearFormData.js'
export default {
  name: 'AgentManageApply',
  components: {
    Pagination
  },
  data() {
    return {
      row: {},
      placeholder: '请输入',
      form: {
        template: '',
        startDate: '',
        endDate: '',
        createPeople: '',
        distributor: '',
        business: '',
        pageNum: 1,
        pageSize: 20
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      date: '',
      createPeopleList: [
        { label: '全部', value: '' },
        { label: '代理编号', value: 'agentCode' },
        { label: '手机号', value: 'telenumber' },
        { label: '邮箱', value: 'userNameEmail' },
        { label: '联系人', value: 'organizeNameCn' }
      ],
      distributorList: [
        { label: '全部', value: '' },
        { label: '未开通', value: '01' },
        { label: '已开通', value: '02' },
        { label: '已冻结', value: '03' },
        { label: '已关闭', value: '04' }
      ],
      businessList: [
        { label: '全部', value: '' },
        { label: '未开通', value: '01' },
        { label: '已开通', value: '02' },
        { label: '已冻结', value: '03' },
        { label: '已关闭', value: '04' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlApply']
    })

  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.startDate = v[0] ? v[0] : ''
      this.form.endDate = v[1] ? v[1] : ''
    }
  },
  mounted() {
    this.onSearch(1)
  },
  methods: {
    ...mapActions('userManager', ['findDlApply']),
    handleSelectChange(v) {
      console.log(v)
    },
    onSearch(page) {
      console.log(this.form.date)
      const query = {
        ...this.form
      }

      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = this.page.limit
        this.page.page = 1
      }
      // this.findDlApply(query).then(res => {
      //   if (!res.code) {
      //     console.log(res)
      //     this.list = res.data.list
      //     this.page.total = res.data.count
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    resetForm() {
      clearFormData(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
