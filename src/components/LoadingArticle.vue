<template>
    <div class="Skeleton-wrapper">
        <div class="Skeleton-article">
            <div class="Skeleton-content">
                <div class="Skeleton-line" v-for="(width, index) in lineWidths" :key="index"
                    :style="{ width: `${width}%` }"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lineWidths: [100, 75, 50, 100, 75, 50, 100, 75, 50, 100, 70, 100, 50, 75, 90] // 定义三种不同的长度条
        };
    }
};
</script>

<style lang="less">
.Skeleton-wrapper {
    display: flex;
    justify-content: center;
    padding: 16px;
}

.Skeleton-article {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    padding: 16px;
}

.Skeleton-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.Skeleton-line {
    height: 14px;
    background: #c9c8c8;
    /* 更浅的颜色 */
    border-radius: 4px;
    animation: light 2s infinite linear;
}

@keyframes shine {
    0% {
        transform: translate(-100%, 0%);

    }

    50% {
        transform: translate(100%, 10%);


    }

    100% {
        transform: translateX(100%);
    }
}

@keyframes light {
    0% {
        opacity: 0.5;

    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

.Skeleton-article::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
    animation: shine 2s infinite linear;
}
</style>