<template>
  <div class="custom-collapse">
    <el-collapse ref="coll" v-model="activeNames" @change="goCollapse" @focus="titleFocus" @blur="titleBlur">
      <el-collapse-item :title="title" :name="name">
        <slot />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
  props: {
    activeNames: {
      type: Array,
      default: () => []
    },
    goCollapse: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    titleFocus() {
      this.collClick = this.$refs.coll.setActiveNames
      this.$refs.coll.setActiveNames = () => {}
    },
    titleBlur() {
      this.$refs.coll.setActiveNames = this.collClick
    }
  }
}
</script>

<style lang="scss">
.custom-collapse {

  .el-collapse {
    border: none !important;
    margin-bottom: 20px;
  }

  .el-collapse-item__header {
    margin-bottom: 20px;
  }

}
</style>
