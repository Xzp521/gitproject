<template>

    <el-table class="custom-margin-left-table" border :data="tableData" style="width: 100%" height="350" :fit="false">
        <el-table-column fixed prop="stockCode" label="股票代码" width="180" />
        <el-table-column prop="stockName" label="股票名称" width="180" />
        <el-table-column prop="maxConsecutiveLimitCount" label="涨幅" width="200" />
        <el-table-column prop="additionalInfo" label="题材概念" width="265" />
    </el-table>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';
import { GetRencentHotStocks } from '@/api/market'

// 定义props
const props = defineProps({
    trendParam: {
        type: [Boolean], // 根据需要指定参数类型
        default: () => false // 默认值
    }
});

const tableData = ref<Array<{
        stockCode: string;
        stockName: string;
        maxConsecutiveLimitCount: number;
        additionalInfo: string;
    }>>([]);

// 定义更新图表的函数
async function updateChart(trendParam) {

    const params = {
        marketValue: null,
        trendParam: trendParam
    };

    try {
        const { code, data, message } = await GetRencentHotStocks(params)

        // 检查 code 或其他响应属性以确保请求成功（这取决于您的 API 如何报告成功或失败）
        if (code === 200 || code === 'success' ) {
            // 假设 data 是一个数组，并且每个元素都是正确的对象结构
            if (Array.isArray(data)) {
                tableData.value = data.map(item => ({
                    // 这里可以添加任何必要的转换或验证逻辑
                    stockCode: item.stockCode,
                    stockName: item.stockName,
                    maxConsecutiveLimitCount: item.maxConsecutiveLimitCount,
                    additionalInfo: item.additionalInfo ? '-' : item.additionalInfo,
                }));
            } else {
                console.error('Expected an array from the API, but got:', data);
            }
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


</script>

<style></style>