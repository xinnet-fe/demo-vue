<template>
  <span v-if="item.state === 1">
    <el-select v-if="item.result.operation==='包含任一、都不包含'" v-model="item.result.operationValue">
      <el-option v-for="(obj, ind) in item.result.operationOptions" :key="ind" :label="obj.label" :value="obj.label" />
    </el-select>

    <el-select v-if="item.result.type === '多选'" v-model="item.value" multiple collapse-tags>
      <el-option v-for="(obj, ind) in item.result.valueOptions" :key="ind" :label="obj.label" :value="obj.label" />
    </el-select>

    <el-date-picker v-if="item.result.type === '日期'" v-model="item.value" type="date" placeholder="选择日期" />

    <el-input v-if="item.result.type === '文本'" v-model="item.value" placeholder="请输入内容" />

    <el-cascader v-if="item.result.type === '级联'" v-model="item.value" collapse-tags :options="item.result.valueOptions" :props="{ expandTrigger: 'hover', multiple: true }" />

    <el-input v-if="item.result.type === '金钱'" v-model="item.value" placeholder="请输入内容" />

    <el-input v-if="item.result.type === '数值'" v-model="item.value" placeholder="请输入内容" />

    <el-select v-if="item.result.type === '布尔'" v-model="item.value" placeholder="请选择">
      <el-option v-for="(obj, ind) in item.result.valueOptions" :key="ind" :label="obj.label" :value="obj.label" />
    </el-select>

  </span>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped>

</style>
