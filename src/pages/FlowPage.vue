<template>
  <div class="main-wrapper">
    <flowViewer></flowViewer>
    <div class="operation-layer">
      <div class="left-panel"></div>
      <div class="right-side">
        <div class="fixed-bar side-bar">
          <div class="action-item card-button">
            <img src="/img/card.svg" width="24">
          </div>
          <div class="action-item"></div>
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
            <i class="bi bi-pencil" ></i>
          </div>
        <a-divider type="vertical" style="height: 32px;"></a-divider>

        </div>
        <div class="fixed-bar zoom-bar"></div>

      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import flowViewer from '../components/FlowViewer.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const handleJumpToHome = () => {
    router.push('/')
}

const title = ref('Flow Viewer Flow Viewer Flow Viewer' )
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
      min-width: 200px;
      width: 16%;
      pointer-events: all;
      height: 100%;
      background-color: #f0f0f0;
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
        .action-item {
          width: 40px;
          display: flex;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
          &:last-child {
            border-bottom: none;
          }
        }
        .card-button {
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
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
        .return-home{
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          
        }
        .action-item{
          width: 32px;
          border-radius: 4px;
          margin-left: 4px;
        }
        .edit-btn{
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .edit-btn:hover{
          background: #f0f0f0;
        }
        .return-home:hover{
            background: #f0f0f0;
          }
      }
    }
  }

}
</style>