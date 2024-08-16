<template>
    <div class="bilibili-node">
        <div class="bilibili-header"></div>
        <div class="bilibili-video">
            <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=1456367830&bvid=BV1oi421h7zR&cid=1638792141&page=1&autoplay=0"
                auto="false"
                 scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
        </div>
    </div>

</template>
<script setup>
const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    }
})
</script>
<style scoped lang="less">
.bilibili-node {
    border-radius: 4px;
    position: relative;
    .bilibili-header {
        background-color: rgb(255, 37, 128);
        width: 100%;
        height: 32px;
    }
    .bilibili-video {
        position: relative;
        border: solid 1px rgb(255, 37, 128);
        width: 320px;
        height: 180px;
        iframe {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }
}
</style>