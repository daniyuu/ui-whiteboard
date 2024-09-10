<template>
  <div class="human-text-node">
    <div class="card-title">{{ data.title }}</div>
    <div class="card-body">
      <MakedownViewer :text="data.content"></MakedownViewer>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import MakedownViewer
  from './MakedownViewer.vue';
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
      }
    }
  }
})
const themeColor = computed(() => {
  return props.data.themeColor || "#477ef5"
})

</script>
<style scoped lang="less">
.human-text-node {
  border: 1px solid v-bind(themeColor);
  border-radius: 4px;
  overflow: hidden;
  padding: 0px;
  min-width: 100px;
  max-width: 360px;
  background: #fff;
  min-height: 60px;

  .card-title {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    padding: 0 4px 0 4px;
    background: v-bind(themeColor);
    height: 32px;
    line-height: 32px;
  }

  .card-body {
    padding: 0px 12px;
  }

  box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
}
</style>