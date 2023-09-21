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

let latestMessage = 'No messages received yet';
subscriber.on('message', (channel, message) => {
  latestMessage = `Received message on channel '${channel}': ${message}`
  console.log(latestMessage);
});


app.get('/', (req, res) => {
  res.send(`Latest message from Redis: ${latestMessage}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})