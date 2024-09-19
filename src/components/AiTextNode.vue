<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="ai-text-node card-wrapper" :class="compact ? 'compact-card' : ''"
    :style="data.disabled ? 'filter: saturate(0%); opacity:0.6' : ''">
    <div class="transition-layer transition-bg " v-if="!compact"></div>
    <div class="card-body"
      :style="compact ? 'max-height:400px; width:400px; transform: scale(0.8);  transform-origin:0 0;' : ''">
      <div class="options" v-if="!compact">
        <span>Disable</span> <a-switch size="small" v-model:checked="data.disabled" />
      </div>
      <MarkdownViewer :text="data.content">
      </MarkdownViewer>
    </div>
    <div class="mask" v-if="compact"></div>
  </div>
</template>
<script setup>
import MarkdownViewer
  from './MarkdownViewer.vue';
import './card-style.less'
defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default() {
      return {
        disabled: false,
      }
    }
  }
})

</script>
<style scoped lang="less">
.transition-layer {
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-radius: 50%;
  width: 0px;
  height: 0px;
  transform: translate(50%, 50%);
  transition: ease-in-out 0.3s;

}

.ai-text-node:hover .transition-layer {
  height: 285%;
  width: 285%;
}

.transition-bg {
  background: linear-gradient(90deg, #fffbf4, #f8e1ed, #f8faf0);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.transition-filter {}


.mask {
  position: absolute;
  bottom: 0px;
  height: 20px;
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.486) 0%, rgba(255, 255, 255, 1) 70%);
}

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

.ai-text-node {
  // border: 2px solid;
  // border-color: v-bind(themeColor);
  overflow: hidden;
  padding: 0px;
  min-width: 100px;
  max-width: 600px;
  background: #fff;
  position: relative;

  .card-body {
    padding: 16px;
    margin-top: 12px;
    cursor: pointer;
    position: relative;
    // background: white;
    overflow: hidden;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    transition: all 1s;
  }



  box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, 0.1);
}

.compact-card {
  height: 300px;
}
</style>
