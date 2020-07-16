<template>
  <div class="app-container">
    <div class="contop">
      <h2 class="tit">
        <span />
        <p>基本信息</p>
      </h2>
      <div class="contop-con">
        <p>
          <span>用户编号：hy123456</span>
          <span>注册设备：PC端</span>
          <span>单位（个人）名称：张三</span>
          <span>账号状态：正常</span>
        </p>
        <p>
          <span>手机号：13557426848</span>
          <span>注册渠道：官网注册</span>
          <span>实名状态：待审核</span>
          <span>分公司：北京市分公司</span>
        </p>
        <p>
          <span>账号绑定邮箱：1233@qq.com</span>
          <span>注册时间：2020-7-16 14:04:01</span>
          <span>认证类型：个人</span>
          <span>用户类型：HY</span>
        </p>
      </div>
    </div>
    <div class="contable conmiddle">
      <h2 class="tit">
        <span />
        <p>联系人信息</p>
      </h2>
      <div class="contables conmiddle-table">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="email"
            label="邮箱"
          />
          <el-table-column
            prop="phone"
            label="手机号"
          />
          <el-table-column
            prop="remark"
            label="备注"
          />
        </el-table>
      </div>
    </div>
    <div class="contable conmiddle">
      <h2 class="tit">
        <span />
        <p>绑定销售信息</p>
      </h2>
      <div class="contables conmiddle-table">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="email"
            label="邮箱"
          />
          <el-table-column
            prop="phone"
            label="手机号"
          />
          <el-table-column
            prop="remark"
            label="备注"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import waves from '@/directive/demos/waves' // waves directive
// import { parseTime } from '@/utils/demos'
// import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
// import reduce from 'lodash/reduce'
// import remove from 'lodash/remove'
// import forEach from 'lodash/forEach'

export default {
  name: 'ComplexTable',
  // components: { Pagination },
  // directives: { waves },
  filters: {
  },
  data() {
    return {
      tableData: [{
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }, {
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }, {
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }, {
        email: '7882@qq.com',
        name: '王小虎',
        phone: '13578945632',
        remark: ''
      }]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped>
  .app-container {
    background: #f3f7fa;
  }
  .contop, .contable {
    background: #fff;
    color: #333;
    margin-bottom: 20px;
  }
  .contop-con {
    padding: 11px 30px 38px 30px;
    box-sizing: border-box;
  }
  .contop-con > p {
    font-size: 12px;
    width: 100%;
    height: 49px;
    line-height: 49px;
  }
  .contop-con > p > span {
    display: inline-block;
    width: 24%;
  }
  .tit {
    height: 51px;
    font-size: 14px;
    /* line-height: 51px; */
    /* border-left: solid 2px #6282a9; */
    border-bottom: solid 1px #e5e5e5;
    margin: 0;
    display: flex;
  }
  .tit span {
    display: inline-block;
    height: 20px;
    width: 4px;
    margin-top: 17px;
    margin-right: 15px;
    background: #6282a9;
  }
  .tit p {
    height: 20px;
    line-break: 20px;
    font-size: 14px;
    font-weight: 400;
    margin: 20px 0 0 0;
  }
  .contables {
    padding: 20px 20px 57px 20px;
    box-sizing: border-box;
  }
  /* .tit p {
    font-size: 14px;
    height: 20px;
    border-left: solid 2px #6282a9;
    margin: 0;
  } */
</style>
