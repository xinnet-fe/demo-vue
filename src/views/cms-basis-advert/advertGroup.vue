<template>
  <div class="advert-group">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="广告组名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入广告名称" clearable />
      </el-form-item>
      <el-form-item label="广告站点" prop="groupType">
        <el-select v-model="searchForm.groupType" placeholder="请输入广告站点">
          <el-option v-for="item in groupTypes" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="operate-form">
      <el-button size="mini" @click="showModal()">新增广告组</el-button>
    </div>

    <!-- table -->
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        label="广告组code"
      >
        <template v-slot="{ row }">
          <span class="advert-code" @click="link(row.groupCode)">{{ row.groupCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="广告组名称"
      />
      <el-table-column
        label="广告站点"
      >
        <template v-slot="{ row }">
          {{ groupTypes[row.groupType].key }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column label="操作" fixed="right">
        <template v-slot="{ row }">
          <el-button size="medium" type="text" @click="showModal(row)">编辑</el-button>
          <el-button size="medium" type="text" @click="showTipsModal(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.count"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @pagination="getList"
    />
    <!-- table -->

    <!-- form -->
    <el-dialog width="600px" :before-close="beforeClose" destroy-on-close :title="modalTitle" :visible.sync="show">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="广告组名称:" prop="groupName">
          <el-input v-model="form.groupName" />
        </el-form-item>
        <el-form-item label="广告组code:" prop="groupCode">
          <el-input v-model="form.groupCode" />
        </el-form-item>
        <el-form-item label="广告站点:" prop="groupType">
          <el-select v-model="form.groupType" placeholder="请选择广告站点">
            <el-option v-for="item in groupTypes" :key="item.value" :label="item.key" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeModal">取消</el-button>
        <el-button size="medium" type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
    <!-- form -->

    <!-- 删除提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showTips">
      <p>删除后前台展示页面也会删除，是否确认删除所选广告？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeTipsModal">取消</el-button>
        <el-button size="medium" type="primary" @click="destroy">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import findParentNodeByName from '@/utils/findParentNodeByName'

export default {
  name: 'AdvertGroup',
  components: {
    Pagination
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        name: '',
        groupType: '-1'
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        id: '',
        groupName: '',
        groupCode: '',
        groupType: ''
      },
      // 修改时的参数
      oldGroupName: '',
      oldGroupCode: '',
      oldGroupType: '',
      // 弹框表单规则
      rules: {
        groupName: [{ required: true, message: '请输入广告组名称', trigger: 'blur' }],
        groupCode: [{ required: true, message: '请输入广告组code', trigger: 'blur' }],
        groupType: [{ required: true, message: '请选择广告站点', trigger: 'blur' }]
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      page: {
        count: 0,
        pageNum: 1,
        pageSize: 30
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      groupTypes: state => state.cms.groupTypes
    })
  },
  created() {
    this.getGroupTypeMapping()
  },
  methods: {
    ...mapActions({
      getData: 'cms/advGroupList',
      addData: 'cms/addAdvGroup',
      updateData: 'cms/updateAdvGroup',
      destroyData: 'cms/destroyAdvGroup',
      getGroupTypeMapping: 'cms/groupTypeMapping',
      searchGroup: 'cms/searchGroup'
    }),
    setOldGroupData(groupName = '', groupCode = '', groupType = '') {
      this.oldGroupName = groupName
      this.oldGroupCode = groupCode
      this.oldGroupType = groupType
    },
    showModal(row = {}) {
      if (row.groupCode) {
        const query = { groupCode: row.groupCode }
        this.searchGroup(query).then(res => {
          const { advGroup } = res.data
          this.form = advGroup
          this.setOldGroupData(advGroup.groupName, advGroup.groupCode, advGroup.groupType)
        })
        this.modalTitle = '编辑'
      } else {
        this.modalTitle = '新增'
      }
      this.show = true
    },
    closeModal() {
      this.show = false
      this.form.groupName = ''
      this.form.groupCode = ''
      this.form.groupType = ''
      // 清空旧数据
      this.setOldGroupData()
    },
    showTipsModal(row) {
      this.form = row
      this.showTips = true
    },
    closeTipsModal() {
      this.showTips = false
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    getList(query = {}) {
      const { name, groupType } = this.searchForm
      query.groupName = name
      query.groupType = groupType
      return this.getData(query).then(res => {
        const { list, page } = res
        this.list = list
        this.page = page
      })
    },
    onSearch() {
      const { pageSize, pageNum } = this.page
      const query = {
        pageNum: parseInt(pageNum),
        pageSize: parseInt(pageSize)
      }
      this.getList(query)
    },
    submit() {
      const { groupName, groupCode, groupType } = this.form
      const data = { groupName, groupCode, groupType }
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (groupCode) {
            if (groupName === this.oldGroupName && groupCode === this.oldGroupCode && groupType === this.oldGroupType) {
              this.closeModal()
            } else {
              data.groupCode = this.oldGroupCode
              data.newGroupCode = groupCode
              this.updateData(data).then(res => {
                this.closeModal()
                this.onSearch()
              })
            }
          // 新增
          } else {
            this.addData(data).then(res => {
              this.closeModal()
              this.onSearch()
            })
          }
        }
      })
    },
    destroy() {
      const { groupCode } = this.form
      this.destroyData(groupCode).then(res => {
        this.closeTipsModal()
        this.onSearch()
      })
    },
    link(groupCode) {
      this.$emit('update:active-name', 'list')
      this.$nextTick(() => {
        const listNode = findParentNodeByName(this, 'CmsBasisAdvert').$refs.list
        listNode.$data.searchForm.groupCode = groupCode
        listNode.onSearch()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.advert-group {
  .advert-code {
    &:hover {
      color: $hintTextColor;
      cursor: pointer;
    }
  }
}
</style>

