<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :rules="rules" :inline="true" class="search-form">
      <el-form-item label="商品名称">
        <el-input v-model="form.goodsName" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="商品编号">
        <el-input v-model="form.goodsCode" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="服务编号">
        <el-input v-model="form.serviceCode" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="账单编号">
        <el-input v-model="form.billCode" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="form.domainName" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="会员编号">
        <el-input v-model="form.agentCode" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="分公司销售">
        <el-cascader
          v-model="selectedOptions"
          :clearable="true"
          :change-on-select="true"
          :options="organSaleList"
        />
      </el-form-item>
      <el-form-item label="产品类型">
        <el-cascader
          v-model="value"
          :props="props"
          :options="options"
          clearable
          @change="changeLabel"
        />
      </el-form-item>
      <el-form-item label="方式">
        <el-select v-model="form.billLineType">
          <el-option v-for="item in billLineType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否退费">
        <el-select v-model="form.isReturns">
          <el-option v-for="item in isReturns" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch()">查 询</el-button>
        <el-button size="medium" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button size="mini" @click="handleExport({})">导出</el-button>
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
          prop="billCode"
          label="账单编号"
          width="180"
          fixed
        />
        <el-table-column
          prop="goodsName"
          label="商品名称"
        />
        <el-table-column label="规格">
          <template v-slot="scope">
            {{ scope.row.timeAmount }}{{ scope.row.timeUnit === 'M' ? '月' : (scope.row.timeUnit === 'Y' ? '年' : '天') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="交易金额（元）"
        />
        <el-table-column
          prop="originalPrice"
          label="成本价（元）"
        />
        <el-table-column
          prop="billLineType"
          label="方式"
        />
        <el-table-column
          prop="agentCode"
          label="代理编号"
        />
        <el-table-column
          prop="operateTime"
          label="操作时间"
        />
        <el-table-column
          prop="userName"
          label="销售人员"
        />
        <el-table-column
          prop="organName"
          label="所属分公司"
        />
        <el-table-column
          prop="goodsCode"
          label="商品编号"
        />
        <el-table-column label="是否退费">
          <template v-slot="scope">
            {{ getIsReturns(scope.row.isReturns) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="supProductClassName"
          label="产品类型"
        />
        <el-table-column
          prop="serviceCode"
          label="服务编号"
        />
        <el-table-column label="商品类型">
          <template v-slot="scope">
            {{ scope.row.goodsType === '01' ? '主产品' : '附属产品' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="domainName"
          label="域名"
        />
      </el-table>
      <pagination
        :total="page.total"
        :page.sync="page.page"
        :limit.sync="page.limit"
        @pagination="onSearch"
      />
    </div>
    <!-- <template v-for="(item, idx) in dateArray">
      <form :key="idx" ref="formExcel"  action="/api/bill/query/exportExcel" method="post" target="_blank">
        <input type="hidden" name="agentCode" :value="form.agentCode">
        <input type="hidden" name="goodsName" :value="form.goodsName">
        <input type="hidden" name="goodsCode" :value="form.goodsCode">
        <input type="hidden" name="isReturns" :value="form.isReturns">
        <input type="hidden" name="billLineType" :value="form.billLineType">
        <input type="hidden" name="consumerType" :value="form.consumerType">
        <input type="hidden" name="serviceCode" :value="form.serviceCode">
        <input type="hidden" name="billCode" :value="form.billCode">
        <input type="hidden" name="domainName" :value="form.domainName">
        <input type="hidden" name="startDate" :value="item.split('|')[0]">
        <input type="hidden" name="endDate" :value="item.split('|')[1]">
        <input type="hidden" name="userCode" :value="form.userCode">
        <input type="hidden" name="organCode" :value="form.organCode">
        <input type="hidden" name="supProductClass" :value="form.supProductClass">
        <input type="hidden" name="productClass" :value="form.productClass">
        <button style="display:none" type="submit" :id="'formExcel'+idx">提交</button>
      </form>
    </template> -->

  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import clearFormDate from '@/utils/clearFormData'
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
      shareScopeEnd: [],
      value: [],
      props: {
        multiple: true
        // checkStrictly: true
      },
      organSaleList: [],
      options: [],
      date: '',
      selectedOptions: [],
      form: {
        agentCode: '',
        goodsName: '',
        goodsCode: '',
        isReturns: '',
        billLineType: '',
        consumerType: 'HY',
        serviceCode: '',
        billCode: '',
        domainName: '',
        startDate: '',
        endDate: '',
        userCode: '',
        organCode: '',
        supProductClass: '',
        productClass: ''
      },
      billLineType: [
        { label: '全部', value: '' },
        { label: '新开', value: 'N' },
        { label: '续费', value: 'R' },
        { label: '退费', value: 'C' },
        { label: '升级新开', value: 'U-N' },
        { label: '升级退费', value: 'U-C' }
      ],
      isReturns: [
        { label: '全部', value: '' },
        { label: '已退费', value: '01' },
        { label: '未退费', value: '02' }
      ],
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime()
          if (maxDate) {
            this.choiceDate = ''
          }
        },
        disabledDate: (time) => {
          if (this.choiceDate !== '') {
            const one = 90 * 24 * 3600 * 1000
            const minTime = this.choiceDate - one
            const maxTime = this.choiceDate + one
            return time.getTime() < minTime || time.getTime() > maxTime
          }
        }
      },
      choiceDate: '',
      dateArray: [],
      endDate: '',
      rules: {
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['bill/billList']
      // queryOrganSaleList(state) {
      //   return state.userManager.queryOrganSaleList.map((v) => {
      //     const item = {
      //       label: v.name,
      //       value: v.orgCode
      //     }
      //     if (v.salemans && v.salemans.length) {
      //       item.children = []
      //       item.children = v.salemans.map((v2) => {
      //         return {
      //           label: v2.name,
      //           value: v2.ptid
      //         }
      //       })
      //     }
      //     return item
      //   })
      // }
    })
  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.startDate = v[0] ? `${v[0]}` : ''
      this.form.endDate = v[1] ? `${v[1]}` : ''
      this.dateArray = []
      this.getDurDateArray(this.form.startDate)
    },
    selectedOptions: function(val) {
      const v = val || ['', '']
      this.form.organCode = v[0] ? `${v[0]}` : ''
      this.form.userCode = v[1] ? `${v[1]}` : ''
    },
    value: function(val) {
      console.log(val)
      const v = [[], []]
      if (val.length) {
        val.forEach((v2) => {
          // 查重
          if (v[0].indexOf(v2[0]) < 0) {
            v[0].push(v2[0])
          }
          //
          if (v2[1]) {
            v[1].push(v2[1])
          }
        })
      }

      this.form.supProductClass = v[0].length ? v[0].join(',') : ''
      this.form.productClass = v[1].length ? v[1].join(',') : ''
    }
  },
  mounted() {
    this.getProductQuery()
    this.queryOrganSaleList()
    // this.onSearch()
  },
  methods: {
    ...mapActions('bill', ['billList', 'ExportExcel']),
    getDurDateArray(start) {
      const endTimes = new Date(this.form.endDate).getTime()
      const newEndTimes = new Date(this.$moment(start).add(30, 'days').calendar()).getTime()
      // console.log(this.$moment('2020-12-18').add(30, 'days').calendar())
      const newStart = this.$moment(this.$moment(newEndTimes).add(1, 'days').calendar()).format('YYYY-MM-DD')
      const newStartTimes = new Date(this.$moment(newEndTimes).add(1, 'days').calendar()).getTime()
      if (newEndTimes < endTimes && newStartTimes < endTimes) {
        this.dateArray.push(`${start}|${this.$moment(newEndTimes).format('YYYY-MM-DD')}`)
        this.getDurDateArray(newStart, newEndTimes)
      } else {
        this.dateArray.push(`${start}|${this.form.endDate}`)
      }
    },
    changeLabel(val) {
      // 是否与上次的类型相同
      // let changeFlag = false
      // let changeItem = null
      // if (this.shareScopeEnd.length === 0) {
      //   this.value = val
      // } else {
      //   // 与原数组比对
      //   this.value.forEach((item) => {
      //     if (item[0] !== this.shareScopeEnd[0][0]) { // 一级标签不同
      //       changeFlag = true
      //       changeItem = item
      //     } else if ((!item[1] && this.shareScopeEnd[0][1]) || (item[1] && !this.shareScopeEnd[0][1])) { // 一级标签相同但是二级标签不同
      //       changeFlag = true
      //       changeItem = item
      //     }
      //   })
      // }
      // if (changeFlag) {
      //   this.value = []
      //   this.value.push(changeItem)
      // }
      // this.shareScopeEnd = this.value
      // console.log('==================')
      // console.log(this.shareScopeEnd)
    },
    handleSelectChange(v) {
      console.log(v)
    },
    getJsonString(obj) {
      let c = ''
      Object.keys(obj).map((keys) => {
        if (obj[keys]) {
          c += keys + '=' + obj[keys] + '&'
        }
      })
      c = c.substring(c.length - 1, 0)
      return c
    },
    onSearch(page) {
      if (this.form.goodsName.length || this.form.goodsCode.length || this.form.serviceCode.length || this.form.billCode.length || this.form.domainName.length || this.form.agentCode.length) {
        console.log('ok')
      } else {
        if (!this.date.length) {
          this.$message({
            message: '请输入关键词，或选择时间（最多一个月）查询',
            type: 'warning'
          })
          return false
        }
        // 因数据量较大，消耗查询及导出功能，对单用户（输入用户编号）支持一年的时间范围查询，不限用户（未输入用户编号）仅支持一个月时间范围查询。
        const diff = this.$moment(this.form.endDate).diff(this.$moment(this.form.startDate), 'days')
        if (this.form.agentCode.length) {
          if (diff > 366) {
            this.$message({
              message: '超出查询时间范围',
              type: 'warning'
            })
            return false
          }
        } else {
          if (diff > 31) {
            this.$message({
              message: '超出查询时间范围',
              type: 'warning'
            })
            return false
          }
        }
      }
      console.log(this.form.date)
      const query = this.form

      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
        this.page.limit = 20
        this.page.page = 1
      }
      this.billList(query).then(res => {
        if (!res.code) {
          console.log(res)
          this.list = res.list
          this.page.total = res.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleExport(page) {
      if (!this.date.length) {
        this.$message({
          message: '请选择日期',
          type: 'warning'
        })
        return false
      }
      // 因数据量较大，消耗查询及导出功能，对单用户（输入用户编号）支持一年的时间范围查询，不限用户（未输入用户编号）仅支持一个月时间范围查询。
      const diff = this.$moment(this.form.endDate).diff(this.$moment(this.form.startDate), 'days')
      if (this.form.agentCode.length) {
        if (diff > 366) {
          this.$message({
            message: '超出查询时间范围',
            type: 'warning'
          })
          return false
        }
      } else {
        if (diff > 31) {
          this.$message({
            message: '超出查询时间范围',
            type: 'warning'
          })
          return false
        }
      }
      window.open(window.location.origin + '/api/bill/query/exportExcel?' + this.getJsonString(this.form), '_blank')
      // this.$refs.formExcel.submit()
      // this.dateArray.forEach((item, idx) => {
      //   (function(i) {
      //       console.log(i)
      //       document.getElementById('formExcel'+i).click()
      //   })(idx)
      // })

      // const query = this.form
      // if (page) {
      //   query.pageNum = page.page
      //   query.pageSize = page.limit
      // } else {
      //   query.pageNum = 1
      //   this.page.limit = 20
      //   this.page.page = 1
      // }

      // let query = this.deepClone(this.form)
      // this.dateArray.forEach((v, idx) => {
      //     query.startDate = v.split('|')[0]
      //     query.endDate = v.split('|')[1]
      //     window.open(window.location.origin + '/api/bill/query/exportExcel?'+this.getJsonString(query), '_blank')
      // })
    },
    deepClone(initalObj) {
      const obj = {}
      if (typeof initalObj !== 'object') {
        return initalObj
      }
      for (const key in initalObj) {
        if (typeof initalObj[key] === 'object') {
          // 对数组特殊处理
          if (Array.isArray(initalObj[key])) {
            // 用map方法返回新数组，将数组中的元素递归
            obj[key] = initalObj[key].map(item => this.deepClone(item))
          } else {
            // 递归返回新的对象
            obj[key] = this.deepClone(initalObj[key])
          }
        } else if (typeof initalObj[key] === 'function') {
          // 返回新函数
          obj[key] = initalObj[key].bind(obj)
        } else {
          // 基本类型直接返回
          obj[key] = initalObj[key]
        }
      }
      return obj
    },
    resetForm() {
      clearFormDate(this.form)
      this.date = ''
      this.form.consumerType = 'HY'
    },
    // 单独处理时间的函数
    dealDisabledDate(time) {
      // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
      // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
      // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
      return time.getTime() < Date.now()

      // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
      // return time.getTime() <= Date.now()
      // return time.getTime() < Date.now() - 8.64e7
    },
    getProductQuery() {
      this.$store.dispatch('product/productQuery', {}).then(res => {
        this.options = res.map((v) => {
          v.label = v.productClassName
          v.value = v.productClassCode
          v.children = []
          if (v.list && v.list.length) {
            v.children = v.list.map((v2) => {
              v2.label = v2.productClassName
              v2.value = v2.productClassCode
              return v2
            })
          }
          return v
        })
        console.log(this.options)
      }).catch(error => {
        console.log(error)
      })
    },
    queryOrganSaleList() {
      this.$store.dispatch('userinfo/queryOrganSaleList', {}).then(res => {
        this.organSaleList = res.map((v) => {
          const item = {
            label: v.name,
            value: v.orgCode
          }
          if (v.salemans && v.salemans.length) {
            item.children = []
            item.children = v.salemans.map((v2) => {
              return {
                label: v2.name,
                value: v2.ptid
              }
            })
          }
          return item
        })
      }).catch(error => {
        console.log(error)
      })
    },

    getBillLineType(val) {
      const state = this.billLineType.filter((v) => {
        return v.value === val
      })
      return state[0] ? state[0].label : ''
    },
    getIsReturns(val) {
      const state = this.isReturns.filter((v) => {
        return v.value === val
      })
      return state[0] ? state[0].label : ''
    }
  }
}
</script>
