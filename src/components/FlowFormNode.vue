<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="form-node">
    <div class="card-title"></div>
    <div class="card-body">
      <div>{{ data.question }}</div>
      <a-input class="input" style="width:100%" v-model:value="data.answer" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  }
})

const themeColor = computed(() => {
  return props.data.themeColor || "rgb(220, 250, 240)"
})
</script>

<style scoped lang="less">
.form-node {
  background-color: #fff;
  border: 1px solid v-bind(themeColor);
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
      border-bottom: 1px solid #e8e8e8;
    }
  }

  box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
}
</style>