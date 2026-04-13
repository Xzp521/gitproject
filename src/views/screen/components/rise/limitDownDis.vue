<template>
    <div class="trend" ref="trend"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';
import * as echarts from 'echarts';
import { GetLimitDownDis } from '@/api/market'

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

    let limitUpCount = null;
    let actualLimitUpCount = null;
    let stLimitUpCount = null;
    let limitDownCount = null;
    let actualLimitDownCount = null;
    let stLimitDownCount = null;
    let suspendedCount = null;

    const params = {
        marketValue: null,
        trendParam: trendParam
    };

    try {
        const { code, data, message } = await GetLimitDownDis(params);
        limitUpCount = data[0].limitUpCount;
        actualLimitUpCount = data[0].actualLimitUpCount;
        stLimitUpCount = data[0].stLimitUpCount;
        limitDownCount = data[0].limitDownCount;
        actualLimitDownCount = data[0].actualLimitDownCount;
        stLimitDownCount = data[0].stLimitDownCount;
        suspendedCount = data[0].suspendedCount;

        // 获取ECharts实例（如果已存在）
        if (mytrend) {
            // 更新图表数据
            mytrend.setOption({
                series: [

                    {
                        data: [
                            {
                                value: limitUpCount,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: actualLimitUpCount,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: stLimitUpCount,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: limitDownCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: actualLimitDownCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: stLimitDownCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: suspendedCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            }
                        ],
                        type: 'bar'
                    }
                ]
            });
        } else {
            // 初始化ECharts实例（如果尚不存在）
            mytrend = echarts.init(trend.value);
            // 设置实例的配置项（首次加载时）
            mytrend.setOption({

                title: {
                    text: '涨跌停分布'
                },
                xAxis: {
                    type: 'category',
                    data: ['涨停数量', '自然涨停', 'ST涨停量', '跌停数量', '自然跌停', 'ST跌停量', '停牌数量']
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [
                    {
                        data: [
                            {
                                value: limitUpCount,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: actualLimitUpCount,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: stLimitUpCount,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: limitDownCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: actualLimitDownCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: stLimitDownCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: suspendedCount,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            }
                        ],
                        type: 'bar'
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