<template>
  <div class="main-wrapper"> 
    <flowViewer ></flowViewer>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import flowViewer from '../components/FlowViewer.vue'

</script>
<style  scoped>
.main-wrapper {
  height: 800px;
  width: 100%;
}
</style>