<template>
  <div class="mainpage">
    <el-form ref="form" :inline="true">
      <div class="search-container">
        <div class="search-box">
          <div v-for="(item, index) in tabForForm" :key="index" class="search-row clearfix">
            <div class="search-itemlabel">{{ item.label }}：</div>
            <div class="search-itemcontainer clearfix">
              <div v-for="(obj, ind) in item.children" :key="ind" class="item-box">
                <div>
                  <template v-if="obj.currentPayload.type === '多选'">
                    <el-form-item :label="obj.label">
                      <el-select v-model="obj.currentPayload.value" multiple collapse-tags placeholder="请选择">
                        <el-option v-for="item in obj.currentPayload.valueOptions" :key="item.label" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </template>
                  <template v-else>
                    <span>{{ obj.currentPayload.type }}</span>
                  </template>
                </div>
                <div v-if="obj.show" class="floatlayer">
                  <el-select v-model="obj.label" filterable placeholder="请选择" popper-class="tabselectcss" @change="changeItemCS({index:ind, label:$event})">
                    <el-option v-for="(itemCS, key) in item.childrenSource" :key="key" :label="itemCS.label" :value="itemCS.label" />
                  </el-select>
                </div>
              </div>
              <div class="item-button">
                <el-form-item>
                  <el-button icon="el-icon-plus" size="medium" plain @click="createItemForTab(index)">筛选条件</el-button>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div>
      列表
    </div>
    <!---->
  </div>
</template>

<script>
import mixin from './mixin.js'

export default {
  mixins: [mixin]
}
</script>

<style lang="scss" scoped>
@import './scss_scoped.scss';
</style>
