<template>
  <el-dialog custom-class="dialogSetLeader" :close-on-click-modal="false" :append-to-body="true" :before-close="beforeClose" destroy-on-close title="设置负责人" :visible.sync="dialogSetLeaderVisible" width="600px">
    <div class="order-form">
      <el-form ref="searchForm" class="search-form" :inline="true">
        <el-form-item label="员工姓名">
          <el-input
            v-model="empName"
            placeholder="请输入姓名查询"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            :loading="loading"
            @click="getList()"
          >HR系统查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="dragTable"
        v-loading="loading"
        :data="list"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-radio v-model="eid" :label="scope.row.Eid" @change.native="getRow(scope.$index,scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="EmployeeName" />
        <el-table-column label="所属机构" prop="OrgNamePath" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.Status === '0' ? '离职': '在职' }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
      <el-button type="primary" :disabled="loadingBtn" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DialogSetLeader',
  components: {},
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
      empName: '',
      eid: '',
      employeeName: '',
      company: '',
      id: '',
      list: []
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['region/selectEhrData'],
      loadingBtn: (state) => state.loading.effects['region/updateRegionData']
    }),
    dialogSetLeaderVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('region', ['selectEhrData', 'updateRegionData']),
    getList() {
      const query = {
        empName: this.empName
      }
      this.selectEhrData(query).then((res) => {
        this.list = res.data
      }).catch((error) => {
        this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    getRow(index, row) {
      console.log(index)
      console.log(row)
      this.eid = row.Eid
      this.employeeName = row.EmployeeName
      this.company = row.OrgNamePath
    },
    handleSubmit() {
      const query = {
        employeeName: this.employeeName,
        eid: this.eid,
        company: this.company,
        id: this.row.id
      }
      this.updateRegionData(query).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.handleClose()
          this.$emit('getList')
        } else {
          this.$message.error(res.msg)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  },
  mounted() {
    // this.getList()
  }
}
</script>
<style lang="scss" scoped>
.order-form{
  padding: 0px;
}
</style>
