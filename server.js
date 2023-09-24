const express = require('express')
const axios = require('axios');
const app = express()
require('dotenv').config();

const { sendNotification } = require('./Notifications/slackNotificationService');
const port = process.env.PORT || 3000;


const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

/**============Channel name =========== */
const smsSend = process.env.REDIS_SMS_CHANNEL || 'laravelsmschannel'
const slackNotification = process.env.REDIS_SLACK_NOTIFICATION_CHANNEL || 'laravelslackchannel'; 

subscriber.subscribe(smsSend);
subscriber.subscribe(slackNotification);

/**===============Subscribe Channel=============================================== */
subscriber.on('message', (channel, message) => {
  if(channel === smsSend){

  }

  if(channel === slackNotification){
    const slackWebbhookUrl = process.env.WEB_HOOK_URL;
    sendNotification(slackWebbhookUrl, JSON.parse(message));
  }
});
/**===================================================================== */


app.get('/', (req, res) => {
   res.send(`Landing page`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
