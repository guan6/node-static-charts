/**
 * api 处理基础类
 * promisify: callback to promise (node >= 8)
 * request: nodejs http
 */
import 'babel-polyfill'
import { promisify } from 'util'
import request from 'request'
import logger from '../utils/winston'

/**
 * promise 封装 request
 * request.defaults: request 全局默认配置
 */
const requestPromise = promisify(request.defaults({
  json: true,
  baseUrl: process.env.BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})) 

export default class Base {
  /**
   * http请求方法
   * https://github.com/request/request#requestoptions-callback
   * 
   * 
   * @param {Object} option - request配置
   * @param {Object} option.ctx - koa context
   * @param {Object} option.options - request模块配置
   * @param {String} [option.data] - 请求参数数据
   * @param {String} [option.needAuth] - 源接口是否需要认证？
   * 
   */
  async http({ ctx, options, data, needAuth = false }) {
    
    /**
     * headers
     */
    options.headers = options.headers || {}
    options.headers['Content-Type'] = options.headers['Content-Type'] || ctx.request.type

    /**
     * request method
     */
    options.method = options.method ? options.method : ctx.method

    /**
     * 如果接口需要认证，添加auth配置，认证方式bearer Token
     */
    
    if (needAuth){
      options.auth = {
        bearer: ctx.request.headers.authorization
      }
    }

    /**
     * request 参数适配
     */
    if (options.method === 'POST') {
      switch (ctx.request.type){
        case 'application/x-www-form-urlencoded':
          options.form = data
          break
        case 'application/json':
          options.body = data
          break
        case 'multipart/form-data':
          options.formData = data
          break
        default:
          break
      }
    }

    if (options.method === 'GET') {
      options.qs = data
    }

    /**
     * 输出debug日志
     */
    logger.debug(JSON.stringify(options))

    /**
     * return request promise
     */
    return requestPromise(options)
  }
}