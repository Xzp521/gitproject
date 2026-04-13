<template>
    <div class="m-4">
        <el-cascader v-model="value" :options="options" @change="handleChange" />
    </div>
    <div class="trend" ref="trendRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';
import * as echarts from 'echarts';
import { GetContinuityTrend } from '@/api/market'

const value = ref(['0'])

const options = [
    {
        value: '0',
        label: '全市场',
    },
    {
        value: '1',
        label: '沪市主板',
    },
    {
        value: '2',
        label: '深市主板',
    },
    {
        value: '3',
        label: '深市创业板',
    }
]

// const handleChange = (value) => {
//     console.log(value)
// }

let heigth = [];
let low = [];
let ztNav = [];
let dtNav = [];
let zbNav = [];
let heigthCodes = [];
let heigthNames = [];
let lowCodes = [];
let lowNames = [];
// let trend = ref();

//修改趋势图容器的引用‌：将原本使用 ref 获取趋势图容器的引用从 trend 改为 trendRef，以避免与 Vue 的内置 ref 函数冲突，并明确其类型。
const trendRef = ref<HTMLDivElement | null>(null);



// 封装数据获取函数
const fetchData = async (newVal, trendParam) => {
    try {
        const params = {
            marketValue: newVal,
            trendParam : trendParam
        };
        //console.log("params",params);
        const { code, data, message } = await GetContinuityTrend(params);
        heigth = data.map(item => [item.skDate, item.height]);
        low = data.map(item => [item.skDate, item.low]);
        ztNav = data.map(item => [item.skDate, item.ztNav]);
        dtNav = data.map(item => [item.skDate, item.dtNav]);
        zbNav = data.map(item => [item.skDate, item.zbNav]);
        heigthCodes = data.map(item => [item.skDate, item.hcode]);
        heigthNames = data.map(item => [item.skDate, item.hname]);
        lowCodes = data.map(item => [item.skDate, item.lcode]);
        lowNames = data.map(item => [item.skDate, item.lname]);
        // 更新图表
        updateChart();
    } catch (error) {
        console.error('Failed to fetch market data:', error);
    }
};

function getHeightByDate(datesArray, targetDate) {
    return (datesArray.find(entry => entry[0] === targetDate)?.[1]) ? (datesArray.find(entry => entry[0] === targetDate)?.[1]) : '-'; // 使用可选链操作符来安全地访问数组元素
}

// 更新图表的函数
const updateChart = () => {
    if (trendRef.value) {
        const mytrend = echarts.init(trendRef.value);

        // 设置实例的配置项（保持不变）
        // TODO 定义数组获取函数 函数：根据日期获取数据

        mytrend.setOption({

            title: {
                text: '连板高度趋势'
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            tooltip: {
                trigger: 'axis', // 触发类型，'axis' 表示基于坐标轴触发
                axisPointer: { // 坐标轴指示器，默认在 tooltip 触发时显示
                    type: 'cross' // 默认为阴影指示器 shadow，其他类型如 'line'、'cross' 也可用
                },
                show: true, // 是否显示 tooltip，默认为 true
                showContent: true, // 是否显示 tooltip 的内容，默认为 true（在某些情况下，可能只显示坐标轴指示器而不显示内容）
                triggerOn: 'mousemove|click', // 触发 tooltip 显示的事件，默认为 'mousemove'，也可以设置为 'click' 或 'mousemove|click'
                hideDelay: 100, // 隐藏 tooltip 的延迟时间（毫秒），默认为 100
                backgroundColor: 'rgba(50, 50, 50, 0.7)', // tooltip 背景的颜色，默认为半透明的黑色
                borderColor: '#ccc', // tooltip 边框的颜色，默认为浅灰色
                borderWidth: 1, // tooltip 边框的宽度，默认为 1
                textStyle: { // tooltip 文本的样式
                    color: '#fff', // 文本颜色，默认为白色
                    fontSize: 14, // 字体大小，默认为 14
                    fontWeight: 'normal', // 字体粗细，默认为 'normal'
                    fontFamily: 'sans-serif' // 字体家族，默认为 'sans-serif'
                },
                formatter: function (params) {

                    let result = '数据日期 ：' + params[0].axisValueLabel + '<br/>';

                    result += `最高板高度: ${getHeightByDate(heigth, params[0].axisValueLabel)} 板<br/>`;
                    result += `最高板代码: ${getHeightByDate(heigthCodes, params[0].axisValueLabel)}<br/>`;
                    result += `最高板名称: ${getHeightByDate(heigthNames, params[0].axisValueLabel)}<br/>`;
                    result += `次高板高度: ${getHeightByDate(low, params[0].axisValueLabel)} <br/>`;
                    result += `次高板代码: ${getHeightByDate(lowCodes, params[0].axisValueLabel)} <br/>`;
                    result += `次高板名称: ${getHeightByDate(lowNames, params[0].axisValueLabel)} <br/>`;
                    result += `涨停金额: ${getHeightByDate(ztNav, params[0].axisValueLabel)}  亿<br/>`;
                    result += `跌停金额: ${getHeightByDate(dtNav, params[0].axisValueLabel)}  亿<br/>`;
                    result += `炸板金额: ${getHeightByDate(zbNav, params[0].axisValueLabel)}  亿<br/>`;

                    var tooltipContent = '';
                    params.forEach(function (item) {
                        // 展示系列名称

                        tooltipContent += item.axisValueLabel + '<br/>';

                        // 展示非轴线数据（假设数据点中包含名为extra的字段）
                        if (item.data && item.data.extra) {
                            tooltipContent += '额外信息: ' + item.data.extra + '<br/>';
                        } else if (item.extra) { // 另一种可能的数据结构
                            tooltipContent += '额外信息: ' + item.extra + '<br/>';
                        }

                        // 添加分隔符以区分不同数据点的信息
                        tooltipContent += '<br/>';
                    });

                    // 去除最后一个多余的换行符
                    tooltipContent = tooltipContent.slice(0, -4);

                    return result;
                }

            },
            legend: {
                data: ['最高板高度', '次高板高度', '涨停金额', '跌停金额', '炸板金额']
            },
            grid: {
                left: '3%',  // 增加左侧边距
                right: '4%', // 增加右侧边距
                bottom: '14%',  // 增加底部边距（通常用于留出X轴标签的空间）
                containLabel: true
            },
            toolbox: {
                // feature: {
                //     saveAsImage: {}  去掉下载按钮
                // }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false
            },
            yAxis: [
                {
                    type: 'value',
                    name: '最高版高度',
                    position: 'left',
                    offset: 0,
                    axisLine: {
                        lineStyle: {
                            color: '#5470C6'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} 个'
                    }
                },
                {
                    type: 'value',
                    name: '涨停金额',
                    position: 'right',
                    offset: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#91CC75'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} 亿元'
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    start: 0,
                    end: 20
                }
            ],
            series: [
                {
                    name: '最高板高度',
                    type: 'line',
                    yAxisIndex: 0, // 指定使用第一个Y轴（左侧）
                    symbol: 'none',  //去掉折线拐点图形
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: heigth

                },
                {
                    name: '次高板高度',
                    type: 'line',
                    yAxisIndex: 0, // 指定使用第二个Y轴（右侧）
                    symbol: 'none',
                    data: low
                },
                {
                    name: '涨停金额',
                    type: 'line',
                    yAxisIndex: 1, // 指定使用第二个Y轴（右侧）
                    symbol: 'none',
                    data: ztNav
                },
                {
                    name: '跌停金额',
                    type: 'line',
                    yAxisIndex: 1, // 指定使用第二个Y轴（右侧）
                    symbol: 'none',
                    data: dtNav
                },
                {
                    name: '炸板金额',
                    type: 'line',
                    yAxisIndex: 1, // 指定使用第二个Y轴（右侧）
                    symbol: 'none',
                    data: zbNav
                }

            ]

        });
    }
};

// 定义props
const props = defineProps({
  trendParam: {
    type: [Boolean], // 根据需要指定参数类型
    default: () => false // 默认值
  }
});

// 监控trendParam参数变化
// watch(() => props.trendParam,async (newValue, oldValue) => {
//   console.log('trendParam changed from', oldValue, 'to', newValue);
//   // 在这里执行你想要的逻辑，比如更新其他数据或状态
//   if (newValue !== oldValue) {
//         await fetchData(newVal[0]);
//     }
// });

// 监听 value 的变化，并在变化时重新获取数据
// watch(value, async (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         await fetchData(newVal[0]);
//     }
// });

// 使用一个函数返回包含两个参数的对象来同时监听它们
watch(
  () => ({ trendParam: props.trendParam, value: value.value }),
  async (newValues, oldValues) => {
    const { trendParam: newTrendParam, value: newValue } = newValues;
    const { trendParam: oldTrendParam, value: oldValue } = oldValues;
 
    // 检查是哪个参数发生了变化，或者是否两者都发生了变化
    if (newTrendParam !== oldTrendParam) {
      //console.log('trendParam changed',newTrendParam);
      await fetchData(newValue[0],newTrendParam); // 注意：这里传递的是布尔值，可能不是 fetchData 预期的参数类型
    }
    if (newValue !== oldValue) {
      //console.log('value changed',newValue);
      await fetchData(newValue[0],newTrendParam); // 假设 newValue 是一个数组，且你想传递数组的第一个元素
    }
    
    // 如果需要在两个参数都变化时执行特定逻辑，可以在这里添加额外的条件检查
  },
  { deep: true } // 由于我们监听的是一个对象，需要开启深度监听来检测内部属性的变化
);

// 组件挂载后调用数据获取函数
onMounted(async () => {
    await fetchData('0',false);
});

const handleChange = (newValue: any[]) => {
    // 这里不需要额外处理，因为 watch 已经监听了 value 的变化
    //console.log(newValue); // 可以保留用于调试
};
</script>

<style>
.trend {
    padding: 10px 20px;
    height: 350px;

    .left {
        text-align: left;
        color: #000;
        padding: 15px 245px;
    }
}

.m-4 {
    text-align: right;
    margin-right: 100px;
}
</style>