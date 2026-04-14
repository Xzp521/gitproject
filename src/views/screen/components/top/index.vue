<template>
  <header class="screen-header" :class="[`screen-header--${theme}`]">
    <div class="screen-header__glow"></div>
    <div class="screen-header__nav">
      <router-link
        v-for="item in menus"
        :key="item.path"
        class="nav-chip"
        :class="{ 'is-active': route.path === item.path }"
        :to="item.path"
      >
        {{ item.label }}
      </router-link>
    </div>
    <div class="screen-header__center">
      <div class="screen-header__title-wrap">
        <span v-if="title" class="screen-header__title">{{ title }}</span>
      </div>
    </div>
    <div class="screen-header__right">
      <div class="header-search">产品名称/产品代码/基金经理</div>
      <div class="header-info">
        <span class="header-info__label">数据日期</span>
        <el-date-picker
          v-model="dataDate"
          class="header-date-picker"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :clearable="false"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'CockpitTopNav',
  props: {
    title: { type: String, default: '' },
    theme: { type: String, default: 'light' },
  },
  setup() {
    const route = useRoute()
    const dataDate = ref('2026-04-14')
    const menus = [
      { path: '/cockpit', label: '驾驶舱' },
      { path: '/screen', label: '市场行情' },
      { path: '/screen/topic', label: '聚焦题材' },
      { path: '/screen/gold', label: '连板掘金' },
      { path: '/screen/high', label: '看看高标' },
      { path: '/screen/first', label: '首板异动' },
      { path: '/screen/cycle', label: '市场周期' },
    ]
    return { route, dataDate, menus }
  },
}
</script>

<style scoped lang="scss">
.screen-header { position: relative; display: grid; grid-template-columns: minmax(0, 1.8fr) 360px minmax(0, 1fr); gap: 12px; height: 104px; padding: 12px 24px 0; color: #e8f3ff; }
.screen-header__glow { position: absolute; inset: 0 0 auto; height: 96px; background: radial-gradient(circle at 50% 0, rgba(83, 158, 255, 0.4), transparent 55%), linear-gradient(180deg, rgba(12, 33, 98, 0.98), rgba(9, 25, 78, 0.78)); border-bottom: 1px solid rgba(88, 149, 255, 0.35); pointer-events: none; }
.screen-header__nav,.screen-header__center,.screen-header__right { position: relative; z-index: 1; }
.screen-header__nav { display: flex; gap: 8px; padding-top: 6px; flex-wrap: wrap; }
.screen-header__center { display: flex; justify-content: center; align-items: flex-start; padding-top: 2px; }
.screen-header__title-wrap { width: 340px; height: 52px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(116, 186, 255, 0.54); border-radius: 0 0 24px 24px; background: linear-gradient(180deg, rgba(20, 45, 118, 0.55), rgba(15, 33, 91, 0.2)); clip-path: polygon(6% 0, 94% 0, 100% 35%, 96% 100%, 4% 100%, 0 35%); }
.screen-header__title { font-size: 18px; font-weight: 700; letter-spacing: 0.08em; color: #edf7ff; }
.screen-header__right { display: flex; justify-content: flex-end; align-items: center; gap: 8px; padding-top: 8px; min-width: 0; }
.nav-chip { display: inline-flex; align-items: center; justify-content: center; min-width: 102px; height: 42px; padding: 0 14px; background: linear-gradient(180deg, rgba(30, 77, 183, 0.92), rgba(18, 50, 128, 0.92)); border: 1px solid rgba(99, 171, 255, 0.5); border-radius: 6px; color: #d9e7ff; font-size: 17px; text-decoration: none; }
.nav-chip:hover,.nav-chip.is-active { color: #fff; background: linear-gradient(180deg, rgba(67, 133, 255, 0.96), rgba(26, 87, 219, 0.96)); }
.header-search,.header-info { height: 38px; border: 1px solid rgba(99, 171, 255, 0.5); background: rgba(12, 35, 97, 0.74); }
.header-search { width: 220px; min-width: 0; padding: 0 12px; border-radius: 18px; color: rgba(212, 231, 255, 0.6); line-height: 38px; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.header-info { display: flex; align-items: center; gap: 10px; width: 250px; min-width: 0; padding: 0 12px; border-radius: 10px; color: #d4e9ff; font-size: 12px; white-space: nowrap; }
.header-info__label { flex: 0 0 auto; color: #c0daff; }
.header-date-picker { width: 150px; min-width: 0; }
:deep(.header-date-picker .el-input__wrapper) { box-shadow: none; background: transparent; padding: 0; }
:deep(.header-date-picker .el-input__inner) { color: #e5f2ff; font-size: 12px; }
</style>
