<template>
    <div>
        <div class="styled-text-table">连版天梯</div>
        <div class="table-class">
            <span class="left-table">昨日高度：4</span>
            <span class="left-table">晋级率：{{ rate4 }}%</span>
            <span class="left-table">溢价率：{{ yjRate4 }}%</span>
            <el-table :data="tableData4" border style="width: 100%">
                <el-table-column prop="stockCode" label="股票代码" width="150" />
                <el-table-column prop="stockName" label="股票名称" width="150" />
                <el-table-column prop="reasonLimit" label="涨停原因" width="200" />
                <el-table-column prop="stockCode" label="昨日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="昨日开盘量" width="150" />
                <el-table-column prop="stockName" label="昨日涨停时间" width="150" />
                <el-table-column prop="stockName" label="昨日封单量" width="150" />
                <el-table-column prop="stockName" label="今日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="今日开盘量" width="150" />
                <el-table-column prop="stockName" label="今日涨幅" width="150" />
                <el-table-column prop="isLimit" label="晋级结果" width="150" />
                <el-table-column prop="yesterdayChangeRate" label="涨跌幅" width="120" />
            </el-table>
        </div>
        <div class="table-class">
            <span class="left-table">昨日高度：3</span>
            <span class="left-table">晋级率：{{ rate3 }}%</span>
            <span class="left-table">溢价率：{{ yjRate3 }}%</span>
            <el-table :data="tableData3" border style="width: 100%">
                <el-table-column prop="stockCode" label="股票代码" width="150" />
                <el-table-column prop="stockName" label="股票名称" width="150" />
                <el-table-column prop="reasonLimit" label="涨停原因" width="200" />
                <el-table-column prop="stockCode" label="昨日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="昨日开盘量" width="150" />
                <el-table-column prop="stockName" label="昨日涨停时间" width="150" />
                <el-table-column prop="stockName" label="昨日封单量" width="150" />
                <el-table-column prop="stockName" label="今日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="今日开盘量" width="150" />
                <el-table-column prop="stockName" label="今日涨幅" width="150" />
                <el-table-column prop="isLimit" label="晋级结果" width="150" />
                <el-table-column prop="yesterdayChangeRate" label="涨跌幅" width="120" />
            </el-table>
        </div>
        <div class="table-class">
            <span class="left-table">昨日高度：2</span>
            <span class="left-table">晋级率：{{ rate2 }}%</span>
            <span class="left-table">溢价率：{{ yjRate2 }}%</span>
            <el-table :data="tableData2" border style="width: 100%">
                <el-table-column prop="stockCode" label="股票代码" width="150" />
                <el-table-column prop="stockName" label="股票名称" width="150" />
                <el-table-column prop="reasonLimit" label="涨停原因" width="200" />
                <el-table-column prop="stockCode" label="昨日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="昨日开盘量" width="150" />
                <el-table-column prop="stockName" label="昨日涨停时间" width="150" />
                <el-table-column prop="stockName" label="昨日封单量" width="150" />
                <el-table-column prop="stockName" label="今日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="今日开盘量" width="150" />
                <el-table-column prop="stockName" label="今日涨幅" width="150" />
                <el-table-column prop="isLimit" label="晋级结果" width="150" />
                <el-table-column prop="yesterdayChangeRate" label="涨跌幅" width="120" />
            </el-table>
        </div>
        <div class="table-class">
            <span class="left-table">昨日高度：1</span>
            <span class="left-table">晋级率：{{ rate1 }}%</span>
            <span class="left-table">溢价率：{{ yjRate1 }}%</span>
            <el-table :data="tableData1" border style="width: 100%">
                <el-table-column prop="stockCode" label="股票代码" width="150" />
                <el-table-column prop="stockName" label="股票名称" width="150" />
                <el-table-column prop="reasonLimit" label="涨停原因" width="200" />
                <el-table-column prop="stockCode" label="昨日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="昨日开盘量" width="150" />
                <el-table-column prop="stockName" label="昨日涨停时间" width="150" />
                <el-table-column prop="stockName" label="昨日封单量" width="150" />
                <el-table-column prop="stockName" label="今日开盘涨幅" width="150" />
                <el-table-column prop="stockName" label="今日开盘量" width="150" />
                <el-table-column prop="stockName" label="今日涨幅" width="150" />
                <el-table-column prop="isLimit" label="晋级结果" width="150" />
                <el-table-column prop="yesterdayChangeRate" label="涨跌幅" width="120" />
            </el-table>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';
import { GetConnectedBoardLadder } from '@/api/market'

// 定义props
const props = defineProps({
    trendParam: {
        type: [Boolean], // 根据需要指定参数类型
        default: () => false // 默认值
    }
});

const tableData4 = ref<Array<{
    stockCode: string;
    stockName: string;
    reasonLimit: string;
    isLimit: string;
    yesterdayChangeRate: number;
}>>([]);

const rate4 = ref();
const yjRate4 = ref();

const tableData3 = ref<Array<{
    stockCode: string;
    stockName: string;
    reasonLimit: string;
    isLimit: string;
    yesterdayChangeRate: number;
}>>([]);

const rate3 = ref();
const yjRate3 = ref();

const tableData2 = ref<Array<{
    stockCode: string;
    stockName: string;
    reasonLimit: string;
    isLimit: string;
    yesterdayChangeRate: number;
}>>([]);

const rate2 = ref();
const yjRate2 = ref();

const tableData1 = ref<Array<{
    stockCode: string;
    stockName: string;
    reasonLimit: string;
    isLimit: string;
    yesterdayChangeRate: number;
}>>([]);

const rate1 = ref();
const yjRate1 = ref();


//计算晋级率
function getPromotedRate(table) {
    const successfulItems = table.value.filter(item => item.isLimit === '成功');
    const totalItems = table.value.length;

    // 避免除以零的错误
    if (totalItems === 0) {
        return '0.00%';
    }

    // 计算百分比并保留两位小数
    const percentage = (successfulItems.length / totalItems) * 100;
    return percentage.toFixed(2);
}

//计算溢价率
function getPremiumRate(table) {
    const yesterdayChangeRateSum = table.value.reduce((total, item) => {
        return total + item.yesterdayChangeRate;
    }, 0);
    const totalItems = table.value.length;

    // 避免除以零的错误
    if (totalItems === 0) {
        return '0.00%';
    }

    const percentage = (yesterdayChangeRateSum / totalItems);
    return percentage.toFixed(2);
}

// 定义更新图表的函数
async function updateChart(trendParam) {

    const params = {
        marketValue: null,
        trendParam: trendParam
    };

    try {
        const { code, data, message } = await GetConnectedBoardLadder(params)

        // 检查 code 或其他响应属性以确保请求成功（这取决于您的 API 如何报告成功或失败）
        if (code === 200 || code === 'success') {
            // 假设 data 是一个数组，并且每个元素都是正确的对象结构
            if (Array.isArray(data)) {

                tableData4.value = data
                    .filter(item => item.consecutiveLimitDays > '4')
                    .map(item => ({
                        // 这里可以添加任何必要的转换或验证逻辑
                        stockCode: item.stockCode,
                        stockName: item.stockName,
                        reasonLimit: item.reasonLimit ? '-' : item.reasonLimit,
                        isLimit: item.isLimit ? '成功' : '失败',
                        yesterdayChangeRate: item.yesterdayChangeRate,
                    }));

                // 计算 isLimit 为 '成功' 的元素所占的百分比
                rate4.value = getPromotedRate(tableData4);
                yjRate4.value = getPremiumRate(tableData4);

                tableData3.value = data
                    .filter(item => item.consecutiveLimitDays = '3')
                    .map(item => ({
                        // 这里可以添加任何必要的转换或验证逻辑
                        stockCode: item.stockCode,
                        stockName: item.stockName,
                        reasonLimit: item.reasonLimit ? '-' : item.reasonLimit,
                        isLimit: item.isLimit ? '成功' : '失败',
                        yesterdayChangeRate: item.yesterdayChangeRate,
                    }));

                rate3.value = getPromotedRate(tableData3);
                yjRate3.value = getPremiumRate(tableData3);

                tableData2.value = data
                    .filter(item => item.consecutiveLimitDays = '2')
                    .map(item => ({
                        // 这里可以添加任何必要的转换或验证逻辑
                        stockCode: item.stockCode,
                        stockName: item.stockName,
                        reasonLimit: item.reasonLimit ? '-' : item.reasonLimit,
                        isLimit: item.isLimit ? '成功' : '失败',
                        yesterdayChangeRate: item.yesterdayChangeRate,
                    }));

                rate2.value = getPromotedRate(tableData2);
                yjRate2.value = getPremiumRate(tableData2);

                tableData1.value = data
                    .filter(item => item.consecutiveLimitDays = '1')
                    .map(item => ({
                        stockCode: item.stockCode,
                        stockName: item.stockName,
                        reasonLimit: item.reasonLimit ? '-' : item.reasonLimit,
                        isLimit: item.isLimit ? '成功' : '失败',
                        yesterdayChangeRate: item.yesterdayChangeRate,
                    }));

                rate1.value = getPromotedRate(tableData1);
                yjRate1.value = getPremiumRate(tableData1);

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

<style>
.styled-text-table {
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
}

.left-table {
    font-size: 20px;
    margin-right: 20px;
}

.table-class {
    margin-bottom: 20px;
}
</style>