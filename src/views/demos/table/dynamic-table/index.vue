<template>
  <div class="demo-container" style="padding: 20px;">
    <el-divider content-position="left">动态表格</el-divider>
    <div style="margin: 20px 0;">
      Fixed header, sorted by header order,
    </div>
    <fixed-thead />

    <div style="margin: 20px 0;">
      Not fixed header, sorted by click order
    </div>
    <unfixed-thead />
  </div>
</template>

<script>
import FixedThead from './components/FixedThead'
import UnfixedThead from './components/UnfixedThead'

export default {
  name: 'DynamicTable',
  components: { FixedThead, UnfixedThead }
}
</script>

