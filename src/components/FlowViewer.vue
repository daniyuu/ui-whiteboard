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
// const nodeData = ref([
//     {
//         id: '1',
//         type: 'input',
//         data: { label: 'Node 1' },
//         position: { x: 250, y: 0 },
//         class: 'light',
//     },
//     {
//         id: '3',
//         type: 'human-text',
//         data: {
//             theamColor: 'red',
//             text: '你可以通过以下几种方法来查看LLVM的版本：\
// 1. **使用`llvm-config`命令**：\
//    \n\`\`\`bash\n\
//    llvm-config --version\
//    \`\`\`\
// \n 2.  **使用\`clang\`命令**（如果你安装了Clang）：\
//    \n```bash\n\
//    clang --version\
//    \`\`\`\
// 3. **使用`llvm-as`命令**：\
//    \n\`\`\`bash\
//    llvm-as --version\
//    \`\`\`\
// ',
//             backgroundColor: '#fff', textColor: 'Node 3', title: "100"
//         },
//         position: { x: 10, y: 0 },
//         class: 'light',
//     },
//     {
//         id: '2',
//         type: 'form',
//         data: { value: 'Node 2' },
//         position: { x: 120, y: 103 },
//         class: 'light',
//     },

//     {
//         id: '5',
//         type: 'bilibili-video',
//         data: { value: '' },
//         position: { x: 130, y: 403 },
//     },
// ])

// const edges = ref([
//     {
//         id: 'e1-2',
//         source: '1',
//         target: '2',
//         animated: true,
//         sourceHandle: 'a',
//         target: '2',
//         data: {
//         },
//         style: {
//         },
//     },
// ])
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView();
});
onNodeDragStop(({ event, nodes, node }) => {
  console.log("Node Drag Stop", { event, nodes, node });
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
