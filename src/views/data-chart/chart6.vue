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
    <div v-if="step !== 1" class="data-view">
      <el-table
        :data="tableData"
        border
        class="data-table"
      >
        <el-table-column
          label="日期"
        >
          <template v-slot="scope">
            {{ formatTime(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column
          label="用户数"
        >
          <template v-slot="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column
          label="均值"
        >
          <template v-slot="scope">
            {{ scope.row.average.num }}
          </template>
        </el-table-column>
        <el-table-column
          label="上涨值"
        >
          <template v-slot="scope">
            {{ scope.row.rise.num }}
          </template>
        </el-table-column>
      </el-table>
      <div class="chart-bread">
        <span class="clickable" @click="backView">2020 14</span> /
        <span>明细</span>
      </div>
    </div>
  </div>
</template>

<script>

import map from 'lodash/map'
import forEach from 'lodash/forEach'
import mixin from './mixins'
import formatTime from '@/utils/formatTime'
import resize from '@/components/ResizeChart'

export default {
  name: 'Chart5',
  mixins: [mixin, resize],
  data() {
    return {
      title: '订单用户数趋势分布',
      tableData: []
    }
  },
  methods: {
    formatTime: formatTime,
    initChart(childData) {
      this.checkList = []
      const xAxisData = []
      const riseData = []
      const declineData = []
      const averageData = []
      const warningData = []
      const legendData = []
      // 图例初始值
      const selected = {}
      // 阈值初始值
      const dataLen = this.chartData.length
      const start = dataLen > 7 ? (100 - 7 / dataLen * 100) : 0
      const end = 100
      const data = childData ? this.chartData.slice(0, 2) : this.chartData
      this.tableData = data
      forEach(data, (o, k) => {
        if (k === 0) {
          legendData.push(
            o.rise.name,
            o.decline.name,
            o.average.name,
            o.warning.name
          )

          forEach(o, item => {
            if (item.selected) {
              selected[item.name] = true
              this.checkList.push(item.value)
            } else {
              selected[item.name] = false
            }
          })
        }
        xAxisData.push(formatTime(o.date, 'YYYY-MM-DD'))
        riseData.push(o.rise.data)
        declineData.push(o.decline.data)
        averageData.push(o.average.data)
        warningData.push(o.warning.data)
      })

      this.options = map(legendData, (label, value) => ({ label, value }))
      const option = {
        color: this.echartsColorList,
        legend: {
          data: legendData,
          icon: 'rect',
          top: 20,
          left: 20,
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
          data: xAxisData
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
            type: 'bar',
            stack: 'one',
            data: riseData
          },
          {
            name: legendData[1],
            type: 'bar',
            stack: 'one',
            data: declineData
          },
          {
            name: legendData[2],
            type: 'bar',
            stack: 'one',
            data: averageData
          },
          {
            name: legendData[3],
            type: 'bar',
            stack: 'one',
            data: warningData
          }
        ]
      }
      this.option = option
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.chart-container {

  .data-view {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: calc(100% - 40px);

    > .data-table {
      width: 94%;
      margin-left: 3%;
      margin-top: 30px;
    }
  }

  .chart-bread {
    color: #333;
    margin: 20px;

    .clickable {
      cursor: pointer;
    }
  }
}
</style>
