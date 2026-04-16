<template>
  <div class="topic-page">
    <div class="topic-grid"></div>
    <div class="topic-shell" ref="screenRef">
      <Top theme="dark" title="司南系统 · 管理驾驶舱" />

      <div class="topic-bg"></div>
      <section class="core-layout fade-in-up">
        <aside class="side left">
          <article class="panel panel-market">
            <header class="panel-header"><span>市场行情</span><i class="header-dot"></i></header>
            <table class="market-table">
              <thead>
                <tr>
                  <th>指数名称</th>
                  <th>上证</th>
                  <th>深证</th>
                  <th>沪深300</th>
                  <th>中证1000</th>
                  <th>创业板</th>
                  <th>科创50</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>上日(%)</td>
                  <td class="up">4.67</td>
                  <td class="up">5.23</td>
                  <td class="down">-2.63</td>
                  <td class="up">7.10</td>
                  <td class="up">3.42</td>
                  <td class="up">9.82</td>
                </tr>
                <tr>
                  <td>当季(%)</td>
                  <td class="up">3.63</td>
                  <td class="up">8.91</td>
                  <td class="up">4.63</td>
                  <td class="up">8.11</td>
                  <td class="up">9.64</td>
                  <td class="down">-2.25</td>
                </tr>
                <tr>
                  <td>当年(%)</td>
                  <td class="down">-3.63</td>
                  <td class="up">8.91</td>
                  <td class="up">4.63</td>
                  <td class="up">4.63</td>
                  <td class="up">9.64</td>
                  <td class="up">2.25</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article class="panel panel-sentiment">
            <header class="panel-header"><span>舆情检测</span><i class="header-dot"></i></header>
            <div class="word-cloud">
              <span class="w-xl hot">中国恒大</span>
              <span class="w-l">世茂集团</span>
              <span class="w-m">京东集团</span>
              <span class="w-m">三只松鼠</span>
              <span class="w-m">美团</span>
              <span class="w-s">滴滴</span>
              <span class="w-s">阿里巴巴</span>
              <span class="w-s">快手</span>
              <span class="w-s">紫光集团</span>
              <span class="w-s">阳光城</span>
              <span class="w-s">格力电器</span>
            </div>
          </article>

          <article class="panel panel-honor">
            <header class="panel-header"><span>公司荣誉</span><i class="header-dot"></i></header>
            <ul class="honor-list">
              <li>
                <span class="medal">🏅</span>
                <span class="title">2022最佳信息创新ETF指数基金经理-刘伟琳</span>
                <span class="year">2022年</span>
              </li>
              <li>
                <span class="medal">🏅</span>
                <span class="title">第二届中国公募基金英华奖-2019年度最佳创新基金产品</span>
                <span class="year">2019年</span>
              </li>
            </ul>
          </article>
        </aside>

        <main class="center">
          <div class="center-stage">
            <div class="center-stage-bg"></div>
            <div class="radar-ring ring-a"></div>
            <div class="radar-ring ring-b"></div>

            <div
              v-for="(item, index) in displayedOrbitMetrics"
              :key="`${centerMetricIndex}-${item.key}`"
              class="orbit-bubble"
              :class="[item.slot, { active: index === 0 }]"
            >
              <strong>{{ item.value }}</strong>
              <em v-if="item.valueSub">{{ item.valueSub }}</em>
              <span>{{ item.label }}</span>
            </div>

            <div class="main-bubble">
              <div class="main-bubble__inner">
                <strong>{{ coreMetric.value }}</strong>
                <em v-if="coreMetric.valueSub" class="main-bubble__sub">{{ coreMetric.valueSub }}</em>
                <span>{{ coreMetric.label }}</span>
              </div>
            </div>
          </div>

          <div class="growth-row">
            <div class="growth-card good">
              <em>-1.75%</em>
              <strong>-310亿</strong>
              <span>较月初增长</span>
            </div>
            <div class="growth-card risk">
              <em>3.85%</em>
              <strong>+689亿</strong>
              <span>较季初增长</span>
            </div>
            <div class="growth-card risk">
              <em>4.33%</em>
              <strong>+771亿</strong>
              <span>较年初增长</span>
            </div>
          </div>
        </main>

        <aside class="side right">
          <article class="panel panel-focus">
            <header class="panel-header"><span>特别关注</span><i class="header-dot"></i></header>
            <div class="focus-grid">
              <span>养老金Y份额产品销量</span><b>2,748万元</b>
              <span>工商银行</span><b>2,060万元</b>
              <span>产品发行累计销量</span><b>4.4亿元</b>
              <span>工商银行累计</span><b>3.25亿元</b>
            </div>
          </article>

          <article class="panel panel-products">
            <header class="panel-header"><span>募集中产品 2只</span><i class="header-dot"></i></header>
            <div class="product-grid">
              <div class="product-item">
                <h4>工银行业优选混合A（张经理）</h4>
                <div class="meta-row">
                  <span><img src="./topic-images/icon-period.png" alt="" />募集期</span>
                  <span><img src="./topic-images/icon-progress.png" alt="" />进度</span>
                </div>
                <div class="meta-row strong">
                  <b>05/25-06/30</b>
                  <b>2.00亿元</b>
                </div>
              </div>
              <div class="product-item">
                <h4>工银行业优选混合B（张经理）</h4>
                <div class="meta-row">
                  <span><img src="./topic-images/icon-period.png" alt="" />募集期</span>
                  <span><img src="./topic-images/icon-progress.png" alt="" />进度</span>
                </div>
                <div class="meta-row strong">
                  <b>05/25-06/30</b>
                  <b>34.00亿元</b>
                </div>
              </div>
            </div>
          </article>

          <article class="panel panel-mini">
            <header class="panel-header"><span>迷你基金 2只</span><i class="header-dot"></i></header>
            <div class="mini-table">
              <div><span>XXX创新基金</span><b>5,200万元（-150万元）</b><i>主动权益</i></div>
              <div><span>XXX概念基金</span><b>4,600万元（+100万元）</b><i>主动权益</i></div>
            </div>
          </article>

          <article class="panel panel-liquidity">
            <header class="panel-header"><span>货币基金流动性 7只</span><i class="header-dot"></i></header>
            <div class="mini-table">
              <div><span>XXX稳健基金</span><b class="good">-0.02bp</b><i>112%</i></div>
              <div><span>XXX货币基金</span><b class="risk">+0.01bp</b><i>108%</i></div>
            </div>
          </article>
        </aside>
      </section>

      <section class="bottom-layout fade-in-up delay-1">
        <article class="panel chart-panel">
          <header class="panel-header"><span>选择</span><i class="header-dot"></i></header>
          <div class="panel-kpis">
            <p><span>母公司规模</span><b>15,200亿</b><em class="risk">较年初 +160亿（+10.4%）</em></p>
            <p><span>子公司规模</span><b>1545亿</b><em class="risk">较年初 +10亿（+0.8%）</em></p>
          </div>
          <div ref="sunburstRef" class="chart"></div>
        </article>

        <article class="panel chart-panel">
          <header class="panel-header"><span>公募基金</span><i class="header-dot"></i></header>
          <div class="panel-kpis">
            <p><span>保有规模</span><b>8,200亿</b><em class="risk">较年初 +100亿（+7.4%）</em></p>
            <p><span>产品数量</span><b>216亿</b><em class="risk">较年初 +10亿（+10%）</em></p>
          </div>
          <div ref="mixRef" class="chart"></div>
        </article>

        <article class="panel chart-panel">
          <header class="panel-header"><span>归因分析（当年）</span><i class="header-dot"></i></header>
          <div class="panel-kpis two-col">
            <p><span>规模变动</span><b>+170亿（+2.3%）</b></p>
            <p><span>持营</span><b>401亿</b></p>
            <p><span>新发</span><b>288亿</b></p>
            <p><span>分红</span><b>63亿</b></p>
          </div>
          <div ref="barRef" class="chart"></div>
        </article>

        <article class="panel chart-panel">
          <header class="panel-header"><span>销售（当年）</span><i class="header-dot"></i></header>
          <div class="sales-box">
            <div class="sales-top">
              <div class="sale-block">
                <strong class="risk">16,349</strong>
                <span>销售（亿）</span>
              </div>
              <div class="sale-mid">1月1日 至 4月7日</div>
              <div class="sale-block">
                <strong class="good">15,600</strong>
                <span>赎回（亿）</span>
              </div>
            </div>
            <div class="sale-arrow-wrap">
              <img src="./topic-images/sales-base-side.png" alt="" />
              <img class="arrow-icon" src="./topic-images/arrow-inflow.png" alt="" />
              <img class="flip" src="./topic-images/sales-base-side.png" alt="" />
            </div>
            <div class="target-wrap">
              <div class="target-bar"><div class="target-progress">规模增量 1000亿（50.0%）</div></div>
              <p>年度目标2000亿</p>
            </div>
          </div>
        </article>

        <article class="panel chart-panel">
          <header class="panel-header"><span>客户分布</span><i class="header-dot"></i></header>
          <div class="panel-kpis two-col">
            <p><span>机构客户</span><b>1万户</b><em class="risk">较年初 +100户</em></p>
            <p><span>个人客户</span><b>1万户</b><em class="risk">较年初 +100户</em></p>
            <p><span>持仓客户</span><b>0.8万户</b><em class="risk">较年初 +40户</em></p>
            <p><span>持仓客户</span><b>0.8万户</b><em class="risk">较年初 +40户</em></p>
          </div>
          <div ref="lineRef" class="chart"></div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import Top from './components/top/index.vue'

const screenRef = ref(null)
const sunburstRef = ref(null)
const mixRef = ref(null)
const barRef = ref(null)
const lineRef = ref(null)
const chartInstances = []
let orbitTimer = null
const centerMetricIndex = ref(0)

const metricCarousel = [
  { key: 'total', value: '17,810.23', label: '资产管理总规模（亿元）' },
  { key: 'public', value: '8,241.21', label: '公募基金规模（亿元）' },
  { key: 'nav', value: '7,345.12', label: '养老金规模（亿元）' },
  { key: 'client_account', value: '客户 1,001.23', valueSub: '账户 2.21（万）', label: '客户/账户' },
  { key: 'product', value: '928', label: '产品数量（只）' },
  { key: 'manager', value: '56', label: '基金经理（名）' },
]

const bubbleSlots = ['bubble-3', 'bubble-4', 'bubble-5', 'bubble-1', 'bubble-2']
const orbitMetricIndexes = ref(metricCarousel.slice(1).map((_, index) => index + 1))

const coreMetric = computed(() => metricCarousel[centerMetricIndex.value])
const displayedOrbitMetrics = computed(() => {
  return bubbleSlots.map((slot, index) => ({
    ...metricCarousel[orbitMetricIndexes.value[index]],
    slot,
  }))
})

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

function syncScale() {
  if (!screenRef.value) return
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

function mountChart(el, option) {
  if (!el) return
  const instance = echarts.init(el)
  instance.setOption(option)
  chartInstances.push(instance)
}

function buildCharts() {
  mountChart(sunburstRef.value, {
    series: [
      {
        type: 'sunburst',
        radius: [0, '92%'],
        sort: null,
        emphasis: { focus: 'ancestor' },
        label: { rotate: 'radial', color: '#c5e8ff', fontSize: 11 },
        itemStyle: { borderColor: '#042046', borderWidth: 2, borderRadius: 6 },
        levels: [{}, { r0: '12%', r: '36%' }, { r0: '36%', r: '66%' }, { r0: '66%', r: '92%' }],
        data: [
          {
            name: '权益',
            value: 40,
            itemStyle: { color: '#4d9fff' },
            children: [
              { name: '主动权益', value: 15, itemStyle: { color: '#63b4ff' } },
              { name: '指数增强', value: 14, itemStyle: { color: '#79c5ff' } },
              { name: '行业主题', value: 11, itemStyle: { color: '#8bd7ff' } },
            ],
          },
          {
            name: '固收',
            value: 35,
            itemStyle: { color: '#3f7dff' },
            children: [
              { name: '纯债', value: 14, itemStyle: { color: '#5796ff' } },
              { name: '偏债混合', value: 11, itemStyle: { color: '#6daeff' } },
              { name: '可转债', value: 10, itemStyle: { color: '#83c5ff' } },
            ],
          },
          {
            name: '货币',
            value: 25,
            itemStyle: { color: '#2e60df' },
            children: [
              { name: '现金管理', value: 10, itemStyle: { color: '#3f73ef' } },
              { name: '短债增强', value: 8, itemStyle: { color: '#5288ff' } },
              { name: '同业存单', value: 7, itemStyle: { color: '#66a2ff' } },
            ],
          },
        ],
      },
    ],
  })

  mountChart(mixRef.value, {
    tooltip: {
      trigger: 'axis',
      confine: true,
      backgroundColor: 'rgba(4, 27, 84, 0.95)',
      borderColor: 'rgba(89, 178, 255, 0.68)',
      textStyle: { color: '#e8f5ff' },
    },
    legend: { bottom: 2, itemWidth: 12, itemHeight: 6, data: ['保有规模', '产品数量'], textStyle: { color: '#95d2ff', fontSize: 11 } },
    grid: { top: 14, left: 36, right: 20, bottom: 34 },
    xAxis: { type: 'category', data: ['04-30', '05-31', '06-30', '07-31'], axisLabel: { color: '#83c4ff' } },
    yAxis: [
      { type: 'value', axisLabel: { color: '#83c4ff' }, splitLine: { lineStyle: { color: 'rgba(123,191,255,0.22)' } } },
      { type: 'value', axisLabel: { color: '#83c4ff' }, splitLine: { show: false } },
    ],
    series: [
      { type: 'bar', name: '保有规模', data: [7800, 7750, 7900, 8200], itemStyle: { color: '#65c8ff' } },
      { type: 'line', name: '产品数量', yAxisIndex: 1, data: [210, 212, 215, 230], smooth: true, itemStyle: { color: '#ffcf63' } },
    ],
  })

  mountChart(barRef.value, {
    tooltip: { trigger: 'axis' },
    grid: { top: 22, left: 34, right: 16, bottom: 22 },
    xAxis: { type: 'category', data: ['新发', '持营', '利润', '分红'], axisLabel: { color: '#83c4ff' } },
    yAxis: { type: 'value', axisLabel: { color: '#83c4ff' }, splitLine: { lineStyle: { color: 'rgba(123,191,255,0.2)' } } },
    series: [
      {
        type: 'bar',
        barWidth: 18,
        data: [220, 380, -202, 63],
        itemStyle: {
          color: params => (params.value >= 0 ? '#78d4ff' : '#ffb35a'),
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  })

  mountChart(lineRef.value, {
    tooltip: {
      trigger: 'item',
      confine: true,
      backgroundColor: 'rgba(4, 27, 84, 0.95)',
      borderColor: 'rgba(89, 178, 255, 0.68)',
      textStyle: { color: '#e8f5ff' },
      formatter: params => `${params.seriesName}<br/>${params.name}: ${params.value}`,
    },
    legend: { bottom: 0, itemWidth: 12, itemHeight: 6, textStyle: { color: '#9fd0ff', fontSize: 11 } },
    grid: [
      { left: '6%', right: '54%', top: 14, bottom: 40 },
      { left: '56%', right: '6%', top: 14, bottom: 40 },
    ],
    xAxis: [
      { type: 'value', gridIndex: 0, axisLabel: { color: '#83c4ff' }, splitLine: { lineStyle: { color: 'rgba(123,191,255,0.2)' } } },
      { type: 'value', gridIndex: 1, axisLabel: { color: '#83c4ff' }, splitLine: { lineStyle: { color: 'rgba(123,191,255,0.2)' } } },
    ],
    yAxis: [
      {
        type: 'category',
        gridIndex: 0,
        data: ['1000万以上', '500-1000万', '200-500万', '100-200万', '50-100万', '1-50万'],
        axisLabel: { color: '#83c4ff' },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: ['100万以上', '50-100万', '10-50万', '5-10万', '1-5万', '0.5万以下'],
        axisLabel: { color: '#83c4ff' },
      },
    ],
    series: [
      { name: '年初客户分布', type: 'line', xAxisIndex: 0, yAxisIndex: 0, smooth: true, data: [8, 12, 17, 20, 24, 28], lineStyle: { color: '#67d9ff' }, symbolSize: 6 },
      { name: '当前客户分布', type: 'line', xAxisIndex: 0, yAxisIndex: 0, smooth: true, data: [10, 14, 20, 22, 27, 30], lineStyle: { color: '#ffd668' }, symbolSize: 6 },
      { name: '年初客户数分布', type: 'line', xAxisIndex: 1, yAxisIndex: 1, smooth: true, data: [6, 10, 14, 17, 21, 24], lineStyle: { color: '#67d9ff' }, symbolSize: 6, showSymbol: true },
      { name: '当前客户数分布', type: 'line', xAxisIndex: 1, yAxisIndex: 1, smooth: true, data: [8, 12, 16, 20, 23, 27], lineStyle: { color: '#ffd668' }, symbolSize: 6, showSymbol: true },
    ],
  })
}

function resizeAll() {
  syncScale()
  chartInstances.forEach(instance => instance.resize())
}

onMounted(() => {
  syncScale()
  buildCharts()
  orbitTimer = window.setInterval(() => {
    const previousCenter = centerMetricIndex.value
    const currentOrbit = orbitMetricIndexes.value
    centerMetricIndex.value = currentOrbit[currentOrbit.length - 1]
    orbitMetricIndexes.value = [previousCenter, ...currentOrbit.slice(0, -1)]
  }, 5000)
  window.addEventListener('resize', resizeAll)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeAll)
  chartInstances.forEach(instance => instance.dispose())
  if (orbitTimer) clearInterval(orbitTimer)
})
</script>

<style scoped lang="scss">
.topic-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle at 50% 24%, rgba(50, 138, 255, 0.22), transparent 36%), linear-gradient(180deg, #06142c 0%, #081a3a 50%, #061531 100%);
}

.topic-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(85, 162, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(85, 162, 255, 0.05) 1px, transparent 1px);
  background-size: 34px 34px;
  opacity: 0.2;
  pointer-events: none;
}

.topic-shell {
  width: 1920px;
  height: 1080px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform-origin: left top;
  color: #d9eeff;
  overflow: hidden;
}

.topic-bg {
  position: absolute;
  left: 0;
  top: 104px;
  width: 1920px;
  height: 976px;
  background: url('../cockpit/images/lanhu-bg-main.png') no-repeat center -104px;
  background-size: 1920px 1080px;
  opacity: 0.32;
  pointer-events: none;
}

.core-layout {
  position: relative;
  margin-top: 6px;
  display: grid;
  grid-template-columns: 486px 924px 486px;
  gap: 12px;
  padding: 0 12px;
  height: 576px;
}

.side {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.side::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: url('../cockpit/images/lanhu-side-panel.png') no-repeat center top;
  background-size: 486px 604px;
  opacity: 0.36;
  pointer-events: none;
  z-index: 0;
}

.side > * {
  position: relative;
  z-index: 1;
}

.panel {
  border: 1px solid rgba(88, 176, 255, 0.48);
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(10, 43, 114, 0.56), rgba(7, 28, 80, 0.52));
  box-shadow: inset 0 0 18px rgba(80, 190, 255, 0.14), 0 0 14px rgba(35, 122, 243, 0.12);
  overflow: hidden;
}

.panel:hover {
  border-color: rgba(96, 217, 255, 0.88);
  box-shadow: inset 0 0 24px rgba(102, 228, 255, 0.2), 0 0 24px rgba(53, 166, 255, 0.28);
}

.panel-header {
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid rgba(90, 172, 255, 0.4);
  background: linear-gradient(90deg, rgba(16, 74, 170, 0.72), rgba(10, 46, 116, 0.42));
  font-size: 18px;
  color: #ecf8ff;
}

.header-dot {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(180deg, #7ae8ff, #2f9fff);
  box-shadow: 0 0 10px rgba(84, 206, 255, 0.6);
}

.market-table {
  width: calc(100% - 14px);
  margin: 8px 7px 10px;
  border-collapse: collapse;
  font-size: 12px;
}

.market-table th,
.market-table td {
  border: 1px solid rgba(106, 181, 255, 0.3);
  padding: 6px 3px;
  text-align: center;
}

.market-table th {
  color: #9dd3ff;
  font-weight: 500;
}

.market-table td {
  color: #d6edff;
}

.up {
  color: #ff8f8f !important;
}

.down {
  color: #60f4ad !important;
}

.word-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  padding: 8px 10px;
}

.w-xl {
  font-size: 64px;
  line-height: 1;
}

.w-l {
  font-size: 42px;
  line-height: 1;
}

.w-m {
  font-size: 30px;
  line-height: 1;
}

.w-s {
  font-size: 21px;
  line-height: 1;
}

.hot {
  color: #ff6f6f;
  text-shadow: 0 0 14px rgba(255, 116, 116, 0.48);
}

.w-l {
  color: #df84ff;
}

.w-m {
  color: #ffd76c;
}

.w-s {
  color: #69ddff;
}

.honor-list {
  list-style: none;
  margin: 0;
  padding: 5px 12px 0px;
}

.honor-list li {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 8px;
  border: 1px solid rgba(110, 185, 255, 0.3);
  background: rgba(13, 44, 112, 0.52);
  margin-bottom: 8px;
  font-size: 14px;
}

.medal {
  font-size: 14px;
}

.year {
  color: #91cbff;
}

.focus-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px 12px;
  padding: 12px;
  font-size: 15px;
}

.focus-grid span {
  color: #abd9ff;
}

.focus-grid b {
  color: #e8f7ff;
}

.product-grid {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.product-item {
  border: 1px solid rgba(108, 179, 255, 0.36);
  background: rgba(13, 46, 116, 0.54);
  padding: 8px 10px;
}

.product-item h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #ddf1ff;
}

.meta-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  font-size: 12px;
  color: #9eceff;
}

.meta-row span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-row img {
  width: 14px;
  height: 14px;
  opacity: 0.9;
}

.meta-row.strong {
  margin-top: 4px;
}

.meta-row.strong b {
  color: #dff3ff;
  font-size: 13px;
}

.mini-table {
  padding: 10px 12px 12px;
}

.mini-table div {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  font-size: 13px;
  padding: 7px 0;
  border-bottom: 1px dashed rgba(107, 180, 255, 0.24);
}

.mini-table span {
  color: #abd8ff;
}

.mini-table b {
  color: #e7f7ff;
}

.mini-table i {
  color: #94c9ff;
  font-style: normal;
}

.center-stage {
  position: relative;
  height: 466px;
  border: 1px solid rgba(85, 167, 255, 0.35);
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(8, 39, 100, 0.48), rgba(7, 28, 80, 0.36));
}

.center-stage-bg {
  position: absolute;
  inset: 0;
  background: url('../cockpit/images/lanhu-center-decor.png') no-repeat center top / 924px 525px;
  opacity: 0.95;
}

.radar-ring {
  position: absolute;
  left: 50%;
  top: 51%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(86, 179, 255, 0.28);
}

.ring-a {
  width: 538px;
  height: 538px;
}

.ring-b {
  width: 396px;
  height: 396px;
}

.main-bubble {
  position: absolute;
  left: 50%;
  top: 54%;
  width: 296px;
  height: 296px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 3px solid rgba(88, 223, 255, 0.9);
  box-shadow: inset 0 0 34px rgba(90, 221, 255, 0.28), 0 0 44px rgba(62, 176, 255, 0.52);
  animation: pulseGlow 4.8s ease-in-out infinite;
}

.main-bubble__inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: grid;
  place-content: center;
  text-align: center;
  background: radial-gradient(circle at 35% 35%, rgba(91, 216, 255, 0.2), rgba(11, 44, 118, 0.75));
}

.main-bubble strong {
  font-size: 56px;
  line-height: 1;
  color: #89ecff;
}

.main-bubble span {
  font-size: 24px;
  color: #d8f5ff;
  max-width: 210px;
}

.main-bubble__sub {
  margin-top: 6px;
  font-style: normal;
  font-size: 20px;
  color: #a9ecff;
}

.orbit-bubble {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 2px solid rgba(88, 208, 255, 0.78);
  background: radial-gradient(circle at 34% 34%, rgba(90, 214, 255, 0.22), rgba(10, 43, 112, 0.8));
  box-shadow: inset 0 0 20px rgba(92, 222, 255, 0.2), 0 0 18px rgba(63, 170, 255, 0.3);
  display: grid;
  place-content: center;
  text-align: center;
  transition:
    left 0.5s ease,
    top 0.5s ease,
    width 0.5s ease,
    height 0.5s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.orbit-bubble:hover,
.orbit-bubble.active {
  transform: scale(1.08);
  box-shadow: inset 0 0 30px rgba(108, 239, 255, 0.28), 0 0 28px rgba(86, 203, 255, 0.44);
}

.orbit-bubble strong {
  font-size: 24px;
  color: #80e9ff;
  line-height: 1;
}

.orbit-bubble em {
  display: block;
  margin-top: 3px;
  font-style: normal;
  font-size: 12px;
  color: #91ddff;
}

.orbit-bubble span {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #bde9ff;
}

.bubble-1 {
  left: 74px;
  top: 196px;
}

.bubble-2 {
  left: 196px;
  top: 56px;
}

.bubble-3 {
  left: 50%;
  top: 52px;
  width: 150px;
  height: 150px;
  transform: translateX(-50%);
}

.bubble-4 {
  right: 196px;
  top: 56px;
}

.bubble-5 {
  right: 74px;
  top: 196px;
}

.bubble-3 strong {
  font-size: 20px;
}

.bubble-3 span {
  font-size: 11px;
}

.growth-row {
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.growth-card {
  height: 98px;
  border: 1px solid rgba(92, 175, 255, 0.54);
  border-radius: 18px 18px 24px 24px;
  background: linear-gradient(180deg, rgba(11, 44, 114, 0.8), rgba(8, 28, 82, 0.72));
  display: grid;
  place-content: center;
  text-align: center;
}

.growth-card em {
  font-size: 14px;
  font-style: normal;
}

.growth-card strong {
  font-size: 34px;
  line-height: 1;
}

.growth-card span {
  font-size: 17px;
  color: #cdeeff;
}

.good {
  color: #58f0ad !important;
}

.risk {
  color: #ff8381 !important;
}

.bottom-layout {
  position: relative;
  margin-top: 6px;
  display: grid;
  grid-template-columns: 1.02fr 0.94fr 0.94fr 0.94fr 1.22fr;
  gap: 8px;
  padding: 0 12px 12px;
  height: 386px;
}

.bottom-layout::before {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  top: 0;
  height: 376px;
  background: url('../cockpit/images/lanhu-bottom-base.png') no-repeat center top;
  background-size: 1896px 396px;
  opacity: 0.22;
  pointer-events: none;
}

.chart-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.panel-kpis {
  position: relative;
  z-index: 2;
  padding: 8px 10px 2px;
  display: grid;
  gap: 4px;
}

.panel-kpis.two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 8px;
}

.panel-kpis p {
  margin: 0;
  font-size: 12px;
  color: #a8d8ff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-kpis b {
  color: #e7f7ff;
  font-size: 18px;
}

.panel-kpis em {
  font-style: normal;
  font-size: 12px;
}

.chart {
  position: relative;
  z-index: 1;
  margin-top: 4px;
  flex: 1;
  min-height: 150px;
}

.sales-box {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.sales-top {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 8px;
}

.sale-block {
  text-align: center;
}

.sale-block strong {
  display: block;
  font-size: 40px;
  line-height: 1;
}

.sale-block span {
  font-size: 16px;
  color: #cfe9ff;
}

.sale-mid {
  font-size: 14px;
  color: #a9d7ff;
  text-align: center;
}

.sale-arrow-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.sale-arrow-wrap img {
  width: 92px;
  height: 50px;
}

.sale-arrow-wrap .arrow-icon {
  width: 21px;
  height: 16px;
}

.sale-arrow-wrap .flip {
  transform: scaleX(-1);
}

.target-wrap p {
  margin: 6px 0 0;
  text-align: right;
  color: #b6e4ff;
  font-size: 14px;
}

.target-bar {
  height: 18px;
  border-radius: 10px;
  background: rgba(52, 97, 176, 0.46);
  overflow: hidden;
}

.target-progress {
  height: 100%;
  width: 50%;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  color: #fff2f2;
  background: linear-gradient(90deg, #ff7f8f, #ff5858);
}

.left .panel-market {
  flex: 0 0 178px;
}

.left .panel-sentiment {
  flex: 0 0 232px;
}

.left .panel-honor {
  flex: 1;
  min-height: 130px;
}

.right .panel-focus {
  flex: 0 0 118px;
}

.right .panel-products {
  flex: 0 0 158px;
}

.right .panel-mini {
  flex: 0 0 116px;
}

.right .panel-liquidity {
  flex: 1;
  height: 128px;
}

.fade-in-up {
  animation: fadeInUp 0.8s ease both;
}

.delay-1 {
  animation-delay: 0.18s;
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.03);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
