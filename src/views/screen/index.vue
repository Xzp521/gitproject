<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="center">
                    <div class="switch-container"><el-switch v-model="value1" class="mb-2" 
                         active-text="剔除一字板"
                        inactive-text="" @change="handleSwitchChange"/></div>
                    <Wind></Wind>
                    <Trend :trendParam="trendData"></Trend>
                    <Rise :trendParam="trendData"></Rise>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//映入顶部
import Top from './components/top/index.vue';
//引入底部行情信息
import Wind from './components/wind/index.vue';
//引入连版高度趋势
import Trend from './components/trend/index.vue';
//引入近十五日晋级
import Rise from './components/rise/index.vue';

// 定义要传递给 Trend 组件的参数
const trendData = ref(false);
const value1 = ref(false);

// 当开关状态改变时，这个函数会被调用
function handleSwitchChange() {
  trendData.value=value1.value;
}


//获取数据展示大屏的dom元素
let screen = ref();

onMounted(() => {
    //拉回中间位置
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
});

//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}

//监听视口的变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #fff;
    background-size: cover;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: transparent;
        pointer-events: none;
    }

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        overflow-y: auto;
        background: #fff;
        /* 允许垂直滚动 */

        .top {
            width: 100%;
            height: 104px;
        }

        .bottom {
            display: flex;
            width: 100%;
            //height: calc(100% - 70px);  /* 确保底部区域不包括顶部的高度 */

            .center {
                flex: 1;
                //height: 1010px;
                // background: rgb(59, 162, 102);

                .switch-container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding: 8px 100px 8px 0;
                    color: #cbe5ff;

                    :deep(.el-switch__label) {
                        color: #9dc7ff;
                    }

                    :deep(.el-switch__label.is-active) {
                        color: #eff7ff;
                    }

                    :deep(.el-switch__core) {
                        border-color: rgba(102, 180, 255, 0.65);
                        background: rgba(15, 42, 104, 0.85);
                        box-shadow: inset 0 0 10px rgba(73, 170, 255, 0.22);
                    }

                    :deep(.el-switch.is-checked .el-switch__core) {
                        background: linear-gradient(90deg, #1654e8, #3fb9ff);
                    }
                }
            }
        }
    }
}
</style>
