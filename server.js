const express = require('express')
const app = express()
const port = 3000

const Redis = require("ioredis");
const redis = new Redis({
  host: 'localhost', // Replace with your Redis server host
  port: 6379,        // Replace with your Redis server port
  password: '123456', // Replace with your custom Redis password
});

const subscriber = new Redis({
  host: 'localhost', // Replace with your Redis server host
  port: 6379,        // Replace with your Redis server port
  password: '123456', // Replace with your custom Redis password
});

const channelName = 'laravelsmssend'; 
subscriber.subscribe(channelName);

subscriber.on('message', (channel, message) => {
  console.log(`Received message on channel '${channel}': ${message}`);
});


app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})