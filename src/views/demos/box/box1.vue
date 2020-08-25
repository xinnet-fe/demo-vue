<template>
  <div class="demo-container">
    <Box type="1">
      <div slot="tit-left">主体内容-文本</div>
      <div slot="tit-right">右侧文本</div>
      <div slot="cont">该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的：</div>
    </Box>

    <Box type="1">
      <div slot="tit-left">主体内容-表格</div>
      <div slot="tit-right">右侧文本</div>
      <div slot="cont">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="150"
          />
          <el-table-column label="配送信息">
            <el-table-column
              prop="name"
              label="姓名"
              width="120"
            />
            <el-table-column label="地址">
              <el-table-column
                prop="province"
                label="省份"
                width="120"
              />
              <el-table-column
                prop="city"
                label="市区"
                width="120"
              />
              <el-table-column
                prop="address"
                label="地址"
                width="300"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
              <el-table-column
                prop="zip"
                label="邮编"
                width="120"
              />
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </Box>

    <Box type="1">
      <div slot="tit-left">主体内容-表格</div>
      <div slot="tit-right">右侧文本</div>
      <div slot="cont">
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
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button size="medium">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/Box'
export default {
  components: {
    Box
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      form: {
        value: [],
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
      disabled: false
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.box-container{
  border-bottom: 20px solid #f3f7fa;
}
</style>
