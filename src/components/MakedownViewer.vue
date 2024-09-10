<template>
    <div class="markdown-viewer" v-html="mHhtml"></div>
</template>

<script setup>
import { computed, } from 'vue'
import markdown from 'markdown-it'
const props = defineProps({
    text: {
        type: String,
        default: ''
    }
})
const md = markdown({
    html: true,
    linkify: true,
    typographer: true
})
const mHhtml = computed(() => {
    return md.render(props.text)
})

</script>

<style lang="less" scoped>
.codeWrapper {
    .code-area {
        position: relative;
        background: #101010;
        margin-top: 12px;
        margin-bottom: 12px;

        .code-header {
            width: 100%;
            height: 30px;
            background: #606060;
            color: #f5f6f8;

            .language {
                position: absolute;
                left: 10px;
                line-height: 30px
            }

            .copy {
                position: absolute;
                right: 10px;
                line-height: 30px
            }
        }

    }
}
</style>