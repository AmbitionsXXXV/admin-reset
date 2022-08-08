<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'
import { TableSheet } from '@antv/s2'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const target = ref(null)
let s2 = null
onMounted(() => {
  // 配置对象
  const s2Options = {
    // 宽度：必须为准确的像素
    width: target.value.clientWidth,
    // 高度：必须为准确的像素
    height: target.value.clientHeight,
    // 是否显示行序号
    showSeriesNumber: true,
    // 条件模式配置
    conditions: {
      // 背景字段标记
      background: [
        {
          // 设置背景的字段
          field: 'balance',
          // 数据处理
          mapping(fieldValue) {
            return {
              fill: fieldValue > 0 ? '#f3fff3' : '#ffe7e7'
            }
          }
        }
      ]
    }
  }
  // 生成 S2 实例，数据对象置为 null
  s2 = new TableSheet(target.value, {}, s2Options)
})

/**
 * 图标渲染函数
 */
const renderChart = () => {
  // 数据对象
  const s2DataCfg = {
    fields: {
      columns: [
        'province',
        'city',
        'coverage',
        'receivable',
        'actual',
        'balance'
      ]
    },
    meta: [
      // 列头字段对应的元信息，比如展示的中文名
      {
        field: 'province',
        name: i18n.t('msg.chart.sheetProvince')
      },
      {
        field: 'city',
        name: i18n.t('msg.chart.sheetCity')
      },
      {
        field: 'coverage',
        name: i18n.t('msg.chart.sheetCoverage')
      },
      {
        field: 'receivable',
        name: i18n.t('msg.chart.sheetReceivable')
      },
      {
        field: 'actual',
        name: i18n.t('msg.chart.sheetActual')
      },
      {
        field: 'balance',
        name: i18n.t('msg.chart.sheetBalance')
      }
    ],
    data: props.data
  }

  // 更新数据
  s2.setDataCfg(s2DataCfg)
  // 渲染视图，传入 true 表示数据发生了更新
  s2.render(true)
}

/**
 * 监听数据变化
 */
watch(
  () => props.data,
  () => {
    renderChart()
  }
)

/**
 * 监听语言变化
 */
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.container {
  height: 782px;
}
</style>
