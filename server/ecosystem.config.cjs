module.exports = {
  apps : [
      {
        name: "pragmaticon",
        script: "./index.js",
        watch: false,
        instance_var: 'INSTANCE_ID',
        env: {
            "NODE_ENV": "production"
        }
      }
  ]
}