module.exports = {
  apps: [{
    name: 'node-static-charts',
    script: './server/app.js',
    instances: 'max',
    autorestart: true,
    output: '/dev/null',
    env: {
      NODE_ENV: 'production',
      PORT: '3001',
      BASE_URL: 'http://localhost:3001'
    }
  }]
}