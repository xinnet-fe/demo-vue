<template>
  <div class="demo-container" style="padding: 20px;">
    <div class="block">
      <el-divider content-position="left">显示总数</el-divider>
      <el-pagination
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="block">
      <el-divider content-position="left">调整每页显示条数</el-divider>
      <el-pagination
        :current-page.sync="currentPage2"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="block">
      <el-divider content-position="left">直接前往</el-divider>
      <el-pagination
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="block">
      <el-divider content-position="left">完整功能</el-divider>
      <el-pagination
        background
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
