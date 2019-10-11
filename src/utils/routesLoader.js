import glob from 'glob'

export default function (dirname) {
  return new Promise((resolve, reject) => {
    const routes = []
    glob(
      `${dirname}/*.js`,
      {
        ignore: '**/index.js'
      },
      (err, files) => {
        if (err) {
          return reject(err)
        }
        files.forEach(file => {
          const route = require(file)
          // require 导入 使用exprot default的模块
          routes.push(route.default)
        })
        return resolve(routes)
      }
    )
  })
}