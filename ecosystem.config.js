module.exports = {
    apps: [
      {
        name: 'sms-service-redis-subcriber', // Change to a unique name for your app
        script: 'server.js', // Specify the entry point of your Node.js application
        instances: 1, // Number of instances to run
        autorestart: true, // Automatically restart the app if it crashes
        watch: false, // Set to true to enable file watching and auto-restart on file changes
        max_memory_restart: '1G', // Maximum memory usage before restarting
      },
    ],
  };
  