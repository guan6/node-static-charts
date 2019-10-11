export default {
  animation: false,
  grid: {
    top: 2,
    left: 0,
    right: 0,
    bottom: 2
  },
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [{
    data: [],
    showSymbol: false,
    type: 'line',
    lineStyle: {
      width: 1,
      color: '#409EFF'
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 0.8,
        colorStops: [
          {
            offset: 0, color: 'rgba(108,171,255,.6)' // 0% 处的颜色
          },
          {
            offset: 1, color: 'rgba(108,171,255,0)' // 100% 处的颜色
          }
        ]
      }
    }
  }]
}