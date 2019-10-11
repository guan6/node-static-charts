# 简介

> 服务器端生成echart图表位图

node 版本要求

node >= v8.0.0

开发环境 node v8.12.0

## 调用

```javascript
/**
 * 基础参数 GET
 * @param {Number, String} w - 图片宽度
 * @param {Number, String} h - 图片高度
 * @param {String} imgType - 图片类型，支持jpeg、png
 * @param {String} bg - 背景颜色(Hex), 不带#号，默认为白色 ffffff
 * @param {String} c - 对应的控制器名称
 * @param {String} token - 如果接口需要认证，则传入token
 * 
 * /
```

```html
<img src="http://[host]/v1/demo?c=demo&w=500&h=300&imgType=png&bg=f1f1f1">
```

## 启动

```bash
# 本地开发
# 开发环境需要全局安装nodemon
npm run dev

# 转码ES5(上线前需要执行)
npm run build

# 生产测试环境启动项目，需要全局安装pm2
pm2 start ./pm2/dev.config.js # dev
pm2 start ./pm2/prod.config.js # prod

pm2 reload ./pm2/dev.config.js # dev
pm2 reload ./pm2/prod.config.js # prod

pm2 stop ./pm2/dev.config.js # dev
pm2 stop ./pm2/prod.config.js # prod
```

## 项目结构

- `src` 开发目录
  - `qpi` 对接后端接口，封装请求。
  - `controllers` 获取接口数据，合并完整的chart配置项。
  - `routers` 路由
  - `middlewares` 自定义中间件
  - `config` 项目配置文件
    - `echartTpl` echarts 配置模板
  - `utils` 工具
- `pm2` pm2配置文件
- `logs` 日志目录
- `server` build后用于生产的目录

## 新增图表

1. 在config/echartTpl中添加新的模板配置；
2. 在api目录下，添加新的数据源接口；
3. 在controllers目录下添加对应的控制器，并在index.js中导出（导出名称即为调用时参数 - c的值）；
4. 在routers目录下添加路由配置，路由控制器为bus（bus的作用为，根据传入的c值，调用不同的控制器）；