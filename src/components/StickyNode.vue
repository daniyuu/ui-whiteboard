<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="sticky-node" :style="style">
        <div class="card-body" @click="handleClick">
            <a-textarea ref="textarea" class="input" auto-size v-model:value="data.content" :rows="3"
                placeholder=""></a-textarea>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const textarea = ref(null)
const props = defineProps({
    data: {
        type: Object,
        default() {
            return {
                content: ""
            }
        }
    }
})
const style = computed(() => {
    return {
        width: '300px',
        height: '300px',
    }
})
const handleClick = () => {
    textarea.value.focus()
}

const backgroundColor = computed(() => {
    return props.data.backgroundColor || "#FFFFFF"
})

</script>
<style scoped lang="less">
.sticky-node {
    background-color: v-bind(backgroundColor);
    border-radius: 4px;
    overflow: hidden;
    padding: 0px;
    min-width: 100px;
    min-height: 60px;

    .card-title {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        padding: 0 4px 0 4px;
        height: 32px;
        line-height: 32px;
    }

    .card-body {
        padding: 0px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 24px);

        .input:focus {
            border: none;
            box-shadow: none;
        }

        .input {
            border: none;
            text-align: center;
            background-color: transparent;
            resize: none;
            font-size: 16px;
            overflow: hidden;
            color: #000;

            &:focus {
                outline: none;
            }
        }
    }

    box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.1);

}
</style>