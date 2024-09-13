<template>
  <div class="main-wrapper">
    <flowViewer></flowViewer>
    <div class="operation-layer">
      <div class="left-panel glass-blur" ref="panel">
        <div class="background-layer"></div>
        <div class="left-panel-header">
          <div class="left-panel-title">Toolbox</div>
          <i class="bi bi-x close-btn" @click="handleClosePanel"></i>
        </div>
        <div class="left-panel-body">
          <a-spin :spinning="loadingGenerate" style="width: 100%" />
          <div class="node-area" draggable="false">
            <div draggable="false"></div>
            <component style="box-shadow: none" class="card-item" draggable="true"
              @dragstart="onDragStart($event, item.type, item.data)" v-for="(item, index) in recommendNodes"
              :key="index" :data="item.data" :is="item.type"></component>
          </div>
          <a-button :loading="loadingGenerate" type="default" class="regenerate-btn"
            @click="handleRegenerate">Regenerate</a-button>
        </div>
      </div>
      <div class="right-side">
        <div class="sticky-bar glass-blur fixed-bar" :class="stickyPanelClose ? 'sticky-panel-close' : ''">
          <div class="sticky-tools--block">
            <div class="sticky-tools--head">Square (1:1)</div>
            <div class="sticky-tools--wrap">
              <div class="sticky-sqrt" draggable="true" @dragstart="
                onDragStart($event, 'sticky', {
                  created_by: 'user',
                  backgroundColor: item.background,
                })
                " v-for="item in stickySqrt" :key="item.id" :style="`background: ${item.background}`"></div>
            </div>
          </div>
        </div>
        <FlipCard class="fixed-bar tips-bar " :contentList="tips" v-if="tips.length > 0"></FlipCard>
        <div class="fixed-bar bottom-bar">
          <div class="element-area glass-blur">
            <div class="operation-action-item sticky-button" @click="handelShowPanel">
              <a-tooltip title="Show Toolbox">
                <img src="/img/card.svg" width="24px" />
              </a-tooltip>
            </div>
            <div class="operation-action-item sticky-button" @dragstart="
              onDragStart($event, 'sticky', {
                created_by: 'user',
                backgroundColor: stickySqrt[~~(Math.random() * stickySqrt.length)].background,
              })
              " @click="handelShowStickPanel">
              <a-tooltip title="Show sticky">
                <img src="/img/sticky.svg" width="24px" />
              </a-tooltip>
            </div>
            <div class="operation-action-item sticky-button" @click="addImage">
              <a-tooltip title="Add Image">
                <img src="/img/add-image.svg" width="24px" />
              </a-tooltip>
            </div>
            <div class="operation-action-item sticky-button" @click="addLink">
              <a-tooltip title="Add Link">
                <img src="/img/add-link.svg" width="20px" />
              </a-tooltip>
            </div>
            <div class="operation-action-item sticky-button" @click="handleSave">
              <a-tooltip title="Save">
                <img src="/img/save.svg" width="24px" />
              </a-tooltip>
            </div>
          </div>
          <div class="generate-btn glass-blur">
            <div class="operation-action-item" @click="handleGenerateSummary">
              <a-tooltip title="Summary">
                <img src="/img/result.svg" width="24px" />
              </a-tooltip>
            </div>
          </div>
        </div>
        <div class="fixed-bar glass-blur title-bar">
          <div @click="handleJumpToHome" class="action-item return-home">
            <i class="bi bi-caret-left"></i>
          </div>
          <a-divider type="vertical" style="height: 32px"></a-divider>
          <div class="title">
            <span>{{ title }}</span>
          </div>
          <div class="action-item edit-btn">
            <i class="bi bi-pencil"></i>
          </div>
          <a-divider type="vertical" style="height: 32px"></a-divider>
          <div class="action-item shot-btn" @click="handleScreenShot">
            <i class="bi bi-camera"></i>
          </div>
        </div>
        <div class="fixed-bar glass-blur zoom-bar"></div>
        <div class="fixed-bar glass-blur summary-panel" :class="showSummaryPanel ? '' : 'summary-panel-hide'">
          <div class="summary-header">
            <span>Summary</span>
            <i class="bi bi-x close-btn" @click="handleCloseSummaryPanel"></i>
          </div>
          <div class="summary-content">
            <makedown-viewer :text="summaryContent"></makedown-viewer>
          </div>
          <a-button type="primary" class="generate-summary-btn" @click="handleGenerateSummary"
            :loading="summaryPanelLoading">Generate</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, computed, onUnmounted } from "vue";
import flowViewer from "../components/FlowViewer.vue";
import { useRouter, useRoute } from "vue-router";
import { useFlowStore } from "../store/flowStore";
import { useScreenshot } from "../components/useScreenShot";
import { useVueFlow } from "@vue-flow/core";
import useDragAndDrop from "../components/useDargAndDrop";
import FlowSelect from "../components/FlowSelectNode.vue";
import FlowForm from "../components/FlowFormNode.vue";
import FlowText from "../components/AiTextNode.vue";
import BilibiliVideo from "../components/BiliBiliVideoNode.vue";
import { message } from "ant-design-vue";
import FlipCard from "../components/flipCard.vue";
import SearchWeb from "../components/SearchWebNode.vue";

import { handleGetImage2Base64 } from "../utils/file";
const { capture } = useScreenshot();
defineOptions({
  components: {
    FlowSelect,
    FlowForm,
    FlowText,
    BilibiliVideo,
    SearchWeb,
    FlipCard,
  },
});
onUnmounted(() => {
  document.removeEventListener("click", handleStickyPanelClose);
  flowStore.ref = null
});
const tips = computed(() => {
  return flowStore.tips || []
});
const showSummaryPanel = ref(false);
const summaryPanelLoading = ref(false);
const stickyPanelClose = ref(true);
const stickySqrt = ref([
  {
    background: "rgb(251, 247, 192)",
  },
  {
    background: "#cceeff",
  },
  {
    background: "rgb(220, 250, 240)",
  },
  {
    background: "rgb(255, 233, 255)",
  },
  {
    background: "rgb(252, 234, 118)",
  },
  {
    background: "rgb(145, 210, 252)",
  },
  {
    background: "rgb(131, 229, 208)",
  },
  {
    background: "rgb(235, 162, 248)",
  },
]);
const route = useRoute();
const handleStickyPanelClose = () => {
  stickyPanelClose.value = true;
};
document.addEventListener("click", handleStickyPanelClose);

const handelShowStickPanel = (e) => {
  e.stopPropagation();
  stickyPanelClose.value = false;
};
const { onDragStart } = useDragAndDrop();

const { vueFlowRef } = useVueFlow();
const flowStore = useFlowStore();
flowStore.setId(route.params.id);
flowStore.getFlow();



const router = useRouter();
const handleJumpToHome = () => {
  router.push("/");
};
const panel = ref(null);
onMounted(() => {
  setPanel(showPanel.value);
  flowStore.ref = vueFlowRef
});
function getRandomPOsition(maxX, maxY) {
  return {
    x: ~~(Math.random() * maxX),
    y: ~~(Math.random() * maxY),
  };

}
const handleSave = async () => {
  await flowStore.saveFlow();
  message.success("Save Success");
};
const addImage = async () => {
  const b64ImageUrl = await handleGetImage2Base64();
  if (!b64ImageUrl) {
    return;
  }
  console.log(b64ImageUrl);
  flowStore.addNode({
    type: "image",
    position: getRandomPOsition(800, 600),
    data: {
      created_by: 'user',
      url: b64ImageUrl,
    },
  });
};

const recommendNodes = computed(() => {
  return flowStore.recommendNodes;
});
const title = computed(() => flowStore.name);

const showPanel = ref(true);
const handleClosePanel = () => {
  showPanel.value = false;
};
const handelShowPanel = () => {
  showPanel.value = !showPanel.value;
};
const handleScreenShot = () => {
  if (!vueFlowRef.value) {
    console.warn("VueFlow element not found");
    return;
  }

  capture(vueFlowRef.value, { shouldDownload: true });
};
const loadingGenerate = ref(false);
const summaryContent = ref("Summary Content");

const handleRegenerate = async () => {
  loadingGenerate.value = true;
  await flowStore.fetchNewNodes();
  loadingGenerate.value = false;
};

const handleGenerateSummary = async () => {
  showSummaryPanel.value = true;
  summaryPanelLoading.value = true;
  const answer = await flowStore.getAnswer();
  summaryContent.value = answer;
  summaryPanelLoading.value = false;
};

const handleCloseSummaryPanel = () => {
  showSummaryPanel.value = false;
};

function setPanel(open) {
  if (open) {
    panel.value.style.width = "342px";
  } else {
    panel.value.style.width = "0px";

  }
}
watch(
  () => showPanel.value,
  (newVal) => {
    setPanel(newVal);
  }
);
</script>
<style lang="less" scoped>
.glass-blur {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.95);
}

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
      pointer-events: all;
      height: 100%;
      overflow: hidden;
      position: relative;
      transition: ease-in-out 0.4s;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

      .background-layer {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.2;
        background: radial-gradient(at 18.705910674999203% 15.134840861604705%, hsla(2.526315789473693, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(2.526315789473693, 88.78504672897198%, 79.01960784313725%, 0) 100%), radial-gradient(at 30.8112932366015% 75.6261221183719%, hsla(46.81318681318682, 60.264900662251655%, 70.3921568627451%, 1) 0%, hsla(46.81318681318682, 60.264900662251655%, 70.3921568627451%, 0) 100%), radial-gradient(at 38.48423830104502% 52.722552418335056%, hsla(152.8421052631579, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(152.8421052631579, 88.78504672897198%, 79.01960784313725%, 0) 100%), radial-gradient(at 39.331314657444636% 12.077087191487678%, hsla(188.5106382978723, 90.9677419354839%, 69.6078431372549%, 1) 0%, hsla(188.5106382978723, 90.9677419354839%, 69.6078431372549%, 0) 100%), radial-gradient(at 87.37161537120681% 96.82127143816406%, hsla(212.8421052631579, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(212.8421052631579, 88.78504672897198%, 79.01960784313725%, 0) 100%), radial-gradient(at 20.24758766249022% 10.69159510369133%, hsla(2.526315789473693, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(2.526315789473693, 88.78504672897198%, 79.01960784313725%, 0) 100%), radial-gradient(at 52.693155228548584% 91.56020068404615%, hsla(46.81318681318682, 60.264900662251655%, 70.3921568627451%, 1) 0%, hsla(46.81318681318682, 60.264900662251655%, 70.3921568627451%, 0) 100%), radial-gradient(at 39.31237042190552% 82.475962981231%, hsla(152.8421052631579, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(152.8421052631579, 88.78504672897198%, 79.01960784313725%, 0) 100%), radial-gradient(at 0.23338540354438386% 66.36092039470142%, hsla(188.5106382978723, 90.9677419354839%, 69.6078431372549%, 1) 0%, hsla(188.5106382978723, 90.9677419354839%, 69.6078431372549%, 0) 100%), radial-gradient(at 90.00899614523834% 37.55841078794306%, hsla(212.8421052631579, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(212.8421052631579, 88.78504672897198%, 79.01960784313725%, 0) 100%), radial-gradient(at 69.53998133542414% 22.788540970406835%, hsla(2.526315789473693, 88.78504672897198%, 79.01960784313725%, 1) 0%, hsla(2.526315789473693, 88.78504672897198%, 79.01960784313725%, 0) 100%);
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      .left-panel-header {
        height: 64px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
        background: #ffffffb6;

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
        width: 342px;
        overflow: hidden;
        height: calc(100% - 64px);
        overflow: auto;
        padding: 8px 0px;
        position: relative;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;

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
      overflow: hidden;

      .tips-bar {
        top: 20px;
        right: 24px;
      }

      .fixed-bar {
        pointer-events: all;
        position: absolute;
      }

      .bottom-bar {
        width: 500px;
        height: 40px;
        position: absolute;
        bottom: 12px;
        display: flex;
        left: 50%;
        transform: translate(-50%, 0);
        justify-content: center;
        align-items: center;
        gap: 20px;

        .element-area {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0px 12px;

          .sticky-button {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .generate-btn {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .sticky-bar {
        width: 216px;
        height: 160px;
        bottom: 60px;
        left: 50%;
        align-items: center;
        transform: translateX(-50%);
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
        box-shadow: none;
        bottom: -400px;
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


        .card-button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 6px;
        }
      }

      .title-bar {
        height: 40px;
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


      .summary-panel {
        width: 500px;
        height: calc(100% - 60px);
        top: 30px;
        right: 20px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: ease-in-out 0.4s;

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: bold;

          .close-btn {
            cursor: pointer;
            font-size: 24px;
          }
        }

        .summary-content {
          flex: 1;
          overflow: auto;
          margin-top: 16px;
          margin-bottom: 20px;

        }
      }

      .summary-panel-hide {
        position: fixed;
        right: -600px;
      }

    }
  }
}

.operation-action-item {
  width: 32px;
  height: 32px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
}

.operation-action-item:hover {
  background: #f0f0f0;
}
</style>
