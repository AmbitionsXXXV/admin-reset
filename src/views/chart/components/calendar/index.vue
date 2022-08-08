<template>
  <el-card
    class="container"
    :body-style="{
      padding: 0
    }"
  >
    <el-calendar class="calendar" v-model="currentDate">
      <template #dateCell="{ data }">
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            calendarItemBgClass(data.day)
          ]"
        >
          <!-- 显示的内容 -->
          {{
            data.day
              .split('-')
              .slice(2)
              .join('')
          }}
          <br />
          <!-- 当日金额 -->
          <span class="amount" v-if="getTadayAmount(data.day)">
            {{ getTadayAmount(data.day) }}
          </span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getChartCalendar } from '@/api/chart'
import emitter from '@/utils/eventHub'
// 选中的日期
const currentDate = ref(new Date())

/**
 * 触发日期改变的事件
 */
watch(currentDate, val => {
  emitter.emit('calendarChange', val)
})

/**
 * 获取数据
 */
const calendarListData = ref([])
const getCalendarListData = async () => {
  const { result } = await getChartCalendar()
  calendarListData.value = result
}
getCalendarListData()

// 收益缓存数据。
// key 为日期
// val 为对应的 金额
const dateAmountList = ref({})
/**
 * 返回指定日期收益数据，在日历中进行展示
 */
const getTadayAmount = date => {
  // 读取缓存数据
  if (dateAmountList.value[date]) {
    return dateAmountList.value[date]
  }
  // 根据日期，获取当日数据
  const tadayData = calendarListData.value.find(item => item.date === date)
  // 判断当日数据是否存在
  if (!tadayData) {
    return 0
  }
  // 获取当日收益
  const tadayAmount = tadayData.amount

  // 对数据进行缓存
  dateAmountList.value[date] = tadayAmount

  return tadayAmount
}

/**
 * 返回日历的背景类
 * */
const calendarItemBgClass = day => {
  if (getTadayAmount(day) > 0) {
    return 'profit'
  } else if (getTadayAmount(day) < 0) {
    return 'loss'
  }
  return ''
}
</script>

<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    ::v-deep .el-calendar__body {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    ::v-deep .el-calendar-day {
      height: 66px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }
      // 金额样式
      .amount {
        font-size: 12px;
      }
      // 正收益
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      // 负收益
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
