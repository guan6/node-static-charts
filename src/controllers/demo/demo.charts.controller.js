import api from '../../api/demo/demo.charts'
import { tpl01 } from '../../config/echartTpl'

export default async ({ ctx, requestData }) => {

  // 获取chart数据
  const { body } = await api.getChartData({
    ctx,
    data: requestData
  })

  const chartOption = JSON.parse(JSON.stringify(tpl01))

  // 在模板中设置数据
  chartOption.xAxis.data = body.data.xAxisData
  chartOption.series[0].data = body.data.seriesData

  // 返回图表配置项
  return {
    chartOption: chartOption
  }
}

