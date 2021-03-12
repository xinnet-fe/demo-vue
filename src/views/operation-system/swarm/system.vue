<template>
  <el-form ref="searchForm" class="search-form" :inline="true">
    <el-form-item>
      <el-button type="primary" size="medium" :loading="loading" @click="handleQuery">查询</el-button>
      <el-button size="medium">清空所选</el-button>
      <el-button size="medium" :loading="loading" @click="handleSave">保存为模板</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import clearFormDate from '@/utils/clearFormData'
export default {
  name: 'AchievementHy',
  components: { },
  filters: {
  },
  props: {
  },
  data() {
    return {
      form: {
      },
      isSaved: true // 是否保存为模板
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['performance/queryHyDlSalePerformanceData']
    })
  },
  watch: {

  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('getList')
    })
  },
  methods: {
    resetModal() {
      clearFormDate(this.form)
      this.resetDate()
    },
    handleQuery() {
      this.$emit('getList', this.form)
    },
    handleSave() {

    }
  }
}
</script>
<style scoped>

</style>
