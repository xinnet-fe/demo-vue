<template>
  <div>
    <!-- search -->
    <div class="search-form" />
    <!-- search -->
    <div class="order-form">
      <!-- operate -->
      <el-form ref="operateForm" class="operate-form" :inline="true">
        <el-form-item>
          <span class="pageSize">共{{ page.total }}条，已选中{{ ids.length }}条</span>
        </el-form-item>
      </el-form>
      <!-- operate -->
      <div class="table-section">
        <el-table
          ref="table"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="list"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            fixed="left"
            label="模板名称"
            width="150"
          >
            <template slot-scope="scope">
              <span @click="handleDetail(scope.row)">阿萨德加拉时代峻峰</span>
            </template>
          </el-table-column>
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
    <el-drawer
      title=""
      size="900px"
      :visible.sync="drawerShow"
      :with-header="false"
      :wrapper-closable="false"
      :destroy-on-close="true"
    >
      <i class="el-icon-close btn-close" @click="drawerShow=false" />
      <detail-operation :row="row" />
    </el-drawer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import DetailOperation from '@/components/DetailOperation/index'
import clearFormData from '@/utils/clearFormData.js'
export default {
  name: 'AgentManageApply',
  components: {
    Pagination,
    DetailOperation
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
      list: [{ id: 1 }],
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
      ],
      ids: [],
      drawerShow: false
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
    // ...mapActions('userManager', ['findDlApply']),
    handleSelectionChange(selected) {
      console.log(selected)
      this.ids = selected.map((v) => {
        return v.id
      })
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
    },
    handleDetail(row) {
      this.row = row
      this.drawerShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form{
  height: 200px;
  border-bottom: 20px solid #f3f7fa;
}
.order-form{
  padding-top: 0px;
}
.pageSize{
  float: left;
  font-size: 12px;
  line-height: 28px;
  margin-right: 10px;
}
.btn-close{
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
  &:hover{
    background: #0180cd;
    color: #fff;
  }
}
</style>
