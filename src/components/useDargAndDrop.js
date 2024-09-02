import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'
import { useFlowStore } from '../store/flowStore';
import { nanoid } from 'nanoid';


/**
 * @returns {string} - A unique id.
 */
function getId() {
  return nanoid(12)
}


const state = {
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}
let tempData = null

export default function useDragAndDrop() {
  const store = useFlowStore()
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode, toObject } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event, type, data) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      tempData = data
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  function onDragOver(event) {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }


  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(event) {
    let { id, ...data } = tempData
    tempData = null
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })
    if (!id) {
      id = getId()
    }

    if (!draggedType.value) {
      return
    }

    const newNode = {
      id,
      type: draggedType.value,
      position,
      data: { id, ...data },
    }

    const { off } = onNodesInitialized(() => {
      updateNode(id, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }))

      off()
    })
    store.removeRecommendNode(id)
    addNodes(newNode)

  }

  function autoSave() {
    if (window.timer) {
      clearTimeout(window.timer)
    }
    window.timer = setTimeout(() => {
      store.setProperty({ nodes: toObject().nodes })
      store.saveFlow()
      autoSave()
    }, 10000);
  }
  autoSave()
  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
