<template>
  <div class="low">
    <span class="left">上证指数：{{ szMarketData }}</span>
    <span class="conter">深圳指数：{{ ssMarketData }}</span>
    <span class="right">沪深指数：{{ hsMarketData }}</span>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FindMarket } from '@/api/market'

const value1 = ref(true)

export default {
  name: 'MarketInfo',
  setup() {
    const marketData = ref(null); // 使用 ref 创建响应式数据
    const szMarketData = ref(null); // 使用 ref 创建响应式数据
    const ssMarketData = ref(null); // 使用 ref 创建响应式数据
    const hsMarketData = ref(null); // 使用 ref 创建响应式数据

    // 在组件挂载后调用 FindMarket 函数
    onMounted(async () => {
      try {
        const { code, data, message } = await FindMarket()
        marketData.value = data.categoryList; // 假设后端返回的是一个字符串或可以直接显示的格式
        // 提取第一个项目
        if (marketData.value.length > 0) {
          szMarketData.value = marketData.value[0].close;
          ssMarketData.value = marketData.value[1].close;
          hsMarketData.value = marketData.value[2].close;
        }
      } catch (error) {
        // 处理错误，例如显示错误消息或回退到默认数据
        console.error('Failed to fetch market data:', error);
        marketData.value = 'Loading failed...'; // 或者其他错误提示
      }
    });

    return {
      szMarketData, // 返回给模板使用的响应式数据
      ssMarketData,
      hsMarketData,
    };
  },
};

</script>

<style>
.low {
  font-size: 20px;

  padding: 10px 20px;
  height: 30px;

  .left {
    text-align: left;
    color: #000;
    padding: 15px 245px;
  }

  .center {
    text-align: center;
    padding: 0px 245px;
  }

  .right {
    text-align: right;
    padding: 0px 245px;
  }

}
</style>


<!-- 
<template>
  <div>
    定时刷新
    <div v-for="market in markets" :key="market.id">
      {{ market.name }} - {{ market.price }}
    </div>
  </div>
</template>
 
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
 
export default {
  name: 'MarketData',
  setup() {
    const markets = ref([]); // 用于存储市场数据的响应式引用
    let intervalId = null; // 用于存储setInterval的ID，以便稍后清除
 
    // 异步函数，模拟从API获取市场数据
    const FindMarket = async () => {
      try {
        // 这里应该是你的API调用逻辑
        // 例如：const response = await fetchMarketDataAPI();
        // 但为了演示，我们直接返回一个模拟的数据数组
        const mockData = [
          { id: 1, name: 'Market A', price: 100 },
          { id: 2, name: 'Market B', price: 200 },
          // ...更多数据
        ];
        markets.value = mockData; // 更新市场数据
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      }
    };
 
    // 定义一个函数来启动定时刷新
    const startRefreshing = () => {
      intervalId = setInterval(async () => {
        await FindMarket(); // 等待FindMarket完成
      }, 5000); // 每5秒刷新一次
    };
 
    // 在组件挂载时启动定时刷新
    onMounted(() => {
      startRefreshing();
    });
 
    // 在组件卸载前清除定时刷新
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });
 
    // 返回需要暴露给模板的响应式数据
    return {
      markets,
    };
  },
};
</script>
-->