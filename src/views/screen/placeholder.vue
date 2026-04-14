<template>
  <div class="placeholder-page">
    <div class="page-shell" ref="screenRef">
      <Top />
      <div class="placeholder-content">
        <h2>{{ title }}</h2>
        <p>页面占位已创建，后续可在此接入后端查询接口与业务图表。</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import Top from './components/top/index.vue'
export default {
  name: 'ScreenPlaceholder',
  components: { Top },
  props: { title: { type: String, default: '页面建设中' } },
  setup() {
    const screenRef = ref(null)
    const getScale = (w = 1920, h = 1080) => {
      const ww = window.innerWidth / w
      const wh = window.innerHeight / h
      return ww < wh ? ww : wh
    }
    const syncScale = () => {
      if (!screenRef.value) return
      screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    }
    onMounted(() => {
      syncScale()
      window.addEventListener('resize', syncScale)
    })
    onUnmounted(() => window.removeEventListener('resize', syncScale))
    return { screenRef }
  },
}
</script>

<style scoped lang="scss">
.placeholder-page { width: 100vw; height: 100vh; overflow: hidden; background: #fff; }
.page-shell { position: fixed; width: 1920px; height: 1080px; left: 50%; top: 50%; transform-origin: left top; background: #fff; }
.placeholder-content { height: calc(100% - 104px); display: grid; place-content: center; gap: 12px; text-align: center; }
.placeholder-content h2 { margin: 0; font-size: 42px; color: #1f3f79; }
.placeholder-content p { margin: 0; color: #4f6a99; font-size: 18px; }
</style>
