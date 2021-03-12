<template>
  <div class="column-sidebar">
    <template v-if="row.children">
      <el-submenu class="column-submenu" :index="String(row.id)" popper-append-to-body>
        <template slot="title">
          <item :icon="icon" :title="row.name" />
        </template>
        <sidebar
          v-for="child in row.children"
          :key="child.id"
          :row="child"
          :open="open"
        />
      </el-submenu>
    </template>

    <template v-else>
      <el-menu-item :index="String(row.id)" @click="open">
        <item :icon="icon" :title="row.name" />
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import Item from '@/layout/components/Sidebar/Item'

export default {
  name: 'Sidebar',
  components: { Item },
  props: {
    // 当前row
    row: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    open: {
      type: Function,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.column-sidebar /deep/ .el-submenu__title {
  background: transparent !important;
}
</style>
