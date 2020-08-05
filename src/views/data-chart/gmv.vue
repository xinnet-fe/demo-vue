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
          按所选时间粒度、时间范围，统计所有支付成功订单的总金额，并根据时间粒度展示实付总金额的分布。
        </p>
        <p>
          均值= 从2019年1月1日至前天的所有订单的总金额/从2019年1月1日至前天的天数，保留两位小数。
        </p>
        <p>
          上涨值= 大于均值的天数的订单总金额/大于均值的天数，保留两位小数，四舍五入。
        </p>
        <p>
          下降值=小于均值的天数的订单总金额/小于均值的天数，保留两位小数，四舍五入。
        </p>
        <p>
          警告值=小于下降值的天数的订单总金额/小于下降值的天数，保留两位小数，四舍五入。
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
        width="100"
      >
        <template v-slot="scope">
          {{ products[scope.row.productId] }}
        </template>
      </el-table-column>
      <el-table-column
        label="GMV（元）"
        prop="gmv"
        width="100"
      />
      <el-table-column
        label="上涨值"
        prop="gmvRisingValue"
      />
      <el-table-column
        label="均值"
        prop="gmvAverageValue"
      />
      <el-table-column
        label="下降值"
        prop="gmvFallingValue"
      />
      <el-table-column
        label="警告值"
        prop="gmvWarningValue"
      />
    </chart-detail>
  </div>
</template>

<script>

import map from 'lodash/map'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import mixin from './mixins'
import ChartDetail from './detail'
import formatTime from '@/utils/formatTime'
import resize from '@/components/ResizeChart'

export default {
  name: 'Gmv',
  components: { ChartDetail },
  mixins: [mixin, resize],
  data() {
    return {
      title: 'GMV趋势分布',
      detailedCurve: [],
      selected: ['GMV']
    }
  },
  methods: {
    drawChildChart(startDate) {
      return this.$store.dispatch('chart/getDetailedCurve', { startDate, type: '3' }).then(res => {
        this.detailedCurve = res.data
      })
    },
    formatter(params) {
      let res = params[0].axisValue + '<br>'
      forEach(params, (o, i) => {
        const { seriesName, value, marker } = o
        res += `${marker}${seriesName}(元)：${value}`
        if (i + 1 !== params.length) {
          res += '<br>'
        }
      })
      return res
    },
    initChart(chartData, labelName) {
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

      // 图例数据
      const defaultLegendData = this.selected
      let legendData = defaultLegendData
      if (labelName) {
        if (legendData.indexOf(labelName) > -1) {
          remove(legendData, v => v === labelName)
        } else {
          legendData = defaultLegendData.concat(labelName)
        }
      } else {
        legendData = ['GMV', '均值']
      }
      // 下拉列表控制图例是否显示
      this.selected = legendData
      const start = 0
      const end = 100

      forEach(chartData, (o, k) => {
        xAxisData.push(formatTime(new Date(o.occurDate).getTime(), 'YYYY-MM-DD'))
        mainData.push(o.gmv)
        averageValueData.push(o.gmvAverageValue)
        risingValueData.push(o.gmvRisingValue)
        fallingValueData.push(o.gmvFallingValue)
        warningValueData.push(o.gmvWarningValue)
      })

      // 下拉框数据
      const selectData = ['上涨值', '均值', '下降值', '警告值']
      // 下拉框初始选中状态取下标
      this.checkList = labelName ? [] : [1]
      this.options = map(selectData, (label, value) => ({ label, value }))
      const { formatter } = this
      const lineStyle = {
        width: 1
      }
      const series = [
        {
          name: legendData[0],
          type: 'line',
          areaStyle: {},
          lineStyle,
          data: mainData
        }
      ]
      // 根据切换下拉框数据判断数据
      if (labelName) {
        const data = { risingValueData, averageValueData, fallingValueData, warningValueData }
        this.addSeriesData(legendData, this.checkList, series, data)
      // 首次进入数据均值
      } else {
        series.push({
          name: '均值',
          type: 'line',
          lineStyle,
          data: averageValueData
        })
      }

      const option = {
        color: this.echartsColorList,
        title: {
          subtext: 'GMV（元）',
          left: 15,
          subtextStyle: {
            color: '#606266'
          }
        },
        legend: {
          data: legendData,
          selectedMode: false,
          icon: 'roundRect',
          top: 10,
          left: 'center',
          itemWidth: 20,
          itemHeight: 8
        },
        tooltip: {
          trigger: 'axis',
          formatter
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
        series
      }
      this.option = option
      this.chart.setOption(option, true)
    }
  }
}
</script>

