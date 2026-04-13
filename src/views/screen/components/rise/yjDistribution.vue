<template>
    <div class="trend" ref="trend"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';
import * as echarts from 'echarts';
import { GetYjDistribution } from '@/api/market'


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

    let countLimitUp = null;
    let countChange79 = null;
    let countChange37 = null;
    let countChange03 = null;
    let countChangeMinus30 = null;
    let countChangeMinus93 = null;
    let countLimitDown = null;

    const params = {
        marketValue: null,
        trendParam: trendParam
    };

    try {
        const { code, data, message } = await GetYjDistribution(params)
        countLimitUp = data[0].countLimitUp;
        countChange79 = data[0].countChange79;
        countChange37 = data[0].countChange37;
        countChange03 = data[0].countChange03;
        countChangeMinus30 = data[0].countChangeMinus30;
        countChangeMinus93 = data[0].countChangeMinus93;
        countLimitDown = data[0].countLimitDown;

        console.log(data);

        // 获取ECharts实例（如果已存在）
        if (mytrend) {
            // 更新图表数据
            mytrend.setOption({
                series: [
                    {
                        data: [
                            {
                                value: countLimitUp,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChange79,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChange37,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChange03,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChangeMinus30,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: countChangeMinus93,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: countLimitDown,
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
                    text: '昨日涨停溢价分布'
                },
                xAxis: {
                    type: 'category',
                    data: ['涨停', '7%-9%', '3%-7%', '0%-3%', '-3%-0%', '-3%--9%', '跌停']
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
                                value: countLimitUp,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChange79,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChange37,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChange03,
                                itemStyle: {
                                    color: '#a90000'
                                }
                            },
                            {
                                value: countChangeMinus30,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: countChangeMinus93,
                                itemStyle: {
                                    color: '#00a900'
                                }
                            },
                            {
                                value: countLimitDown,
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