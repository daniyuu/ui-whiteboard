<template>
    <a-row :gutter="[16, 16]" class="Skeleton-wrapper">
        <a-col v-for="n in 6" :key="n" :span="24">
            <div class="Skeleton-card glass-blur">
                <div class="Skeleton-content">
                    <div class="Skeleton-title"></div>
                    <div class="Skeleton-text"></div>
                    <div class="Skeleton-text short"></div>
                </div>
            </div>
        </a-col>
    </a-row>
</template>

<style lang="less" scoped>
.glass-blur {
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.6);
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.95);
}

.Skeleton-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
}

.Skeleton-card {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.Skeleton-thumbnail {
    width: 100%;
    height: 120px;
    background: #dbd5d5;
    /* 更浅的颜色 */
}

.Skeleton-content {
    padding: 16px;
    animation: light 2s infinite linear;
}

.Skeleton-title {
    width: 70%;
    height: 20px;
    background: #c9c8c8;
    /* 更浅的颜色 */
    margin-bottom: 8px;
}

.Skeleton-text {
    width: 100%;
    height: 14px;
    background: #c9c8c8;
    /* 更浅的颜色 */
    margin-bottom: 8px;
}

.Skeleton-text.short {
    width: 50%;
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


.Skeleton-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -100%;
    width: 300%;
    z-index: 1000;
    height: 200%;
    display: block;
    transform: translateX(-100%);
    background: linear-gradient(-45deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 80%);
    animation: shine 2s infinite linear;
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
</style>