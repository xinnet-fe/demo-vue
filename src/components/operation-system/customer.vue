<template>
  <div class="customer">
    <div class="container clearfix">
      <div class="left">
        <div v-for="(obj, ind) in List" :key="ind" class="row">
          <span @click="showTemplateDetail(obj)">{{ obj.templateName }}</span>
        </div>
      </div>
      <div class="right">
        <TemplateForm ref="tempform1" />
      </div>
    </div>
  </div>
</template>

<script>
import customer from './customer.js'
import TemplateForm from './form.vue'

export default {
  components: {
    TemplateForm
  },
  mixins: [customer]
}
</script>

<style lang="scss" scoped>
@import './customer.scss';
</style>

