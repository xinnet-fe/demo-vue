<template>
  <div class="data-monitor">
    <div class="stat">
      <el-form ref="searchForm" class="form" :model="searchForm" :inline="true">
        <el-form-item label="时间粒度" prop="duration">
          <el-select v-model="searchForm.duration" clearable>
            <el-option v-for="(label, val) in duration" :key="val" :label="label" :value="val" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围" prop="range">
          <el-date-picker
            v-model="searchForm.range"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="pickerChange"
            @blur="pickerBlur"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm">查 询</el-button>
        </el-form-item>
      </el-form>

      <el-row>
        <el-col :span="6">
          <div class="block">
            <el-tooltip class="item" effect="light" placement="top">
              <div slot="content">
                <p>
                  按所选时间粒度、时间范围，统计所有注册渠道的新用户数的总和、按照账户数去重。
                </p>
                <p>
                  环比=（所选时间范围的注册用户数-所选时间范围紧挨的之前时间范围周期的注册用户数）
                </p>
              </div>
              <i class="el-icon-warning-outline" />
            </el-tooltip>

            <p class="hint1">累计注册用户数</p>
            <p class="hint2">1,234人</p>
            <p class="hint3">
              <span>环比：12.13%<i class="el-icon-caret-top" /></span>
              <span>同比：12.13%<i class="el-icon-caret-bottom" /></span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="block">
            <el-tooltip class="item" effect="light" placement="top">
              <div slot="content">
                <p>
                  按所选时间粒度、时间范围，统计所有注册渠道的新用户数的总和、按照账户数去重。
                </p>
                <p>
                  环比=（所选时间范围的注册用户数-所选时间范围紧挨的之前时间范围周期的注册用户数）
                </p>
              </div>
              <i class="el-icon-warning-outline" />
            </el-tooltip>

            <p class="hint1">累计订单用户数</p>
            <p class="hint2">800人</p>
            <p class="hint3">
              <span>环比：12.13%<i class="el-icon-caret-top" /></span>
              <span>同比：12.13%<i class="el-icon-caret-bottom" /></span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="block">
            <el-tooltip class="item" effect="light" placement="top">
              <div slot="content">
                <p>
                  按所选时间粒度、时间范围，统计所有注册渠道的新用户数的总和、按照账户数去重。
                </p>
                <p>
                  环比=（所选时间范围的注册用户数-所选时间范围紧挨的之前时间范围周期的注册用户数）
                </p>
              </div>
              <i class="el-icon-warning-outline" />
            </el-tooltip>

            <p class="hint1">累计支付成功的订单数</p>
            <p class="hint2">780笔</p>
            <p class="hint3">
              <span>环比：12.13%<i class="el-icon-caret-top" /></span>
              <span>同比：12.13%<i class="el-icon-caret-bottom" /></span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="block last">
            <el-tooltip class="item" effect="light" placement="top">
              <div slot="content">
                <p>
                  按所选时间粒度、时间范围，统计所有注册渠道的新用户数的总和、按照账户数去重。
                </p>
                <p>
                  环比=（所选时间范围的注册用户数-所选时间范围紧挨的之前时间范围周期的注册用户数）
                </p>
              </div>
              <i class="el-icon-warning-outline" />
            </el-tooltip>

            <p class="hint1">累计实时订单金额（GMV）</p>
            <p class="hint2">800,123,234元</p>
            <p class="hint3">
              <span>环比：12.13%<i class="el-icon-caret-top" /></span>
              <span>同比：12.13%<i class="el-icon-caret-bottom" /></span>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="chart block">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart1 :chart-data="chartData" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart2 :chart-data="chartData" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="chart block">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart3 :chart-data="chartData" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart4 :chart-data="chartData" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="chart block">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart5 :chart-data="chartData" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart6 :chart-data="chartData" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Chart1 from './chart1'
import Chart2 from './chart2'
import Chart3 from './chart3'
import Chart4 from './chart4'
import Chart5 from './chart5'
import Chart6 from './chart6'
import reduce from 'lodash/reduce'
import isNumber from 'lodash/isNumber'

export default {
  name: 'DataMonitor',
  components: {
    Chart1,
    Chart2,
    Chart3,
    Chart4,
    Chart5,
    Chart6
  },
  data() {
    return {
      chartData: [],
      oneDay: 3600 * 1000 * 24,
      searchForm: {
        duration: '',
        range: ''
      },
      duration: {
        day: '按日'
        // week: '按周',
        // month: '按月',
        // year: '按年'
      },
      pickerMinDate: '',
      pickerMaxDate: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: (picker) => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - this.oneDay * 6)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick: (picker) => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - this.oneDay * 29)
            picker.$emit('pick', [start, end])
          }
        }],
        onPick: ({ maxDate, minDate }) => {
          const oneMonth = (30 - 1) * 24 * 3600 * 1000
          if (minDate === null) {
            const _maxDate = maxDate.getTime()
            this.pickerMinDate = _maxDate - oneMonth
            this.pickerMaxDate = _maxDate + oneMonth
          }

          if (maxDate === null) {
            const _minDate = minDate.getTime()
            this.pickerMinDate = _minDate - oneMonth
            this.pickerMaxDate = _minDate + oneMonth
          }
        },
        disabledDate: (time) => {
          if (!this.pickerMaxDate || !this.pickerMinDate) {
            return false
          } else {
            return time.getTime() > this.pickerMaxDate || time.getTime() < this.pickerMinDate
          }
        }
      }
    }
  },
  computed: {
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
  },
  methods: {
    pickerChange(time) {
      if (time === null) {
        this.pickerMinDate = ''
        this.pickerMaxDate = ''
      }
    },
    pickerBlur(time) {
      if (!this.searchForm.range) {
        this.pickerMinDate = ''
        this.pickerMaxDate = ''
      }
    },
    submitForm() {
      this.getData()
    },
    getData() {
      const { range } = this.searchForm
      const selectAll = true
      let days
      if (range.length) {
        days = (range[1].getTime() - range[0].getTime())
      }
      const _days = parseInt(days) / parseInt(this.oneDay)
      this.generateChartData(_days, selectAll).then(data => {
        this.chartData = data
      })
    },
    generateChartData(_days = 7, selectAll) {
      const days = isNumber(_days) && !isNaN(_days) ? _days : 7
      // 每天生成一条数据
      return new Promise((resolve) => {
        const arr = new Array(days)
        const data = reduce(arr, (res, v, k) => {
          const rise = (Math.random() * 100).toFixed(2)
          const decline = (Math.random() * 100).toFixed(2)
          const average = (Math.random() * 100).toFixed(2)
          const warning = (Math.random() * 100).toFixed(2)
          const date = new Date().getTime() - this.oneDay * (days - k)
          const selected = selectAll
          res[k] = {
            // 上升
            rise: {
              name: '上涨值',
              value: 0,
              data: rise,
              selected,
              num: parseInt(Math.random() * 100)
            },
            // 下降
            decline: {
              name: '均值',
              value: 1,
              selected: true,
              data: decline,
              num: parseInt(Math.random() * 100)
            },
            // 平均
            average: {
              name: '转化率',
              value: 2,
              selected,
              data: average,
              num: parseInt(Math.random() * 100)
            },
            // 警告
            warning: {
              name: '警告值',
              value: 3,
              selected,
              data: warning,
              num: parseInt(Math.random() * 100)
            },
            // 日期
            date,
            num: parseInt(Math.random() * 100)
          }
          return res
        }, [])
        resolve(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/element-variables.scss';

.data-monitor {
  min-height: calc(100vh - 50px);
  background-color: $appMainBg;

  .stat {
    padding-top: 20px;
    background-color: #fff;

    .form {
      padding-left: 20px;
    }

    .block {
      padding-left: 20px;
      border-top: 1px solid #ededed;
      border-right: 1px solid #ededed;

      &.last {
        border-right: none;
      }
      .item {
        float: right;
        margin: 10px;
      }
      p {
        margin: 8px 0;
      }
      .hint1 {
        margin-top: 28px;
        font-size: 14px;
        font-weight: bold;
        color: $titleTextColor;
      }
      .hint2 {
        font-size: 20px;
        font-weight: bold;
        color: $hintTextColor;
      }
      .hint3 {
        font-size: 12px;
        color: $auxTextColor;
        padding-bottom: 20px;
        margin-bottom: 0;
        .el-icon-caret-top {
          display: inline-block;
          margin-right: 20px;
          color: $hintTextColor;
        }
        .el-icon-caret-bottom {
          color: $--color-success;
        }
      }
    }
  }

  .chart {
    margin-top: 20px;

    .grid-content {
      height: 450px;
      background-color: #fff;
    }
  }
}
</style>
