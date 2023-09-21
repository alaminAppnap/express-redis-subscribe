const express = require('express')
const app = express()
const { sendNotification,notificationPayload } = require('./notificationService');
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

let latestMessage = 'No messages received yet';
const smsSend = 'laravelsmssend'; 
const slackNotification = 'laravelslacknotification'; 
subscriber.subscribe(smsSend);
subscriber.subscribe(slackNotification);


/**===================================================================== */
subscriber.on('message', (channel, message) => {
  if(channel == "laravelsmssend"){

  }
  if(channel == "laravelslacknotification"){
    slackWebbhookUrl = "https://hooks.slack.com/services/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"
    payload = notificationPayload();
    sendNotification(slackWebbhookUrl, payload);
  }
  else{
    latestMessage = `Received message on channel '${channel}': ${message}`
    console.log(latestMessage);
  }
  
});
/**===================================================================== */


app.get('/', (req, res) => {
  res.send(`Latest message from Redis: ${latestMessage}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})