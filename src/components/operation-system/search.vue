<template>
  <div class="mainpage">
    <el-form ref="form" :inline="true">
      <div class="search-container">
        <div class="search-box">
          <div v-for="(item, index) in tabForForm" :key="index" class="search-row clearfix">
            <div class="search-itemlabel">{{ item.label }}：</div>
            <div class="search-itemcontainer clearfix">
              <div v-for="(obj, ind) in item.children" :key="ind" class="item-box">
                <div v-if="!obj.show">
                  <template v-if="obj.currentPayload.type === '多选'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-select v-model="obj.currentPayload.value" multiple collapse-tags placeholder="请选择" @change="asyncValue">
                        <el-option v-for="item in obj.currentPayload.valueOptions" :key="item.label" :label="item.label" :value="item.value||item.label" />
                      </el-select>
                    </el-form-item>
                  </template>
                  <template v-else-if="obj.currentPayload.type === '日期'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-date-picker v-model="obj.currentPayload.value" type="date" placeholder="选择日期" @change="asyncValue" />
                    </el-form-item>
                  </template>
                  <template v-else-if="obj.currentPayload.type === '文本'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-input v-model="obj.currentPayload.value" placeholder="请输入内容" @change="asyncValue" />
                    </el-form-item>
                  </template>
                  <template v-else-if="obj.currentPayload.type === '级联'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-cascader v-model="obj.currentPayload.value" collapse-tags :options="obj.currentPayload.valueOptions" :props="{ expandTrigger: 'hover', multiple: true }" @change="asyncValue" />
                    </el-form-item>
                  </template>
                  <template v-else-if="obj.currentPayload.type === '金钱'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-input v-model="obj.currentPayload.value" placeholder="请输入内容" @change="asyncValue" />
                    </el-form-item>
                  </template>
                  <template v-else-if="obj.currentPayload.type === '数值'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-input v-model="obj.currentPayload.value" placeholder="请输入内容" @change="asyncValue" />
                    </el-form-item>
                  </template>
                  <template v-else-if="obj.currentPayload.type === '布尔'">
                    <el-form-item :label="obj.label" :title="obj.label">
                      <el-select v-model="obj.currentPayload.value" placeholder="请选择" @change="asyncValue">
                        <el-option v-for="item in obj.currentPayload.valueOptions" :key="item.label" :label="item.label" :value="item.value||item.label" />
                      </el-select>
                    </el-form-item>
                  </template>
                </div>
                <div v-if="obj.show" class="floatlayer">
                  <el-select v-model="obj.label" :title="obj.label" filterable placeholder="请选择标签" popper-class="tabselectcss" @change="changeItemCS({index, ind, label:$event})">
                    <el-option-group :label="obj.parentLabel+'('+item.childrenSource.length+')'">
                      <el-option v-for="(itemCS, key) in filterValid({childrenSource:item.childrenSource, index, ind})" :key="key" :label="itemCS.label" :value="itemCS.label" />
                    </el-option-group>
                  </el-select>
                </div>
                <i class="el-icon-close btnClose" @click="delItemForTab({index, ind})" />
              </div>
              <div class="item-button">
                <el-form-item v-if="item.validNum > 0">
                  <el-button icon="el-icon-plus" size="medium" plain @click="createItemForTab(index)">筛选条件</el-button>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div v-if="filterSelected(tabForForm).length > 0 && selected.show" class="search-selected clearfix">
          <div class="search-selectedLabel">已选条件：</div>
          <div class="search-selectedBox">
            <div class="search-sc clearfix">
              <el-tag v-for="(item, index) in filterSelected(tabForForm)" :key="index" class="sc-tag" type="info" closable @close="delItemForTab({index:item.index, ind:item.ind})">{{ item.label }}：{{ fmtValue(item.value) }}</el-tag>
              <el-button size="medium" plain @click="clearItemForTab">清空所选</el-button>
              <el-button size="medium" plain @click="openDialogSaveTab">保存常用</el-button>
            </div>
          </div>
          <div class="search-selectedLabelName" />
        </div>
        <div class="ss-container">
          <div class="ss-box" @click="selected.show = !selected.show">
            <i :class="selected.show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </div>
        </div>
        <div class="rightContainer">
          <div class="rightBox" :style="{'right':template.show ? '210px' : '20px'}">
            <div class="rightBoxLabel" @click="template.show = !template.show">
              常<br>
              用<br>
              筛<br>
              选<br>
              <i :class="template.show ? 'el-icon-arrow-right' : 'el-icon-arrow-left'" />
            </div>
            <div class="rightBoxContent">
              <div class="rbc-title">
                常用筛选数量 0/0
              </div>
              <div class="rbc-content">
                <div v-for="(item, index) in template.list" :key="index" class="rbc-row">
                  <span @click="showSearchTemplate(item)">{{ item.name }}</span>
                  <el-popconfirm title="确定删除吗？" @onConfirm="delSearchTemplate(item)">
                    <i slot="reference" class="el-icon-close" />
                  </el-popconfirm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>

    <el-dialog title="保存筛选" :visible.sync="dialog.visible" width="500px" :before-close="closeDialog">
      <el-form ref="dialog" :model="dialog" :rules="dialog.rules">
        <el-form-item label-width="120px" label="" prop="radioValue">
          <el-radio-group v-model="dialog.radioValue">
            <el-radio v-for="(item, index) in dialog.radioOptions" :key="index" :label="item.label" :value="item.label" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="筛选条件名称" class="dialogTempName" prop="templateName">
          <el-input v-model="dialog.templateName" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeDialog">取 消</el-button>
        <el-button type="primary" size="medium" @click="closeDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import search from './search.js'

export default {
  mixins: [search]
}
</script>

<style lang="scss" scoped>
@import './search.scss';
</style>
