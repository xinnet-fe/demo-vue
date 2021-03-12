<template>
  <div>
    <div class="form" ref="formTable">
      <table>
        <tr :class="onceCss">
          <td class="td3">
            符合以下
            <el-select v-model="form.ac">
              <el-option v-for="(item, index) in selectOptions" :key="index" :label="item.label" :value="item.label" />
            </el-select>
            <div class="line3" />
          </td>
          <td>
            <table class="table1">
              <template v-for="(item, index) in form.list">
                <tr v-if="!item.ac" :key="'a'+index" :class="(form.list.length===1 && onlyread) ? 'once2' : ''">
                  <td class="td1">
                    <div class="line" />
                    <div class="line2" />
                    <div class="inpkey" @click.stop="stopPropagation($event)">
                      <el-input v-model="item.label" @focus="showPlane({item, index})" />
                      <items :item="item" />
                      <i class="el-icon-close btnclose" @click="delItem({item, index})" />
                      <div v-show="item.showPlane" class="planeDiv"><plane /></div>
                    </div>
                  </td>
                </tr>
                <tr v-else :key="'b'+index">
                  <td class="td1">
                    <div class="line" />
                    <div class="line2" />
                    <!---->
                    <table>
                      <tr>
                        <td class="td2">
                          符合以下
                          <el-select v-model="item.ac">
                            <el-option v-for="(item, index) in selectOptions" :key="index" :label="item.label" :value="item.label" />
                          </el-select>
                          <div class="line3" />
                        </td>
                        <td>
                          <table class="table1">
                            <tr v-for="(item2, index2) in item.list" :key="index2" :class="(item.list.length===1 && onlyread) ? 'once2' : ''">
                              <td class="td1">
                                <div class="line" />
                                <div class="line2" />
                                <div class="inpkey" @click.stop="stopPropagation($event)">
                                  <el-input v-model="item2.label" @focus="showPlane({item, index, item2, index2})" />
                                  <items :item="item2" />
                                  <i class="el-icon-close btnclose" @click="delItem({item, index, item2, index2})" />
                                  <div v-show="item2.showPlane" class="planeDiv"><plane /></div>
                                </div>
                              </td>
                            </tr>
                            <tr v-if="!onlyread">
                              <td class="td1">
                                <div class="line" />
                                <div class="line2" />
                                <div class="btns">
                                  <el-button @click="addItem2(index)">添加条件</el-button>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!---->
                  </td>
                </tr>
              </template>
              <tr :class="onceCss" v-if="!onlyread">
                <td class="td1">
                  <div class="line" />
                  <div class="line2" />
                  <div class="btns">
                    <el-button @click="addItem">添加条件</el-button>
                    <el-button @click="addGroup">添加条件组</el-button>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div v-if="onlyread" class="onlyreadLayer" :style="orlStyle"></div>
    </div>
  </div>
</template>

<script>
import form from './form.js'
import plane from './plane.vue'
import items from './items.vue'

export default {
  components: {
    plane,
    items
  },
  mixins: [form]
}
</script>

<style lang="scss" scoped>
@import './form.scss';
</style>

