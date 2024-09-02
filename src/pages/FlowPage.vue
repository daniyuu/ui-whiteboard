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
          <a-spin :spinning="loadingGenerate" style="width: 100%;"/>
          <div class="node-area" draggable="false">
            <div draggable="false"></div>
            <component style="box-shadow: none;" class="card-item" draggable="true" @dragstart="onDragStart($event, item.type, item.data)"
              v-for="item, index in recommendNodes" :key="index" :data="item.data" :is="item.type"></component>
          </div>
          <a-button :loading="loadingGenerate" type="default" class="regenerate-btn" @click="handleRegenerate">Regenerate</a-button>
        </div>
      </div>
      <div class="right-side">
        <div class="sticky-bar fixed-bar" :class="stickyPanelClose ? 'sticky-panel-close' : ''">
          <div class="sticky-tools--block">
            <div class="sticky-tools--head">Square (1:1)</div>
            <div class="sticky-tools--wrap">
              <div class="sticky-sqrt" draggable="true" @dragstart="onDragStart($event, 'sticky', {
                created_by: 'user',
                backgroundColor: item.background,
              })" v-for="item in stickySqrt" :style="`background: ${item.background}`"></div>
            </div>
          </div>
        </div>
        <div class="fixed-bar side-bar">
          <div class="operation-action-item card-button" @click="handelShowPanel">
            <a-tooltip title="Show Toolbox">
              <img src="/img/card.svg" width="30">
            </a-tooltip>
          </div>
          <div class="operation-action-item stick-button" @click="handelShowStickPanel">
            <a-tooltip title="Show Toolbox">
              <img src="/img/sticky.svg" width="40px">
            </a-tooltip>
          </div>
          <div class="operation-action-item save-btb" @click="handleSave">
            <a-tooltip title="Save">
              <i class="bi bi-save" style="font-size: 20px;"></i>
            </a-tooltip>
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
import { ref, watch, onMounted, computed } from 'vue'
import flowViewer from '../components/FlowViewer.vue'
import { useRouter, useRoute } from 'vue-router';
import { useFlowStore } from '../store/flowStore';
import { useScreenshot } from "../components/useScreenShot"
import { useVueFlow } from '@vue-flow/core';
import useDragAndDrop from '../components/useDargAndDrop'
import FlowSelect from '../components/FlowSelectNode.vue';
import FlowForm from '../components/FlowFormNode.vue';
import FlowText from '../components/AiTextNode.vue';
import BilibiliVideo from '../components/BiliBiliVideoNode.vue';
import { message } from 'ant-design-vue';

defineOptions({
  components: {
    FlowSelect,
    FlowForm,
    FlowText,
    BilibiliVideo
  }
})
const stickyPanelClose = ref(true)
const stickySqrt = ref([
  {
    background: "rgb(251, 247, 192)"
  },
  {
    background: "#cceeff"
  },
  {
    background: "rgb(220, 250, 240)"
  },
  {
    background: "rgb(255, 233, 255)"
  },
  {
    background: "rgb(252, 234, 118)"
  },
  {
    background: "rgb(145, 210, 252)"
  },
  {
    background: "rgb(131, 229, 208)"
  },
  {
    background: "rgb(235, 162, 248)"
  }
])
const route = useRoute()
const handleStickyPanelClose = () => {
  stickyPanelClose.value = true
}
document.addEventListener('click', handleStickyPanelClose)

const handelShowStickPanel = (e) => {
  e.stopPropagation()
  stickyPanelClose.value = false
}
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
  await flowStore.saveFlow(data)
  message.success('Save Success')
}

const recommendNodes = computed(() => {
  return flowStore.recommendNodes
}
)
const title = computed(() => flowStore.name)

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
  await flowStore.fetchNewNodes()
  loadingGenerate.value = false
}

function setPanel(open) {
  if (open) {
      panel.value.style.width = '356px'
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
      background-color: rgba(255, 255, 255, 0.438);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      border-radius: 12px;
      -webkit-border-radius: 12px;
      overflow: hidden;
      transition: ease-in-out 0.4s;
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
        padding: 8px 0px;
        position: relative;

        .node-area {
          height: calc(100vh - 140px);
          overflow: auto;
          padding: 4px 8px;
          .card-item {
            margin-bottom: 12px;

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
        background-color: rgba(255, 255, 255, 0.616);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
        -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
        border-radius: 12px;
        -webkit-border-radius: 12px;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
      }

      .sticky-bar {
        width: 216px;
        height: 160px;
        top: calc(40% - 30px);
        left: 96px;
        align-items: center;
        transform: translateY(-50%);
        padding: 8px 12px;
        transition: ease-in-out 0.4s;
        overflow: hidden;

        .sticky-tools--block {
          width: 100%;

          .sticky-tools--head {
            text-align: left;
            margin-bottom: 12px;
            color: #8b8c8f;
            font-size: 12px;
          }

          .sticky-tools--wrap {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 12px;

            .sticky-sqrt {
              width: 36px;
              height: 36px;
              box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
              transition: ease-in-out 0.2s;
            }

            .sticky-sqrt:hover {
              margin-top: -4px;

            }
          }
        }
      }

      .sticky-panel-close {
        width: 0px;
        padding: 0px;
        left: 32px;
        box-shadow: none;
      }

      .side-bar {
        width: 48px;
        height: 60%;
        top: 50%;
        left: 32px;
        align-items: center;
        transform: translateY(-50%);
        max-height: 500px;
        display: flex;

        box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
        border-radius: 12px;
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