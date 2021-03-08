<template>
  <el-dialog
    title="同模板域名"
    :close-on-click-modal="false"
    :visible.sync="dialogTemplateDomain"
    width="800px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-row :gutter="20">
      <el-col v-for="(item, index) in row.list" :key="index" :span="6" style="margin-bottom: 20px"><div class="grid-content ">{{ item }}</div></el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogTemplateDomain',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        password: '',
        repassword: '',
        captcha: ''
      },
      loading: false
    }
  },
  computed: {
    dialogTemplateDomain: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-content {
  background: #e5e9f2;
  padding: 5px;
  height: 35px;
  overflow: hidden;
  font-size: 12px;
  line-height: 14px;
}
</style>
