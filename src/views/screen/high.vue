<template>
  <div class="high-page">
    <div class="page-shell" ref="screenRef">
      <Top title="看看高标" />
      <section class="content">
        <div class="panel">
          <div ref="chartRef" class="chart"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import Top from './components/top/index.vue'

const POINTS = [
  { name: '极益全市场混合', x: 2.35, y: 2.3, color: '#ff7f66' },
  { name: '公募全收益组合', x: 2.98, y: 2.3, color: '#78e4d7' },
  { name: '同业景源组合', x: 2.82, y: 2.18, color: '#ce9bff' },
  { name: '股债混合基金组合', x: 3.05, y: 2.12, color: '#2d44ff' },
  { name: '同业年报组合', x: 2.78, y: 1.35, color: '#ffe36e' },
  { name: '收益显优组合', x: 2.9, y: 1.35, color: '#79eadf' },
]

export default {
  name: 'ScreenHigh',
  components: { Top },
  setup() {
    const screenRef = ref(null)
    const chartRef = ref(null)
    let chart = null

    const getScale = (w = 1920, h = 1080) => {
      const ww = window.innerWidth / w
      const wh = window.innerHeight / h
      return ww < wh ? ww : wh
    }

    const syncScale = () => {
      if (!screenRef.value) return
      screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    }

    const createOption = () => ({
      backgroundColor: 'transparent',
      grid: { top: 22, left: 64, right: 34, bottom: 86 },
      xAxis: {
        type: 'value',
        min: 0.5,
        max: 3.5,
        interval: 1,
        axisLine: { lineStyle: { color: 'rgba(160, 226, 255, 0.72)', width: 1.5 } },
        axisTick: { show: false },
        axisLabel: {
          color: '#9fd3ff',
          fontSize: 22,
          formatter: (val) => ({ 1: '价值型', 2: '平衡型', 3: '成长型' }[Math.round(val)] || ''),
        },
        splitLine: { show: true, lineStyle: { color: 'rgba(156, 220, 255, 0.45)', width: 1.2 } },
      },
      yAxis: {
        type: 'value',
        min: 0.5,
        max: 3.5,
        interval: 1,
        axisLine: { lineStyle: { color: 'rgba(160, 226, 255, 0.72)', width: 1.5 } },
        axisTick: { show: false },
        axisLabel: {
          color: '#9fd3ff',
          fontSize: 22,
          formatter: (val) => ({ 1: '小\n盘', 2: '中\n盘', 3: '大\n盘' }[Math.round(val)] || ''),
        },
        splitLine: { show: true, lineStyle: { color: 'rgba(156, 220, 255, 0.45)', width: 1.2 } },
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 34,
          data: POINTS.map((v) => ({ value: [v.x, v.y], name: v.name, itemStyle: { color: v.color } })),
          label: {
            show: true,
            position: 'right',
            color: '#f1f7ff',
            fontSize: 17,
            fontWeight: 700,
            formatter: ({ data }) => data.name,
          },
          itemStyle: {
            borderColor: 'rgba(255,255,255,0.72)',
            borderWidth: 1.5,
            shadowColor: 'rgba(184, 232, 255, 0.68)',
            shadowBlur: 16,
          },
          emphasis: { scale: false },
          z: 3,
        },
      ],
    })

    const initChart = () => {
      if (!chartRef.value) return
      if (chart) chart.dispose()
      chart = echarts.init(chartRef.value)
      chart.setOption(createOption())
      chart.resize()
    }

    const onResize = () => {
      syncScale()
      if (chart) chart.resize()
    }

    onMounted(() => {
      syncScale()
      nextTick(() => window.setTimeout(() => initChart(), 30))
      window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
      if (chart) {
        chart.dispose()
        chart = null
      }
    })

    return { screenRef, chartRef }
  },
}
</script>

<style scoped lang="scss">
.high-page { width: 100vw; height: 100vh; overflow: hidden; background: #fff; }
.page-shell {
  position: fixed;
  width: 1920px;
  height: 1080px;
  left: 50%;
  top: 50%;
  transform-origin: left top;
  background: radial-gradient(circle at 50% 18%, #1c4a86 0%, #102f5f 46%, #0b2043 100%);
}
.content { height: calc(100% - 104px); padding: 20px 24px 28px; box-sizing: border-box; }
.panel {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(127, 195, 255, 0.6);
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(34, 80, 141, 0.22), rgba(10, 30, 62, 0.38));
  box-shadow: inset 0 0 0 1px rgba(173, 226, 255, 0.15);
}
.chart { width: 100%; height: 100%; }
</style>
