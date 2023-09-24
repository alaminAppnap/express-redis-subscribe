const axios = require('axios');
const {readyPayload } = require('../Data/Values/slackPayloadValue');

const sendNotification = async (webhookUrl, message) => {
  var payload = readyPayload(message); 
  try {
    const response = await axios.post(webhookUrl, payload);
    return 'Notification sent successfully';
  } catch (error) {
    throw new Error('Error sending notification');
  }
};

module.exports = { sendNotification };