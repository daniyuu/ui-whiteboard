<template>
  <div class="main-wrapper">
    <flowViewer></flowViewer>
    <div class="operation-layer">
      <div class="left-panel" ref="panel">
        <div class="left-panel-header">
          <div class="left-panel-title">Toolbox</div>
          <i class="bi bi-x close-btn" @click="handleClosePanel"></i>
        </div>
        <div class="left-panel-body">
          <div class="node-area">
            <div class="drag-item" draggable="true" @dragstart="onDragStart($event, 'bilibili-video')">card</div>
            <div class="drag-item" draggable="true" @dragstart="onDragStart($event, 'text', { content: 'hello word' })">text
            </div>
          </div>
          <a-button type="default" class="regenerate-btn" @click="handleRegenerate">Regenerate</a-button>
        </div>
      </div>
      <div class="right-side">
        <div class="fixed-bar side-bar">
          <div class="operation-action-item card-button" @click="handelShowPanel">
            <img src="/img/card.svg" width="24">
          </div>
          <div class="operation-action-item save-btb" @click="handleSave">
            <i class="bi bi-save"></i>
          </div>
          <div class="operation-action-item"></div>
        </div>
        <div class="fixed-bar title-bar">
          <div @click="handleJumpToHome" class=" action-item return-home">
            <i class="bi bi-caret-left"></i>
          </div>
          <a-divider type="vertical" style="height: 32px;"></a-divider>
          <div class="title">
            <span>{{ title }}</span>
          </div>
          <div class=" action-item edit-btn">
            <i class="bi bi-pencil"></i>
          </div>
          <a-divider type="vertical" style="height: 32px;"></a-divider>
          <div class=" action-item shot-btn" @click="handleScreenShot">
            <i class="bi bi-camera"></i>
          </div>
        </div>
        <div class="fixed-bar zoom-bar"></div>

      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import flowViewer from '../components/FlowViewer.vue'
import { useRouter, useRoute } from 'vue-router';
import { useFlowStore } from '../store/flowStore';
import { useScreenshot } from "../components/useScreenShot"
import { useVueFlow } from '@vue-flow/core';
import useDragAndDrop from '../components/useDargAndDrop'

const route = useRoute()
const { onDragStart } = useDragAndDrop()

const { vueFlowRef } = useVueFlow();
const flowStore = useFlowStore()
flowStore.setId(route.params.id)
flowStore.getFlow()

const { capture } = useScreenshot()

const router = useRouter()
const handleJumpToHome = () => {
  router.push('/')
}
const panel = ref(null)
onMounted(() => {
  setPanel(showPanel.value)
})

const handleSave = async () => {
  const data = await capture(vueFlowRef.value, { shouldDownload: false });
  flowStore.saveFlow(data)
}


const title = ref('Flow Viewer Flow Viewer Flow Viewer')

const showPanel = ref(true)
const handleClosePanel = () => {
  showPanel.value = false
}
const handelShowPanel = () => {
  showPanel.value = !showPanel.value
}
const handleScreenShot = () => {
  if (!vueFlowRef.value) {
    console.warn('VueFlow element not found');
    return;
  }

  capture(vueFlowRef.value, { shouldDownload: true });
}
const loadingGenerate = ref(false)
const handleRegenerate = async () => {
  loadingGenerate.value = true
  await flowStore.regenerate()
  loadingGenerate.value = false
}

function setPanel(open) {
  if (open) {
    if (document.body.clientWidth > 768) {
      panel.value.style.width = '16%'
    }
    else {
      panel.value.style.width = '200px'
    }
  }
  else {
    panel.value.style.width = '0px'
  }
}
watch(() => showPanel.value, (newVal) => {
  setPanel(newVal)
})
</script>
<style lang="less" scoped>
.main-wrapper {
  height: 100%;
  width: 100%;

  .operation-layer {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 100%;
    width: 100%;
    pointer-events: none;

    .left-panel {
      width: 0px;
      pointer-events: all;
      height: 100%;
      overflow: hidden;
      transition: ease-in-out 0.4s;
      background-color: #fff;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

      .left-panel-header {
        height: 64px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);


        .close-btn {
          margin-right: 8px;
          cursor: pointer;
          font-size: 24px;
        }

        .left-panel-title {
          margin-left: 16px;
          font-size: 20px;
        }

      }

      .left-panel-body {
        height: calc(100% - 64px);
        overflow: auto;
        padding: 8px;
        position: relative;

        .node-area {
          .drag-item {
            width: 100%;
            height: 48px;
            background-color: #e9e9e9;
            margin-bottom: 8px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .regenerate-btn {
          width: calc(100% - 16px);
          height: 48px;
          position: absolute;
          bottom: 0;
          background-color: #013979;
          color: #fff;
          margin-bottom: 8px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .right-side {
      flex: 1;
      position: relative;

      .fixed-bar {
        pointer-events: all;
        position: absolute;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
      }

      .side-bar {
        width: 48px;
        height: 60%;
        top: 50%;
        left: 32px;
        align-items: center;
        transform: translateY(-50%);
        max-height: 500px;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        .operation-action-item {
          width: 32px;
          height: 32px;
          display: flex;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          margin: 6px 0px;

          &:last-child {
            border-bottom: none;
          }
        }

        .operation-action-item:hover {
          background: #f0f0f0;
        }

        .card-button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 6px;
        }
      }

      .title-bar {
        height: 48px;
        top: 20px;
        padding: 4px;
        display: flex;
        left: 48px;
        align-items: center;
        background-color: #fff;

        .return-home {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;

        }

        .action-item {
          width: 32px;
          border-radius: 4px;
          margin-left: 4px;

        }

        .shot-btn {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shot-btn:hover {
          background: #f0f0f0;
        }


        .edit-btn {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .edit-btn:hover {
          background: #f0f0f0;
        }

        .return-home:hover {
          background: #f0f0f0;
        }
      }
    }
  }

}
</style>