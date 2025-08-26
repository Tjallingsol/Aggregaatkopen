module.exports = {
  apps: [
    {
      name: 'download-server',
      script: 'download-server.cjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}