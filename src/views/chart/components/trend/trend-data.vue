<template>
  <div class="trend-data-container">
    <!-- 累计盈利 -->
    <div class="title">
      <div class="title-name">{{ $t('msg.chart.trendDataTitle') }}</div>
      <div class="title-amount">
        &yen;
        <span ref="titleAmountTarget"></span>
      </div>
    </div>

    <!-- 今日新增 -->
    <div class="item">
      <div class="item-name item-name-border-1">
        {{ $t('msg.chart.trendDataTadayAdded') }}
      </div>
      <div class="item-amount">
        <span ref="tadayAddedTarget" class="item-amount-number"></span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
    <!-- 今日支出 -->
    <div class="item">
      <div class="item-name item-name-border-2">
        {{ $t('msg.chart.trendDataTadayExpend') }}
      </div>
      <div class="item-amount">
        <span ref="tadayExpendTarget" class="item-amount-number"></span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
    <!-- 今日结余 -->
    <div class="item">
      <div class="item-name item-name-border-3">
        {{ $t('msg.chart.trendDataTadayBalance') }}
      </div>
      <div class="item-amount">
        <span ref="tadayBalanceTarget" class="item-amount-number"></span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { CountUp } from 'countup.js'
import { onMounted, ref, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 本月累计收益（万元）
const titleAmountTarget = ref(null)
// 今日新增收益
const tadayAddedTarget = ref(null)
// 今日新增支出
const tadayExpendTarget = ref(null)
// 今日结余
const tadayBalanceTarget = ref(null)
onMounted(() => {
  const options = {
    // 小数点位
    decimalPlaces: 2,
    // 持续时间
    duration: 1.5
  }
  // 累计回款
  new CountUp(titleAmountTarget.value, props.data.allAmount, options).start()
  // 今日新增
  new CountUp(tadayAddedTarget.value, props.data.tadayAdded, options).start()
  // 今日支出
  new CountUp(tadayExpendTarget.value, props.data.tadaySub, options).start()
  // 今日结余
  new CountUp(tadayBalanceTarget.value, props.data.tadayAmount, options).start()
})
</script>

<style lang="scss" scoped>
.trend-data-container {
  .title {
    padding: 12px 20px;
    background: linear-gradient(to right, #0ea5e9, #6366f1);
    border-radius: 5px;
    color: white;
    .title-name {
      font-size: 12px;
      font-weight: bold;
    }
    .title-amount {
      font-size: 24px;
      margin-top: 4px;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c9c9;
    padding: 16px 0;
    color: #666;
    .item-name {
      font-size: 12px;
      padding: 4px 0 4px 8px;
    }
    .item-amount {
      font-size: 12px;
      .item-amount-number {
        color: #333;
        font-weight: bold;
        font-size: 20px;
      }
    }

    .item-name-border-1 {
      border-left: 6px solid #409eff;
    }
    .item-name-border-2 {
      border-left: 6px solid #e6a23c;
    }
    .item-name-border-3 {
      border-left: 6px solid #67c23a;
    }
  }
}
</style>
