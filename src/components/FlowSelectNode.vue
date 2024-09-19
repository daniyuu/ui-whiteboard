<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="form-node card-wrapper">
    <div class="card-body">
      <div>
        {{ data.question }}
      </div>
      <a-select class="input" mode="tags" placeholder="Please Select Value" style="width: 100%;"
        v-model:value="data.answer" :options="options" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import './card-style.less'

import _ from 'lodash'
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  }
})
const themeColor = computed(() => {
  return props.data.themeColor || "#FFBF78"
})

const options = computed(() => {
  return _.map(_.get(props.data, 'options', []), (item) => {
    return {
      label: item,
      value: item
    }
  })
})
</script>

<style scoped lang="less">
.form-node {
  background-color: #fff;
  border-left: 4px solid v-bind(themeColor);
  border-radius: 4px;
  width: 320px;

  .card-title {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 0 4px 0 4px;
    background: v-bind(themeColor);
    height: 24px;
    line-height: 24px;
  }

  .card-body {
    padding: 12px;

    .input {
      border: none;
      box-shadow: none;
      border-bottom: 1px solid #e8e8e8;

      :deep(.ant-select-selector) {
        border: none;
      }
    }
  }

  box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
}
</style>