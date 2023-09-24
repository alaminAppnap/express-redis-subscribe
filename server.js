const express = require('express')
const axios = require('axios');
const app = express()
require('dotenv').config();

const { sendNotification } = require('./Notifications/slackNotificationService');
const { sendSslMessage } = require('./SMS/sslWirelessSMSProvider');
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
const smsSendChannel = process.env.REDIS_SMS_CHANNEL || 'laravelsmschannel'
const slackNotificationChannel = process.env.REDIS_SLACK_NOTIFICATION_CHANNEL || 'laravelslackchannel'; 

subscriber.subscribe(smsSendChannel);
subscriber.subscribe(slackNotificationChannel);

/**===============Subscribe Channel=============================================== */
subscriber.on('message', (channel, message) => {
  if(channel === smsSendChannel){
    let data = JSON.parse(message);
    let phone = data && data.phone  ? data.phone : "01700000000";
    let sms = data && data.message ? data.message : "Test message";

    if(process.env.SMS_SEND === true){
      sendSslMessage(phone,sms);
    }
  }

  if(channel === slackNotificationChannel){
    const slackWebhookUrl = process.env.WEB_HOOK_URL;
    sendNotification(slackWebhookUrl, JSON.parse(message));
  }
});
/**===================================================================== */


app.get('/', (req, res) => {
   res.send(`Landing page`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
