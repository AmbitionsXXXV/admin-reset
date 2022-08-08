import request from '@/utils/request'

/**
 * 获取累计收益明细
 */
export const getChartTrend = () => {
  return request({
    url: '/chart/trend'
  })
}

/**
 * 日历图示数据
 */
export const getChartCalendar = () => {
  return request({
    url: '/chart/calendar'
  })
}

/**
 * 指定日期的时段柱形数据
 */
export const getChartTimeAmount = (date) => {
  return request({
    url: '/chart/time/amount',
    params: {
      date
    }
  })
}

/**
 * 饼图数据
 */
export const getChartPie = () => {
  return request({
    url: '/chart/pie'
  })
}

/**
 * 文字云图数据
 */
export const getChartWordCloud = () => {
  return request({
    url: '/chart/wordcloud'
  })
}

/**
 * 地图可视化
 */
export const getChartMap = () => {
  return request({
    url: '/chart/bmap'
  })
}

/**
 * 大区数据
 */
export const getChartRegions = () => {
  return request({
    url: '/chart/regions'
  })
}

/**
 * 表格数据
 */
export const getChartSheet = (regionId) => {
  return request({
    url: '/chart/sheets',
    params: {
      regionId
    }
  })
}
