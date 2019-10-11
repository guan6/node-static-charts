// import fs from 'fs'
import { createCanvas, registerFont } from 'canvas'
import echarts from 'echarts'
import { getRequestData } from '../utils/utils'
import * as controllers from './index'

//  注册字体
registerFont(`${global.rootPath}/static/pingfang-sc.ttf`, { family: 'pingfang' })

/**
 * 路由入口控制器，负责根据不同的控制器名称，调用对应的控制器处理数据。
 * @param {*} ctx 
 * @param {*} next 
 */
const bus = async (ctx, next) => {
  const { requestData } = await getRequestData(ctx)

  const {
    c = '', // controller name 控制器名称
    w = 200, //图片宽
    h = 200, // 图片高
    bg = '', //背景色
    imgType = 'png'//图片类型
  } = requestData

  //像素比(如像素比为2，则返回图片大小为传入宽高的2倍, 为1时不成生产图表，原因不详)
  const pr = 2

  // 根据名称调用指定控制器，获取完整图表配置
  const { chartOption } = await controllers[c]({
    ctx,
    requestData
  })

  // 创建canva
  let canvas = createCanvas(32, 32)

  /**
   * 这是一个非公开api，大概功能应该是使用自定义的canvas对象，而不使用echart默认创建的。
   * 会失去一些特性，比如宽高自适应，需要处理好数据量和画布空间之间的关系。
   */
  echarts.setCanvasCreator(() => canvas)

  // echart实例
  let myChart = echarts.init(canvas)

  // 调整canvas尺寸
  myChart.resize({
    width: w,
    height: h
  })

  // 配置echart
  myChart.setOption(chartOption)

  // to base64
  const base64String = myChart.getDataURL({
    type: imgType,
    pixelRatio: pr,
    backgroundColor: bg ? `#${bg}` : ''
  })

  // 手动销毁实例，防止内存泄漏
  myChart.clear()
  myChart.dispose()
  canvas = null

  const
    // 去除base64头部信息
    base64Image = base64String.split(';base64,').pop(),

    // to buffer
    imgBuffer = new Buffer(base64Image, 'base64')

  // content-type
  ctx.type = imgType

  // response
  ctx.body = imgBuffer
}

export default bus