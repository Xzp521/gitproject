<template>
  <div class="cockpit-page">
    <div class="cockpit-shell" ref="screenRef">
      <Top theme="dark" title="司南系统 · 管理驾驶舱" />
      <section class="main-grid">
        <aside class="side-col">
          <article class="panel"><div class="panel-title"><span>市场行情</span></div></article>
          <article class="panel"><div class="panel-title"><span>舆情检测</span></div></article>
          <article class="panel"><div class="panel-title"><span>公司荣誉</span></div></article>
        </aside>
        <main class="center-col">
          <div class="core-wrap">
            <div class="main-bubble">
              <strong>17,810.23</strong>
              <span>资产管理总规模（亿元）</span>
            </div>
            <div
              v-for="(item, idx) in bubbles"
              :key="item.label"
              class="small-bubble"
              :class="[`pos-${idx + 1}`, { active: activeBubbleIndex === idx }]"
            >
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="growth-row">
            <div class="growth-card good"><strong>-310亿</strong><span>较月初增长</span></div>
            <div class="growth-card risk"><strong>+689亿</strong><span>较季初增长</span></div>
            <div class="growth-card risk"><strong>+771亿</strong><span>较年初增长</span></div>
          </div>
        </main>
        <aside class="side-col">
          <article class="panel"><div class="panel-title"><span>特别关注</span></div></article>
          <article class="panel"><div class="panel-title"><span>募集中产品</span></div></article>
          <article class="panel"><div class="panel-title"><span>迷你基金</span></div></article>
          <article class="panel"><div class="panel-title"><span>货币基金流动性</span></div></article>
        </aside>
      </section>
      <section class="bottom-grid">
        <article class="panel chart-panel"><div class="panel-title"><span>选择</span></div><div ref="pieRef" class="chart"></div></article>
        <article class="panel chart-panel"><div class="panel-title"><span>公募基金</span></div><div ref="mixRef" class="chart"></div></article>
        <article class="panel chart-panel"><div class="panel-title"><span>归因分析（当年）</span></div><div ref="barRef" class="chart"></div></article>
        <article class="panel chart-panel"><div class="panel-title"><span>客户分布</span></div><div ref="lineRef" class="chart"></div></article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import Top from '@/views/screen/components/top/index.vue'

const screenRef = ref(null)
const pieRef = ref(null)
const mixRef = ref(null)
const barRef = ref(null)
const lineRef = ref(null)
const activeBubbleIndex = ref(0)
const bubbles = [
  { label: '公募基金规模', value: '8,241.21' },
  { label: '净值金额规模', value: '7,345.12' },
  { label: '客户数', value: '1,001.23' },
  { label: '产品数量', value: '928' },
  { label: '基金经理', value: '56' },
  { label: '账户数量', value: '2.21' },
]
const chartInstances = []
let bubbleTimer = null

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
function syncScale() {
  if (!screenRef.value) return
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
function createChart(el, option) {
  if (!el) return
  const c = echarts.init(el)
  c.setOption(option)
  chartInstances.push(c)
}
function initCharts() {
  // TODO: 后续替换为后端接口数据
  createChart(pieRef.value, { series: [{ type: 'pie', radius: ['45%', '72%'], data: [{ value: 24, name: '债券' }, { value: 22, name: '权益' }, { value: 18, name: '货币' }] }] })
  createChart(mixRef.value, { xAxis: { type: 'category', data: ['3/17', '3/24', '3/31', '4/7'] }, yAxis: { type: 'value' }, series: [{ type: 'bar', data: [7800, 7750, 7900, 8200] }, { type: 'line', data: [210, 212, 215, 230] }] })
  createChart(barRef.value, { xAxis: { type: 'category', data: ['新发', '持营', '利润', '分红'] }, yAxis: { type: 'value' }, series: [{ type: 'bar', data: [220, 380, -202, 63] }] })
  createChart(lineRef.value, { xAxis: { type: 'value' }, yAxis: { type: 'category', data: ['1000万以上', '500-1000万', '200-500万', '100-200万', '50-100万'] }, series: [{ type: 'line', data: [8, 12, 17, 20, 24] }, { type: 'line', data: [10, 14, 20, 22, 27] }] })
}
function onResize() {
  syncScale()
  chartInstances.forEach(c => c.resize())
}
onMounted(() => {
  syncScale()
  initCharts()
  bubbleTimer = window.setInterval(() => {
    activeBubbleIndex.value = (activeBubbleIndex.value + 1) % bubbles.length
  }, 5000)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  chartInstances.forEach(c => c.dispose())
  if (bubbleTimer) clearInterval(bubbleTimer)
})
</script>

<style scoped lang="scss">
.cockpit-page { width: 100vw; height: 100vh; overflow: hidden; background: linear-gradient(180deg, #06142c, #081a3a 45%, #061531); }
.cockpit-shell { width: 1920px; height: 1080px; position: fixed; left: 50%; top: 50%; transform-origin: left top; color: #d8edff; }
.main-grid { display: grid; grid-template-columns: 480px 1fr 480px; gap: 14px; padding: 10px 10px 0; height: 640px; }
.side-col { display: flex; flex-direction: column; gap: 10px; }
.panel { border: 1px solid rgba(84, 171, 255, 0.56); border-radius: 8px; background: linear-gradient(180deg, rgba(10, 44, 114, 0.82), rgba(7, 27, 82, 0.74)); overflow: hidden; }
.panel-title { height: 46px; display: flex; align-items: center; padding: 0 14px; color: #e8f7ff; font-size: 24px; background: linear-gradient(90deg, rgba(15, 70, 164, 0.7), rgba(10, 44, 115, 0.42)); }
.center-col { position: relative; }
.core-wrap { position: relative; height: 500px; border: 1px solid rgba(82, 164, 255, 0.44); border-radius: 10px; background: linear-gradient(180deg, rgba(8, 40, 104, 0.7), rgba(7, 28, 78, 0.52)); }
.main-bubble { position: absolute; left: 50%; top: 53%; width: 330px; height: 330px; transform: translate(-50%, -50%); border-radius: 50%; border: 3px solid rgba(91, 222, 255, 0.9); display: grid; place-content: center; text-align: center; box-shadow: 0 0 42px rgba(61, 170, 255, 0.5); animation: pulse 4.6s ease-in-out infinite; }
.main-bubble strong { font-size: 70px; line-height: 1; color: #8cecff; }
.main-bubble span { font-size: 42px; color: #dbf6ff; max-width: 230px; }
.small-bubble { position: absolute; width: 156px; height: 156px; border-radius: 50%; border: 2px solid rgba(90, 207, 255, 0.8); display: grid; place-content: center; text-align: center; transition: transform .35s ease; }
.small-bubble.active,.small-bubble:hover { transform: scale(1.08); }
.small-bubble strong { font-size: 36px; color: #7fe7ff; line-height: 1; }
.small-bubble span { font-size: 18px; color: #c5ecff; }
.pos-1 { left: 90px; top: 190px; } .pos-2 { left: 225px; top: 40px; } .pos-3 { left: 420px; top: 12px; } .pos-4 { right: 214px; top: 56px; } .pos-5 { right: 82px; top: 188px; } .pos-6 { right: 420px; top: 14px; }
.growth-row { margin-top: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.growth-card { height: 122px; border: 1px solid rgba(94, 175, 255, 0.52); border-radius: 18px 18px 24px 24px; display: grid; place-content: center; text-align: center; }
.growth-card strong { font-size: 56px; line-height: 1; } .growth-card span { font-size: 30px; color: #d0efff; }
.good { color: #58f1ad !important; } .risk { color: #ff807d !important; }
.bottom-grid { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr 1fr 1.25fr; gap: 10px; padding: 0 10px 10px; height: 315px; }
.chart-panel { display: flex; flex-direction: column; } .chart { flex: 1; min-height: 215px; }
@keyframes pulse { 0%,100% { transform: translate(-50%, -50%) scale(1);} 50% { transform: translate(-50%, -50%) scale(1.03);} }
</style>
