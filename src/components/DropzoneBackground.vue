<script setup>
import { Background } from '@vue-flow/background'
</script>

<template>
  <div class="dropzone-background">
    <Background :size="2" :gap="40" pattern-color="#ccf" />

    <div class="overlay">
      <slot />
    </div>
  </div>
</template>
