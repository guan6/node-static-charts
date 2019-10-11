import Base from '../base'

class Api extends Base {
  /**
   * 获取chart数据
   * @param {Object} option 
   * @param {Object} option.ctx - koa context
   * @param {Object} option.data - 请求参数
   */
  getChartData({ ctx, data = {} }) {
    return this.http({
      ctx,
      data,
      options: {
        url: 'demoData.json'
      }
    })
  }
}

export default new Api()