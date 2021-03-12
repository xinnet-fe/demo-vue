<template>
  <div class="">
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        width="120"
        label="日期"
      />
      <el-table-column
        label="行为轨迹"
      >
        <template>
          <table class="time-line">
            <tr>
              <td v-for="(activity, index) in activities" :key="index">
                <div class="timestamp">{{ activity.timestamp }}</div>
                <div class="line"><span class="dot" /></div>
                <div class="content">{{ activity.content }}</div>
              </td>
            </tr>
          </table>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="handleGetList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'DetailOperation',
  components: {
    Pagination
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  computed: {},
  methods: {
    handleGetList() {

    }
  }
}
</script>

<style lang="scss" scoped>
.time-line{
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  td{
    text-align: center;
    padding:10px 0;
    border: none;
    background: none;
    .line{
      width: 100%;
      height: 2px;
      background: #e4e7ed;
      position: relative;
      margin: 10px 0;
    }
    .dot{
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: #e4e7ed;
      display: block;
      position: absolute;
      left: 50%;
      top: 0px;
      margin-top: -5px;
      margin-left: -5px;
    }
    .timestamp{
      color: #909399;
    }
    .content{
      color: #606266;
    }
  }
}
</style>
