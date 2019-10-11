module.exports = {
  apps: [{
    name: 'node-static-charts',
    script: './server/app.js',
    autorestart: true,
    watch: './server',
    output: '/dev/null',
    env: {
      NODE_ENV: 'development',
      PORT: '3001',
      BASE_URL: 'http://localhost:3001'
    }
  }]
}