module.exports = {
  apps: [
    {
      name: "endorealty",
      script: "npm",
      args: "start",
      cwd: "/home/dk/apps/rdno_real_state",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
}