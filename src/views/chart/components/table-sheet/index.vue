<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2Vue :data="sheetData" />
    </el-col>
    <el-col :span="6">
      <sheetLabelVue
        class="mb-20"
        :isSelected="currentRegionsIndex === index"
        :data="item"
        v-for="(item, index) in regionsData"
        :key="item.id"
        @click="onChangeRegion(index)"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import s2Vue from './components/s2.vue'
import sheetLabelVue from './components/sheet-label.vue'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * 获取大区数据
 */
const currentRegionsIndex = ref(0)
const regionsData = ref([])
const getChartRegionsData = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
  // 获取该大区对应的数据
  getChartSheetData(regionsData.value[0].id)
}
getChartRegionsData()
// 切换语言，数据重新获取
watchSwitchLang(getChartRegionsData)

/**
 * 切换大区
 */
const onChangeRegion = (index) => {
  currentRegionsIndex.value = index
  // 获取该大区对应的数据
  getChartSheetData(regionsData.value[index].id)
}

/**
 * 大区对应的表格数据
 */
const sheetData = ref([])
const getChartSheetData = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
