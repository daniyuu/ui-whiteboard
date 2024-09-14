<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="search-node">
        <div class="card-body" @click="handleClick">
            <div class="search-website">
                <div class="web-icon">
                    <div class="icon">
                        <i class="bi bi-bing"></i>
                    </div>
                </div>
                <div class="web-info">
                    <div class="domain">{{ data.domain }}</div>
                    <div class="search-url" target="_blank"><a :href="data.url">{{ data.url }}</a></div>
                </div>
            </div>
            <div class="search-name"><a target="_blank" :href="data.url">{{ data.name }}</a></div>
            <div class="search-snapshot">
                <span class="web-icon">WEB</span>
                {{ data.snippet }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const textarea = ref(null)
defineProps({
    data: {
        type: Object,
        default() {
            return {
                name: '2024西藏旅游纯干货攻略，个人亲测 - 知乎 | 知乎专栏',
                url: "https://zhuanlan.zhihu.com/p/690247262",
                snippet: '1.布达拉宫：西藏首选，位于拉萨，建于松赞干布时期，距…费，价格约2000元，含吃住行门票，导游负责细心，想去西藏可免费咨询。 旅游西藏注意事项： ...',
                domain: 'zhuanlan.zhihu.com',
                icon: 'https://www.google.com/s2/favicons?domain=zhuanlan.zhihu.com',
            }
        }
    }
})
const handleClick = () => {
    textarea.value.focus()
}



</script>
<style scoped lang="less">
.search-node {
    border-radius: 4px;
    overflow: hidden;
    padding: 0px;
    min-width: 100px;
    background: #fff;
    min-height: 60px;
    max-width: 400px;
    box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.1);

    .card-body {
        padding: 12px;
        justify-content: center;
        align-items: center;
        height: calc(100% - 24px);

        .search-website {
            display: flex;
            flex-shrink: 0;
            flex-grow: 0;

            .web-icon {
                width: 36px;
                height: 42px;
                display: flex;
                justify-content: left;
                align-items: center;

                .icon {
                    width: 28px;
                    height: 28px;
                    padding: 0px;
                    margin: 0px;
                    display: flex;
                    justify-content: center;
                    border-radius: 4px;
                    border: 1px solid #ececec;
                    background-color: #f5f5f5;
                    align-items: center;

                    i {
                        font-size: 16px;
                    }
                }
            }

            .web-info {
                width: calc(100% - 36px);
                font-size: 14px;

                .domain {
                    display: block;
                    text-overflow: ellipsis;
                    color: #111;
                    line-height: 20px;
                    height: 20px;
                }

                .search-url {
                    display: block;
                    text-overflow: ellipsis;
                    height: 20px;
                    word-break: keep-all;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;

                    a {
                        color: #006621;
                        text-decoration: none;
                    }

                    line-height: 20px;
                }
            }
        }

        .search-name {
            a {
                color: #4007a2;
                margin-top: 8px;
                font-size: 20px;
                text-decoration: none;
            }
        }

        .search-snapshot {
            margin-top: 2px;
            font-size: 12px;
            line-height: 14px;
            color: #71777d;

            .web-icon {
                margin-right: 2px;
                border: 1px solid #ececec;
                color: #666;
                padding: 1px 4px;
                font-size: 10px;
                vertical-align: middle;
                line-height: 11px;
                border-radius: 2px;
                margin-bottom: 3px;
            }
        }
    }

}
</style>