<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="home-page">
        <div class="banner">
            <h1 class="banner-title">What will you design today</h1>
        </div>
        <div class="content-area">
            <div class="arrow arrow-left" @click="scrollLeft" v-if="canLeftScroll">
                <i class="bi bi-caret-left"></i>
            </div>
            <div class="arrow arrow-right" @click="scrollRight" v-if="canRightScroll">
                <i class="bi bi-caret-right"></i>
            </div>
            <div class="section-header">
                <h2 class="section-title"> Quick Access</h2>
            </div>
            <div class="card-container template" ref="container">

                <div class="new-whiteboard-card card glass-blur" @click="create()">
                    <i class="bi bi-plus-circle new-icon"></i>
                    <div class="new-title">New Whiteboard</div>
                </div>
                <div class="card" v-for="item in template " @click="create(item.title)" :key="item">
                    <div class="card-prevew">
                        <img style="width: 100%;position: relative; top: -80px;" :src="item.icon" />
                    </div>
                    <div class="card-info-bar" style="line-height: 16px;">
                        {{ item.title }}</div>
                </div>
            </div>


        </div>
        <div class="content-area">
            <div class="section-header">
                <h2 class="section-title"> Recent</h2>
            </div>
            <div class="card-container card-recent" style="overflow: auto;">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import _ from 'lodash'
import dayjs from 'dayjs';
// eslint-disable-next-line no-unused-vars
import { createWhiteBoard, updateWhiteBoard, deleteWhiteBoard, getWhiteBoardList } from '../api';
import { useFlowStore } from "../store/flowStore";
const flowStore = useFlowStore();

const container = ref(null)
const canLeftScroll = ref(false)
const canRightScroll = ref(false)

function checkHasHorizontalScrollBar(el) {
    setTimeout(() => {
        if (el) {
            if (el.scrollWidth > el.clientWidth) {
                canLeftScroll.value = el.scrollLeft > 0
                canRightScroll.value = el.scrollLeft < el.scrollWidth - el.clientWidth
            } else {
                canLeftScroll.value = false
                canRightScroll.value = false
            }
        }
    }, 800)

}
function observerResize(el) {
    checkHasHorizontalScrollBar(el)
    console.log(document)
    window.addEventListener('resize', () => {
        console.log('resize')
        checkHasHorizontalScrollBar(el)
    })
}

onMounted(() => {
    observerResize(container.value)
})

// data formate 2024-09-11T20:19:46.372925
// return 2024-09-11：20:19:46
function formateDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
const template = ref([
    {
        "icon": "/img/food.webp",
        "title": "What kind of diet is beneficial for health? Recommend some simple home recipes"
    },
    {
        "icon": "/img/family.webp",
        "title": "Recommend a family-friendly vacation spot"
    },
    {
        "icon": "/img/tour.webp",
        "title": "What are the popular tourist attractions domestically and internationally?"
    },
    {
        "icon": "/img/tech.webp",
        "title": " and which technological innovations are changing our lives"
    },
    {
        "icon": "/img/game.webp",
        "title": "What are the most popular video games currently?"
    },
    {
        "icon": "/img/computer.webp",
        "title": "I want to build a computer for around 6000 yuan, what configuration should I choose?"
    },
    {
        "icon": "/img/person.webp",
        "title": "How to set and achieve personal goals"
    },
    {
        "icon": "/img/tech1.webp",
        "title": "Which technological innovations are changing our lives?"
    }
])
function scrollLeft() {
    container.value.scrollLeft -= 332 * 3
    checkHasHorizontalScrollBar(container.value)
}
function scrollRight() {
    console.log(container.value.scrollLeft)
    container.value.scrollLeft = parseInt(container.value.scrollLeft) + 332 * 3
    checkHasHorizontalScrollBar(container.value)
}

const whiteboardData = ref()
let creating = false

async function create(topic) {
    if (creating) return
    const data = await createWhiteBoard({
        name: 'New Whiteboard',
    })
    const id = data.id
    if (topic) {
        flowStore.topic = topic
    }
    router.push('/flow/' + id)
}

const router = useRouter()

async function fetchWhiteboardData() {
    const res = await getWhiteBoardList()
    whiteboardData.value = res
}
fetchWhiteboardData()

const handleJumpToFlow = (item) => {
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

.arrow {
    height: 32px;
    width: 32px;
    flex: 0 0 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eeeeee;
    border-radius: 500%;
    border: solid 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: calc(50% - 8px);
    z-index: 10000;

}

.arrow-left {
    left: 0;
}

.arrow-right {
    right: -6px;
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
        position: relative;

        .section-header {
            font-size: 24px;
            font-weight: 600;
            width: 100%;

            .section-title {
                font-size: 24px;
                font-weight: 600;
            }
        }

        .card-wrapper {
            gap: 32px;
            margin-top: 12px;
        }

        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 32px;
            margin-top: 12px;
            scroll-behavior: smooth;
            flex-shrink: 0;

            .card {
                position: relative;
                width: 320px;
                height: 200px;
                flex-shrink: 0;
                margin-bottom: 12px;
                border-radius: 8px;
                box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
                overflow: hidden;

                .card-prevew {
                    width: 100%;
                    height: 140px;
                    overflow: hidden;
                    background: #ffffffa9;
                    flex-grow: 0;
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

        .card-recent {
            height: calc(100vh - 600px);
        }

        .template {
            flex-wrap: nowrap;
            overflow: auto;
            scrollbar-width: none;
        }
    }
}
</style>