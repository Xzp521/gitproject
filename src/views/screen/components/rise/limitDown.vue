<template>
    <div class="trend" ref="trend"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';
import * as echarts from 'echarts';
import { GetLimitDown } from '@/api/market'

// 定义props
const props = defineProps({
    trendParam: {
        type: [Boolean], // 根据需要指定参数类型
        default: () => false // 默认值
    }
});

let trend = ref<HTMLDivElement | null>(null);
let mytrend: echarts.ECharts | null = null; // 声明ECharts实例变量

// 定义更新图表的函数
async function updateChart(trendParam) {
    if (!trend.value) return; // 确保DOM元素已挂载

    let key = [];
    let limitUpStocksCount = [];
    let limitDownStocksCount = [];
    let breakBoardStocksCount = [];

    const params = {
        marketValue: null,
        trendParam: trendParam
    };

    try {
        const { code, data, message } = await GetLimitDown(params);
        for (let i = 1; i < data.length; i++) {
            key.push(data[i].skDate);
            limitUpStocksCount.push(data[i].limitUpStocksCount);
            limitDownStocksCount.push(data[i].limitDownStocksCount);
            breakBoardStocksCount.push(data[i].breakBoardStocksCount);
        }

        // 获取ECharts实例（如果已存在）
        if (mytrend) {
            // 更新图表数据
            mytrend.setOption({
                xAxis: {
                    data: key
                },
                series: [
                    {
                        name: '炸板家数',
                        data: limitUpStocksCount
                    },
                    {
                        name: '跌停家数',
                        data: limitDownStocksCount
                    },
                    {
                        name: '涨停家数',
                        data: breakBoardStocksCount
                    }
                ]
            });
        } else {
            // 初始化ECharts实例（如果尚不存在）
            mytrend = echarts.init(trend.value);
            // 设置实例的配置项（首次加载时）
            mytrend.setOption({

                title: {
                    text: '涨跌停统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['涨停家数', '跌停家数', '炸板家数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: key
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [
                    {
                        name: '炸板家数',
                        type: 'line',
                        stack: 'Total',
                        data: breakBoardStocksCount
                    },
                    {
                        name: '跌停家数',
                        type: 'line',
                        stack: 'Total',
                        data: limitDownStocksCount
                    },
                    {
                        name: '涨停家数',
                        type: 'line',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        stack: 'Total',
                        data: limitUpStocksCount
                    }
                ]

            });
        }
    } catch (error) {
        console.error('Failed to fetch market data:', error);
    }
}

// 监听trendParam的变化
watch(() => props.trendParam, async (newValue, oldValue) => {
    console.log('trendParam changed from', oldValue, 'to', newValue);
    // 当trendParam变化时，更新图表
    await updateChart(newValue);
});

// 组件挂载时初始化图表
onMounted(async () => {
    await updateChart(false);
});

// 组件销毁时释放ECharts实例
onUnmounted(() => {
    if (mytrend) {
        mytrend.dispose(); // 释放ECharts实例
        mytrend = null; // 将实例变量置为空
    }
});

</script>

<style>
.styled-text {
    /**字体加粗 */
    font-weight: bold;
    font-size: 20px;
    /* 设置文字大小 */
    width: 100%;
    /* 设置宽度 */
    display: inline-block;
    /* 使宽度设置生效 */
    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    margin-left: 30px;
}
</style>