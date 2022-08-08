<template>
  <div class="chart-container">
    <!-- 累计收益趋势图 -->
    <trend-vue></trend-vue>
    <!-- 第二行 -->
    <el-row class="mt-20" :gutter="20">
      <el-col :span="16">
        <!-- 日金额分析图 -->
        <horizontal-bar-vue></horizontal-bar-vue>
      </el-col>
      <el-col :span="8">
        <!-- 日历图 -->
        <calendar-vue></calendar-vue>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row class="mt-20" :gutter="20">
      <el-col :span="6">
        <!-- 左侧内容 -->
        <div class="chart-map-left">
          <!-- 饼图 -->
          <pie-vue></pie-vue>
          <!-- 文档云图 -->
          <word-cloud-vue class="mt-20"></word-cloud-vue>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 地图可视化 -->
        <b-map-vue></b-map-vue>
      </el-col>
    </el-row>

    <!-- S2 表格数据图示 -->
    <table-sheet-vue class="mt-20"></table-sheet-vue>
  </div>
</template>

<script setup>
import trendVue from './components/trend'
import horizontalBarVue from './components/horizontal-bar'
import calendarVue from './components/calendar'
import pieVue from './components/pie'
import wordCloudVue from './components/word-cloud'
import bMapVue from './components/b-map'
import tableSheetVue from './components/table-sheet'
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
