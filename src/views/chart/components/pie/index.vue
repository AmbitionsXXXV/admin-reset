<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div ref="target" class="container"></div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { getChartPie } from '@/api/chart'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

const chartData = ref([])
const getChartData = async () => {
  const res = await getChartPie()
  chartData.value = res
  // 渲染图表
  renderChart()
}
getChartData()

const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
})

const renderChart = () => {
  const options = {
    // 标题
    title: {
      text: i18n.t('msg.chart.pieChartTitle')
    },
    // 鼠标移入的提示
    tooltip: {
      trigger: 'item',
      // {b}：数据名。{c}：数值。
      formatter: `{b}: {c} ${i18n.t('msg.chart.unit')}`
    },
    series: [
      {
        // 饼图
        type: 'pie',
        // 饼图的半径。第一项为内半径，第二项为外半径
        radius: ['40%', '70%'],
        // 每个 item 的样式
        itemStyle: {
          // 圆角
          borderRadius: 10,
          // 边框色
          borderColor: '#fff',
          // 边框宽度
          borderWidth: 2
        },
        // 文字
        label: {
          // 默认不显示
          show: false,
          // {b}：数据名。{d}：百分比。
          formatter: '{b}: {d}%',
          // 居中展示（在鼠标移入时）
          position: 'center'
        },
        // 高亮状态的扇区和标签样式
        emphasis: {
          // 文本
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        data: chartData.value
      }
    ]
  }

  mChart.setOption(options)
}
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
