<template>
  <div class="basic-flow" @drop="onDrop">
    <VueFlow :dark="dark" :nodes="nodeData" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave"
      :class="{ dark }" :default-viewport="{ zoom: 1 }" :min-zoom="0.2" :max-zoom="4">
      <template #node-flow-form="props">
        <FormNode :data="props.data" />
      </template>
      <template #node-flow-select="props">
        <FlowSelectNode :data="props.data" />
      </template>
      <template #node-flow-text="props">
        <AiTextNode :data="props.data" />
      </template>
      <template #node-sticky="props">
        <StickyNode :data="props.data" />
      </template>
      <template #node-bilibili-video="props">
        <BiliBiliVideoNode :data="props.data" />
      </template>
      <template #node-image="props">
        <ImageNode :data="props.data" />
      </template>
      <DropzoneBackground class="background" :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }">
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      <MiniMap />
    </VueFlow>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import FormNode from "./FlowFormNode.vue";
import AiTextNode from "./AiTextNode.vue";
import BiliBiliVideoNode from "./BiliBiliVideoNode.vue";
import { useFlowStore } from "../store/flowStore";
import useDragAndDrop from "./useDargAndDrop";
import StickyNode from "./StickyNode.vue";
import FlowSelectNode from "./FlowSelectNode.vue";
import ImageNode from "./ImageNode.vue";

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();

const store = useFlowStore();
const {
  onInit,
  onNodeDragStop,
  onNodesChange,
  applyNodeChanges,
} = useVueFlow();
const dark = ref(true);

const nodeData = computed(() => store.nodes);

const edges = computed(() => store.edges);
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView();
});
onNodeDragStop(({ event, nodes, node }) => {
  console.log('onNodeDragStop', event, nodes, node);
  store.addNode(node)
});

onNodesChange(async (changes) => {
  applyNodeChanges(changes);
  changes.forEach((change) => {
    if (change.type === "add") {
      console.log("add", change);
    } else if (change.type === "remove") {
      store.removeNode(change.id);
    }
  });
});


</script>
<style>
.basic-flow {
  height: 100%;
  width: 100%;
}

.background {
  width: 100%;
  height: 100%;
}
</style>
