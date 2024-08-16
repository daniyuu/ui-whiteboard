<template>
    <div class="form-node">
        test_node
        <div>{{data.value}}</div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    }
})
</script>

<style scoped>
    .form-node {
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 8px;
    }
</style>