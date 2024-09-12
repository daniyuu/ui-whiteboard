<!-- eslint-disable vue/no-deprecated-slot-attribute -->
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
                <div class="new-whiteboard-card card glass-blur" @click="create()">
                    <i class="bi bi-plus-circle new-icon"></i>
                    <div class="new-title">New Whiteboard</div>
                </div>
                <div class="card glass-blur" v-for="item in whiteboardData" :key="item.title"
                    @click="handleJumpToFlow(item)">
                    <div class="card-prevew">
                        <img style="width: 100%;" :src="_.get(item.ui_attributes, 'avatar')" />
                    </div>
                    <div class="card-info-bar">
                        <div class="card-info-left-side">
                            <div class="card-title">{{ item.title }}</div>
                            <div class="card-date">Edited: {{ formateDate(item.updated_at) }}</div>
                        </div>
                        <div class="card-info-right-side">
                            <div class="card-action">
                                <a-dropdown>
                                    <i @click="(e) => e.stopPropagation()" class="bi bi-three-dots"></i>
                                    <template #overlay>
                                        <a-menu slot="overlay">
                                            <a-menu-item key="1" @click="handleShowRename(item)"><i class="bi bi-pencil"
                                                    style="margin-right: 8px;"></i> Rename</a-menu-item>
                                            <a-menu-divider />
                                            <a-menu-item key="2" @click="handleDelete(item)"> <i class="bi bi-trash3"
                                                    style="margin-right: 8px;"></i> Delete</a-menu-item>
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
import _ from 'lodash'
import dayjs from 'dayjs';
// eslint-disable-next-line no-unused-vars
import { createWhiteBoard, updateWhiteBoard, deleteWhiteBoard, getWhiteBoardList } from '../api';

// data formate 2024-09-11T20:19:46.372925
// return 2024-09-11：20:19:46
function formateDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

const whiteboardData = ref()
let creating = false

async function create() {
    if (creating) return
    const data = await createWhiteBoard({
        name: 'New Whiteboard',
    })
    const id = data.id
    router.push('/flow/' + id)
}

const router = useRouter()

async function fetchWhiteboardData() {
    const res = await getWhiteBoardList()
    whiteboardData.value = res
}
fetchWhiteboardData()

const handleJumpToFlow = (item) => {
    console.log(item)
    router.push('/flow/' + item.id)
}

const handleDelete = async (item) => {
    console.log(item)
    await deleteWhiteBoard(item.id)
    await fetchWhiteboardData()
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
.glass-blur {
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.95);
}

.home-page {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: radial-gradient(at 60.91943048444464% 67.25132393864972%, rgb(248, 174, 187) 0%, hsla(350, 86.30136986301372%, 71.37254901960785%, 0) 100%), radial-gradient(at 20.813307850091746% 20.526027905116216%, rgb(203, 245, 215) 0%, hsla(137.4757281553398, 89.56521739130436%, 77.45098039215685%, 0) 100%), radial-gradient(at 85.20085739947811% 65.19070998593959%, rgb(185, 157, 247) 0%, hsla(259.04761904761904, 86.30136986301372%, 71.37254901960785%, 0) 100%), radial-gradient(at 48.40531420662355% 43.233486276867694%, hsla(350, 86.30136986301372%, 71.37254901960785%, 1) 0%, hsla(350, 86.30136986301372%, 71.37254901960785%, 0) 100%), radial-gradient(at 26.24165986272784% 4.799166678461408%, hsla(137.4757281553398, 89.56521739130436%, 77.45098039215685%, 1) 0%, hsla(137.4757281553398, 89.56521739130436%, 77.45098039215685%, 0) 100%), radial-gradient(at 11.950269221014631% 82.14889471799577%, hsla(259.04761904761904, 86.30136986301372%, 71.37254901960785%, 1) 0%, hsla(259.04761904761904, 86.30136986301372%, 71.37254901960785%, 0) 100%);

    .banner {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
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
                height: 200px;
                margin-bottom: 12px;
                border-radius: 8px;
                box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
                overflow: hidden;

                .card-prevew {
                    width: 100%;
                    height: 140px;
                    overflow: hidden;
                    background: #ffffffa9;
                }

                .card-info-bar {
                    position: relative;
                    z-index: 10000;
                    display: flex;
                    justify-content: space-between;
                    padding: 0px 12px;
                    height: 60px;
                    background: rgba(255, 255, 255, 0.305);
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