module.exports = {
  apps: [
    {
      name: 'server',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    }
  ]
};
