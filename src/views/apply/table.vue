<template>
  <div class="apply-table">
    <el-table
      ref="table"
      v-loading="loading"
      border
      tooltip-effect="dark"
      style="width: 100%"
      :data="findDlApplyList"
    >
      <el-table-column
        prop="agentCode"
        label="代理编号"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        width="120"
      />
      <el-table-column
        prop="email"
        label="邮箱"
      />
      <el-table-column
        prop="contacts"
        label="联系人"
        show-overflow-tooltip
      />
      <el-table-column
        prop="province"
        label="省份"
        show-overflow-tooltip
      />
      <el-table-column
        prop="city"
        label="城市"
        show-overflow-tooltip
      />
      <el-table-column
        prop="applyTime"
        label="申请时间"
        show-overflow-tooltip
      />
      <el-table-column
        prop="state"
        label="状态"
        show-overflow-tooltip
      />
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button
            v-if="scope.row.state === 1"
            size="mini"
            type="primary"
            @click="showModal(scope.row)"
          >
            开通
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="findDlApplyPage.total"
      :page.sync="findDlApplyPage.page"
      :limit.sync="findDlApplyPage.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'AgentManageApplyTable',
  components: {
    Pagination
  },
  computed: {
    ...mapState('userManager', ['findDlApplyList', 'findDlApplyPage']),
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlApply']
    })
  },
  methods: {
    getList(page) {
      this.$parent.onSearch(page)
    },
    showModal(row) {
      this.$emit('update:visible', true)
      this.$emit('update:row', row)
    }
  }
}
</script>
