<template>
  <div class="form-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true" label-width="80px">


          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="searchForm.goodsName" placeholder="请输入商品名称" @input="goodsName_input" />
          </el-form-item>

          <el-form-item label="商品编号" prop="goodsCodes">
            <el-input v-model="searchForm.goodsCodes" placeholder="请输入商品编号" @input="goodsCodes_input" />
          </el-form-item>

          <el-form-item label="产品类别" prop="productCategory">
            <el-cascader
              placeholder="请选择产品类别"
              v-model="searchForm.productCategory"
              :options="formatProductClass(queryProductClass.data)"
              :props="{ multiple: true, checkStrictly: true }"
              clearable></el-cascader>
          </el-form-item>

          <el-form-item label="规格" prop="specs">
            <el-input v-model.number="searchForm.specs" class="widthcss2" @input="specs_input" />
            <el-select v-model="searchForm.unit" class="widthcss2">
              <el-option
                v-for="item in unitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="关联活动" prop="activity">
            <el-autocomplete
              ref="activity"
              v-model="searchForm.activity"
              popper-class="my-autocomplete-multiple"
              :fetch-suggestions="querySearch_activity"
              placeholder="请输入关联活动"
              :clearable="true"
              @select="handleSelect_activity"
              @blur="handleBlur_activity"
              @clear="handleBlur_activity"
              :debounce="1000"
            >
              <i
                slot="suffix"
                class="el-icon-caret-bottom el-input__icon"
                @click="handleIconClick_activity"
              />
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
            <el-button @click="onReset('searchForm')">重置</el-button>
          </el-form-item>
        
    </el-form>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // 规格单位
      unitOptions: [
        {
          value: 'Y',
          label: '年'
        },
        {
          value: 'M',
          label: '月'
        },
        {
          value: 'D',
          label: '日'
        },
        {
          value: 'C',
          label: '次'
        }
      ],
      // 表单
      searchForm: {
        // 商品名称
        goodsName: '',
        // 商品编号
        goodsCodes: '',
        // 产品类别
        productCategory: '',
        // 规格
        specs: '',
        // 规格单位
        unit: 'Y',
        // 【关联活动】下拉菜单，列表，当前所选
        activity: '', // 所选的关联活动，对应的name
        promotionCode: '' // 所选的关联活动，对应的code
      }
    }
  },
  computed: {
    ...mapState({
      // 查询所有产品类别
      queryProductClass: state => state.promotion.queryProductClass,
      // 获取所有关联活动
      queryAllAgentPromotion: state => state.promotion.queryAllAgentPromotion
    }),
    formatProductClass() {
      return data => {
        const class1 = {}
        data.forEach(item => {
          const name = item.oneProductClassCode + '||' + item.oneProductClassName
          if (!class1[name]) {
            class1[name] = []
          }
          class1[name].push(item)
        })
        const result = Object.entries(class1).map(item => {
          const one = item[0].split('||')
          return {
            value: one[0],
            label: one[1],
            children: item[1].map(obj => ({
              value: obj.twoProductClassCode,
              label: obj.twoProductClassName
            }))
          }
        })
        return result
      }
    }
  },
  created() {
    // 查询所有产品类别
    this.$store.dispatch('promotion/queryProductClass', {})
    // 获取所有关联活动
    //this.$store.dispatch('promotion/queryAllAgentPromotion', {})
  },
  methods: {
    specs_input(v) {
      if (Number(v) !== parseFloat(v)) {
        this.searchForm.specs = ''
      }
      if (this.searchForm.specs > 2147483647) {
        this.searchForm.specs = 2147483647
      }
    },
    goodsCodes_input(v) {
      if (this.searchForm.goodsCodes.length > 20) {
        this.searchForm.goodsCodes = this.searchForm.goodsCodes.substring(0, 20)
      }
    },
    goodsName_input(v) {
      if (this.searchForm.goodsName.length > 200) {
        this.searchForm.goodsName = this.searchForm.goodsName.substring(0, 200)
      }
    },
    // 关联活动，（返回建议内容）
    // 关联活动，（返回建议内容）
    querySearch_activity(qs, cb) {
      var results
      if (qs) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          //console.log('fetch')
          // 获取输入的对应的关联活动
          this.$store.dispatch('promotion/queryAllAgentPromotion', {promotionName: qs}).then(res => {
            //console.log('res=', this.queryAllAgentPromotion)
            results = this.queryAllAgentPromotion.data.list.map((item) => ({
              value: item.promotionName,
              code: item.promotionCode
            }))
            // 调用 callback 返回建议列表的数据
            cb(results)
          }).catch(() => {
            console.error('queryAllAgentPromotion接口错误')
          })
        }, 500)
      } else {
        results = []
        cb(results)
      }
    },  
    /*
    querySearch_activity(qs, cb) {
      var results
      // console.log('this.queryAllAgentPromotion=', this.queryAllAgentPromotion)
      if (qs === '') {
        results = this.queryAllAgentPromotion.data.map((item) => ({
          value: item.promotionName,
          code: item.promotionCode
        }))
      } else {
        results = this.queryAllAgentPromotion.data.filter((item) => item.promotionName.indexOf(qs) > -1).map((item) => ({
          value: item.promotionName,
          code: item.promotionCode
        }))
      }
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    */
    // 关联活动
    handleBlur_activity() {
      const activity = this.searchForm.activity
      const queryAllAgentPromotionData = this.queryAllAgentPromotion.data.list
      // console.log('activity = ', activity)
      // console.log('queryAllAgentPromotionData = ', queryAllAgentPromotionData)
      const ind = queryAllAgentPromotionData.findIndex(item => item.promotionName === activity)
      // console.log('ind = ', ind)
      if (ind === -1) {
        this.searchForm.activity = ''
        this.searchForm.promotionCode = ''
      } else {
        // console.log('queryAllAgentPromotionData[ind] = ', queryAllAgentPromotionData[ind])
        this.searchForm.activity = queryAllAgentPromotionData[ind].promotionName
        this.searchForm.promotionCode = queryAllAgentPromotionData[ind].promotionCode
      }
    },
    // 选择 关联活动 下拉菜单建议项时
    handleSelect_activity(row) {
      // console.log('handleSelect, ', row)
      // 得到所选关联活动的code
      this.searchForm.promotionCode = row.code
    },
    // 点击 关联活动 下拉菜单，icon图标时
    handleIconClick_activity() {
      this.$refs.activity.focus()
    },
    onReset(formName) {
      clearFormData(this.searchForm)
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate(formName)
    },
    // 点击【查询】
    onSearch() {
      // console.log('submit searchForm=', this.searchForm)
      if (Number(this.searchForm.specs) !== parseFloat(this.searchForm.specs)) {
        this.searchForm.specs = ''
      }
      if (this.searchForm.specs > 2147483647) {
        this.searchForm.specs = 2147483647
      }
      
      if (this.searchForm.goodsCodes.length > 20) {
        this.searchForm.goodsCodes = this.searchForm.goodsCodes.substring(0, 20)
      }
      if (this.searchForm.goodsName.length > 200) {
        this.searchForm.goodsName = this.searchForm.goodsName.substring(0, 200)
      }

      // 将查询条件保存到store中
      const payload = {
        promotionCode: this.searchForm.promotionCode, // 关联活动code
        timeAmount: this.searchForm.specs, // 规格
        timeUnit: this.searchForm.unit, // 规格单位
        //productClassCode: this.searchForm.productCategory, // 产品类别  二级产品分类code
        goodsName: this.searchForm.goodsName, // 商品名称
        goodsCodes: this.searchForm.goodsCodes, // 商品编号
      }
      // 识别产品目录
      const prodCate = []
      //console.log('this.searchForm.productCategory=', this.searchForm.productCategory)
      if (this.searchForm.productCategory) {
        this.searchForm.productCategory.forEach(item => {
          if (item.length === 1) {
            // 一级目录（如果仅有一级目录，那么取出该一级目录的所有二级目录）
            //console.log(item[0])
            const resultArr = this.formatProductClass(this.queryProductClass.data).filter(itemObj => itemObj.value === item[0])
            if (resultArr.length > 0) {
              resultArr[0].children.forEach(itemObj2 => {
                prodCate.push(itemObj2.value)
              })
            } else {
              console.log('在', this.queryProductClass.data, '中没有查询到', item[0])
            }
          } else if (item.length === 2) {
            // 二级目录
            prodCate.push(item[1])
          }
        })
        //console.log(payload)
        payload.productClassCode = prodCate.join(',')
        //console.log('prodCate=', prodCate)
      }
      this.$store.dispatch('promotion/commodityQueryWhere', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-autocomplete,
.my-autocomplete-multiple {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.el-autocomplete /deep/ input[popperclass="my-autocomplete-multiple"] {
  width: 350px !important;
}

.widthcss{
  width: 100px !important;
}
.widthcss2{
  width: 70px !important;
}
</style>
