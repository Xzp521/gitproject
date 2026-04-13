<template>
    <div class="trend" ref="trend"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';
import * as echarts from 'echarts';
import { GetStockLimitDown } from '@/api/market'

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

    let timeSlot = [];
    let upLimitCount = [];
    let upLimitBreakCount = [];
    let downLimitCount = [];
    let downLimitBreakCount = [];

    const params = {
        marketValue: null,
        trendParam: trendParam
    };

    try {
        const { code, data, message } = await GetStockLimitDown(params);
        for (let i = 0; i < data.length; i++) {
            timeSlot.push(data[i].timeSlot);
            upLimitCount.push(data[i].upLimitCount);
            upLimitBreakCount.push(data[i].upLimitBreakCount);
            downLimitCount.push(data[i].downLimitCount);
            downLimitBreakCount.push(data[i].downLimitBreakCount);
        }

        // 获取ECharts实例（如果已存在）
        if (mytrend) {
            // 更新图表数据
            mytrend.setOption({
                xAxis: {
                    data: timeSlot
                },
                series: [
                    {
                        name: '跌停炸板',
                        data: downLimitBreakCount
                    },
                    {
                        name: '跌停数量',
                        data: downLimitCount
                    },
                    {
                        name: '涨停炸板',
                        data: upLimitBreakCount
                    },
                    {
                        name: '涨停数量',
                        data: upLimitCount
                    }
                ]
            });
        } else {
            // 初始化ECharts实例（如果尚不存在）
            mytrend = echarts.init(trend.value);
            // 设置实例的配置项（首次加载时）
            mytrend.setOption({
                title: {
                    text: '股票涨跌停'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['涨停数量', '涨停炸板', '跌停数量', '跌停炸板']
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: timeSlot
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                        offset: 0,
                        axisLine: {
                            lineStyle: {
                                color: '#5470C6'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '跌停炸板',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: downLimitBreakCount
                    },
                    {
                        name: '跌停数量',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: downLimitCount
                    },
                    {
                        name: '涨停炸板',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: upLimitBreakCount
                    },
                    {
                        name: '涨停数量',
                        type: 'line',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: upLimitCount
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