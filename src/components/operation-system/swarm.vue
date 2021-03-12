<template>
  <div class="swarm">
    <div class="top-container">
      <div class="tc-row0">客户分群管理</div>
      <div class="tc-row1 clearfix">
        <div class="tcr-left">
          <el-tabs v-model="tcrl.activeName" @tab-click="tcrl_tab">
            <el-tab-pane v-for="(item, index) in tcrl.options" :key="index" :label="item.label" :name="item.valKey">
              <div class="tcrl-box">
                <div v-for="(obj, ind) in tcrl[item.valKey]" :key="ind" class="tcrlb-row">
                  <span @click="showTemplateDetail(obj)">{{ obj.templateName }}</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="tcr-right">
          <TemplateForm ref="tempform1" />
        </div>
      </div>
      <div class="tc-row2">
        <el-button size="medium" plain @click="search">查询</el-button>
        <el-button size="medium" plain @click="openDialog">保存为模板</el-button>
        <el-button size="medium" plain @click="clear">清空所选</el-button>
      </div>
      <div class="tc-row3">
        <div class="ss-box" @click="bottomTools.show = !bottomTools.show">
          <i :class="bottomTools.show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
        </div>
      </div>
    </div>

    <el-dialog title="保存模板" :visible.sync="dialog.visible" width="500px" :before-close="closeDialog">
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
import swarm from './swarm.js'
import TemplateForm from './form.vue'

export default {
  components: {
    TemplateForm
  },
  mixins: [swarm]
}
</script>

<style lang="scss" scoped>
@import './swarm.scss';
</style>

