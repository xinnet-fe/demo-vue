<template>
  <div class="info-table">
    <el-table
      ref="table"
      v-loading="loading"
      border
      tooltip-effect="dark"
      style="width: 100%"
      :data="infoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55" />
      <el-table-column
        prop="agentCode"
        label="代理编号"
      />
      <el-table-column
        prop="name"
        label="渠道名称"
      />
      <el-table-column
        prop="date"
        label="开通时间"
      />
      <el-table-column
        label="所属分公司"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          {{ convertIdToName(scope.row, 'company') }}
        </template>
      </el-table-column>
      <el-table-column
        label="财务归属"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          {{ convertIdToName(scope.row, 'finance') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sale"
        label="绑定销售"
        show-overflow-tooltip
      />
      <el-table-column
        label="级别"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          {{ convertIdToName(scope.row, 'level') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        show-overflow-tooltip
      />
      <el-table-column label="操作" fixed="right" width="180">
        <template v-slot="scope">
          <el-link type="primary" @click="showDetailModal(scope.row)">
            详情
          </el-link>
          <el-link type="primary" @click="showAccountModal(scope.row)">
            修改账号
          </el-link>
          <el-popconfirm
            v-if="scope.row.state === 1"
            title="确定终止吗？"
            @onConfirm="stop"
          >
            <el-link slot="reference" type="primary">终止</el-link>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="infoPage.total"
      :page.sync="infoPage.page"
      :limit.sync="infoPage.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import find from 'lodash/find'
import Pagination from '@/components/Pagination'

export default {
  name: 'InfoTable',
  components: {
    Pagination
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('agentManage', ['infoList', 'infoPage']),
    ...mapState({
      loading: state => state.loading.effects['agentManage/getInfoList']
    })
  },
  methods: {
    getList(page) {
      this.$parent.onSearch(page)
    },
    showDetailModal(row) {
      this.$emit('update:visible', true)
      this.$emit('update:row', row)
    },
    showAccountModal(row) {
      this.$emit('update:accountVisible', true)
      this.$emit('update:row', row)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.$emit('update:multipleSelection', val)
    },
    convertIdToName(row, item) {
      const options = this.$parent[`${item}Options`]
      const option = find(options, { value: row[item] })
      return option.label
    },
    stop() {
      this.$message.success('操作成功！')
    }
  }
}
</script>
