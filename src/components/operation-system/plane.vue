<template>
  <div class="plane">
    <el-tabs tab-position="left">
      <el-tab-pane v-for="(item, index) in tabData" :key="index" :label="item.label">
        <div class="planeList">
          <div v-for="(obj, ind) in item.children" :key="ind" class="pl-row">
            <span @click.stop="selected({index, item, ind, obj})">{{ obj.label }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import plane from './plane.js'

export default {
  mixins: [plane]
}
</script>

<style lang="scss" scoped>
@import './plane.scss';
</style>

