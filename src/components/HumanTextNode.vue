<template>
    <div class="human-text-node">
        <div class="background-layer"></div>
        <div class="card-title">{{ data.title }}</div>
        <div class="card-body">
            <MakedownViewer :text="data.content"></MakedownViewer>    
        </div>
    </div>
</template>
<script setup>
import { ref ,computed} from 'vue'
import MakedownViewer
 from './MakedownViewer.vue';
const props = defineProps({
    data: {
        type: Object,
        default() {
            return {
            }
        }
    }
})
const thrmeColor = computed(() => {
    return props.data.thremColor || "#477ef5"
})
const backgroundColor = computed(() => {
    return props.data.backgroundColor || "#FFFFFF"
})

</script>
<style scoped lang="less">
.human-text-node {
    background-color: v-bind(backgroundColor);
    border: 1px solid v-bind(thrmeColor);
    border-radius: 4px;
    overflow: hidden;
    padding: 0px;
    min-width: 100px;
    min-height: 60px;
    .card-title {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        padding:0 4px 0 4px;
        background: v-bind(thrmeColor);
        height:32px;
        line-height: 32px;
    }
    .card-body {
        padding: 0px 12px;
    }
    box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
    .background-layer{
    position: absolute;
    width: 300px;
    filter: invert(100%);
    height: 300px;
    top: 0px;
    left: 0px;
}

}

</style>