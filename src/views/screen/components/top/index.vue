<template>
  <header class="screen-header">
    <div class="screen-header__glow"></div>

    <div class="screen-header__nav screen-header__nav--left">
      <a
        v-for="item in leftMenus"
        :key="item.key"
        class="nav-chip"
        :class="{ 'is-active': item.active }"
        href="#/screen"
      >
        {{ item.label }}
      </a>
    </div>

    <div class="screen-header__center">
      <div class="screen-header__title-wrap"></div>
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

<script setup>
import { ref } from 'vue'

const leftMenus = [
  { key: 'cockpit', label: '驾驶舱', active: false },
  { key: 'market', label: '市场行情', active: true },
  { key: 'topic', label: '聚焦题材', active: false },
  { key: 'gold', label: '连板掘金', active: false },
  { key: 'high', label: '看看高标', active: false },
  { key: 'first', label: '首板异动', active: false },
  { key: 'cycle', label: '市场周期', active: false },
]

const dataDate = ref('2026-04-11')
</script>

<style scoped lang="scss">
.screen-header {
  --header-border: rgba(53, 100, 196, 0.28);
  --chip-fill: linear-gradient(180deg, #eef4ff, #dce9ff);
  --chip-active: linear-gradient(180deg, #ff6a6a, #ea4444);

  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) 260px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  height: 104px;
  padding: 12px 24px 0;
  color: #2b3a55;


  &__glow {
    position: absolute;
    inset: 0 0 auto;
    height: 96px;
    background:
      linear-gradient(180deg, rgba(248, 251, 255, 0.98), rgba(239, 245, 255, 0.9)),
      linear-gradient(90deg, rgba(71, 127, 232, 0.08), rgba(255, 255, 255, 0));
    border-bottom: 1px solid rgba(89, 123, 189, 0.18);
    box-shadow:
      inset 0 -8px 20px rgba(74, 124, 216, 0.08),
      0 8px 22px rgba(30, 68, 138, 0.08);
    pointer-events: none;
  }

  &__nav,
  &__center,
  &__right {
    position: relative;
    z-index: 1;
  }

  &__nav {
    display: flex;
    gap: 8px;
    padding-top: 6px;
    flex-wrap: wrap;
  }

  &__center {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 2px;
  }

  &__title-wrap {
    width: 220px;
    height: 40px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(244, 247, 255, 0.92)),
      linear-gradient(135deg, rgba(79, 136, 255, 0.08), transparent 30%, transparent 70%, rgba(228, 78, 78, 0.08));
    border: 1px solid rgba(106, 145, 217, 0.32);
    border-radius: 0 0 24px 24px;
    box-shadow:
      inset 0 0 18px rgba(87, 137, 236, 0.08),
      0 6px 18px rgba(42, 76, 145, 0.06);
    clip-path: polygon(6% 0, 94% 0, 100% 35%, 96% 100%, 4% 100%, 0 35%);
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    padding-top: 8px;
    min-width: 0;
  }
}

.nav-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 102px;
  height: 42px;
  padding: 0 14px;
  background: var(--chip-fill);
  border: 1px solid var(--header-border);
  border-radius: 6px;
  color: #35528f;
  font-size: 17px;
  text-decoration: none;
  box-shadow:
    inset 0 0 12px rgba(111, 191, 255, 0.08),
    0 6px 12px rgba(30, 68, 138, 0.08);
  transition: all 0.2s ease;

  &:hover,
  &.is-active {
    color: #fff;
    background: var(--chip-active);
    box-shadow:
      inset 0 0 14px rgba(255, 210, 210, 0.2),
      0 0 14px rgba(233, 74, 74, 0.18);
  }
}

.header-search,
.header-info {
  height: 38px;
  border: 1px solid rgba(106, 145, 217, 0.28);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: inset 0 0 12px rgba(104, 185, 255, 0.06);
}

.header-search {
  width: 220px;
  min-width: 0;
  padding: 0 12px;
  border-radius: 18px;
  color: rgba(73, 92, 127, 0.6);
  line-height: 38px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 250px;
  min-width: 0;
  padding: 0 12px;
  border-radius: 10px;
  color: #5a6f98;
  font-size: 12px;
  white-space: nowrap;
  line-height: 1.2;
  &__label {
    flex: 0 0 auto;
    color: #6d7fa5;
  }
}

.header-date-picker {
  width: 150px;
  min-width: 0;
}

:deep(.header-date-picker .el-input__wrapper) {
  box-shadow: none;
  background: transparent;
  padding: 0;
}

:deep(.header-date-picker .el-input__inner) {
  color: #44597f;
  font-size: 12px;
}

:deep(.header-date-picker .el-input__prefix),
:deep(.header-date-picker .el-input__suffix) {
  color: #6b84b7;
}

</style>
