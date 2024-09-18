<template>
  <div class="bilibili-node">

    <div class="bilibili-header">
      <img src="/img/video.svg" width="20px" style="margin-top: -4px; margin-right: 4px;" />
      {{ data.name }}
    </div>
    <div class="bilibili-video">
      <iframe
        :src="`//player.bilibili.com/player.html?isOutside=true&aid=${data.aid}&bvid=${data.bvid}&cid=${data.cid}&page=1&autoplay=0`"
        auto="false" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

    </div>
  </div>

</template>
<script setup>
defineProps({
  data: {
    type: Object,
    default() {
      return {
        aid: "1456367830",
        cid: "1638792141",
        bvid: "BV1oi421h7zR"
      }
    }
  }
})
</script>
<style scoped lang="less">
.bilibili-node {
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  .bilibili-header {

    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    white-space: nowrap;
    display: block;
    color: #fff;
    padding: 2px 24px 0 12px;
    background-color: rgb(72, 164, 250);
    width: 320px;
    line-height: 28px;
    height: 28px;
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