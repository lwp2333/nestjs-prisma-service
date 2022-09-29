module.exports = {
  apps: [
    {
      name: 'next-blog',
      script: 'pnpm',
      args: 'start:prod',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['124.222.243.109'],
      ref: 'origin/master',
      repo: 'https://github.91chi.fun/https://github.com/lwp2333/nestjs-prisma-service.git',
      path: '/www/wwwroot/nestjs-prisma-service',
      'post-deploy':
        'pnpm i && pnpm prisma:db-pull && pnpm prisma:generate && pnpm build && pm2 restart ecosystem.config.js',
    },
  },
};
