<template>
    <div class="basic-flow">
        <VueFlow :dark="dark" :nodes="nodeData" :edges="edges" :class="{ dark }" :default-viewport="{ zoom: 1 }"
            :min-zoom="0.2" :max-zoom="4">
            <template #node-form="props">
                <FormNode :data="props.data" />
            </template>
            <template #node-human-text="props">
                <HumanTextNode :data="props.data" />
            </template>
            <template #node-bilibili-video="props">
                <BiliBiliVideoNode :data="props.data" />
            </template>
            <Background class="background" attern-color="#FFF" :gap="10" />
            <MiniMap />
        </VueFlow>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import FormNode from './FormNode.vue'
import HumanTextNode from './HumanTextNode.vue'
import BiliBiliVideoNode from './BiliBiliVideoNode.vue'
const { onInit, onNodeDragStop, onConnect, setViewport, toObject } = useVueFlow()
const dark = ref(true)
const triggerDark = () => {
    dark.value = !dark.value
}
const nodeData = ref([
    {
        id: '1',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 0 },
        class: 'light',
    },
    {
        id: '3',
        type: 'human-text',
        data: { theamColor: 'red',
        text:'你可以通过以下几种方法来查看LLVM的版本：\
1. **使用`llvm-config`命令**：\
   \n\`\`\`bash\n\
   llvm-config --version\
   \`\`\`\
\n 2.  **使用\`clang\`命令**（如果你安装了Clang）：\
   \n```bash\n\
   clang --version\
   \`\`\`\
3. **使用`llvm-as`命令**：\
   \n\`\`\`bash\
   llvm-as --version\
   \`\`\`\
',
         backgroundColor: '#fff', textColor: 'Node 3', title: "100" },
        position: { x: 10, y: 0 },
        class: 'light',
    },
    {
        id: '2',
        type: 'form',
        data: { value: 'Node 2' },
        position: { x: 120, y: 103 },
        class: 'light',
    },

    {
        id: '5',
        type: 'bilibili-video',
        data: { value: '' },
        position: { x: 130, y: 403 },
    },
])

const edges = ref([
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        sourceHandle: 'a',
        target: '2',
        data: {
        },
        style: {
        },
    },
])
onInit((vueFlowInstance) => {
    // instance is the same as the return of `useVueFlow`
    vueFlowInstance.fitView()
})
onNodeDragStop(({ event, nodes, node }) => {
    console.log('Node Drag Stop', { event, nodes, node })
})

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
    nodeData.value = nodeData.value.map((node) => {
        return {
            ...node,
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
        }
    })
}

function logToObject() {
    console.log(toObject())
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
    setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
    dark.value = !dark.value
}

</script>
<style>
.basic-flow {
    height: 100%;
    width: 100%;
}
</style>