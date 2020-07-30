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
            <p class="hint2">{{ overviewSize.sumRegisterNumber | convertSeparator }}人</p>
            <p class="hint3">
              <span>环比：{{ overviewSize.momRegisterNumber | convertPercentage }}<i :class="[getIcon(overviewSize.momRegisterNumber)]" /></span>
              <span>同比：{{ overviewSize.yoyRegisterNumber | convertPercentage }}<i :class="[getIcon(overviewSize.yoyRegisterNumber)]" /></span>
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
            <p class="hint2">{{ overviewSize.sumOrderUsers | convertSeparator }}人</p>
            <p class="hint3">
              <span>环比：{{ overviewSize.momOrderUsers | convertPercentage }}<i :class="[getIcon(overviewSize.momOrderUsers)]" /></span>
              <span>同比：{{ overviewSize.yoyOrderUsers | convertPercentage }}<i :class="[getIcon(overviewSize.yoyOrderUsers)]" /></span>
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
            <p class="hint2">{{ overviewSize.sumOrderNumber | convertSeparator }}笔</p>
            <p class="hint3">
              <span>环比：{{ overviewSize.momOrderNumber | convertPercentage }}<i :class="[getIcon(overviewSize.momOrderNumber)]" /></span>
              <span>同比：{{ overviewSize.yoyOrderNumber | convertPercentage }}<i :class="[getIcon(overviewSize.yoyOrderNumber)]" /></span>
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

            <p class="hint1">累计实付订单金额（GMV）</p>
            <p class="hint2">{{ overviewSize.sumGmv | convertSeparator }}元</p>
            <p class="hint3">
              <span>环比：{{ overviewSize.momGmv | convertPercentage }}<i :class="[getIcon(overviewSize.momGmv)]" /></span>
              <span>同比：{{ overviewSize.yoyGmv | convertPercentage }}<i :class="[getIcon(overviewSize.yoyGmv)]" /></span>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="chart block">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <register-user ref="registerUser" :chart-data="registerUserData" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <order-user ref="orderUser" :chart-data="orderUserData" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="chart block">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <gmv ref="gmv" :chart-data="gmvData" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <guest-list ref="guestList" :chart-data="guestListData" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import OrderUser from './orderUser'
import RegisterUser from './registerUser'
import Gmv from './gmv'
import GuestList from './guestList'
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import isNumber from 'lodash/isNumber'
import isUndefined from 'lodash/isUndefined'
import isNaN from 'lodash/isNaN'
import formatTime from '@/utils/formatTime'
import { when } from '@/utils/request'
import { mapState } from 'vuex'

export default {
  name: 'DataMonitor',
  components: {
    GuestList,
    RegisterUser,
    Gmv,
    OrderUser
  },
  data() {
    return {
      registerUserData: [],
      orderUserData: [],
      gmvData: [],
      guestListData: [],
      oneDay: 3600 * 1000 * 24,
      searchForm: {
        duration: 'day',
        range: []
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
    ...mapState({
      overviewSize: state => state.chart.overviewSize
    })
  },
  mounted() {
    this.set7DayTime()
    this.getData()
  },
  methods: {
    set7DayTime() {
      // 最近7日：今天29日取值（22-28）
      const currentTime = new Date().getTime()
      const day = 3600 * 1000 * 24
      const startTime = new Date(currentTime - 8 * day)
      const endTime = new Date(currentTime - day)
      this.searchForm.range.push(startTime, endTime)
    },
    getIcon(number) {
      const num = parseFloat(number)
      if (isUndefined(num) || isNaN(num) || !isNumber(num) || num === 0) {
        return ''
      }
      return num > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },
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
      this.clearStep()
      this.getData()
    },
    dataSort(data) {
      data.sort((a, b) => {
        const aTime = new Date(a.occurDate).getTime()
        const bTime = new Date(b.occurDate).getTime()
        return aTime - bTime
      })
      return data
    },
    clearStep() {
      const { guestList, registerUser, gmv, orderUser } = this.$refs
      guestList.step = 1
      registerUser.step = 1
      gmv.step = 1
      orderUser.step = 1
    },
    getData() {
      const { range } = this.searchForm
      const { guestList, registerUser, gmv, orderUser } = this.$refs
      let startDate
      let endDate
      if (range && range.length) {
        startDate = formatTime(range[0].getTime(), 'YYYY-MM-DD')
        endDate = formatTime(range[1].getTime(), 'YYYY-MM-DD')
      } else {
        this.$message.error('请选择时间范围！')
        return
      }

      const data = { startDate, endDate }
      guestList.chart.showLoading()
      registerUser.chart.showLoading()
      gmv.chart.showLoading()
      orderUser.chart.showLoading()
      // 获取概览数据
      this.$store.dispatch('chart/getOverviewSize', data)
      // 1,2,3,4分别对应guestList,registerUser,gmv,orderUser的数据
      forEach(Array.of(1, 2, 3), v => {
        this.$store.dispatch('chart/getCurve', { ...data, type: v }).then(res => {
          const data = this.dataSort(values(res.data))
          if (v === 1) {
            guestList.chart.hideLoading()
            this.guestListData = data
          } else if (v === 2) {
            registerUser.chart.hideLoading()
            this.registerUserData = data
          } else if (v === 3) {
            gmv.chart.hideLoading()
            this.gmvData = data
          }
        })
      })
      when(
        this.$store.dispatch('chart/getCurve', { ...data, type: '4' }),
        this.$store.dispatch('chart/getNewAndOld', data)
      ).then(result => {
        const data = this.dataSort(values(result[0].data))
        this.orderUserData = data
        orderUser.chart.hideLoading()
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
