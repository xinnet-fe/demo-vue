<template>
  <div class="market-form">
    <!-- search -->
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="渠道编号" prop="agentCode">
        <el-input v-model="searchForm.agentCode" />
      </el-form-item>
      <el-form-item label="截止时间" prop="time">
        <el-date-picker v-model="searchForm.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch('searchForm')">搜 索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset('searchForm')">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- button -->
    <div>
      <el-button :loading="loading" size="mini" type="primary" icon="el-icon-edit" @click="showModal">添加促销</el-button>
    </div>
    <!-- button -->

    <!-- table -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      highlight-current-row
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        prop="agentCode"
        label="渠道编号"
      />
      <el-table-column
        prop="startTime"
        label="起始时间"
      />
      <el-table-column
        prop="endTime"
        label="截止时间"
      />
      <el-table-column
        prop="createPerson"
        label="创建人"
      />
      <el-table-column
        prop="modifyTime"
        label="更新时间"
      />
      <el-table-column
        label="操作"
        fixed="right"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="showModal(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            @click="showModalGoods(scope.row)"
          >促销商品</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      :page-sizes.sync="page.pageSizes"
      @pagination="getList"
    />
    <!-- table -->

    <!-- form 添加促销 -->
    <el-dialog :before-close="beforeClose" destroy-on-close :title="dialogTitle" :visible.sync="formVisible">
      <el-form ref="form" :model="form" label-width="100px" :rules="formRules">
        <el-form-item label="代理商编号" prop="agentCode">
          <el-col>
            <el-input v-model="form.agentCode" :disabled="agentCode_disabled" style="width:350px" @blur="agentCode_blur" />
            <span :class="tip_css">{{ agentCode_tip }}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="设置有效期" prop="time">
          <el-col>
            <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="time_change" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal('form')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- form -->

    <!-- goods -->
    <el-dialog :before-close="beforeCloseGoods" destroy-on-close title="修改商品价格" :visible.sync="goodsVisible">
      <!-- 子窗口：选择商品 -->
      <el-dialog
        :before-close="beforeCloseGoodsInner"
        destroy-on-close
        title="选择商品"
        :visible.sync="goodsVisibleInner"
        append-to-body
      >
        <!-- searchFormGoods -->
        <el-form ref="searchFormGoods" :model="searchFormGoods" :inline="true">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="searchFormGoods.goodsName" />
          </el-form-item>

          <el-form-item label="商品编码" prop="goodsCode">
            <el-input v-model="searchFormGoods.goodsCode" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearchGoods('searchFormGoods')">搜 索</el-button>
            <el-button @click="clearSearchGoods">清 空</el-button>
          </el-form-item>

        </el-form>
        <!-- searchFormGoods -->
        <!-- table -->
        <el-table
          ref="multipleTableGoods"
          v-loading="goodsLoading"
          highlight-current-row
          :data="goodsList.data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChangeGoods"
        >
          <el-table-column fixed type="selection" width="55" />
          <el-table-column
            prop="goodsCode"
            label="商品编码"
          />
          <el-table-column
            prop="goodsName"
            label="商品名称"
          />
          <el-table-column
            prop="timeAmount"
            label="时间数量"
          />
          <el-table-column label="时间单位">
            <template v-slot="scope">
              {{ scope.row.timeUnit | unit_format }}
            </template>
          </el-table-column>
        </el-table>
        <!-- table -->
        <!-- 底部按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onGoodsConfirm(true)">确 定</el-button>
          <el-button @click="onGoodsConfirm()">关 闭</el-button>
        </div>
        <!-- 底部按钮 -->
      </el-dialog>
      <!-- 子窗口：选择商品 -->

      <!-- button -->
      <div>
        <el-button size="mini" type="primary" icon="el-icon-success" @click="modifyGoodsPrice">确认</el-button>
        <el-button size="mini" type="primary" icon="el-icon-error" @click="closeGoods">关闭</el-button>
        <el-button size="mini" type="primary" icon="el-icon-circle-plus" @click="showGoodsList">增加商品</el-button>
      </div>
      <!-- button -->

      <!-- table -->
      <el-table
        highlight-current-row
        :data="marketGoodsList"
        tooltip-effect="dark"
        style="width: 150%"
      >
        <el-table-column prop="goodsCode" label="商品编码" />
        <el-table-column prop="goodsName" label="商品名称" />
        <el-table-column prop="timeAmount" label="时间数量" width="70" />
        <el-table-column label="时间单位" width="70">
          <template v-slot="scope">
            {{ scope.row.timeUnit | unit_format }}
          </template>
        </el-table-column>
        <el-table-column prop="limitPrice" label="最低限价" width="70" />
        <el-table-column label="促销价格" width="100">
          <template v-slot="scope">
            <el-input v-model.number="marketGoodsList[scope.$index].newValue" size="mini" :class="marketGoodsList[scope.$index].marketingPrice===marketGoodsList[scope.$index].newValue?'notChanged':'modified'" @blur="update_price(marketGoodsList[scope.$index])" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template v-slot="scope">
            <el-button
              size="mini"
              @click="delMarketingPrice(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table -->
    </el-dialog>
    <!-- goods -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import assign from 'lodash/assign'
// import reduce from 'lodash/reduce'
// import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import { mapState } from 'vuex'
import clearFormData from '@/utils/clearFormData'
import formatTime from '@/utils/formatTime'

export default {
  name: 'Market',
  components: {
    Pagination
  },
  filters: {
    unit_format(v) {
      return {
        Y: '年',
        M: '月',
        D: '日',
        C: '次'
      }[v]
    }
  },
  props: {},
  data() {
    return {
      agentCode_disabled: false,
      tip_css: 'fail',
      agentCode_tip: '',
      dialogTitle: '',
      updateId: null,
      formVisible: false,
      searchForm: {
        agentCode: '',
        time: ''
      },
      form: {
        agentCode: '',
        time: ''
      },
      formRules: {
        agentCode: [
          { required: true, message: '请输入代理商编号', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      // 促销商品浮层
      goodsVisible: false,
      // 促销商品 -> 添加商品 浮层
      goodsVisibleInner: false,
      // 促销商品 -> 搜索商品 & 选择商品
      searchFormGoods: {
        goodsName: '',
        goodsCode: ''
      },
      // 促销商品 -> 已选
      multipleSelectionGoods: [],
      // 当前所选的促销
      currentMarket: {}
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['market/getList'],
      list: state => state.market.list,
      page: state => state.market.page,

      addMarket: state => state.market.addMarket,
      updateMarket: state => state.market.updateMarket,
      checkAgentCode: state => state.market.checkAgentCode,
      modifyGoodsPriceRes: state => state.market.modifyGoodsPriceRes,
      delMarketingPriceRes: state => state.market.delMarketingPriceRes,

      goodsLoading: state => state.loading.effects['market/getGoodsList'],
      goodsList: state => state.market.goodsList, // 搜索某个商品时的列表（向促销活动中添加商品时，搜索出来的列表）
      marketGoodsList: state => state.market.marketGoodsList // 促销活动对应的商品列表
    })
  },
  created() {
    this.getList()
  },
  methods: {
    // 选择时间
    time_change(a) {
      // console.log(a)
    },
    // 修改商品价格，不能小于最低限价
    update_price(row) {
      if (row.limitPrice > row.newValue) {
        this.$alert('促销价格不能小于最低限价！', { callback: () => {} })
        row.newValue = row.marketingPrice
      }
    },
    // 添加促销，检查是否存在
    agentCode_blur() {
      if (this.form.agentCode === '') {
        this.agentCode_tip = ''
      } else {
        this.agentCode_tip = '正在检查..'
        this.$store.dispatch('market/checkAgentCode', {
          agentCode: this.form.agentCode
        }).then(_ => {
          this.tip_css = 'fail'
          if (this.checkAgentCode.code) {
            this.agentCode_tip = this.checkAgentCode.msg
          } else {
            if (this.checkAgentCode.data.isSuccess === '1') {
              this.agentCode_tip = '可用'
              this.tip_css = 'success'
            } else {
              this.agentCode_tip = '不能用'
            }
          }
        })
      }
    },
    getList(page) {
      const body = {
        ...this.searchForm
      }
      if (page) {
        assign(body, page)
      }
      if (body.time !== '' && body.time !== null) {
        body.queryStartTime = formatTime(new Date(body.time[0]).getTime())
        body.queryEndTime = formatTime(new Date(body.time[1]).getTime())
        delete body.time
      }
      body.page = this.page.page
      body.start = (this.page.page - 1) * this.page.limit
      body.limit = this.page.limit
      body.sort = this.page.sort
      this.$store.dispatch('market/getList', body)
    },
    onSearch(formName) {
      // 搜索时，切到第一页
      this.page.page = 1
      this.getList()
    },
    onReset(formName) {
      clearFormData(this.form)
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate(formName)
    },
    onSubmit(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let action
          const data = that.form
          if (that.updateId) {
            action = 'updateMarket'
            data.id = that.updateId
          } else {
            action = 'addMarket'
          }
          if (data.time !== '' && data.time !== null) {
            data.startTime = formatTime(new Date(data.time[0]).getTime())
            data.endTime = formatTime(new Date(data.time[1]).getTime())
            // delete data.time
          }
          // console.log('开始添加促销活动 data=', data)
          // 添加之前先检查代理商是否存在，如果不存在，就会直接报系统维护了
          that.$store.dispatch(`market/${action}`, data).then(() => {
            // console.log('that.addMarket = ', that.addMarket)
            // console.log('that.updateMarket = ', that.updateMarket)
            if (action === 'addMarket' && that.addMarket.code) {
              that.$alert(that.addMarket.msg, { callback: () => {} })
              return
            }
            if (action === 'updateMarket' && that.updateMarket.code) {
              that.$alert(that.updateMarket.msg, { callback: () => {} })
              return
            }

            that.$alert('操作成功', { callback: () => {} })
            that.closeModal()
            // 添加或修改促销完毕后，重新显示
            that.clearSearchFormData()
            // that.form.agentCode = ''
            // console.log('添加促销完毕后，重新显示 that.form=', that.form)
            // that.form.time = ''
            // that.page.page = 1
            that.getList()
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    showFormData(row) {
      forEach(this.form, (item, key) => {
        if (key === 'time') {
          this.form['time'] = [new Date(row.startTime), new Date(row.endTime)]
        } else if (row[key]) {
          this.form[key] = row[key]
        }
      })
    },
    clearFormData() {
      // console.log('currentMarket = ', this.currentMarket)
      forEach(this.form, (item, key) => (this.form[key] = ''))
    },
    clearSearchFormData() {
      forEach(this.searchForm, (item, key) => (this.form[key] = ''))
    },
    showModal(row) {
      this.formVisible = true
      if (row && row.id) {
        this.dialogTitle = '修改促销'
        this.updateId = row.id
        this.showFormData(row)
        this.agentCode_disabled = true
      } else {
        this.dialogTitle = '添加促销'
        this.updateId = null
        this.agentCode_disabled = false
      }
    },
    // 取消关闭
    closeModal() {
      this.agentCode_tip = ''
      this.formVisible = false
      this.resetModal('form')
    },
    resetModal(formName) {
      /*
      console.log('currentMarket = ', this.currentMarket)
      console.log('resetModal this.form= ', this.form)
      */
      this.agentCode_tip = ''
      // console.log('resetModal this.form= ', this.form)
      clearFormData(this.form)
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate(formName)
    },
    beforeClose(done) {
      this.resetModal('form')
      done()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 商品
    modifyGoodsPrice() {
      const requestJson = this.marketGoodsList.filter(item => item.marketingPrice !== item.newValue).map(item => ({
        'agentCode': this.currentMarket.agentCode,
        'priceCode': item.priceCode,
        'marketingPrice': item.newValue
      }))
      // 修改商品价格
      this.$store.dispatch('market/modifyGoodsPrice', {
        agentCode: this.currentMarket.agentCode,
        requestJson: JSON.stringify(requestJson)
      }).then(_ => {
        if (this.modifyGoodsPriceRes.code) {
          this.$alert(this.modifyGoodsPriceRes.msg, { callback: () => {} })
        } else {
          if (this.modifyGoodsPriceRes.data.isSuccess === '1') {
            this.$alert('操作成功', { callback: () => {} })
          } else {
            this.$alert('操作失败', { callback: () => {} })
          }
        }
      })
      // 关闭窗口
      this.closeGoods()
    },
    closeGoods() {
      this.goodsVisible = false
    },
    beforeCloseGoods(done) {
      done()
    },
    beforeCloseGoodsInner(done) {
      done()
      this.clearGoodsInner()
    },
    clearGoodsInner() {
      // console.log('清空')
      this.searchFormGoods.goodsName = ''
      this.searchFormGoods.goodsCode = ''
      this.$store.dispatch('market/getGoodsList_clear', {
        agentCode: '',
        goodsName: ''
      })
    },
    showModalGoods(row) {
      this.goodsVisible = true
      this.currentMarket = row
      this.$store.dispatch('market/getMarketingPrice', {
        agentCode: this.currentMarket.agentCode
      })
    },
    onSearchGoods(formName) {
      const { goodsCode, goodsName } = this.searchFormGoods
      const data = {
        agentCode: this.currentMarket.agentCode,
        goodsCode,
        goodsName
      }
      this.getGoodsList(data)
    },
    clearSearchGoods() {
      forEach(this.searchFormGoods, (item, key) => (this.searchFormGoods[key] = ''))
    },
    showGoodsList() {
      this.goodsVisibleInner = true
    },
    getGoodsList(data) {
      this.$store.dispatch('market/getGoodsList', data).then(_ => {
        if (this.goodsList.code) {
          this.$alert(this.goodsList.msg, { callback: () => {} })
        }
      })
    },
    onGoodsConfirm(bln = false) {
      // 向促销活动中添加商品
      this.goodsVisibleInner = false
      if (bln) {
        // bln=true时为添加；为false时为取消
        // console.log('this.multipleSelectionGoods = ', this.multipleSelectionGoods)
        const agentCode = this.currentMarket.agentCode
        const requestJson = this.multipleSelectionGoods.map(item => ({
          ...item,
          agentCode
        }))
        this.$store.dispatch('market/insertMarketingPrice', {
          agentCode,
          requestJson: JSON.stringify(requestJson)
        })
      }
      this.clearGoodsInner()
    },
    handleSelectionChangeGoods(val) {
      this.multipleSelectionGoods = val
    },
    // 删除商品
    delMarketingPrice(row) {
      row.agentCode = this.currentMarket.agentCode
      this.$store.dispatch('market/delMarketingPrice', row).then(_ => {
        if (this.delMarketingPriceRes.code) {
          this.$alert(this.delMarketingPriceRes.msg, { callback: () => {} })
        } else {
          if (this.delMarketingPriceRes.data.isSuccess === '1') {
            this.$alert('操作成功', { callback: () => {} })
            // console.log('row = ', row)
            this.$store.dispatch('market/getMarketingPrice', {
              agentCode: row.agentCode
            })
          } else {
            this.$alert('操作失败', { callback: () => {} })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.market-form {
  margin: 20px;
  overflow: hidden;
}
.notChanged{
  >>>input{
    border: 1px solid #DCDFE6;
  }
}
.modified{
  >>>input{
    color: black !important;
    border: 1px solid rgb(156, 166, 199);
  }
}
.fail{
  color: red;
}
.success{
  color: green;
}
</style>
