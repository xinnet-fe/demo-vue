<template>
  <div class="demo-container" style="padding: 20px;">
    <el-divider content-position="left">典型表单</el-divider>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文本框">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="下拉选择">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="级联">
        <el-cascader
          v-model="form.value"
          :options="form.options"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="计数器">
        <el-input-number v-model="form.num" :min="1" :max="10" label="描述文字" @change="handleChange" />
      </el-form-item>
      <el-form-item label="时间">
        <el-time-select
          v-model="form.time"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="任意时间范围">
        <el-time-picker
          v-model="form.value2"
          is-range
          arrow-control
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        />
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.value3"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="选择日期范围">
        <el-date-picker
          v-model="form.value3"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="评分">
        <el-rate v-model="form.value" />
      </el-form-item>
      <el-form-item label="开关">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="checkbox多选">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type" />
          <el-checkbox label="地推活动" name="type" />
          <el-checkbox label="线下主题活动" name="type" />
          <el-checkbox label="单纯品牌曝光" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="radio单选">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助" />
          <el-radio label="线下场地免费" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="文本域">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="文本编辑器">
        <editor
          id="editor_id"
          height="500px"
          width="500px"
          plugins-path="/static/kindeditor/plugins/"
          upload-json="/order/upload/"
          :items="editorItems"
          :content="form.text"
          :load-style-mode="false"
          @on-content-change="handleContentChange"
        />
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button size="medium">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        value: 0,
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value3: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        text: '',
        num: 1,
        time: '',
        startTime: '',
        endTime: '',
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      editorItems: [
        'source', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'pagebreak', 'anchor', 'link', 'unlink'
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleChange() {},
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    handleContentChange(val) {
      this.editorText = val
    }
  }
}
</script>
<style scoped>
</style>
