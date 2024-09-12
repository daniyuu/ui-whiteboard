<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="ai-text-node" :style="data.disabled ? 'filter: saturate(0%); opacity:0.6' : ''">
    <div class="card-body">
      <div class="options">
        <span>Disable</span> <a-switch size="small" v-model:checked="data.disabled" />
      </div>
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
        disabled: false,
      }
    }
  }
})
const themeColor = computed(() => {
  return props.data.themeColor || "#477ef5"
})

</script>
<style scoped lang="less">
.options {
  position: absolute;
  top: 6px;
  right: -100px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  transition: ease-in-out 0.3s;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 12px;
  background-color: rgb(201, 241, 241);
  padding: 4px;
  border-radius: 16px 0px 0px 16px;
  z-index: 10;
}

.ai-text-node:hover .options {
  right: 0px;
}

// .ai-text-node::after,
// .ai-text-node::before {
// content: " ";
// width: 10px;
// height: 10px;
// position: absolute;
// border: 0px solid #fff;
// transition: all 1s;
// opacity: 0;
// }

// .ai-text-node::after {
// top: -3px;
// left: -3px;
// border-top: 4px solid v-bind(themeColor);
// border-left: 4px solid v-bind(themeColor);
// }

// .ai-text-node::before {
// bottom: 1px;
// right: -2px;
// border-bottom: 4px solid v-bind(themeColor);
// border-right: 4px solid v-bind(themeColor);
// }

// .ai-text-node:hover {
// border-top-right-radius: 0px;
// border-bottom-left-radius: 0px;
// }

// .ai-text-node:hover::before,
// .ai-text-node:hover::after {
// width: calc(100% + 4px);
// opacity: 1;
// height: calc(100% + 4px);
// }
.ai-text-node {

  border: 2px solid;
  border-color: v-bind(themeColor);
  border-radius: 8px;
  overflow: hidden;
  padding: 0px;
  min-width: 100px;
  max-width: 360px;
  background: #fff;

  .card-body {
    padding: 16px 12px;
    cursor: pointer;
    position: relative;
    padding: 10px 20px;
    background: white;
    overflow: hidden;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    transition: all 1s;
  }



  box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, 0.1);
}
</style>
