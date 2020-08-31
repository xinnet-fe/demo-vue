<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="商品名称">
        <el-input v-model="form.title" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="商品编号">
        <el-input v-model="form.title" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="服务编号">
        <el-input v-model="form.title" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="form.title" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="form.title" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="代理编号">
        <el-input v-model="form.title" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="分公司销售">
        <el-cascader
          :options="options"
          :props="props"
          collapse-tags
          clearable
        />
      </el-form-item>
      <el-form-item label="产品类型">
        <el-cascader
          :options="options"
          :props="props"
          collapse-tags
          clearable
        />
      </el-form-item>
      <el-form-item label="方式">
        <el-select v-model="form.tag">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否退费">
        <el-select v-model="form.author">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
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
        <el-button size="mini" @click="handleEdit({})">导出</el-button>
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
          label="订单号"
          width="150"
          fixed
        />
        <el-table-column
          prop="type"
          label="商品名称"
        />
        <el-table-column
          prop="top"
          label="规格"
        />
        <el-table-column
          prop="tag"
          label="交易金额（元）"
        />
        <el-table-column
          prop="date"
          label="成本价（元）"
        />
        <el-table-column
          prop="author"
          label="方式"
          show-overflow-tooltip
        />
        <el-table-column
          prop="dateUpate"
          label="代理编号"
        />
        <el-table-column
          prop="updatePeople"
          label="操作时间"
        />
        <el-table-column
          prop="updatePeople"
          label="销售人员"
        />
        <el-table-column
          prop="updatePeople"
          label="所属分公司"
        />
        <el-table-column
          prop="updatePeople"
          label="商品编号"
        />
        <el-table-column
          prop="updatePeople"
          label="是否退费"
        />
        <el-table-column
          prop="updatePeople"
          label="产品类型"
        />
        <el-table-column
          prop="updatePeople"
          label="服务编号"
        />
        <el-table-column
          prop="updatePeople"
          label="交易类型"
        />
        <el-table-column
          prop="updatePeople"
          label="商品类型"
        />
        <el-table-column
          prop="updatePeople"
          label="域名"
        />
        <el-table-column
          prop="updatePeople"
          label="财务归属"
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
export default {
  name: 'AgentManageApply',
  components: {
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      props: { multiple: true },
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }, {
          value: 12,
          label: '浙江',
          children: [
            { value: 13, label: '杭州' },
            { value: 14, label: '宁波' },
            { value: 15, label: '嘉兴' }
          ]
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
          children: [
            { value: 19, label: '西安' },
            { value: 20, label: '延安' }
          ]
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 22, label: '乌鲁木齐' },
            { value: 23, label: '克拉玛依' }
          ]
        }]
      }],
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
      memberType: [
        { label: '代理编号', value: 'agentCode' },
        { label: '手机号', value: 'telenumber' },
        { label: '邮箱', value: 'userNameEmail' },
        { label: '联系人', value: 'organizeNameCn' }
      ],
      stateType: [
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
        agentCode: this.form.type === 'agentCode' ? this.form.keywords : '',
        telenumber: this.form.type === 'telenumber' ? this.form.keywords : '',
        userNameEmail: this.form.type === 'userNameEmail' ? this.form.keywords : '',
        organizeNameCn: this.form.type === 'organizeNameCn' ? this.form.keywords : '',
        pageNum: '',
        state: this.form.state,
        startDate: this.form.date && this.form.date[0] ? `${this.form.date[0]} 00.00.00` : '',
        endDate: this.form.date && this.form.date[1] ? `${this.form.date[1]} 23.59.59` : ''
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
      this.findDlApply(query).then(res => {
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
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    }
  }
}
</script>
