const axios = require('axios');
const {readyPayload } = require('./Data/Values/slackPayloadValue');

const sendNotification = async (webhookUrl, message) => {
  var payload = readyPayload(message); 
  try {
    const response = await axios.post(webhookUrl, payload);
    console.log('Notification sent:', response.data);
    return 'Notification sent successfully';
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Error sending notification');
  }
};

module.exports = { sendNotification };