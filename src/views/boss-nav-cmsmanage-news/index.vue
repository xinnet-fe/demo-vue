<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部" name="directly">
        <content-component msg="both" />
      </el-tab-pane>
      <!-- <el-tab-pane label="未审核" name="v-directive">
        <content-component msg="unreviewed" />
      </el-tab-pane>
      <el-tab-pane label="已发布" name="v-directives">
        <content-component msg="unpublished" />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/demos/clipboard' // use clipboard directly
import clipboard from '@/directive/demos/clipboard/index.js' // use clipboard by v-directive
import ContentComponent from './demo.vue'

export default {
  name: 'ClipboardDemo',
  components: {
    ContentComponent
  },
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

