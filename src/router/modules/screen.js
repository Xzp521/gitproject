const screen = () => import('@/views/screen/index.vue')
const cockpit = () => import('@/views/cockpit/index.vue')
const topic = () => import('@/views/screen/topic.vue')
const screenPlaceholder = () => import('@/views/screen/placeholder.vue')

export default [
  {
    path: '/cockpit',
    name: 'cockpit',
    component: cockpit,
  },
  {
    path: '/screen',
    name: 'screen',
    component: screen,
  },
  {
    path: '/screen/topic',
    name: 'screen-topic',
    component: topic,
  },
  {
    path: '/screen/gold',
    name: 'screen-gold',
    component: screenPlaceholder,
    props: { title: '连板掘金' },
  },
  {
    path: '/screen/high',
    name: 'screen-high',
    component: screenPlaceholder,
    props: { title: '看看高标' },
  },
  {
    path: '/screen/first',
    name: 'screen-first',
    component: screenPlaceholder,
    props: { title: '首板异动' },
  },
  {
    path: '/screen/cycle',
    name: 'screen-cycle',
    component: screenPlaceholder,
    props: { title: '市场周期' },
  },
]
