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
          {{ scope.row.occurDate && scope.row.occurDate.slice(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户类别"
        prop="name"
      />
      <el-table-column
        label="订单用户数"
        prop="users"
      />
      <el-table-column
        label="均值"
        prop="averageValue"
      />
      <el-table-column
        label="上涨值"
        prop="risingValue"
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
import { mapState } from 'vuex'

export default {
  name: 'Chart5',
  components: { ChartDetail },
  mixins: [mixin, resize],
  data() {
    return {
      title: '订单用户数趋势分布',
      detailedCurve: []
    }
  },
  computed: {
    ...mapState({
      users: state => state.chart.newAndOldUser
    })
  },
  methods: {
    formatTime: formatTime,
    drawChildChart(startDate) {
      return this.$store.dispatch('chart/getDetailedCurve', { startDate, type: '4' }).then(res => {
        const o = res.data
        if (o && o.length) {
          const {
            id,
            newUserAverageValue,
            newUserRisingValue,
            newUsers,
            occurDate,
            oldUserAverageValue,
            oldUserRisingValue,
            oldUsers
          } = o[0]
          this.detailedCurve = [
            {
              id,
              name: '新用户',
              averageValue: newUserAverageValue,
              risingValue: newUserRisingValue,
              users: newUsers,
              occurDate
            },
            {
              id,
              name: '老用户',
              averageValue: oldUserAverageValue,
              risingValue: oldUserRisingValue,
              users: oldUsers,
              occurDate
            }
          ]
        }
      })
    },
    initChart(chartData) {
      const xAxisData = []
      // 用户
      const newUserData = []
      const oldUserData = []
      const recallUserData = []
      // 均值
      const averageValueData = []
      // 上涨值
      const risingValueData = []
      // 下降值
      const fallingValueData = []
      // 警告值
      const warningValueData = []

      // 图例data
      const legendData = ['新用户', '老用户', '上涨值', '均值', '下降值', '警告值']
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

      if (this.users.length) {
        forEach(chartData, (o, k) => {
          newUserData.push(o.newUsers)
          oldUserData.push(o.oldUsers)
          recallUserData.push(o.orderUsers)
        })
      }

      forEach(chartData, (o, k) => {
        xAxisData.push(formatTime(new Date(o.occurDate).getTime(), 'YYYY-MM-DD'))
        averageValueData.push(o.userAverageValue)
        risingValueData.push(o.userRisingValue)
        fallingValueData.push(o.userFallingValue)
        warningValueData.push(o.userWarningValue)
      })

      // 下拉框数据
      const selectData = ['上涨值', '均值', '下降值', '警告值']
      // 下拉框初始选中状态取下标
      this.checkList = [1]
      this.options = map(selectData, (label, value) => ({ label, value }))
      const option = {
        color: this.echartsColorList,
        title: {
          subtext: '订单用户数（人）',
          subtextStyle: {
            color: '#606266'
          }
        },
        legend: {
          data: legendData,
          icon: 'roundRect',
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
            data: newUserData
          },
          {
            name: legendData[1],
            type: 'bar',
            stack: 'one',
            data: oldUserData
          },
          {
            name: legendData[2],
            type: 'line',
            data: averageValueData
          },
          {
            name: legendData[3],
            type: 'line',
            data: risingValueData
          },
          {
            name: legendData[4],
            type: 'line',
            data: fallingValueData
          },
          {
            name: legendData[5],
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
