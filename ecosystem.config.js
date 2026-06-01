module.exports = {
  apps: [
    {
      name: "novo-aviso-vendedor",
      script: "dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
