<template>
  <div class="chart-container">
    <custom-chart-head
      :title="title"
      :options="options"
      :chart="chart"
      :check-list="checkList"
    >
      <div slot="content">
        <p>
          按所选时间粒度、时间范围，统计所有注册渠道的新用户数的总和、按照账户数去重。
        </p>
        <p>
          环比=（所选时间范围的注册用户数-所选时间范围紧挨的之前时间范围周期的注册用户数）
        </p>
      </div>
    </custom-chart-head>
    <div ref="data-chart" class="data-chart" />
    <chart-detail
      v-if="step == 2 && detailedCurve.length"
      :chart-data="detailedCurve"
      :step.sync="step"
    >
      <el-table-column
        label="日期"
        width="100"
      >
        <template v-slot="scope">
          {{ scope.row.occurDate.slice(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column
        label="产品类型"
      >
        <template v-slot="scope">
          {{ products[scope.row.productId] }}
        </template>
      </el-table-column>
      <el-table-column
        label="客单价"
        prop="atv"
      />
      <el-table-column
        label="GMV（元）"
        prop="gmv"
        width="100"
      />
      <el-table-column
        label="支付成功用户数"
        prop="orderUsers"
      />
      <el-table-column
        label="上涨值"
        prop="atvRisingValue"
      />
      <el-table-column
        label="均值"
        prop="atvAverageValue"
      />
      <el-table-column
        label="下降值"
        prop="atvFallingValue"
      />
      <el-table-column
        label="警告值"
        prop="atvWarningValue"
      />
    </chart-detail>
  </div>
</template>

<script>

import map from 'lodash/map'
import forEach from 'lodash/forEach'
import mixin from './mixins'
import ChartDetail from './detail'
import formatTime from '@/utils/formatTime'
import resize from '@/components/ResizeChart'

export default {
  name: 'Chart2',
  components: { ChartDetail },
  mixins: [mixin, resize],
  data() {
    return {
      title: '客单价趋势分布',
      detailedCurve: []
    }
  },

  methods: {
    formatTime: formatTime,
    drawChildChart(startDate) {
      return this.$store.dispatch('chart/getDetailedCurve', { startDate, type: '1' }).then(res => {
        this.detailedCurve = res.data
      })
    },
    initChart(chartData) {
      const xAxisData = []
      // GMV
      const mainData = []
      // 均值
      const averageValueData = []
      // 上涨值
      const risingValueData = []
      // 下降值
      const fallingValueData = []
      // 警告值
      const warningValueData = []

      // 图例data
      const legendData = ['客单价', '上涨值', '均值', '下降值', '警告值']
      // 图例初始选中状态
      const selected = {
        '上涨值': false,
        '均值': true,
        '下降值': false,
        '警告值': false
      }
      // const dataLen = chartData.length
      // const start = dataLen > 7 ? (100 - 7 / dataLen * 100) : 0
      const start = 0
      const end = 100

      forEach(chartData, (o, k) => {
        xAxisData.push(formatTime(new Date(o.occurDate).getTime(), 'YYYY-MM-DD'))
        mainData.push(o.atv)
        averageValueData.push(o.atvAverageValue)
        risingValueData.push(o.atvRisingValue)
        fallingValueData.push(o.atvFallingValue)
        warningValueData.push(o.atvWarningValue)
      })

      // 下拉框数据
      const selectData = ['上涨值', '均值', '下降值', '警告值']
      // 下拉框初始选中状态取下标
      this.checkList = [1]
      this.options = map(selectData, (label, value) => ({ label, value }))
      const option = {
        color: this.echartsColorList,
        title: {
          subtext: '客单价（元）',
          subtextStyle: {
            color: '#606266'
          }
        },
        legend: {
          data: legendData,
          top: 20,
          left: 100,
          selected
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start,
            end
          },
          {
            type: 'inside',
            realtime: true,
            start,
            end
          }
        ],
        xAxis: {
          data: xAxisData,
          boundaryGap: false
        },
        yAxis: {},
        grid: {
          left: 20,
          bottom: 50,
          containLabel: true
        },
        series: [
          {
            name: legendData[0],
            type: 'line',
            data: mainData
          },
          {
            name: legendData[1],
            type: 'line',
            data: averageValueData
          },
          {
            name: legendData[2],
            type: 'line',
            data: risingValueData
          },
          {
            name: legendData[3],
            type: 'line',
            data: fallingValueData
          },
          {
            name: legendData[4],
            type: 'line',
            data: warningValueData
          }
        ]
      }
      this.option = option
      this.chart.setOption(option)
    }
  }
}
</script>
