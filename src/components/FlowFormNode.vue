<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="form-node card-wrapper">
    <div class="card-body">
      <div>{{ data.question }}</div>
      <a-input class="input" placeholder="Please Input" style="width:100%" v-model:value="data.answer" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import './card-style.less'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  }
})

const themeColor = computed(() => {
  return props.data.themeColor || "#FF7D29"
})
</script>

<style scoped lang="less">
.form-node {
  border-left: 4px solid v-bind(themeColor);
  width: 320px;
  background: #fff;

  .card-body {
    padding: 12px;

    .input {
      border: none;
      border-bottom: 1px solid #e8e8e8;
    }
  }

  box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
}
</style>