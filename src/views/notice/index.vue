<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="" :clearable="true" :maxlength="50" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-select v-model="form.top">
          <el-option v-for="item in topList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tag">
          <el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布者">
        <el-select v-model="form.author">
          <el-option v-for="item in authorList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch">查 询</el-button>
        <!-- <el-button type="primary" @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- search -->
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button size="mini" @click="handleEdit({})">添加</el-button>
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
      >
        <el-table-column
          prop="title"
          label="标题"
          width="150"
        />
        <el-table-column prop="preType" label="类型">
          <template v-slot="scope">
            <span v-if="scope.row.preType === '1'">公告</span>
            <span v-if="scope.row.preType === '2'">活动</span>
          </template>
        </el-table-column>
        <el-table-column prop="placedTop" label="是否置顶">
          <template v-slot="scope">
            <span v-if="scope.row.placedTop === '0'">关闭</span>
            <span v-if="scope.row.placedTop === '1'">开启</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签"
        />
        <el-table-column
          prop="createTime"
          label="发布时间"
          width="150"
        />
        <el-table-column
          prop="publisher"
          label="发布者"
          show-overflow-tooltip
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="150"
        />
        <el-table-column
          prop="updateName"
          label="更新人"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="destroy(scope.row)"
            >
              <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="page.total"
        :page.sync="page.page"
        :limit.sync="page.limit"
        @pagination="onSearch"
      />
    </div>
    <dialog-notice-form v-if="formVisible" :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DialogNoticeForm from './form'
import Pagination from '@/components/Pagination'
export default {
  name: 'AgentManageApply',
  components: {
    DialogNoticeForm,
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      form: {
        title: '',
        type: '',
        top: '',
        tag: '',
        author: '',
        date: ''
      },
      list: [
        {
          title: '标题',
          type: '类型',
          top: 'true',
          tag: '标签',
          date: '2020-8-8',
          author: '小新',
          dateUpate: '2020-9-9',
          updatePeople: '小新小新'
        }
      ],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      typeList: [
        { label: '全部', value: '' },
        { label: '公告', value: '1' },
        { label: '活动', value: '2' }
      ],
      topList: [
        { label: '全部', value: '' },
        { label: '关闭', value: '0' },
        { label: '开启', value: '1' }
      ],
      tagList: [
        { label: '全部', value: '' },
        { label: '域名', value: '域名' },
        { label: '代理商', value: '代理商' },
        { label: '企业邮件', value: '企业邮件' },
        { label: '企业建站', value: '企业建站' },
        { label: '云产品', value: '云产品' },
        { label: '虚拟主机', value: '虚拟主机' }
      ],
      authorList: [
        { label: '全部', value: '' },
        { label: '新网小新', value: '新网小新' },
        { label: '新网', value: '新网' },
        { label: '新网代理', value: '新网代理' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findActivityAnnounce']
    })
  },
  mounted() {
    this.onSearch(1)
  },
  methods: {
    ...mapActions('userManager', ['findActivityAnnounce', 'deleteActivityAnnounce']),
    handleSelectChange(v) {
      console.log(v)
    },
    onSearch(page) {
      console.log(this.form.date)
      const query = {
        title: this.form.title,
        preType: this.form.type,
        placedTop: this.form.top,
        label: this.form.tag,
        publisher: this.form.author,
        startDate: this.form.date && this.form.date[0] ? `${this.form.date[0]} 00:00:00` : '',
        endDate: this.form.date && this.form.date[1] ? `${this.form.date[1]} 23:59:59` : ''
      }

      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
        this.page.limit = 20
        this.page.page = 1
      }
      this.findActivityAnnounce(query).then(res => {
        if (!res.code) {
          console.log(res)
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleEdit(row) {
      this.formVisible = true
      this.row = row
    },
    destroy(row) {
      console.log(row)
      this.deleteActivityAnnounce({ id: row.id }).then(res => {
        if (!res.code) {
          if (res.data.isSuccess === '1') {
            this.$message.success('操作成功！')
            this.onSearch()
          } else {
            this.$message.error('操作失败！')
          }
        } else {
          if (res.code === '665030') {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    }
  }
}
</script>
