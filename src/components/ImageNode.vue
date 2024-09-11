<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="image-node">
        <div class="card-body">
            <img :src="data.url" :style="style" />
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    data: {
        type: Object,
        default() {
            return {
                url: ""
            }
        }
    }
})
const imageSize = ref({})
watch(() => props.data.url, () => {
    const img = new Image()
    img.src = props.data.url
    img.onload = function () {
        imageSize.value = {
            width: img.width,
            height: img.height
        }
    }
})

const style = computed(() => {
    if (imageSize.value.width > imageSize.value.height) {
        return {
            width: '320px',
            height: 'auto',
        }
    } else {
        return {
            width: 'auto',
            height: '320px',
        }
    }
})


</script>
<style scoped lang="less">
.image-node {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    padding: 4px;
    min-width: 100px;
    min-height: 60px;
    padding: 16px;
    box-shadow: #ccc 1px 1px 20px 2px;

    .card-body {
        display: flex;
        overflow: hidden;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        height: calc(100% - 24px);
        border: solid 1px #ccc;
    }
}
</style>