<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="flip-card">
        <div class="flip-card-inner" ref="el">
            <div class="flip-card-front glass-blur">
                {{ pre }}
            </div>
            <div class="flip-card-back glass-blur">
                {{ next }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
    contentList: {
        type: Object,
        default() {
            return []
        }
    }
})
const el = ref(null)
onMounted(() => {
    console.log(props.contentList)
    startRotate()
})
const next = ref(props.contentList[1] || '')
const pre = ref(props.contentList[0])
let deg = 0
let cur = 1
watch(() => props.contentList, (newVal) => {
    cur = 1
    pre.value = newVal[0]
    next.value = newVal[cur]
})
const len = props.contentList.length

function startRotate() {
    el.value.style.transform = 'rotateX(' + deg + 'deg)'
    deg += 180
    deg = deg % (360 * 100)
    cur += 1
    setTimeout(() => {
        if (cur % 2 === 1) {
            pre.value = props.contentList[cur % len]
        } else {
            next.value = props.contentList[cur % len]
        }
    }, 1000)
    setTimeout(() => {
        startRotate()
    }, 5000)

}

</script>
<style scoped lang="less">
.glass-blur {
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.95);
}

.flip-card {
    background-color: transparent;
    min-width: 300px;
    height: 48px;
    overflow: hidden;
    font-size: 12px;
    line-height: 12px;
    text-align: left;
    border: 1px solid #f1f1f1;
    perspective: 1000px;

    /* 如果您不想要 3D 效果，请删除它 */
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    display: flex;
    justify-content: left;
    align-items: center;
    transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 12px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card-front {}

.flip-card-back {
    transform: rotateX(180deg);
}
</style>