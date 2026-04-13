<template>
    <div class="trend" ref="trend"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { GetYjDistribution } from '@/api/market'

let trend = ref();

let countLimitUp = null;
let countChange79 = null;
let countChange37 = null;
let countChange03 = null;
let countChangeMinus30 = null;
let countChangeMinus93 = null;
let countLimitDown = null;

onMounted(async () => {
    try {
        const { code, data, message } = await GetYjDistribution()
        countLimitUp = data[0].countLimitUp;
        countChange79 = data[0].countChange79;
        countChange37 = data[0].countChange37;
        countChange03 = data[0].countChange03;
        countChangeMinus30 = data[0].countChangeMinus30;
        countChangeMinus93 = data[0].countChangeMinus93;
        countLimitDown = data[0].countLimitDown;
    } catch (error) {
        // 处理错误，例如显示错误消息或回退到默认数据
        console.error('Failed to fetch market data:', error);
        //marketData.value = 'Loading failed...'; // 或者其他错误提示
    }

    // TODO 定义数组获取函数 函数：根据日期获取数据
    function getHeightByDate(datesArray, targetDate) {
        return (datesArray.find(entry => entry[0] === targetDate)?.[1]) ? (datesArray.find(entry => entry[0] === targetDate)?.[1]) : '-'; // 使用可选链操作符来安全地访问数组元素
    }

    //获取echats的实例
    let mytrend = echarts.init(trend.value);

    //设置实例的配置项
    mytrend.setOption({
        title: {
            text: '晋级率分布'
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

    })

}

);

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