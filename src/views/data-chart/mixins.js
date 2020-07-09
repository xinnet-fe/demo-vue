import echarts from 'echarts'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import CustomChartHead from '@/components/CustomChartHead'

export default {
  components: {
    CustomChartHead
  },
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      step: 1,
      chart: null,
      option: {},
      options: [],
      checkList: []
    }
  },
  mounted() {
    const self = this
    this.chart = echarts.init(this.$refs['data-chart'])
    this.chart.on('click', this.getChart.bind(self))

    this.$watch('chartData', (newVal) => {
      if (newVal.length) {
        this.initChart()
        this.chart.on('legendselectchanged', this.legendSelectChanged.bind(self))
      }
    })

    if (this.chartData.length) {
      this.initChart()
      this.chart.on('legendselectchanged', this.legendSelectChanged.bind(self))
    }
  },
  beforeDestroy() {
    const self = this
    if (!this.chart) {
      return
    }
    this.chart.off('legendselectchanged', this.legendSelectChanged.bind(self))
    this.chart.off('click', this.getChart.bind(self))
    this.chart.dispose()
    this.chart = null
    this.option = {}
  },
  methods: {
    // 点击图例联动阈值下拉列表
    legendSelectChanged(legends) {
      const newLegends = reduce(legends.selected, (res, value, key) => {
        if (value) {
          res[key] = value
        }
        return res
      }, {})
      this.checkList = reduce(this.options, (res, o) => {
        forEach(newLegends, (v, legendLabel) => {
          if (legendLabel === o.label) {
            res.push(o.value)
          }
        })
        return res
      }, [])
    },
    backView() {
      this.initChart()
      this.step = 1
    },
    getChart(param) {
      if (param.componentType === 'series') {
        this.initChart(param.name)
        this.step = 2
      }
    }
  }
}
