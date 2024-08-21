<template>
    <div class="home-page">
        <div class="banner">
            <h1 class="banner-title">What will you design today</h1>
        </div>
        <div class="content-area">
            <div class="section-header">
                <h2 class="section-title"> Your designs</h2>
            </div>
            <div class="card-container">
                <div class="new-whiteboard-card card">
                    <i class="bi bi-plus-circle new-icon"></i>
                    <div class="new-title">New Whiteboard</div>
                </div>
                <div class="card" v-for="item in whiteboardData" :key="item.title" @click="handleJumpToFlow(item)">
                    <div class="card-prevew"></div>
                    <div class="card-info-bar">
                        <div class="card-info-left-side">
                            <div class="card-title">{{ item.title }}</div>
                            <div class="card-date">Edited: {{ item.updatedAt }}</div>
                        </div>
                        <div class="card-info-right-side">
                            <div class="card-action">
                                <a-dropdown>
                                        <i @click="(e)=>e.stopPropagation()" class="bi bi-three-dots"></i>
                                    <template #overlay>
                                    <a-menu slot="overlay">
                                        <a-menu-item key="1" @click="handleShowRename(item)"><i class="bi bi-pencil" style="margin-right: 8px;"></i>  Rename</a-menu-item>
                                        <a-menu-divider />
                                        <a-menu-item key="2" @click="handleClick(item)"> <i class="bi bi-trash3" style="margin-right: 8px;"></i> Delete</a-menu-item>
                                    </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal title="Rename whiteboard" v-model:open="showRenameModal">
            <a-input v-model="currentEditName" />
            <template #footer>
                <a-button key="back" @click="showRenameModal = false">
                    Cancel
                </a-button>
                <a-button key="submit" type="primary" @click="handleRename">
                    Rename
                </a-button>
            </template>
        </a-modal>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const whiteboardData = ref([
    {
        title: "title1",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
    }
])

const router = useRouter()

const handleJumpToFlow = (item) => {
    console.log('jump to flow')
    router.push('/flow')

}

const handleClick = (item) => {
    console.log(item)
}
const currentEditName = ref('')
const showRenameModal = ref(false)

const handleShowRename = (item) => {
    currentEditName.value = item.title
    showRenameModal.value = true
}

const handleRename = () => {
    console.log(currentEditName.value)
    showRenameModal.value = false
}

</script>
<style lang="less" scoped>
.home-page {
    width: 100%;
    height: 100%;
    padding: 20px;

    .banner {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #faf6f6;
        border-radius: 16px;

        .banner-title {
            font-size: 40px;
            font-weight: 600;
        }
    }

    .content-area {
        padding: 12px;
        margin-top: 24px;
        width: 100%;

        .section-header {
            font-size: 24px;
            font-weight: 600;
            width: 100%;

            .section-title {
                font-size: 24px;
                font-weight: 600;
            }
        }

        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 32px;
            margin-top: 24px;

            .card {
                position: relative;
                width: 300px;
                background-color: #fffcfc;
                ;
                margin-bottom: 12px;
                border-radius: 8px;
                box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
                overflow: hidden;

                .card-prevew {
                    width: 100%;
                    height: 140px;
                    background-color: #fffcfc;
                }

                .card-info-bar {
                    display: flex;
                    justify-content: space-between;
                    padding: 0px 12px;
                    height: 60px;
                    background: #fff;
                    box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.1);

                    align-items: center;

                    .card-info-left-side {
                        .card-title {
                            font-size: 18px;
                            font-weight: 600;
                        }

                        .card-date {
                            font-size: 14px;
                            font-weight: 400;
                        }
                    }

                    .card-info-right-side {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;

                        .card-action {
                            font-size: 24px;
                            font-weight: 600;
                        }
                    }
                }
            }

            .new-whiteboard-card {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .new-icon {
                    font-size: 64px;
                    margin-bottom: 14px;
                }

                .new-title {
                    font-size: 18px;
                    font-weight: 400;
                    position: absolute;
                    bottom: 28px;
                }
            }
        }
    }
}
</style>