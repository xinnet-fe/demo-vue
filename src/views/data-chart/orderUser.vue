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
          按所选时间粒度、时间范围，统计所有支付成功订单的用户数，并根据时间粒度展示所有订单下，新用户、老用户数。
        </p>
        <p>
          新用户数：在所选时间范围内，首次下单的用户数（用户数去重）
        </p>
        <p>
          老用户数：在所选时间范围内，所有下单的用户中去掉首次下单的用户后，剩余的用户数量为老用户数（去重）
        </p>
        <p>
          均值= 从2019年1月1日至前天的所有支付成功订单的用户数/从2019年1月1日至前天的天数，保留两位小数。
        </p>
        <p>
          上涨值= 大于均值的天数的所有支付成功订单的用户数/大于均值的天数，保留两位小数，四舍五入。
        </p>
        <p>
          下降值=小于均值的天数的所有支付成功订单的用户数/小于均值的天数，保留两位小数，四舍五入。
        </p>
        <p>
          警告值=小于下降值的天数的所有支付成功订单的用户数/小于下降值的天数，保留两位小数，四舍五入。
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
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import mixin from './mixins'
import ChartDetail from './detail'
import formatTime from '@/utils/formatTime'
import resize from '@/components/ResizeChart'
import { mapState } from 'vuex'

export default {
  name: 'OrderUser',
  components: { ChartDetail },
  mixins: [mixin, resize],
  data() {
    return {
      title: '订单用户数趋势分布',
      detailedCurve: [],
      selected: ['新用户', '老用户']
    }
  },
  computed: {
    ...mapState({
      users: state => state.chart.newAndOldUser
    })
  },
  methods: {
    formatTime: formatTime,
    formatter(params) {
      let res = params[0].axisValue + '<br>'
      forEach(params, (o, i) => {
        const { seriesName, value, marker } = o
        res += `${marker}${seriesName}(人)：${value}`
        if (i + 1 !== params.length) {
          res += '<br>'
        }
      })
      return res
    },
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
    initChart(chartData, labelName) {
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
        legendData = ['新用户', '老用户', '均值']
      }

      this.selected = legendData
      const start = 0
      const end = 100

      if (this.users.length) {
        forEach(this.users, (o, k) => {
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
      this.checkList = labelName ? [] : [1]
      this.options = map(selectData, (label, value) => ({ label, value }))
      const { formatter } = this
      const lineStyle = {
        width: 1
      }
      const series = [
        {
          name: legendData[0],
          type: 'bar',
          stack: 'one',
          lineStyle,
          data: newUserData
        },
        {
          name: legendData[1],
          type: 'bar',
          stack: 'one',
          lineStyle,
          data: oldUserData
        }
      ]
      // 根据切换下拉框数据判断数据
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
          subtext: '订单用户数（人）',
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
          data: xAxisData
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
